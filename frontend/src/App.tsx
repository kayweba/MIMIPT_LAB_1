import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import './App.css';
import { MainPage } from './routes/MainPage/MainPage';
import { LoginPage } from './routes/LoginPage/LoginPage';
import { ProtectedRoute } from './routes/ProtectedRoute/ProtectedRoute';

const router = createBrowserRouter([
  {
    path: '/',
    element: <ProtectedRoute children={<MainPage />} />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
