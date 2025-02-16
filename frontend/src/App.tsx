import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import './App.css';
import { MainPage } from './routes/MainPage/MainPage';
import { LoginPage } from './routes/LoginPage/LoginPage';
import { ProtectedRoute } from './routes/ProtectedRoute/ProtectedRoute';
import { AuthContext } from './context/AuthContext';
import { useAuth } from './hooks/useAuth';

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
  const { userData, setUserData } = useAuth();

  return (
    <>
      <AuthContext.Provider value={{ userData, setUserData }}>
        <RouterProvider router={router} />
      </AuthContext.Provider>
    </>
  );
}

export default App;
