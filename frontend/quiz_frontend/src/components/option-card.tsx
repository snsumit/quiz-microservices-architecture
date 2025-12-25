interface OptionCardProps {
  option: string;
  isSelected: boolean;
  onClick: () => void;
}

export function OptionCard({ option, isSelected, onClick }: OptionCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full px-6 py-4 rounded-xl border-2 text-left transition-all ${
        isSelected
          ? 'border-indigo-500 bg-indigo-50 text-indigo-700 shadow-md'
          : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50'
      }`}
    >
      {option}
    </button>
  );
}
