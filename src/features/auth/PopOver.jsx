import React from 'react';
import { Popover } from 'antd';
import '../../shared/styles/antd.css';

const PopOver = ({ content, title, children, trigger }) => (
  <Popover
    content={content}
    title={title}
    trigger={trigger}
    overlayClassName="custom-popover-content"
  >
    {children}
  </Popover>
);

export default PopOver;
