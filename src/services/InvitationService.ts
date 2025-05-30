// src/services/InvitationService.ts
import apiClient from './apiClient';

export interface Invitation {
    id: number;
    nutritionist: number;
    email: string;
    token: string;
    created_at: string;
    accepted: boolean;
    accepted_at: string | null;
    nutritionist_name: string;
    nutritionist_email: string;
}

/** POST /api/invitations/accept/ */
export const acceptInvitation = async (token: string): Promise<Invitation> => {
    const { data } = await apiClient.post<Invitation>('/invitations/accept/', { token });
    return data;
};

export const createInvitation = async (email: string): Promise<Invitation> => {
    const { data } = await apiClient.post<Invitation>('/invitations/', { email });
    return data;
};
