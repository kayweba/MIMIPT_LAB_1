import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import cls from './LoginPage.module.scss';
import authService from '../../services/authService';
import { AuthContext } from '../../context/AuthContext';

export function LoginPage() {
  const navigate = useNavigate();

  const { setIsAuth } = useContext(AuthContext);

  const authHandle = async () => {
    const authStatus = await authService.auth('', '');

    if (authStatus === 200) {
      setIsAuth(true);
      navigate('/');
    }
  };

  return (
    <div className={cls.wrapper}>
      <button onClick={authHandle}>Запросить авторизацию</button>
    </div>
  );
}
