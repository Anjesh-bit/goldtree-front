import React from 'react';
import { DatePicker, ConfigProvider } from 'antd';

const DatePickers = ({
  onHandleChange,
  Label,
  required,
  value,
  defaultDate,
  format,
}) => {
  const onChange = (date, dateString) => {
    onHandleChange instanceof Function && onHandleChange(date, dateString);
  };

  return (
    <>
      {Label && (
        <div
          className={`whitespace-nowrap text-sm font-medium ${
            required
              ? "after:text-[#dc4446] after:content-['*'] after:font-[400] after:ml-1 after:text-[16px]"
              : ''
          }`}
        >
          {Label}
        </div>
      )}
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#3d2462',
            colorPrimaryHover: '#6c4ba1',
            colorPrimaryActive: '#6c4ba1',
            borderRadius: 1,
            controlHeight: 35,
            colorBgContainer: '#f5f5f5',
            colorText: '#3d2462',
          },
        }}
      >
        <div>
          <DatePicker
            format={format}
            onChange={onChange}
            className="w-full h-30"
            value={value}
            defaultValue={defaultDate}
          />
        </div>
      </ConfigProvider>
    </>
  );
};

export default DatePickers;
