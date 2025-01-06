import AntdButton from '../../../../shared/components/AntdButtons';

const EmptyState = ({
  image,
  title,
  description,
  buttonText,
  buttonAction,
  containerHeight,
}) => (
  <div
    className={`flex flex-col items-center justify-center ${containerHeight} bg-[#f5f5f5]`}
  >
    <img src={image} alt="No Data" className="w-48 h-48 mb-4" />
    <h2 className="text-xl md:text-2xl font-medium text-[#08142c] mb-2">
      {title}
    </h2>
    <p className="text-md text-gray-600 mb-4 text-center max-w-md">
      {description}
    </p>
    <AntdButton
      onClick={buttonAction}
      classNames="bg-[#08142c] text-white font-semibold px-4 rounded hover:!bg-[#0a223f] transition-colors"
    >
      {buttonText}
    </AntdButton>
  </div>
);

export default EmptyState;
