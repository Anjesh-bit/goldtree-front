import Collapse from 'antd/es/collapse';
import CollapsePanel from 'antd/es/collapse/CollapsePanel';

const CollapseSearch = ({ header, children }) => {
  return (
    <Collapse className="border-none shadow-sm rounded-md">
      <CollapsePanel
        header={
          <div className="text-base font-medium text-gray-800 tracking-wide">
            {header}
          </div>
        }
        className="bg-gray-50"
      >
        {children}
      </CollapsePanel>
    </Collapse>
  );
};

export default CollapseSearch;
