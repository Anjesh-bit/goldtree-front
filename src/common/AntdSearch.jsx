import { Input } from "antd";
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
    <>
      <Search
        className={className}
        placeholder={placeholder}
        enterButton={enterButton}
        onSearch={handleOnSearch}
        onChange={handleOnchange}
        size={size}
        loading={loading}
      />
    </>
  );
};

export default AntdSearch;
