import Form from 'components/Form/Form';
import { useState } from 'react';
import TodoApi from 'api/TodoApi';
import { useDispatch, useSelector } from 'react-redux';
import { setMessage, setTodos } from 'state';
import { useNavigate } from 'react-router-dom';
import getErrorMessage from 'utils/getErrorMessage';
import Container from 'components/Container/Container';
import Heading from 'components/Heading/Heading';

function CreateTodo() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const todos = useSelector((state) => state.todos);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await TodoApi.createTodo({ title, description });
      dispatch(setTodos(!todos ? [response.data] : [...todos, response.data]));
      navigate('/');
    } catch (error) {
      dispatch(setMessage(getErrorMessage(error)));
    }
  };

  return (
    <div className='create-todo'>
      <Container>
        <Heading type='secondary'>Create To-do</Heading>
        <Form onSubmit={handleSubmit}>
          <input
            type='text'
            placeholder='Title'
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <textarea
            placeholder='Description'
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>

          <button type='submit'>Create</button>
        </Form>
      </Container>
    </div>
  );
}

export default CreateTodo;
