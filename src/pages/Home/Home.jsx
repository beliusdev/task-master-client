import Container from 'components/Container/Container';
import Heading from 'components/Heading/Heading';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import TodoApi from 'api/TodoApi';
import { setTodos, setMessage } from 'state';
import Todo from 'components/Todo/Todo';
import Button from 'components/Button/Button';
import getErrorMessage from 'utils/getErrorMessage';

function Home() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const todos = useSelector((state) => state.todos);

  useEffect(() => {
    if (todos || !user.username) return;
    TodoApi.getTodos()
      .then((data) => {
        dispatch(setTodos(data.data));
      })
      .catch((error) => {
        dispatch(setMessage(getErrorMessage(error)));
      });
  }, [dispatch, todos, user.username]);

  return (
    <div className='home'>
      <Container>
        {!user.username ? (
          <>
            <Heading type='primary'>Task Master</Heading>
            <div className='home__about'>
              <div className='home__info-box'>
                <Heading type='small'>
                  Some text here longer longer longer bit longer a little more
                </Heading>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Quaerat, aliquam. Deserunt eius molestiae quisquam placeat,
                  facere ratione eum consectetur, blanditiis quaerat, soluta
                  facilis quia obcaecati nulla excepturi unde. Quo, labore?
                </p>
                <Button to='/register'>Start Now &rarr;</Button>
              </div>
              <img
                className='home__image'
                src='https://images.unsplash.com/photo-1513102419401-0cc6054c8127?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
                alt='Goals'
              />
            </div>
          </>
        ) : todos ? (
          <>
            <Heading type='secondary'>Todos</Heading>
            <div className='todos'>
              <p className='todos__completed'>
                {todos.filter((todo) => todo.isCompleted).length}/{todos.length}
              </p>
              <div className='todos__box'>
                {todos.map((todo) => (
                  <Todo key={todo._id} todo={todo} />
                ))}
              </div>
            </div>
          </>
        ) : (
          <div>Loading tasks...</div>
        )}
      </Container>
    </div>
  );
}

export default Home;
