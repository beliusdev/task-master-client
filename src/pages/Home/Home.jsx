import Container from 'components/Container/Container';
import Heading from 'components/Heading/Heading';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import TodoApi from 'api/TodoApi';
import { setTodos, setMessage } from 'state';
import Todo from 'components/Todo/Todo';
import Button from 'components/Button/Button';
import getErrorMessage from 'utils/getErrorMessage';
import introPageImage from '../../assets/intro-page-image.avif';

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
                  Streamline your daily to-do's with Task Master - the ultimate
                  task management tool
                </Heading>
                <p>
                  Welcome to our task management app! Here, you can easily
                  create and complete tasks on a daily basis. Sign up or sign in
                  to start organizing your day. Create tasks, mark them as
                  complete, or delete them. With our app, you'll be able to stay
                  on top of your to-do list and make the most of your day. Try
                  it out now!
                </p>
                <Button to='/register'>Start Now &rarr;</Button>
              </div>
              <img className='home__image' src={introPageImage} alt='Goals' />
            </div>
          </>
        ) : todos ? (
          <>
            <Heading type='secondary'>To-do's</Heading>
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
