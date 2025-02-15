import { useNavigate } from 'react-router-dom';

import cls from './LoginPage.module.scss';
import authService from '../../services/authService';

export function LoginPage() {
  const navigate = useNavigate()

  const authHandle = async () => {
    const authStatus = await authService.auth('', '')

    if (authStatus === 200) {
      sessionStorage.setItem('user', 'auth')
      navigate('/')
    }
  };

  return (
    <div className={cls.wrapper}>
      <button onClick={authHandle}>Запросить авторизацию</button>
    </div>
  );
}
