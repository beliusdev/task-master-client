import Form from 'components/Form/Form';
import Container from 'components/Container/Container';
import UserApi from 'api/UserApi';
import { useNavigate, Navigate, Link } from 'react-router-dom';
import { useState } from 'react';
import { setMessage, setUser } from 'state';
import { useDispatch, useSelector } from 'react-redux';
import getErrorMessage from 'utils/getErrorMessage';
import Heading from 'components/Heading/Heading';

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const isAuth = Boolean(useSelector((state) => state.user.username));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await UserApi.login({ email, password });
      localStorage.setItem('tm-token', response.data.token);
      dispatch(setUser(response.data.user));
      navigate('/');
    } catch (error) {
      dispatch(setMessage(getErrorMessage(error)));
    }
  };

  return isAuth ? (
    <Navigate to='/' />
  ) : (
    <div className='login'>
      <Container>
        <Heading type='secondary'>Log In</Heading>
        <Form onSubmit={handleSubmit}>
          <input
            tabIndex='1'
            onChange={(e) => setEmail(e.target.value)}
            type='email'
            placeholder='Email'
            required
          />
          <input
            tabIndex='2'
            onChange={(e) => setPassword(e.target.value)}
            type='password'
            placeholder='Password'
            required
          />
          <button tabIndex='3' type='submit'>
            Log In
          </button>
          <p>
            Don't have an account? <Link to='/register'>Register</Link>
          </p>
        </Form>
      </Container>
    </div>
  );
}

export default Login;
