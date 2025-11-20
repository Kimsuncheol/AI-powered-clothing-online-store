'use client';

import React from 'react';
import { useAuth } from '@/src/hooks/useAuth';
import { Role } from '@/src/types/auth';
import { useRouter } from 'next/navigation';
import { CircularProgress, Box, Typography } from '@mui/material';

interface RequireRoleProps {
    children: React.ReactNode;
    roles: Role[];
}

export const RequireRole: React.FC<RequireRoleProps> = ({ children, roles }) => {
    const { user, isLoading } = useAuth();
    const router = useRouter();

    React.useEffect(() => {
        if (!isLoading && !user) {
            router.push('/auth/signin');
        }
    }, [isLoading, user, router]);

  if (isLoading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
                <CircularProgress />
            </Box>
        );
    }

    const userRoles = user?.roles ?? (user?.role ? [user.role] : []);

    if (!user || !roles.some((role) => userRoles.includes(role))) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
                <Typography variant="h5" color="error">
                    Not Authorized
                </Typography>
            </Box>
        );
    }

    return <>{children}</>;
};
