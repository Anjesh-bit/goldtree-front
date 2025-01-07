import React from 'react';
import { useNavigate } from 'react-router-dom';
import SessionTimeoutSvg from '../../assets/svg/session-time-out.svg';
import { Button } from 'antd';

const SessionTimeout = ({ message = 'Session Timed Out' }) => {
  const navigate = useNavigate();

  const handleLoginRedirect = () => {
    navigate('/auth/login');
  };

  return (
    <div className="flex flex-col items-center justify-center h-[60vh] gap-6 text-center mt-20">
      <img
        src={SessionTimeoutSvg}
        alt="Session Timeout"
        className="w-1/3 md:w-1/4 mb-6 animate-pulse"
      />
      <p className="text-xl md:text-2xl font-medium text-gray-700">{message}</p>
      <Button
        onClick={handleLoginRedirect}
        className="bg-[#08142c] text-white font-semibold px-6  py-2 rounded hover:!bg-[#0a223f] transition-colors"
      >
        Go to Login
      </Button>
    </div>
  );
};

export default SessionTimeout;
