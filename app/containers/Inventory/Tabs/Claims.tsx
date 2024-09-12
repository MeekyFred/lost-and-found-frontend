"use client";

import React, { useCallback, useEffect, useState } from "react";
import type { ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import DataTable from "react-data-table-component";
import { Button } from "@chakra-ui/react";
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { CiFilter, CiSearch } from "react-icons/ci";
import { MdKeyboardArrowDown } from "react-icons/md";
import debounce from "lodash/debounce";

import { customStyles, responsiveStyles } from "@/app/constants";
import { CLAIMS_TABLE_LG, CLAIMS_TABLE_SM } from '@/app/components/Tables/claims-table'; // prettier-ignore
import { Pagination, Placeholder } from "@/app/exports/exports";
import { STATUS } from "@/app/helpers/claims";
import { ComponentOptions, RowsPerPageOptions } from "@/app/helpers/pagination";
import useGlobalToast from "@/app/hooks/useGlobalToast";
import useGetPaginatedQuery from "@/app/queries/useGetPaginatedQuery";
import { getClaims as getClaimsAPI } from "@/app/services/admin.service";
import { Claim, ClaimRow, ClaimStatus } from "@/app/types/claim";
import { useStore } from "@/app/zustand/store/useStore";

import UpdateClaimModal from "../Modals/UpdateClaimModal";

import "./Claims.scss";

const Claims: React.FC = () => {
  const [search, setSearch] = useState<string>("");
  const [status, setStatus] = useState<ClaimStatus>(ClaimStatus.ALL);
  const [tableData, setTableData] = useState<ClaimRow[]>([]);
  const [claim, setClaim] = useState<Claim>();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { pagination, setPagination, user } = useStore();

  const { limit, page, pages, total } = pagination;

  const { data: claimsData, triggerRefetch: refetchClaims } =
    useGetPaginatedQuery({
      apiService: getClaimsAPI,
      enabled: true,
      payload: { limit, page, search, status },
      queryKey: "get-all-claims",
    });

  useEffect(() => {
    if (claimsData) {
      const meta = claimsData.meta;
      setPagination(meta);
    }
  }, [claimsData]); // eslint-disable-line

  useEffect(() => {
    refetchClaims();
  }, [pagination, status]); // eslint-disable-line

  const handleView = (claim: Claim) => {
    setClaim(claim);
    setIsOpen(true);
  };

  const handleTransform = (data: Claim[]) => {
    return data.map((item) => ({
      ...item,
      handleView: handleView,
    }));
  };

  useEffect(() => {
    if (claimsData) {
      const data = claimsData.data;
      const transformedData = handleTransform(data);
      setTableData(transformedData);
    }
  }, [claimsData]); // eslint-disable-line

  const debounceAPIRequest = useCallback(debounce(refetchClaims, 700), []); // eslint-disable-line

  useEffect(() => {
    return () => debounceAPIRequest.cancel();
  }, [debounceAPIRequest]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearch(value);
    debounceAPIRequest();
  };

  const handleStatus = (status: ClaimStatus) => {
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

  const handleClose = () => setIsOpen(false);

  return (
    <div className="app__tab-claims">
      {claim && (
        <UpdateClaimModal
          claim={claim}
          isOpen={isOpen}
          handleClose={handleClose}
          refreshPage={refetchClaims}
        />
      )}

      <div className="app__tab-claims-controls">
        <div className="search">
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <CiSearch className="text-[#B1BBCD]" />
            </InputLeftElement>
            <Input
              type="text"
              placeholder="Enter name of author"
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
              Filter status
            </MenuButton>
            <MenuList>
              <MenuItem onClick={handleStatus.bind(this, ClaimStatus.ALL)}>
                All
              </MenuItem>
              {STATUS.map((status, index) => (
                <MenuItem
                  key={index}
                  onClick={handleStatus.bind(this, status.value)}
                >
                  {status.name}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
        </div>
      </div>

      <div className="app__tab-claims-body">
        <div className="big__table" data-testid="specific-parent">
          <DataTable
            columns={CLAIMS_TABLE_LG}
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
                  title="Claims"
                />
              );
            }}
            paginationComponentOptions={ComponentOptions}
            paginationDefaultPage={page}
            paginationPerPage={limit}
            paginationRowsPerPageOptions={RowsPerPageOptions}
            onRowClicked={(row) => handleView(row)}
            noDataComponent={<Placeholder hideBtn text="No Record Found 📊" />}
          />
        </div>

        <div className="small__table">
          <DataTable
            columns={CLAIMS_TABLE_SM}
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
                  title="Claims"
                />
              );
            }}
            paginationComponentOptions={ComponentOptions}
            paginationDefaultPage={page}
            paginationPerPage={limit}
            paginationRowsPerPageOptions={RowsPerPageOptions}
            onRowClicked={(row) => handleView(row)}
            noDataComponent={<Placeholder hideBtn text="No Record Found 📊" />}
          />
        </div>
      </div>
    </div>
  );
};

export default Claims;
