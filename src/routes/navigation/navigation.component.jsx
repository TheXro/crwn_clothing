import { Outlet, Link } from "react-router-dom";
import './navigation.styles.scss';
const Navigation = () => {
  return (
    <>
      <div className='navigation'>
        <Link to='/' className='logo-container'>
          <div><img src="src/routes/navigation/crown.svg" alt="" /></div>
        </Link>
        <div className='nav-links-container'>
          <Link to='/' className="nav-link">Home</Link>
          <Link to='/signIn' className="nav-link">Sign In</Link>
          <Link to='/shop' className="nav-link">Shop</Link>
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default Navigation;
