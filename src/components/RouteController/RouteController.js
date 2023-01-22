import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { setMessage } from 'state';

function RouteController({ children }) {
  const dispatch = useDispatch();
  const isAuth = Boolean(useSelector((state) => state.user.username));

  useEffect(() => {
    !isAuth && dispatch(setMessage('Please sign in to access the page.'));
  }, [dispatch, isAuth]);

  return isAuth ? children : <Navigate to='/login' />;
}

export default RouteController;
