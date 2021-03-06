import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Form from '@sadmammoth/react-form';
import Button from '../../components/Button';
import Client from '../../helpers/Client.ts';

const LoginPage = (props) => {
  let [mode, setMode] = useState('login');

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Login</title>
      </Helmet>
      <Form
        onSubmit={({ login, password }) => {
          return mode === 'login'
            ? Client.loginUser(login, password)
            : Client.registerUser(login, password);
        }}
        inputs={[
          {
            type: 'text',
            name: 'login',
            description: 'Login',
            required: true,
            label: 'Login',
          },
          {
            type: 'password',
            name: 'password',
            description: 'Password',
            required: true,
            label: 'Password',
          },
        ]}
        style={{
          width: '20vw',
          margin: '0 auto',
        }}
        submitButton={
          <Button content={mode === 'register' ? 'Register' : 'Login'} />
        }
      />
      <Button
        content={mode === 'register' ? 'Login' : 'Register'}
        action={() =>
          mode === 'login' ? setMode('register') : setMode('login')
        }
      />
    </>
  );
};

export default LoginPage;
