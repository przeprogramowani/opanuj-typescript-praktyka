export interface FormContextType {
  handleSubmit: (e: React.FormEvent) => void;
  values: Record<string, any>;
  setValues: React.Dispatch<React.SetStateAction<Record<string, any>>>;
}

export interface SurveyProps {
  onSubmit?: (values: Record<string, any>) => void;
  children: React.ReactNode;
}

export interface SurveyControlProps {
  name: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
}

export interface SelectProps extends SurveyControlProps {
  options: Array<{ value: string; label: string }>;
}
