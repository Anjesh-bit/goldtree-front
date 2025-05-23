import React, { Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import {
  homeConfig,
  authConfig,
  employeeConfig,
  jobSeekerConfig,
} from './routes.constant';
import MainLayout from '../shared/components/layouts/MainLayout';
import DashboardLayout from '../shared/components/layouts/DashBoardLayout';
import ProtectedRoute from './ProtectedRoutes';
import { AppConstant } from '../shared/constants';
import { SessionTimeOut } from './LazyRoute';
import { Skeleton } from 'antd';

const EmployeeDashboardLayouts = ProtectedRoute(DashboardLayout, 'employee');
const JobSeekerDashboardLayouts = ProtectedRoute(DashboardLayout, 'jobSeeker');

const createRoutes = (config, Layout) => ({
  path:
    Layout === MainLayout
      ? '/'
      : `${Layout === EmployeeDashboardLayouts ? AppConstant.EMPLOYEE : AppConstant.JOB_SEEKER}/dashboard`,
  element: <Layout />,
  children: config.map(({ path, element }) => ({
    path,
    element: (
      <Suspense
        fallback={
          <Skeleton
            active
            paragraph={{ rows: 20 }}
            className="h-[100vh] w-full"
          />
        }
      >
        {element}
      </Suspense>
    ),
  })),
});

const router = createBrowserRouter([
  createRoutes(homeConfig, MainLayout),
  createRoutes(authConfig, MainLayout),
  createRoutes(employeeConfig, EmployeeDashboardLayouts),
  createRoutes(jobSeekerConfig, JobSeekerDashboardLayouts),
  {
    path: 'session-time-out',
    element: (
      <Suspense>
        <SessionTimeOut />
      </Suspense>
    ),
  },
]);

export default router;
