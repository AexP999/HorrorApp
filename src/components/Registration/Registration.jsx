import { useState } from 'react';
import Modal from '../Modal';
import { PATHTO } from '../../constants/constants';
import { useFetchHook } from '../Hooks/fetch.hook';

import './Registration.css';

const Registration = () => {
  const { loading, request } = useFetchHook();
  const [ isOpen, setIsOpen ] = useState(false);
  const [ userData, setUserData ] = useState({
    email: '',
    password: ''
  });

  const openModal = () => {
    setIsOpen(true);
  };

  const handleSubmit = async () => {
    try {
      await request(`${ PATHTO.HOST_NAME }/auth/users`, 'POST', { ...userData });
    } catch(error) { }
    setIsOpen(false);
  };

  const handleCancel = () => {
    setIsOpen(false);
    setUserData({
      email: '',
      password: ''
    });
  };
  const handleClose = () => {
    setIsOpen(false);
    setUserData({
      email: '',
      password: ''
    });
  };

  const updateUserData = (e) => {

    const { target: { value, name } } = e;

    setUserData({ ...userData, [ name ]: value });
  };
  console.log('userData', userData);

  return (
    <>
      <div onClick={ openModal }>&nbsp;Регистрация
      </div>
      <Modal
        title="Введите логин и пароль"
        isOpen={ isOpen }
        onCancel={ handleCancel }
        onSubmit={ handleSubmit }
        onClose={ handleClose }
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
            <button
              onClick={ handleCancel }
            >
              Cancel
            </button>
            <button
              onClick={ handleSubmit }
              disabled={ loading }
            >
              Зарегистрировать
            </button>
          </div>
        </div>
      </Modal>

    </>
  );
};
export default Registration;