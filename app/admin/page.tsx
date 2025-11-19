'use client';

import React, { useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { RequireAdmin } from '@/src/components/auth/RequireAdmin';
import { AdminLayout } from '@/src/components/admin/AdminLayout';
import { AdminTabs } from '@/src/components/admin/AdminTabs';
import { AdminUsersTab } from '@/src/components/admin/users/AdminUsersTab';
import { AdminProductsTab } from '@/src/components/admin/products/AdminProductsTab';
import { AdminOrdersTab } from '@/src/components/admin/orders/AdminOrdersTab';

const TABS = ['users', 'products', 'orders'] as const;
type AdminTabValue = (typeof TABS)[number];

const getInitialTab = (searchParam: string | null): AdminTabValue => {
  if (searchParam && TABS.includes(searchParam as AdminTabValue)) {
    return searchParam as AdminTabValue;
  }
  return 'users';
};

export default function AdminPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialTab = getInitialTab(searchParams.get('tab'));
  const [tab, setTab] = useState<AdminTabValue>(initialTab);

  const handleTabChange = (value: string) => {
    if (!TABS.includes(value as AdminTabValue)) {
      return;
    }
    setTab(value as AdminTabValue);
    const params = new URLSearchParams(searchParams?.toString());
    params.set('tab', value);
    router.replace(`/admin?${params.toString()}`, { scroll: false });
  };

  const currentTabContent = useMemo(() => {
    switch (tab) {
      case 'products':
        return <AdminProductsTab />;
      case 'orders':
        return <AdminOrdersTab />;
      case 'users':
      default:
        return <AdminUsersTab />;
    }
  }, [tab]);

  return (
    <RequireAdmin>
      <AdminLayout header={<AdminTabs value={tab} onChange={handleTabChange} />}>{currentTabContent}</AdminLayout>
    </RequireAdmin>
  );
}
