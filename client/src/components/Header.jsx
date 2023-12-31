import { useState, useRef, useEffect, useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Logo from '../assets/logo.svg';
import { AuthContext } from '../context/AuthContext';
import authService from '../services/authService';

const Header = ({ type }) => {
  const [openMenu, setOpenMenu] = useState(false);
  const { pathname } = useLocation();
  const menu = useRef(null);
  const elRef = useRef(null);
  const [el, setEl] = useState(null);
  const { user, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    setEl(elRef.current);
  }, []);

  useEffect(() => {
    setOpenMenu(false);
  }, [pathname]);

  const handleLogout = async () => {
    await authService.logout();
    dispatch({ type: 'LOGOUT' });
    navigate('/', { replace: true });
    setOpenMenu(false);
  };

  const closeMenu = (e) => {
    if (menu.current && openMenu && !menu.current.contains(e.target)) {
      if (el.contains(e.target)) {
        setOpenMenu(true);
      } else {
        setOpenMenu(false);
      }
    }
  };
  document.addEventListener('mousedown', closeMenu);

  let menuClassName =
    'hidden md:flex gap-2 border border-gray-300 rounded-full py-2 px-4 shadow-md shadow-gray-150';

  if (type === 'home') {
    menuClassName += ' lg:ml-28';
  }

  return (
    <div>
      <header className="flex items-center justify-between">
        <Link to={'/'} className="flex items-center gap-1">
          <img src={Logo} className="w-8 h-8 sm:w-9 sm:h-9" />
          <span className="font-bold text-xl sm:text-2xl text-primary">
            airbnb
          </span>
        </Link>
        <div className={menuClassName}>
          <div>Anywhere</div>
          <div className="border-l border-gray-300 "></div>
          <div>Any Week</div>
          <div className="border-l border-gray-300"></div>
          <div>Add Guests</div>
          <button className="bg-primary text-white p-1 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </button>
        </div>
        <div className="flex items-center gap-5">
          {type === 'home' && (
            <div className="hidden lg:flex gap-3 items-center">
              <div className="font-medium text-sm hover:bg-gray-100 px-4 py-2 rounded-full cursor-pointer">
                Airbnb your home
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5  sm:w-6 sm:h-6 cursor-pointer"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"
                />
              </svg>
            </div>
          )}
          <div
            ref={elRef}
            onClick={() => setOpenMenu(!openMenu)}
            className="flex relative items-center gap-2 border border-gray-300 rounded-full py-2 px-4 cursor-pointer hover:shadow-md shadow-gray-150"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5 sm:w-6 sm:h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
            <div className="bg-gray-500 text-white rounded-full border border-gray-500 overflow-hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5 sm:w-6 sm:h-6 relative top-1"
              >
                <path
                  fillRule="evenodd"
                  d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            {openMenu && (
              <div
                ref={menu}
                className="z-50 absolute top-9 w-52 border border-gray-300 mt-4 shadow-md shadow-gray-150  right-5 rounded-xl bg-white"
              >
                {user && (
                  <Link to={'/profile'}>
                    <div className="pl-6 pr-14 py-1.5 my-2.5 cursor-pointer hover:bg-gray-100 font-normal text-sm">
                      Profile
                    </div>
                  </Link>
                )}
                {!user && (
                  <Link to={'/signup'}>
                    <div className="pl-6 pr-14 py-1.5 my-2.5 cursor-pointer hover:bg-gray-100 font-medium text-sm">
                      Sign up
                    </div>
                  </Link>
                )}
                {!user && (
                  <Link to={'/login'}>
                    <div className="pl-6 pr-14 py-1.5 my-2.5 cursor-pointer hover:bg-gray-100 font-normal text-sm">
                      Log in
                    </div>
                  </Link>
                )}
                {!user && <div className="border-b border-gray-300 my-3"></div>}
                <div className="pl-6 pr-14 py-1.5 my-2.5 cursor-pointer hover:bg-gray-100 text-sm">
                  Airbnb your home
                </div>
                <div className="pl-6 pr-14 py-1.5 my-2.5 cursor-pointer hover:bg-gray-100 text-sm">
                  Help center
                </div>
                {user && (
                  <div
                    className="pl-6 pr-14 py-1.5 my-2.5 cursor-pointer hover:bg-gray-100 font-normal text-sm"
                    onClick={handleLogout}
                  >
                    Logout
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
