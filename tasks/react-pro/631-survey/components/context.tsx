import { createContext, useContext } from 'react';
import { FormContextType } from './types';

export const FormContext = createContext<FormContextType | undefined>(undefined);

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('Form controls must be used within a Form component');
  }
  return context;
};
