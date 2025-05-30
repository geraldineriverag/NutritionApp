import apiClient from './apiClient';

export interface Appointment {
    id: number;
    patient: number;
    patient_name: string;
    patient_last_name: string;
    scheduled_for: string;
    created_at: string;
}

export const getMyAppointments = async (): Promise<Appointment[]> => {
    const { data } = await apiClient.get('/appointments/');
    return data;
};

export const fetchAppointments = async (): Promise<Appointment[]> => {
    const { data } = await apiClient.get<Appointment[]>('/appointments/');
    return data;
};

export const createAppointment = async (
    patientId: number,
    datetime: string
): Promise<Appointment> => {
    const { data } = await apiClient.post('/appointments/', {
        patient: patientId,
        scheduled_for: datetime,
    });
    return data;
};
