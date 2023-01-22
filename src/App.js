import './styles/app.scss';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from 'pages/Home/Home';
import Container from 'components/Container/Container';
import Navigation from 'components/Navigation/Navigation';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import UserApi from 'api/UserApi';
import { setUser, setMessage } from 'state';
import Login from 'pages/Login/Login';
import Register from 'pages/Register/Register';
import CreateTodo from 'pages/CreateTodo/CreateTodo';
import User from 'pages/User/User';
import getErrorMessage from 'utils/getErrorMessage';
import RouteController from 'components/RouteController/RouteController';

function App() {
  const dispatch = useDispatch();
  const token = localStorage.getItem('tm-token');
  const user = useSelector((state) => state.user);
  const message = useSelector((state) => state.message);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) return;
    UserApi.getUser()
      .then((userInfo) => {
        dispatch(setUser(userInfo.data));
      })
      .catch((error) => {
        localStorage.removeItem('tm-token');
        dispatch(setMessage(getErrorMessage(error)));
        dispatch(setUser({}));
      });
  }, [dispatch, token]);

  useEffect(() => {
    if (localStorage.getItem('tm-token') && !user.username) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (!message) return;
    const timerId = setTimeout(() => {
      dispatch(setMessage(''));
    }, 5000);

    return () => {
      clearTimeout(timerId);
    };
  }, [message, dispatch]);

  // todo: change the message to a popup so it'll be visible on vertical screens like phones
  // cause it is appearing on the top, but if the user has scrolled to the bottom of the page
  // it'll be not visible

  return (
    <div className='app'>
      {!loading ? (
        <Router>
          <Navigation />
          <Container>
            {message && message instanceof Array ? (
              message.map((msg) => (
                <p key={msg} className='message'>
                  {msg}
                </p>
              ))
            ) : (
              <p className='message'>{message}</p>
            )}
          </Container>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route
              path='/user'
              element={
                <RouteController>
                  <User />
                </RouteController>
              }
            />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route
              path='/create-todo'
              element={
                <RouteController>
                  <CreateTodo />
                </RouteController>
              }
            />
          </Routes>
        </Router>
      ) : (
        <Container>
          <div>Loading...</div>
        </Container>
      )}
    </div>
  );
}

export default App;
