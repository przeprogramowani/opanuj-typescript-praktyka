import { Send } from 'lucide-react';

interface SubmitProps {
  children: React.ReactNode;
}

export const Submit = ({ children }: SubmitProps) => {
  return (
    <button
      type="submit"
      data-testid="submit-button"
      className="w-full px-6 py-3 bg-gray-800 text-gray-200 rounded-lg hover:bg-gray-700
      disabled:bg-gray-900 disabled:text-gray-600 transition-colors flex items-center
      justify-center gap-2 font-medium"
    >
      {children}
      <Send className="w-4 h-4" />
    </button>
  );
};
