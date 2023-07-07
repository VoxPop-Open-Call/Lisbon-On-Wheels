import { FC } from 'react';
import {
  Navigate,
  Outlet,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements
} from 'react-router-dom';
import { ErrorRedirect, Layout } from './components';
import { Home, Result } from './pages';
import { Dashboards } from './pages/dashboards/Dashboards';

const App: FC = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route
        path="/"
        element={
          <Layout>
            <Outlet />
          </Layout>
        }
        errorElement={<ErrorRedirect />}
      >
        <Route index element={<Home />} />
        <Route path="dashboards" element={<Dashboards />} />
        <Route path="result/:title" element={<Result />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default App;
