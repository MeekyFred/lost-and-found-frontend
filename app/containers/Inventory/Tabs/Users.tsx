"use client";

import React, { useCallback, useEffect, useState } from "react";
import DataTable from "react-data-table-component";

import { customStyles, responsiveStyles } from "@/app/constants";
import { USERS_TABLE_LG, USERS_TABLE_SM } from '@/app/components/Tables/users-table'; // prettier-ignore
import { Pagination, Placeholder } from "@/app/exports/exports";
import { ComponentOptions, RowsPerPageOptions } from "@/app/helpers/pagination";
import useGetPaginatedQuery from "@/app/queries/useGetPaginatedQuery";
import { getUsers as getUsersAPI } from "@/app/services/admin.service";
import { Author, UserRow } from "@/app/types/user";
import { useStore } from "@/app/zustand/store/useStore";

import "./Users.scss";

const Users: React.FC = () => {
  const [tableData, setTableData] = useState<UserRow[]>([]);

  const { pagination, setPagination, user } = useStore();

  const { limit, page, pages, total } = pagination;

  const { data: usersData, triggerRefetch: refetchUsers } =
    useGetPaginatedQuery({
      apiService: getUsersAPI,
      enabled: true,
      payload: { limit, page },
      queryKey: "get-all-users",
    });

  useEffect(() => {
    if (usersData) {
      const meta = usersData.meta;
      setPagination(meta);
    }
  }, [usersData]); // eslint-disable-line

  useEffect(() => {
    refetchUsers();
  }, [pagination]); // eslint-disable-line

  const handleTransform = (data: Author[]) => {
    return data.map((user) => ({ ...user }));
  };

  useEffect(() => {
    if (usersData) {
      const data = usersData.data;
      const transformedData = handleTransform(data);
      setTableData(transformedData);
    }
  }, [usersData]); // eslint-disable-line

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
    <div className="app__tab-users">
      <div className="app__tab-users-body">
        <div className="big__table" data-testid="specific-parent">
          <DataTable
            columns={USERS_TABLE_LG}
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
                  title="Users"
                />
              );
            }}
            paginationComponentOptions={ComponentOptions}
            paginationDefaultPage={page}
            paginationPerPage={limit}
            paginationRowsPerPageOptions={RowsPerPageOptions}
            noDataComponent={<Placeholder hideBtn text="No Record Found 📊" />}
          />
        </div>

        <div className="small__table">
          <DataTable
            columns={USERS_TABLE_SM}
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
                  title="Users"
                />
              );
            }}
            paginationComponentOptions={ComponentOptions}
            paginationDefaultPage={page}
            paginationPerPage={limit}
            paginationRowsPerPageOptions={RowsPerPageOptions}
            noDataComponent={<Placeholder hideBtn text="No Record Found 📊" />}
          />
        </div>
      </div>
    </div>
  );
};

export default Users;
