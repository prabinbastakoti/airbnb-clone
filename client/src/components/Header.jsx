import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const menu = useRef(null);

  const closeMenu = (e) => {
    if (menu.current && openMenu && !menu.current.contains(e.target)) {
      setOpenMenu(false);
    }
  };
  document.addEventListener('mousedown', closeMenu);

  return (
    <div>
      <header className="p-4 flex items-center justify-between">
        <Link to={'/'} className="flex items-center gap-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-8 h-8 -rotate-90"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
            />
          </svg>
          <span className="font-bold text-xl">airbnb</span>
        </Link>
        <div className="flex gap-2 border border-gray-300 rounded-full py-2 px-4 shadow-md shadow-gray-150">
          <div>Anywhere</div>
          <div className="border-l border-gray-300"></div>
          <div>Any Week</div>
          <div className="border-l border-gray-300"></div>
          <div>Add guests</div>
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
        <div
          onClick={() => setOpenMenu(!openMenu)}
          className="flex items-center gap-2 border border-gray-300 rounded-full py-2 px-4 cursor-pointer hover:shadow-md shadow-gray-150"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
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
              className="w-6 h-6 relative top-1"
            >
              <path
                fillRule="evenodd"
                d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
        {openMenu && (
          <div
            ref={menu}
            className="absolute border border-gray-300 mt-4 shadow-md shadow-gray-150 top-14 right-5 rounded-xl bg-white"
          >
            <Link to={'/signup'}>
              <div className="pl-6 pr-14 py-1.5 my-2.5 cursor-pointer hover:bg-gray-100 font-medium text-sm">
                Sign up
              </div>
            </Link>
            <Link to={'/login'}>
              <div className="pl-6 pr-14 py-1.5 my-2.5 cursor-pointer hover:bg-gray-100 font-normal text-sm">
                Log in
              </div>
            </Link>
            <div className="border-b border-gray-300 my-3"></div>
            <div className="pl-6 pr-14 py-1.5 my-2.5 cursor-pointer hover:bg-gray-100 text-sm">
              Airbnb your home
            </div>
            <div className="pl-6 pr-14 py-1.5 my-2.5 cursor-pointer hover:bg-gray-100 text-sm">
              Help center
            </div>
          </div>
        )}
      </header>
    </div>
  );
};

export default Header;