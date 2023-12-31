import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import DeliveryContext from '../contexts/DeliveryContext';
import validationInputs from '../utils/validationInputs';
import { postAPI } from '../services/deliveryAPI';

function Register() {
  const history = useHistory();
  const {
    isDisabled,
    setIsDisabled,
    email,
    setEmail,
    password,
    setPassword,
  } = useContext(DeliveryContext);

  const [name, setName] = useState('');
  const [isInConflict, setConflict] = useState(false);

  useEffect(() => {
    const nameLength = 12;
    const validationGeneral = validationInputs(email, password);
    const validateName = name.length >= nameLength;
    setIsDisabled(!(validationGeneral && validateName));
  }, [email, name, password, isDisabled, setIsDisabled]);

  const register = async () => {
    const user = {
      name,
      email,
      password,
      role: 'customer',
    };
    try {
      await postAPI('/user/register', user);
      history.push('/customer/products');
    } catch (err) {
      setConflict(true);
    }
  };

  return (
    <main className="login-container">
      <h1>Cadastro</h1>
      <form>
        <label htmlFor="nome">
          Nome
          <input
            type="text"
            name="nome"
            placeholder="Seu nome"
            data-testid="common_register__input-name"
            onChange={ (e) => setName(e.target.value) }
          />
        </label>
        <label htmlFor="email">
          Email
          <input
            type="email"
            name="email"
            placeholder="seu-email@site.com.br"
            data-testid="common_register__input-email"
            onChange={ (e) => setEmail(e.target.value) }
          />
        </label>
        <label htmlFor="password">
          Senha
          <input
            type="password"
            name="password"
            placeholder="******************"
            data-testid="common_register__input-password"
            onChange={ (e) => setPassword(e.target.value) }
          />
        </label>
        <button
          type="button"
          disabled={ isDisabled }
          onClick={ register }
          data-testid="common_register__button-register"
          className="button-primary"
        >
          Cadastrar
        </button>
      </form>
      <p
        id="form-invalid-text"
        hidden={ !isInConflict }
        data-testid="common_register__element-invalid_register"
      >
        Você já possui uma conta!
      </p>
    </main>
  );
}

export default Register;
