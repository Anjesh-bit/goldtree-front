import { Input } from 'antd';

const { Search } = Input;

const AntdSearch = ({
  placeholder,
  enterButton,
  size,
  loading,
  className,
  onSearch,
  onChange,
}) => {
  const handleOnSearch = (e) => {
    onSearch instanceof Function && onSearch(e);
  };

  const handleOnchange = (e) => {
    onChange instanceof Function && onChange(e);
  };

  return (
    <div
      className={`flex items-center bg-[#f5f5f5] rounded-lg shadow-md p-4 transition-all duration-300 hover:bg-[#f0f4f8] hover:shadow-lg ${className}`}
    >
      <Search
        placeholder={placeholder}
        enterButton={enterButton}
        onSearch={handleOnSearch}
        onChange={handleOnchange}
        size={size || 'large'}
        loading={loading}
        className="w-full border-none focus:ring-2 focus:ring-[#00b6b4] rounded-lg"
      />
    </div>
  );
};

export default AntdSearch;
