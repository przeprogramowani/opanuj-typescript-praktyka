import { SurveyControlProps } from '../types';
import { useFormContext } from '../context';

export const ShortAnswer = ({ name, label, placeholder, required }: SurveyControlProps) => {
  const { values, setValues } = useFormContext();

  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={name} className="flex items-center gap-2 mb-2 font-medium text-gray-200">
          {label}
        </label>
      )}
      <input
        id={name}
        name={name}
        value={values[name] || ''}
        placeholder={placeholder}
        required={required}
        onChange={(e) =>
          setValues((prev: Record<string, any>) => ({ ...prev, [name]: e.target.value }))
        }
        className="w-full px-4 py-2 bg-gray-900 border border-gray-800 text-gray-200 rounded-lg
        shadow-lg hover:border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500
        focus:outline-none transition-colors placeholder-gray-600"
      />
    </div>
  );
};
