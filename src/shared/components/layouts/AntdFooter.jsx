import { Layout } from 'antd';
const { Footer } = Layout;

const AntdFooter = () => {
  return (
    <Footer className="bg-[#08142c] text-gray-400 px-4 py-6">
      <div className="max-w-7xl mx-auto text-center">
        <p className="text-sm md:text-base font-medium">
          <span className="text-[#f1c40f] font-semibold">
            GoldTree Job Portal
          </span>{' '}
          © {new Date().getFullYear()} — All rights reserved.
        </p>
        <p className="text-xs mt-1 text-gray-500">
          Crafted with care for aspiring professionals.
        </p>
      </div>
    </Footer>
  );
};

export default AntdFooter;
