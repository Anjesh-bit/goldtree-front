import { JOB_STATUS } from '../dashboard.constant';

export const filterJobByStatus = (status) => {
  switch (status) {
    case JOB_STATUS.LIVE:
      return { className: 'bg-red-500 text-white', text: 'Live' };
    case JOB_STATUS.CLOSED:
      return { className: 'bg-green-500 text-white', text: 'Closed' };
    default:
      return { className: '', text: '' };
  }
};
