import React, { createContext, useContext, useState, ReactNode } from 'react';

type Step = {
    title: string;
    fields: {
        key: string;
        label: string;
        keyboardType?: 'default' | 'numeric' | 'email-address';
    }[];
};

type WizardFormContextType = {
    data: Record<string, any>;
    updateData: (newData: Partial<Record<string, any>>) => void;
    setAllData: (allData: Record<string, any>) => void;
    wizardSteps: Step[];
    setWizardSteps: (steps: Step[]) => void;
};

const WizardFormContext = createContext<WizardFormContextType | undefined>(undefined);

export const WizardFormProvider = ({ children }: { children: ReactNode }) => {
    const [data, setData] = useState<Record<string, any>>({});
    const [wizardSteps, setWizardSteps] = useState<Step[]>([]);

    const updateData = (newData: Partial<Record<string, any>>) => {
        setData(prev => ({ ...prev, ...newData }));
    };

    const setAllData = (allData: Record<string, any>) => {
        setData(allData);
    };

    return (
        <WizardFormContext.Provider value={{ data, updateData, setAllData, wizardSteps, setWizardSteps }}>
            {children}
        </WizardFormContext.Provider>
    );
};

export const useWizardForm = () => {
    const context = useContext(WizardFormContext);
    if (!context) {
        throw new Error('useWizardForm debe usarse dentro de WizardFormProvider');
    }
    return context;
};
