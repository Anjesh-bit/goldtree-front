import Collapse from 'antd/es/collapse';
import CollapsePanel from 'antd/es/collapse/CollapsePanel';

export const CollapseSearch = ({ header, children }) => {
  return (
    <Collapse
      className="border-none shadow-sm rounded-md bg-white text-[#08142c]"
      ghost
      expandIconPosition="right"
    >
      <CollapsePanel
        header={
          <div className="text-base font-semibold text-[#f1c40f] tracking-wide">
            {header}
          </div>
        }
        className="bg-[#f9f9f9]"
      >
        {children}
      </CollapsePanel>
    </Collapse>
  );
};
