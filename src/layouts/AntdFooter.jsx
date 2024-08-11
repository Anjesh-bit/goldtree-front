import { Layout } from "antd";
const { Footer } = Layout;

const AntdFooter = () => {
  return (
    <Footer className="bg-[#002140] text-center text-[#f5f5f5] font-semibold">
      Job Portal ©{new Date().getFullYear()} Created by Gold Tree
    </Footer>
  );
};

export default AntdFooter;
