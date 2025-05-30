import { useCallback, useState } from 'react';
import { fetchProgressData } from '../services/ProgressRecordService';

export const useProgressData = () => {
    const [progressData, setProgressData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const loadProgressData = useCallback(async (startDate?: string, endDate?: string) => {
        setLoading(true);
        try {
            const data = await fetchProgressData(startDate, endDate);
            setProgressData(data);
        } catch (error) {
            console.error('Error al cargar los progresos:', error);
        } finally {
            setLoading(false);
        }
    }, []);

    return {
        progressData,
        loading,
        loadProgressData,
        setProgressData,
    };
};
