import React from 'react';
import { Input, ConfigProvider } from 'antd';
import FormItem from './FormItems';

const Inputs = (props) => {
  const positiveNumberValidation = (_, value) => {
    if (value) {
      if (value >= 0) {
        return Promise.resolve();
      } else {
        return Promise.reject(`${props.label} should be positive`);
      }
    } else {
      return Promise.resolve();
    }
  };

  const validatePhone = (_, value) => {
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(value) && value !== null) {
      return Promise.reject('Please enter a valid phone number');
    } else if (value >= 0) {
      return Promise.resolve();
    } else if (value <= 0) {
      return Promise.reject(`${props.label} should be positive`);
    } else {
      return Promise.resolve();
    }
  };

  const emailPattern = {
    pattern: new RegExp('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$'),
    message: 'Please enter in example@email.com format',
  };

  const positive = {
    validator: positiveNumberValidation,
  };

  const phoneNumber = {
    validator: validatePhone,
  };

  let pattern = [];

  const typeToPattern = {
    email: [emailPattern],
    pNumber: [phoneNumber],
    number: [positive],
  };

  if (typeToPattern.hasOwnProperty(props.type)) {
    pattern = typeToPattern[props.type];
  }

  const tempRule = [
    {
      required: props.required,
      message: <div>{props.valMessage}</div>,
    },
    ...pattern,
  ];

  const localRules =
    props.rules instanceof Array ? [...tempRule, ...props.rules] : tempRule;

  const handleClick = (e) => {
    props.onClick instanceof Function && props.onClick(e);
  };

  const handleOnPressEnter = (e) => {
    props.onPressEnter instanceof Function && props.onPressEnter(e);
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          Input: {
            addonBg: '#3d2462',
            fontSize: 13,
            paddingInline: 6,
            controlPaddingHorizontalSM: '10px',
            colorPrimary: '#3d2462',
            colorPrimaryHover: '#6c4ba1',
            colorPrimaryActive: '#6c4ba1',
            controlHeight: 35,
            borderRadius: 1,
          },
        },
      }}
    >
      {props.Label && (
        <div
          className={`whitespace-nowrap text-sm font-medium mb-[7px] ${
            props.required
              ? "after:text-[#dc4446] after:content-['*'] after:font-[400] after:ml-1 after:text-[16px]"
              : ''
          }`}
        >
          {props.Label}
        </div>
      )}

      <FormItem {...props} localRules={localRules}>
        <Input
          defaultValue={props.defaultValue}
          min={props.minlength}
          hidden={props.hidden ?? false}
          type={props.type}
          onBlur={props.onBlur}
          focus={props.focus}
          autoFocus={props.autoFocus ?? false}
          style={{
            ...props.style,
          }}
          onPressEnter={handleOnPressEnter}
          readOnly={props.readOnly}
          onClick={handleClick}
          maxLength={props.maxlength}
          value={props.value}
          disabled={props.disabled}
          onChange={props.handleChange}
          className={`${props.className}`}
          ref={props.ref}
          allowClear={props.allowClear ?? false}
          prefix={props.prefix}
          suffix={props.suffix}
          placeholder={props.placeholder}
          {...props.fieldProps}
        />
      </FormItem>
    </ConfigProvider>
  );
};

export default Inputs;
