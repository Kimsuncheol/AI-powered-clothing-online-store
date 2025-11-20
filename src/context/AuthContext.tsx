'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Role, LoginCredentials, SignupCredentials } from '@/src/types/auth';
import { authApi } from '@/src/lib/api/auth';
import { useRouter } from 'next/navigation';

const DEV_USER: User = {
    id: 'dev-user',
    email: 'dev@example.com',
    name: 'Dev User',
    role: 'admin',
    roles: ['admin', 'seller'],
    avatarUrl: null,
};

interface AuthContextType {
    user: User | null;
    role: Role | null;
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    signIn: (credentials: LoginCredentials) => Promise<void>;
    signUp: (credentials: SignupCredentials) => Promise<void>;
    signOut: () => Promise<void>;
    signInDev: () => void;
    fetchMe: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    const fetchMe = async () => {
        try {
            const userData = await authApi.getMe();
            setUser(userData);
        } catch (error) {
            console.error('Failed to fetch user:', error);
            setUser(null);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchMe();
    }, []);

    const signIn = async (credentials: LoginCredentials) => {
        setIsLoading(true);
        try {
            const response = await authApi.signin(credentials);
            setUser(response.user);
            setToken(response.token);
            // Redirect based on role could happen here or in the component
            router.push('/');
        } catch (error) {
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const signUp = async (credentials: SignupCredentials) => {
        setIsLoading(true);
        try {
            const response = await authApi.signup(credentials);
            setUser(response.user);
            setToken(response.token);
            router.push('/');
        } catch (error) {
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const signOut = async () => {
        setIsLoading(true);
        try {
            await authApi.signout();
            setUser(null);
            setToken(null);
            router.push('/auth/signin');
        } catch (error) {
            console.error('Sign out failed:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const signInDev = () => {
        setUser(DEV_USER);
        setToken('dev-token');
    };

    const value = {
        user,
        role: user?.role || user?.roles?.[0] || null,
        token,
        isAuthenticated: Boolean(user),
        isLoading,
        signIn,
        signUp,
        signOut,
        signInDev,
        fetchMe,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuthContext must be used within an AuthProvider');
    }
    return context;
};
