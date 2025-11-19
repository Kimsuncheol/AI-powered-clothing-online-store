import { client } from './client';
import { AdminPaginatedResponse, AdminUser, AdminUserStatus } from '@/src/types/admin';

interface FetchAdminUsersParams {
  search?: string;
  page?: number;
}

export const adminUsersApi = {
  fetchUsers: (params: FetchAdminUsersParams = {}) => {
    const query = new URLSearchParams();
    if (params.search) query.append('search', params.search);
    if (params.page) query.append('page', params.page.toString());
    const endpoint = query.toString() ? `/admin/users?${query.toString()}` : '/admin/users';
    return client.get<AdminPaginatedResponse<AdminUser>>(endpoint);
  },

  fetchUserDetail: (userId: string | number) =>
    client.get<AdminUser>(`/admin/users/${userId}`),

  updateUserStatus: (userId: string | number, status: AdminUserStatus) =>
    client.post<AdminUser>(`/admin/users/${userId}/status`, { status }),
};
