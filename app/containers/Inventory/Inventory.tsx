"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useBreakpointValue } from "@chakra-ui/react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";

import { images } from "@/app/constants";
import { Summary } from "@/app/exports/exports";
import useGetQuery from "@/app/queries/useGetQuery";
import { getAnalytics as getAnalyticsAPI } from "@/app/services/admin.service";
import { useStore } from "@/app/zustand/store/useStore";

import Claims from "./Tabs/Claims";
import Items from "./Tabs/Items";
import Users from "./Tabs/Users";

import "./Inventory.scss";

interface IAnalytics {
  totalClaims: number;
  totalItems: number;
  totalUsers: number;
}

const initAnalytics: IAnalytics = {
  totalItems: 0,
  totalClaims: 0,
  totalUsers: 0,
};

const Inventory: React.FC = () => {
  const [name, setName] = useState("");
  const [analytics, setAnalytics] = useState<IAnalytics>(initAnalytics);
  const [tabIndex, setTabIndex] = useState<number>(0);

  const isFitted = useBreakpointValue({ base: true, lg: false });

  const { resetPagination, user } = useStore();

  const isEnabled = useMemo(() => {
    if (user?.id === undefined || user?.id === "") {
      return false;
    }

    return true;
  }, [user]);

  const { data, isPending, triggerRefetch } = useGetQuery({
    apiService: getAnalyticsAPI,
    enabled: !!isEnabled,
    payload: { id: user?.id },
    queryKey: "itemsAnalytics",
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

  const handleTabChange = (index: number) => {
    resetPagination();
    setTabIndex(index);
  };

  return (
    <div className="app__page-inventory">
      <p className="intro" data-testid="intro" title="intro">
        Welcome {name}
      </p>

      <div className="app__page-inventory-cards">
        <Summary
          info={{
            title: "Total Items",
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
            title: "Total Claims",
            value: analytics.totalClaims,
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

        <Summary
          info={{
            title: "Total Users",
            value: analytics.totalUsers,
            titleColor: "#FFF",
            valueColor: "#FFF",
          }}
          style={{
            color: "#3F3D56",
            decoration: "none",
            icon: images.myClaims,
          }}
          isPending={isPending}
        />
      </div>

      <div className="app__page-inventory-tabs">
        <Tabs
          width="full"
          isFitted={isFitted}
          index={tabIndex}
          onChange={handleTabChange}
          isLazy
        >
          <TabList role="tablist">
            <Tab
              _selected={{
                fontWeight: "600",
                borderBottom: "2px",
                borderColor: "primary.500",
              }}
            >
              Items
            </Tab>
            <Tab
              _selected={{
                fontWeight: "600",
                borderBottom: "2px",
                borderColor: "primary.500",
              }}
            >
              Claims
            </Tab>
            <Tab
              _selected={{
                fontWeight: "600",
                borderBottom: "2px",
                borderColor: "primary.500",
              }}
            >
              Users
            </Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <Items />
            </TabPanel>
            <TabPanel>
              <Claims />
            </TabPanel>
            <TabPanel>
              <Users />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    </div>
  );
};

export default Inventory;
