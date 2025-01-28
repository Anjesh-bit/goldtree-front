import { HIRING_STATUS } from './pages/employee/jobsApplied/jobsApplied.constant';

export const filterHiringStatus = (status) => {
  switch (status) {
    case HIRING_STATUS.WAITING:
      return {
        className: 'bg-yellow-500 text-white font-semibold',
        text: 'Waiting',
      };
    case HIRING_STATUS.ACCEPTED:
      return {
        className: 'bg-green-500 text-white font-semibold',
        text: 'Accepted',
      };
    case HIRING_STATUS.REJECTED:
      return {
        className: 'bg-red-500 text-white font-semibold',
        text: 'Rejected',
      };
    case HIRING_STATUS.PENDING:
      return {
        className: 'bg-blue-500 text-white font-semibold',
        text: 'Pending',
      };
    default:
      return {
        className: 'bg-gray-300 text-gray-700 font-medium',
        text: 'Unknown Status',
      };
  }
};
