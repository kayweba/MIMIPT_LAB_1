import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import cls from './LoginPage.module.scss';
import authService from '../../services/authService';
import { AuthContext } from '../../context/AuthContext';

export function LoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const { setUserData } = useContext(AuthContext);

  const authHandle = async () => {
    const authStatus = await authService.auth(username, password);

    if (authStatus === 200) {
      setUserData({ username, password });
      navigate('/');
    }
  };

  return (
    <div className={cls.wrapper}>
      <input placeholder={'Логин'} type="text" value={username} onChange={(event) => setUsername(event.currentTarget.value)} />
      <input placeholder={'Пароль'} type="password" value={password} onChange={(event) => setPassword(event.currentTarget.value)} />
      <button onClick={authHandle}>Войти</button>
    </div>
  );
}
