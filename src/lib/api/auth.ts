import { client } from './client';
import { LoginCredentials, SignupCredentials, AuthResponse, User } from '@/src/types/auth';

export const authApi = {
    signin: (credentials: LoginCredentials) =>
        client.post<AuthResponse>('/auth/signin', credentials),

    signup: (credentials: SignupCredentials) =>
        client.post<AuthResponse>('/auth/signup', credentials),

    getMe: () =>
        client.get<User>('/auth/me'),

    signout: () =>
        client.post<void>('/auth/signout', {}),
};
