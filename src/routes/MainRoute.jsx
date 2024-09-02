import React, { Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import {
  homeConfig,
  authConfig,
  employeeConfig,
  jobSeekerConfig,
} from './routes.constant';
import MainLayout from '../layouts/MainLayout';
import DashboardLayout from '../layouts/DashBoardLayout';
import ProtectedRoute from './ProtectedRoutes';

const EmployeeDashboardLayouts = ProtectedRoute(DashboardLayout, 'employee');
const JobSeekerDashboardLayouts = ProtectedRoute(DashboardLayout, 'jobSeeker');

const createRoutes = (config, Layout) => ({
  path:
    Layout === MainLayout
      ? '/'
      : `${Layout === EmployeeDashboardLayouts ? 'employee' : 'jobSeeker'}/dashboard`,
  element: <Layout />,
  children: config.map(({ path, element }) => ({
    path,
    element: <Suspense fallback={<div>Loading ...</div>}>{element}</Suspense>,
  })),
});

const router = createBrowserRouter([
  createRoutes(homeConfig, MainLayout),
  createRoutes(authConfig, MainLayout),
  createRoutes(employeeConfig, EmployeeDashboardLayouts),
  createRoutes(jobSeekerConfig, JobSeekerDashboardLayouts),
]);

export default router;
