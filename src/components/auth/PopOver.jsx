import React from 'react';
import { Popover } from 'antd';
import '../../styles/antd.css';
const PopOver = ({ content, title, children }) => (
  <Popover
    content={content}
    title={title}
    overlayClassName="custom-popover-content"
  >
    {children}
  </Popover>
);

export default PopOver;
