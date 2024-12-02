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
    element: <Suspense>{element}</Suspense>,
  })),
});

const router = createBrowserRouter([
  createRoutes(homeConfig, MainLayout),
  createRoutes(authConfig, MainLayout),
  createRoutes(employeeConfig, EmployeeDashboardLayouts),
  createRoutes(jobSeekerConfig, JobSeekerDashboardLayouts),
]);

export default router;
