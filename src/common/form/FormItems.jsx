import { Form } from 'antd';

const FormItem = (props) => {
  return (
    <Form.Item
      {...props}
      name={props.name}
      valuePropName={props.valuePropName}
      hidden={props.hidden ? true : false}
      validateFirst
      validateStatus={props.validateStatus}
      help={props.help}
      shouldUpdate={props.shouldUpdate}
      getValueFromEvent={props.getValueFromEvent}
      initialValue={props.initialValue}
      style={{
        justifyContent: 'center',
      }}
      {...props.formItemProps}
      rules={props.localRules}
      colon={props.colon || false}
    >
      {props.children}
    </Form.Item>
  );
};

export default FormItem;
