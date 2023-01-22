import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setTodos, setUser } from 'state';
import Logo from 'components/Logo/Logo';
import Container from 'components/Container/Container';
import { useState } from 'react';

import common from '../../styles/common.scss';

/* eslint-disable jsx-a11y/anchor-is-valid */
function Navigation() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [isMenuOpened, setIsMenuOpened] = useState(false);
  const bpSmall = Number(common.bpSmall.replace('px', ''));

  window.onresize = () => setScreenWidth(window.innerWidth);

  const navigationItems = user.username
    ? {
        todos: '/',
        'create todo': '/create-todo',
        [user.username]: '/user',
      }
    : { home: '/', login: '/login', register: '/register' };

  const handleLogout = () => {
    localStorage.removeItem('tm-token');
    dispatch(setUser({}));
    dispatch(setTodos(null));
    navigate('/');
  };

  const logoutComponent = (
    <a
      className='navigation__item'
      onClick={() => {
        handleLogout();
        setIsMenuOpened(false);
      }}
    >
      Log Out
    </a>
  );

  return (
    <div className='navigation'>
      <Container>
        <Logo />
        {screenWidth < bpSmall ? (
          <>
            <div
              className={`navigation__icon ${
                isMenuOpened ? 'navigation__icon--opened' : ''
              }`}
              onClick={() => setIsMenuOpened(!isMenuOpened)}
            >
              <div></div>
            </div>
            {isMenuOpened && (
              <ul className='navigation__list'>
                {Object.entries(navigationItems).map(([key, value]) => (
                  <NavLink
                    key={key}
                    activeclassname='active'
                    className='navigation__item'
                    onClick={() => setIsMenuOpened(false)}
                    to={value}
                  >
                    {key}
                  </NavLink>
                ))}
                {user.username && logoutComponent}
              </ul>
            )}
          </>
        ) : (
          <ul className='navigation__list'>
            {Object.entries(navigationItems).map(([key, value]) => (
              <NavLink
                key={key}
                activeclassname='active'
                className='navigation__item'
                to={value}
              >
                {key}
              </NavLink>
            ))}
            {user.username && logoutComponent}
          </ul>
        )}
      </Container>
    </div>
  );
}

export default Navigation;
