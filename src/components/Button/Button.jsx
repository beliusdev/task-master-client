import { Link } from 'react-router-dom';

function Button({ type, to, children, onClick }) {
  return (
    <Link
      to={to ? to : ''}
      onClick={onClick && onClick}
      className={`button ${type ? 'button--' + type : ''}`}
    >
      {children}
    </Link>
  );
}

export default Button;
