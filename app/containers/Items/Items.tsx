"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import type { ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import DataTable from "react-data-table-component";
import { Button } from "@chakra-ui/react";
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { CiFilter, CiSearch } from "react-icons/ci";
import { MdKeyboardArrowDown } from "react-icons/md";
import debounce from "lodash/debounce";

import { customStyles, images, responsiveStyles } from "@/app/constants";
import { ITEMS_TABLE_LG, ITEMS_TABLE_SM } from '@/app/components/Tables/items-table'; // prettier-ignore
import { Summary } from "@/app/exports/exports";
import { Pagination, Placeholder } from "@/app/exports/exports";
import { ComponentOptions, RowsPerPageOptions } from "@/app/helpers/pagination";
import useGlobalToast from "@/app/hooks/useGlobalToast";
import useGetQuery from "@/app/queries/useGetQuery";
import useGetPaginatedQuery from "@/app/queries/useGetPaginatedQuery";
import { getItems as getItemsAPI } from "@/app/services/items.service";
import { getItemsAnalytics as getItemsAnalyticsAPI } from "@/app/services/items.service";
import { ItemsRow, ItemStatus, ItemsType } from "@/app/types/items";
import { useStore } from "@/app/zustand/store/useStore";

import "./Items.scss";

interface IAnalytics {
  totalItems: number;
  totalClaims: number;
}

const initAnalytics: IAnalytics = {
  totalItems: 0,
  totalClaims: 0,
};

const Items: React.FC = () => {
  const [name, setName] = useState("");
  const [analytics, setAnalytics] = useState<IAnalytics>(initAnalytics);
  const [tableData, setTableData] = useState<ItemsRow[]>([]);
  const [status, setStatus] = useState<ItemStatus>(ItemStatus.ALL);
  const [search, setSearch] = useState<string>("");

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

  const { data, isPending, triggerRefetch } = useGetQuery({
    apiService: getItemsAnalyticsAPI,
    enabled: !!isEnabled,
    payload: { id: user?.id },
    queryKey: "itemsAnalytics",
  });

  const { data: itemsData, triggerRefetch: refetchItems } =
    useGetPaginatedQuery({
      apiService: getItemsAPI,
      enabled: !!isEnabled,
      pagination,
      search,
      status,
      queryKey: "get-all-items",
    });

  useEffect(() => {
    if (user) {
      const firstName = user?.firstName;
      const lastName = user?.lastName;
      const fullName = `${firstName} ${lastName}`;

      setName(fullName);
    }
  }, [user]);

  useEffect(() => {
    if (data) {
      setAnalytics(data);
    }
  }, [data]);

  useEffect(() => {
    if (itemsData) {
      const meta = data.meta;
      setPagination(meta);
    }
  }, [itemsData]); // eslint-disable-line

  useEffect(() => {
    triggerRefetch();
  }, [pagination, status]); // eslint-disable-line

  const handleView = (id: string) => {
    if (!id) {
      showToast("Request id not found", "error");
    } else {
      push(`/${id}`);
    }
  };

  const handleTransform = (data: ItemsType[]) => {
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

  return (
    <div className="app__page-items">
      <p className="intro" data-testid="intro" title="intro">
        Welcome {name}
      </p>

      <div className="app__page-items-cards">
        <Summary
          info={{
            title: "Lost Items",
            value: analytics.totalItems,
            titleColor: "#FFF",
            valueColor: "#FFF",
          }}
          style={{
            color: "#FF8E31",
            decoration: "none",
            icon: images.lostItems,
          }}
          isPending={isPending}
        />

        <Summary
          info={{
            title: "Reported Items",
            value: analytics.totalItems,
            titleColor: "#FFF",
            valueColor: "#FFF",
          }}
          style={{
            color: "#5D6D7E",
            decoration: "none",
            icon: images.myClaims,
          }}
          isPending={isPending}
        />
      </div>

      <div className="app__page-items-table">
        <div className="app__page-items-table-controls">
          <div className="search">
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <CiSearch className="text-[#B1BBCD]" />
              </InputLeftElement>
              <Input
                type="text"
                placeholder="Enter name or category of item"
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
                Filter by
              </MenuButton>
              <MenuList>
                <MenuItem onClick={handleStatus.bind(this, ItemStatus.ALL)}>
                  All
                </MenuItem>
                <MenuItem onClick={handleStatus.bind(this, ItemStatus.CLAIMED)}>
                  Claimed
                </MenuItem>
                <MenuItem
                  onClick={handleStatus.bind(this, ItemStatus.UNCLAIMED)}
                >
                  Unclaimed
                </MenuItem>
                <MenuItem
                  onClick={handleStatus.bind(this, ItemStatus.PROCESSING)}
                >
                  Processing
                </MenuItem>
              </MenuList>
            </Menu>
          </div>
        </div>

        <div className="app__page-items-table-body">
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
              noDataComponent={
                <Placeholder hideBtn text="There are no lost items yet. 📊" />
              }
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
              noDataComponent={
                <Placeholder
                  hideBtn
                  text="You haven’t made any claims yet. 📊"
                />
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Items;
