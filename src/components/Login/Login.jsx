import { useState } from 'react';
import Modal from '../Modal';
import { useHttpHook } from '../Hooks/api.hook';

import './LogIn.css';

const LogIn = ({ userInfo, setUserInfo }) => {

  const { api, apiError, clearApiErrors } = useHttpHook();

  console.log("LOGIN", userInfo);

  console.log("apiError", apiError);

  const initData = { email: '', password: '' };


  const [ isOpenLogWindow, setIsOpenLogWindow ] = useState(true);
  // eslint-disable-next-line no-unused-vars
  const [ isOpenErrWindow, setIsOpenErrWindow ] = useState(false);
  const [ userData, setUserData ] = useState(initData);

  const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split('.')[ 1 ]));
    } catch(e) {
      return null;
    }
  };

  const handleSubmit = async () => {

    const result = await api.post('/auth/login', { ...userData });
    console.log('accessToken', result);
    console.log('userInfo', userInfo.loggedIn);
    if(result) {
      setIsOpenLogWindow(false);
      setUserData(initData);
      const { userId, email, role } = parseJwt(result.data);
      setUserInfo({ userId, email, role, loggedIn: true });
      localStorage.setItem('token', result.data);
      localStorage.setItem('email', email);

    }

  };
  console.log(userInfo);

  const handleCancel = () => {
    setIsOpenLogWindow(false);
    setUserData(initData);
  };

  const handleClose = (windowTypeErrFlag) => {
    if(windowTypeErrFlag) {
      clearApiErrors();
      setIsOpenErrWindow(false);
    } else {
      setIsOpenLogWindow(false);
      setUserData(initData);
    }
  };

  const updateUserData = (e) => {

    const { target: { value, name } } = e;

    setUserData({ ...userData, [ name ]: value });
  };
  console.log('userData', userData);

  console.log('errorRENDER', apiError);

  return (
    <>

      <Modal
        title="Введите email и пароль"
        isOpen={ isOpenLogWindow }
        onCancel={ handleCancel }
        onSubmit={ handleSubmit }
        onClose={ handleClose }
        type1={ true }
      >
        <div className="body-cont">
          <div>
            <h4>E-mail</h4>
            <input
              key='r1'
              type="text"
              value={ userData.email }
              name='email'
              placeholder='enter email'
              onChange={ updateUserData }
            />
            <h4>Password</h4>
            <input
              type="text"
              value={ userData.password }
              name='password'
              placeholder='enter password'
              onChange={ updateUserData }
            />
          </div>

          <div>
            <button onClick={ handleCancel }>Cancel</button>
            <button
              onClick={ handleSubmit }
            >Войти</button>
            <div >
              Забыли пароль? <span>Восстановить</span>
            </div>
            <a href="/registration">Зарегистрировать</a>

          </div>
          { apiError
            ? <Modal title="Ошибка!" isOpen={ true } type1={ false } onClose={ () => handleClose(true) }>{ apiError }</Modal>
            : null }
        </div>
      </Modal>

    </>
  );
};
export default LogIn;