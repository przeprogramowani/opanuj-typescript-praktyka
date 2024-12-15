import { SelectProps } from '../types';
import { useFormContext } from '../context';

export const Choice = ({ name, label, options, required }: SelectProps) => {
  const { values, setValues } = useFormContext();

  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={name} className="flex items-center gap-2 mb-2 font-medium text-gray-200">
          {label}
        </label>
      )}
      <select
        id={name}
        name={name}
        value={values[name] || ''}
        required={required}
        onChange={(e) =>
          setValues((prev: Record<string, any>) => ({ ...prev, [name]: e.target.value }))
        }
        className="w-full px-4 py-2 bg-gray-900 border border-gray-800 text-gray-200 rounded-lg
        shadow-lg hover:border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500
        focus:outline-none transition-colors"
      >
        <option value="" className="bg-gray-900">
          Select...
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value} className="bg-gray-900">
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};
