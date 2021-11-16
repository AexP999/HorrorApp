import { useState } from 'react';
import Modal from '../Modal';
import { useHttpHook } from '../Hooks/api.hook';

import './Registration.css';

const Registration = () => {

  const { api, apiError, clearApiErrors } = useHttpHook();

  const [ isOpenLogWindow, setIsOpenLogWindow ] = useState(true);
  // eslint-disable-next-line no-unused-vars
  const [ isOpenErrWindow, setIsOpenErrWindow ] = useState(false);
  const [ userData, setUserData ] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = async () => {

    const result = await api.post('/auth/users', { ...userData });

    if(result) {
      setIsOpenLogWindow(false);
    };
  };

  const handleCancel = () => {
    setIsOpenLogWindow(false);
    setUserData({
      email: '',
      password: ''
    });
  };

  const handleClose = (windowTypeErrFlag) => {
    if(windowTypeErrFlag) {
      clearApiErrors();
      setIsOpenErrWindow(false);
    } else {
      setIsOpenLogWindow(false);
      setUserData({
        email: '',
        password: ''
      }
      );
    }
  };

  const updateUserData = (e) => {

    const { target: { value, name } } = e;

    setUserData({ ...userData, [ name ]: value });
  };
  console.log('userData', userData);

  return (
    <>
      <Modal
        title="Введите логин и пароль"
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
              type="password"
              value={ userData.password }
              name='password'
              placeholder='enter password'
              onChange={ updateUserData }
            />
          </div>

          <div>
            <button
              onClick={ handleCancel }>Cancel</button>
            <button
              onClick={ handleSubmit }

            >Зарегистрировать</button>
          </div>
          { apiError ? <Modal title="Ошибка!" isOpen={ true } type1={ false } onClose={ () => handleClose(true) }>{ apiError }</Modal> : null }
        </div>
      </Modal>

    </>
  );
};
export default Registration;