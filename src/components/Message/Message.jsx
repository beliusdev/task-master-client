import { useEffect } from 'react';
import { setMessage } from 'state';
import { useSelector, useDispatch } from 'react-redux';

import Container from 'components/Container/Container';

function Message() {
  const dispatch = useDispatch();
  const message = useSelector((state) => state.message);

  useEffect(() => {
    if (!message) return;
    const timerId = setTimeout(() => {
      dispatch(setMessage(''));
    }, 6000);

    return () => {
      clearTimeout(timerId);
    };
  }, [message, dispatch]);

  return (
    message && (
      <div className='message'>
        <Container>
          {message instanceof Array ? (
            message.map((msg) => (
              <p key={msg} className='message__item'>
                {msg}
              </p>
            ))
          ) : (
            <p className='message__item'>{message}</p>
          )}
        </Container>
      </div>
    )
  );
}

export default Message;
