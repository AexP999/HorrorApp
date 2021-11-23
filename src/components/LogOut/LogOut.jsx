import { useEffect, memo } from 'react';
import { useHttpHook } from '../Hooks/api.hook';

const LogOut = memo(({ userInfo, setUserInfo }) => {
  console.log('userInfo.loggedIn', userInfo.loggedIn);

  const { api, apiError } = useHttpHook();

  const fetchLogout = async () => {
    const result = await api.post('/auth/logout');
    console.log('RENDER  LogOUT', apiError, result);
    setUserInfo({ userId: '', email: '', role: '', loggedIn: false, accessToken: '' });
    localStorage.setItem('token', '');
  };

  useEffect(() => {
    fetchLogout();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return null;
});
export default LogOut;