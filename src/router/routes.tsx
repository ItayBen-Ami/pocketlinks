import { createBrowserRouter, Navigate } from 'react-router-dom';
import ErrorPage from '../pages/ErrorPage';
import WebsitesListPage from '../pages/WebsitesListPage';
import { listsLoader, websitesLoader } from './loaders';
import { QueryClient } from '@tanstack/react-query';
import AppLayout from '../components/ui/Layout';
import ListsPage from '../pages/ListsPage';

export const getRouter = (queryClient: QueryClient, isLoggedIn: boolean) =>
  createBrowserRouter([
    {
      path: '/',
      element: <AppLayout />,
      errorElement: <ErrorPage />,
      children: [
        { index: true, element: <Navigate to={isLoggedIn ? '/lists' : '/'} replace /> },
        {
          path: 'lists/:listId/websites',
          element: <WebsitesListPage />,
          loader: websitesLoader(queryClient),
          id: 'websites',
        },
        {
          path: 'lists',
          element: <ListsPage />,
          loader: listsLoader(queryClient),
        },
        {
          path: '/',
          element: <div>Hello</div>,
        },
      ],
    },
  ]);
