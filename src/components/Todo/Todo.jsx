import TodoApi from 'api/TodoApi';
import { useDispatch, useSelector } from 'react-redux';
import { setTodos, setMessage } from 'state';
import getErrorMessage from 'utils/getErrorMessage';
import Button from 'components/Button/Button';

import moment from 'moment/moment';

function Todo({ todo }) {
  const dispatch = useDispatch();
  let todos = useSelector((state) => state.todos);

  const complete = async () => {
    try {
      const response = await TodoApi.complete(todo._id);
      const tasks = todos && todos.filter((t) => t._id !== todo._id);
      dispatch(setTodos(tasks ? [...tasks, response.data] : [response.data]));
    } catch (error) {
      dispatch(setMessage(getErrorMessage(error)));
    }
  };

  const remove = async () => {
    try {
      const tasks = todos && todos.filter((t) => t._id !== todo._id);
      await TodoApi.deleteTodo(todo._id);
      dispatch(setTodos([...tasks]));
    } catch (error) {
      dispatch(setMessage(getErrorMessage(error)));
    }
  };

  // todo: make a task require a confirmation before the deletion process
  return (
    <div className={`todo ${todo.isCompleted ? 'todo--completed' : ''}`}>
      <h4 className='todo__title'>{todo.title}</h4>
      <p className='todo__description'>{todo.description}</p>
      <div className='todo__buttons'>
        <Button onClick={complete}>
          {todo.isCompleted ? 'Undo' : 'Complete'}
        </Button>
        <Button type='red' onClick={remove}>
          Delete
        </Button>
        {moment(todo.createdAt).locale('en-ca').format('LL')}
      </div>
    </div>
  );
}

export default Todo;
