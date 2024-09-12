"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import type { ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import DataTable from "react-data-table-component";
import { Button } from "@chakra-ui/react";
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { CiFilter, CiSearch } from "react-icons/ci";
import { MdAdd, MdKeyboardArrowDown } from "react-icons/md";
import debounce from "lodash/debounce";

import { customStyles, responsiveStyles } from "@/app/constants";
import { ITEMS_TABLE_LG, ITEMS_TABLE_SM } from '@/app/components/Tables/items-table'; // prettier-ignore
import { Pagination, Placeholder } from "@/app/exports/exports";
import { CATEGORIES } from "@/app/helpers/items";
import { ComponentOptions, RowsPerPageOptions } from "@/app/helpers/pagination";
import useGlobalToast from "@/app/hooks/useGlobalToast";
import useGetPaginatedQuery from "@/app/queries/useGetPaginatedQuery";
import { getItems as getItemsAPI } from "@/app/services/items.service";
import { ItemsRow, ItemStatus, ItemObject, ItemCategory } from "@/app/types/items"; // prettier-ignore
import { useStore } from "@/app/zustand/store/useStore";

import CreateItemModal from "../Modals/CreateItemModal";

import "./Items.scss";

const Items: React.FC = () => {
  const [category, setCategory] = useState<ItemCategory>(ItemCategory.ALL);
  const [search, setSearch] = useState<string>("");
  const [status, setStatus] = useState<ItemStatus>(ItemStatus.ALL);
  const [tableData, setTableData] = useState<ItemsRow[]>([]);
  const [type, setType] = useState<"edit" | "create">("create");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { showToast } = useGlobalToast();
  const { push } = useRouter();
  const { pagination, setPagination, user } = useStore();

  const isEnabled = useMemo(() => {
    if (user?.id === undefined || user?.id === "") {
      return false;
    }

    return true;
  }, [user]);

  const { limit, page, pages, total } = pagination;

  const { data: itemsData, triggerRefetch: refetchItems } =
    useGetPaginatedQuery({
      apiService: getItemsAPI,
      enabled: true,
      payload: { category, limit, page, search, status },
      queryKey: "get-all-items",
    });

  useEffect(() => {
    if (itemsData) {
      const meta = itemsData.meta;
      setPagination(meta);
    }
  }, [itemsData]); // eslint-disable-line

  useEffect(() => {
    refetchItems();
  }, [category, pagination, status]); // eslint-disable-line

  const handleView = (id: string) => {
    if (!id) {
      showToast("Item id not found", "error");
    } else {
      push(`/admin/inventory/${id}`);
    }
  };

  const handleTransform = (data: ItemObject[]) => {
    return data.map((item) => ({
      ...item,
      handleView: handleView,
    }));
  };

  useEffect(() => {
    if (itemsData) {
      const data = itemsData.data;
      const transformedData = handleTransform(data);
      setTableData(transformedData);
    }
  }, [itemsData]); // eslint-disable-line

  const debounceAPIRequest = useCallback(debounce(refetchItems, 700), []); // eslint-disable-line

  useEffect(() => {
    return () => debounceAPIRequest.cancel();
  }, [debounceAPIRequest]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearch(value);
    debounceAPIRequest();
  };

  const handleCategory = (category: ItemCategory) => {
    setCategory(category);
  };

  const handleStatus = (status: ItemStatus) => {
    setStatus(status);
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

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  return (
    <div className="app__tab-items">
      <CreateItemModal
        isOpen={isOpen}
        type={type}
        handleClose={handleClose}
        setType={setType}
        refreshPage={refetchItems}
      />

      <div className="app__tab-items-controls">
        <div className="search">
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <CiSearch className="text-[#B1BBCD]" />
            </InputLeftElement>
            <Input
              type="text"
              placeholder="Enter name of item"
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

          <Menu>
            <MenuButton
              as={Button}
              leftIcon={<CiFilter />}
              rightIcon={<MdKeyboardArrowDown />}
              className="menu__btn"
              variant="outline"
            >
              Filter status
            </MenuButton>
            <MenuList>
              <MenuItem onClick={handleStatus.bind(this, ItemStatus.ALL)}>
                All
              </MenuItem>
              <MenuItem onClick={handleStatus.bind(this, ItemStatus.CLAIMED)}>
                Claimed
              </MenuItem>
              <MenuItem onClick={handleStatus.bind(this, ItemStatus.UNCLAIMED)}>
                Unclaimed
              </MenuItem>
              <MenuItem
                onClick={handleStatus.bind(this, ItemStatus.PROCESSING)}
              >
                Processing
              </MenuItem>
            </MenuList>
          </Menu>

          <Button
            variant="solid"
            colorScheme="primary"
            leftIcon={<MdAdd />}
            fontWeight={400}
            fontSize="small"
            onClick={handleOpen}
          >
            Create Item
          </Button>
        </div>
      </div>

      <div className="app__tab-items-body">
        <div className="big__table" data-testid="specific-parent">
          <DataTable
            columns={ITEMS_TABLE_LG}
            data={tableData}
            customStyles={customStyles}
            pagination
            paginationComponent={(props) => {
              return (
                <Pagination
                  {...props}
                  currentPage={page}
                  rowCount={total}
                  rowsPerPage={limit}
                  firstHandler={firstHandler}
                  lastHandler={lastHandler}
                  limitHandler={limitHandler}
                  nextHandler={nexthandler}
                  prevHandler={prevHandler}
                  title="Items"
                />
              );
            }}
            paginationComponentOptions={ComponentOptions}
            paginationDefaultPage={page}
            paginationPerPage={limit}
            paginationRowsPerPageOptions={RowsPerPageOptions}
            onRowClicked={(row) => handleView(row.id)}
            noDataComponent={<Placeholder hideBtn text="No Record Found 📊" />}
          />
        </div>

        <div className="small__table">
          <DataTable
            columns={ITEMS_TABLE_SM}
            className="react-data-table-component"
            data={tableData}
            customStyles={responsiveStyles}
            pagination
            paginationComponent={(props) => {
              return (
                <Pagination
                  {...props}
                  currentPage={page}
                  rowCount={total}
                  rowsPerPage={limit}
                  firstHandler={firstHandler}
                  lastHandler={lastHandler}
                  limitHandler={limitHandler}
                  nextHandler={nexthandler}
                  prevHandler={prevHandler}
                  title="Items"
                />
              );
            }}
            paginationComponentOptions={ComponentOptions}
            paginationDefaultPage={page}
            paginationPerPage={limit}
            paginationRowsPerPageOptions={RowsPerPageOptions}
            onRowClicked={(row) => handleView(row.id)}
            noDataComponent={<Placeholder hideBtn text="No Record Found 📊" />}
          />
        </div>
      </div>
    </div>
  );
};

export default Items;
