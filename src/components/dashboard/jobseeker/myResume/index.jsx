import generatePDF, { Resolution, Margin } from 'react-to-pdf';
import ViewPdf from './ViewPdf';
import AntdButton from '../../../../common/AntdButtons';

const options = {
  filename: 'resume.pdf',
  method: 'open',
  resolution: Resolution.NORMAL,
  page: {
    margin: Margin.SMALL,
    orientation: 'vertical',
  },
  canvas: {
    mimeType: 'image/jpeg',
    qualityRatio: 1,
  },

  overrides: {
    pdf: {
      compress: true,
    },

    canvas: {
      useCORS: true,
    },
  },
};

const getTargetElement = () => document.getElementById('content-id');

const MyResume = () => {
  return (
    <div className="bg-[#f5f5f5] p-6 min-h-screen flex flex-col items-center">
      <div className="mb-6">
        <AntdButton
          onClick={() => generatePDF(getTargetElement, options)}
          classNames="bg-[#08142c] text-white font-semibold px-4 rounded hover:!bg-[#0a223f] transition-colors"
        >
          Generate PDF
        </AntdButton>
      </div>
      <div
        id="content-id"
        className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-md"
      >
        <ViewPdf />
      </div>
    </div>
  );
};

export default MyResume;
