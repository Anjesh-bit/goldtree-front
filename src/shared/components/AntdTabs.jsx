import { Tabs } from 'antd';

const AntdTabs = (props) => {
  return (
    <Tabs
      defaultActiveKey={props.defaultActiveKey}
      items={props.items}
      onChange={props.onChange}
      tabBarStyle={{
        ...props.tabBarStyle,
        backgroundColor: props.backgroundColor || '#ffffff',
        width: '100%',
        fontWeight: 600,
        overflowX: 'hidden',
        paddingLeft: 20,
        paddingRight: 20,
        margin: 0,
      }}
      tabBarGutter={40}
      tabPosition="top"
      centered={props.centered}
      activeKey={props.activeKey}
      onTabClick={props.onTabClick}
      animated
      tabBarExtraContent={props.extraContent}
    >
      {props.children}
    </Tabs>
  );
};

export default AntdTabs;
