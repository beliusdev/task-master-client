import { Link } from 'react-router-dom';

function Logo() {
  return (
    <Link className='logo' to='/'>
      <h3>Task Master</h3>
    </Link>
  );
}

export default Logo;
