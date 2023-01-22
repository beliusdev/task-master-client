import UserApi from 'api/UserApi';
import Button from 'components/Button/Button';
import Container from 'components/Container/Container';
import Heading from 'components/Heading/Heading';
import moment from 'moment/moment';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import { setMessage, setTodos, setUser } from 'state';
import getErrorMessage from 'utils/getErrorMessage';

// todo: make the user info be in a card or look like a table or something
function User() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const todos = useSelector((state) => state.todos);

  const deleteUser = async () => {
    try {
      const password = window.prompt(
        'All todos will be deleted. Do you want to delete your account?\n\nPassword:'
      );
      if (!password) return;
      await UserApi.deleteUser(password);
      localStorage.removeItem('tm-token');
      dispatch(setUser({}));
      dispatch(setTodos(null));
      navigate('/');
    } catch (error) {
      dispatch(setMessage(getErrorMessage(error)));
    }
  };

  return user && todos ? (
    <div className='user'>
      <Container>
        <Heading type='secondary'>{user.username}</Heading>
        <p>{user.email}</p>
        <p>{moment(user.createdAt).locale('en-ca').format('LL')}</p>
        <p>Todos: {todos.length}</p>
        <Button type='red' onClick={deleteUser}>
          Delete User
        </Button>
      </Container>
    </div>
  ) : (
    <Navigate to='/' />
  );
}

export default User;
