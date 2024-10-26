import { createBrowserRouter, Link, Navigate } from 'react-router-dom';
import ErrorPage from '../pages/ErrorPage';
import WebsitesListPage from '../pages/WebsitesListPage';
import { websitesLoader } from './loaders';
import { QueryClient } from '@tanstack/react-query';
import AppLayout from '../components/Layout';

export const getRouter = (queryClient: QueryClient) =>
  createBrowserRouter([
    {
      path: '/',
      element: <AppLayout />,
      errorElement: <ErrorPage />,
      children: [
        { index: true, element: <Navigate to="/lists" replace /> },
        {
          path: 'lists/:listId',
          element: <WebsitesListPage />,
          loader: websitesLoader(queryClient),
        },
        {
          path: 'lists',
          element: <Link to="/lists/1">kaki</Link>,
        },
      ],
    },
  ]);
