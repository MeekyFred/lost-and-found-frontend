'use client';

import React from 'react';
import { Direction, PaginationOptions } from 'react-data-table-component';
import { PaginationComponentProps } from "react-data-table-component"; // prettier-ignore
import { Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';
import { Button as ChakraButton, Select } from '@chakra-ui/react';
import { MdKeyboardArrowDown } from 'react-icons/md';

import useRTL from '@/app/hooks/useRTL';
import useWindowSize from '@/app/hooks/useWindowSize';
import { getNumberOfPages } from '@/app/utils/utils';
import './Pagination.scss';

interface Props extends PaginationComponentProps {
  rowsPerPage: number;
  rowCount: number;
  currentPage: number;
  direction?: Direction;
  paginationRowsPerPageOptions?: number[];
  paginationIconLastPage?: React.ReactNode;
  paginationIconFirstPage?: React.ReactNode;
  paginationIconNext?: React.ReactNode;
  paginationIconPrevious?: React.ReactNode;
  paginationComponentOptions?: PaginationOptions;
  onChangePage: (page: number, totalRows: number) => void;
  onChangeRowsPerPage: (numRows: number, currentPage: number) => void;
  title?: string;
  nextHandler?: (page: number) => void;
  prevHandler?: (page: number) => void;
  firstHandler?: (page: number) => void;
  lastHandler?: (page: number) => void;
  limitHandler?: (limit: number) => void;
}

const defaultComponentOptions = {
  rowsPerPageText: 'Rows per page:',
  rangeSeparatorText: 'of',
  noRowsPerPage: false,
  selectAllRowsItem: true,
  selectAllRowsItemText: 'All',
};
interface BTNProps {
  children: React.ReactNode;
  className: string;
  disabled: boolean;
  id: string;
  isRTL?: boolean;
  onClick: () => void;
  type?: any;
}

const Button: React.FC<BTNProps> = props => {
  return (
    <button
      id={props.id}
      className={props.className}
      disabled={props.disabled}
      style={{ transform: props.isRTL ? 'scale(-1, -1)' : '' }}
      onClick={props.onClick}
      type={props.type}
    >
      {props.children}
    </button>
  );
};

const Pagination: React.FC<Props> = props => {
  const { onChangePage, onChangeRowsPerPage } = props;
  const { currentPage, rowCount, rowsPerPage } = props;
  const { paginationComponentOptions, paginationRowsPerPageOptions } = props;
  const { firstHandler, lastHandler, limitHandler, nextHandler, prevHandler } = props; // prettier-ignore

  const windowSize = useWindowSize();
  const isRTL = useRTL(props.direction);
  const shouldShow = windowSize.width && windowSize.width > 768;
  const numPages = getNumberOfPages(rowCount, rowsPerPage);
  const lastIndex = currentPage * rowsPerPage;
  const firstIndex = lastIndex - rowsPerPage + 1;
  const disabledLesser = currentPage === 1;
  const disabledGreater = currentPage === numPages;
  const options = { ...defaultComponentOptions, ...paginationComponentOptions }; // prettier-ignore

  const range =
    currentPage === numPages
      ? `${firstIndex}-${rowCount} ${options.rangeSeparatorText} ${rowCount} ${props.title}`
      : `${firstIndex}-${lastIndex} ${options.rangeSeparatorText} ${rowCount} ${props.title}`;

  const handlePrevious = React.useCallback(() => {
    if (currentPage === 1) return;
    onChangePage(currentPage - 1, rowCount);
    prevHandler && prevHandler(currentPage - 1);
  }, [currentPage, onChangePage, prevHandler]); // eslint-disable-line

  const handleNext = React.useCallback(() => {
    if (currentPage === numPages) return;
    onChangePage(currentPage + 1, rowCount);
    nextHandler && nextHandler(currentPage + 1);
  }, [currentPage, nextHandler, numPages, onChangePage]); // eslint-disable-line

  const handleFirst = React.useCallback(() => {
    if (currentPage === 1) return;
    onChangePage(1, rowCount);
    firstHandler && firstHandler(1);
  }, [currentPage, firstHandler, onChangePage]); // eslint-disable-line

  const handleLast = React.useCallback(() => {
    const numPages = getNumberOfPages(rowCount, rowsPerPage);
    if (numPages === 1) return;
    onChangePage(numPages, rowCount);
    lastHandler && lastHandler(numPages);
  }, [lastHandler, onChangePage, rowCount, rowsPerPage]); // eslint-disable-line

  const handleRowsPerPage = React.useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const value = Number(e.target.value);
      onChangeRowsPerPage(value, currentPage);
      limitHandler && limitHandler(value);
    },
    [currentPage, onChangeRowsPerPage] // eslint-disable-line
  );

  // prettier-ignore
  const selectOptions = paginationRowsPerPageOptions?.map((num: number) => (
    <option key={num} value={num}>
        {num}
    </option>
));

  if (options.selectAllRowsItem) {
    selectOptions?.push(
      <option key={-1} value={rowCount}>
        {options.selectAllRowsItemText}
      </option>
    );
  }

  const select = (
    <Select
      onChange={handleRowsPerPage}
      defaultValue={rowsPerPage}
      aria-label={options.rowsPerPageText}
      fontSize="sm"
      size="sm"
      rounded="md"
      bg="gray.200"
      fontWeight="light"
      color="#676767"
      width="24"
      cursor="pointer"
    >
      {selectOptions}
    </Select>
  );

  return (
    <nav className="pagination__wrapper">
      <div className="range-select">
        <p className="range">{shouldShow && range}</p>
        {select}
      </div>

      <div className="jump_to-directions">
        <Menu preventOverflow>
          <MenuButton
            as={ChakraButton}
            aria-label="jump-to"
            rightIcon={<MdKeyboardArrowDown />}
            variant="solid"
            fontSize="sm"
            size="sm"
            rounded="md"
            bg="gray.200"
            fontWeight="light"
            color="#676767"
          >
            Jump to page
          </MenuButton>
          <MenuList width="4">
            <MenuItem onClick={handleFirst}>First page</MenuItem>
            <MenuItem onClick={handleLast}>Last page</MenuItem>
          </MenuList>
        </Menu>

        <div className="directions">
          <Button
            className={`prev ${
              disabledLesser ? 'text-[#828CB2] disabled' : 'text-[#041549]'
            }`}
            id="pagination-previous-page"
            type="button"
            aria-label="Previous Page"
            aria-disabled={disabledLesser}
            onClick={handlePrevious}
            disabled={disabledLesser && !prevHandler}
            isRTL={isRTL}
          >
            Prev
          </Button>

          <hr aria-orientation="vertical" className="separator" />

          <Button
            className={`next ${
              disabledGreater ? 'text-[#828CB2] disabled' : 'text-[#041549]'
            }`}
            id="pagination-next-page"
            type="button"
            aria-label="Next Page"
            aria-disabled={disabledGreater}
            onClick={handleNext}
            disabled={disabledGreater && !nextHandler}
            isRTL={isRTL}
          >
            Next
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Pagination;
