import { Search as SearchIcon } from 'lucide-react';
import React from 'react';

type Props = {
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
};

const SearchBar = ({ value, onChange, onSearch }: Props) => {
  return (
    <div className="relative flex items-center space-x-2 w-full max-w-md mx-auto mt-5">
      <input
        type="text"
        placeholder="Search..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-2 border-b border-ink/20 bg-transparent focus:outline-none focus:border-royal-800"
      />
      <button
      className='absolute right-5 bottom-2.5'
        onClick={onSearch}
      >
        <SearchIcon className="h-5 w-5 text-royal-800" strokeWidth={1.5} />
      </button>
    </div>
  );
};

export default SearchBar;
