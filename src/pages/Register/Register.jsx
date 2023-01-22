import Container from 'components/Container/Container';
import { useEffect, useState } from 'react';
import UserApi from 'api/UserApi';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setMessage, setUser } from 'state';
import Form from 'components/Form/Form';
import getErrorMessage from 'utils/getErrorMessage';
import Heading from 'components/Heading/Heading';

function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isPasswordsMatch, setIsPasswordsMatch] = useState(true);
  const [userInfo, setUserInfo] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const isAuth = Boolean(useSelector((state) => state.user.username));

  useEffect(() => {
    setIsPasswordsMatch(userInfo.password === userInfo.confirmPassword);
  }, [userInfo]);

  const handleChange = (e, field) => {
    setUserInfo({
      ...userInfo,
      [field]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await UserApi.register(userInfo);
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
    <div className='register'>
      <Container>
        <Heading type='secondary'>Register</Heading>
        <Form onSubmit={handleSubmit}>
          <input
            type='text'
            placeholder='Username'
            onChange={(e) => handleChange(e, 'username')}
            required
          />

          <input
            type='email'
            placeholder='Email'
            onChange={(e) => handleChange(e, 'email')}
            required
          />

          <input
            type='password'
            placeholder='Password'
            onChange={(e) => handleChange(e, 'password')}
            required
          />

          <input
            type='password'
            placeholder='Confirm Password'
            onChange={(e) => handleChange(e, 'confirmPassword')}
            required
          />
          {isPasswordsMatch ? null : (
            <p className='message__item'>Passwords don't match.</p>
          )}
          <button type='submit'>Sign Up</button>
          <p>
            Already have an account? <Link to='/login'>Sign In</Link>
          </p>
        </Form>
      </Container>
    </div>
  );
}

export default Register;
