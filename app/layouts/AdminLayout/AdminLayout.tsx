'use client';

import React from 'react';

import { Header, Sidebar } from '@/app/exports/exports';
import { useStore } from '@/app/zustand/store/useStore';

import './AdminLayout.scss';

type Props = { children: React.ReactNode };

const AdminLayout: React.FC<Props> = ({ children }) => {
  const { pageTitle } = useStore();

  return (
    <div className="app__admin-layout">
      <Sidebar />

      <div className="main__section">
        <Header title={pageTitle} />
        <main>{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
