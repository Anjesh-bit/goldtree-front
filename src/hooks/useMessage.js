import { message } from 'antd';
import { useCallback } from 'react';

const useMessage = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const showMessage = useCallback(
    ({ content, type, className }) => {
      messageApi.open({
        type: type,
        content: content,
        className: className,
      });
    },
    [messageApi]
  );

  return { contextHolder, showMessage };
};

export default useMessage;
