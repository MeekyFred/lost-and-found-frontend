"use client";

import React, { useCallback, useEffect, useState } from "react";
import type { ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@chakra-ui/react";
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { BiCalendar } from "react-icons/bi";
import { CiFilter, CiSearch } from "react-icons/ci";
import { MdKeyboardArrowDown } from "react-icons/md";
import debounce from "lodash/debounce";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { Pagination, Placeholder, Spinner } from "@/app/exports/exports";
import { CATEGORIES } from "@/app/helpers/items";
import { ComponentOptions, RowsPerPageOptions } from "@/app/helpers/pagination";
import useGlobalToast from "@/app/hooks/useGlobalToast";
import useGetPaginatedQuery from "@/app/queries/useGetPaginatedQuery";
import { getItems as getItemsAPI } from "@/app/services/items.service";
import { ItemCategory, ItemObject } from "@/app/types/items";
import { useStore } from "@/app/zustand/store/useStore";

import ClaimModal from "./ClaimModal";
import CreateItemModal from "../Inventory/Modals/CreateItemModal";
import ItemCard from "./ItemCard";

import "./Items.scss";

type Range = [Date | null, Date | null];

const Items: React.FC = () => {
  const [item, setItem] = useState<ItemObject>();
  const [items, setItems] = useState<ItemObject[]>([]);
  const [category, setCategory] = useState<ItemCategory>(ItemCategory.ALL);
  const [search, setSearch] = useState<string>("");
  const [dateRange, setDateRange] = useState<Range>([null, null]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [reportIsOpen, setReportIsOpen] = useState<boolean>(false);

  const { showToast } = useGlobalToast();
  const { push } = useRouter();
  const { pagination, setPagination } = useStore();

  const { limit, page, pages, total } = pagination;
  const [startDate, endDate] = dateRange;
  const range = { from: startDate, to: endDate };

  const {
    data: itemsData,
    isPending,
    triggerRefetch: refetchItems,
  } = useGetPaginatedQuery({
    apiService: getItemsAPI,
    enabled: true,
    payload: { category, limit, page, search, range },
    queryKey: "get-all-items",
  });

  useEffect(() => {
    if (itemsData) {
      const data = itemsData.data;
      const meta = itemsData.meta;

      setItems(data);
      setPagination(meta);
    }
  }, [itemsData]); // eslint-disable-line

  useEffect(() => {
    refetchItems();
  }, [category, endDate, pagination]); // eslint-disable-line

  const debounceAPIRequest = useCallback(debounce(refetchItems, 700), []); // eslint-disable-line

  useEffect(() => {
    return () => debounceAPIRequest.cancel();
  }, [debounceAPIRequest]);

  const handleView = (id: string) => {
    if (!id) {
      showToast("Request id not found", "error");
    } else {
      push(`/user/items/${id}`);
    }
  };

  const handleClaim = (item: ItemObject) => {
    if (!item) return;
    setItem(item);
    setIsOpen(true);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearch(value);
    debounceAPIRequest();
  };

  const handleCategory = (category: ItemCategory) => {
    setCategory(category);
  };

  // prettier-ignore
  const nexthandler = useCallback((page: number) => {
    setPagination({ ...pagination, page });
  }, [pagination]); // eslint-disable-line

  // prettier-ignore
  const prevHandler = useCallback((page: number) => {
    const firstPage = pagination.page === 1;
    if (firstPage) return;
    setPagination({ ...pagination, page });
  }, [pagination]); // eslint-disable-line

  // prettier-ignore
  const firstHandler = useCallback((page: number) => {
    setPagination({ ...pagination, page });
  }, [pagination]); // eslint-disable-line

  // prettier-ignore
  const lastHandler = useCallback((page = pages) => {
    setPagination({ ...pagination, page });
  }, [pagination]); // eslint-disable-line

  // prettier-ignore
  const limitHandler = useCallback((limit: number) => {
    setPagination({ ...pagination, limit });
  }, [pagination]); // eslint-disable-line

  const handleClose = () => setIsOpen(false);
  const handleReportClose = () => setReportIsOpen(false);
  const handleReportOpen = () => setReportIsOpen(true);

  return (
    <div className="app__page-items">
      {item && (
        <ClaimModal
          item={item}
          isOpen={isOpen}
          handleClose={handleClose}
          handleRefetch={refetchItems}
        />
      )}

      <CreateItemModal
        isOpen={reportIsOpen}
        type="create"
        refreshPage={refetchItems}
        handleClose={handleReportClose}
      />

      <div className="app__page-items-controls">
        <Button
          variant="outline"
          colorScheme="primary"
          onClick={handleReportOpen}
        >
          Report an item
        </Button>

        <div className="search">
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <CiSearch className="text-[#B1BBCD]" />
            </InputLeftElement>
            <Input
              type="text"
              placeholder="Enter the name of your lost item"
              value={search}
              onChange={handleChange}
            />
          </InputGroup>
        </div>

        <div className="filters">
          <Menu>
            <MenuButton
              as={Button}
              leftIcon={<CiFilter />}
              rightIcon={<MdKeyboardArrowDown />}
              className="menu__btn"
              variant="outline"
            >
              Filter category
            </MenuButton>
            <MenuList>
              <MenuItem
                key={"all-items"}
                onClick={handleCategory.bind(this, ItemCategory.ALL)}
              >
                All
              </MenuItem>
              {CATEGORIES.map((category, index) => (
                <MenuItem
                  key={index}
                  onClick={handleCategory.bind(this, category.value)}
                >
                  {category.name}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
        </div>

        <div className="date-picker">
          <BiCalendar className="calendar" />

          <DatePicker
            closeOnScroll={true}
            dateFormat="dd/MM/yyyy"
            selectsRange={true}
            startDate={startDate!}
            endDate={endDate!}
            onChange={(update) => setDateRange(update)}
            placeholderText="Select date range"
            maxDate={new Date()}
            minDate={new Date("09/01/2024")}
            showMonthDropdown
            showYearDropdown
            scrollableYearDropdown
            dropdownMode="select"
            isClearable
          />

          <MdKeyboardArrowDown className="arrow" />
        </div>
      </div>

      <div className="app__page-items-cards">
        {isPending && <Spinner />}

        {!isPending && (
          <>
            {items.length > 0 ? (
              items.map((item, index) => (
                <ItemCard
                  key={`${index}-${item.id}`}
                  item={item}
                  handleView={handleView}
                  handleClaim={handleClaim}
                />
              ))
            ) : (
              <Placeholder hideBtn text="No items found 📊" />
            )}
          </>
        )}
      </div>

      {!isPending && items.length > 0 && (
        <Pagination
          currentPage={page}
          rowCount={total}
          rowsPerPage={limit}
          onChangePage={nexthandler}
          onChangeRowsPerPage={limitHandler}
          firstHandler={firstHandler}
          lastHandler={lastHandler}
          limitHandler={limitHandler}
          nextHandler={nexthandler}
          prevHandler={prevHandler}
          paginationComponentOptions={ComponentOptions}
          paginationRowsPerPageOptions={RowsPerPageOptions}
          title="Items"
        />
      )}
    </div>
  );
};

export default Items;
