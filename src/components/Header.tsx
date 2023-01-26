import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import './style.css';

const Header = () => {
   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
   const [sidebarWidth, setSidebarWidth] = useState('0');

   const navigate = useNavigate();

   const closSidebar = () => {
      setSidebarWidth('0');
   };

   const openSidebar = () => {
      setSidebarWidth('250px');
   };

   const logout = () => {
      localStorage.removeItem('AuthToken');
      setSidebarWidth('0');
      // navigate('/login')
   };

   return (
      <>
         <nav
            className="navbar navbar-expand-lg bg-dark navbar-dark py-3 fixed-top px-3"
            id="top-nav"
         >
            <div className="container">
               <i className="bi bi-list menu-icon" onClick={openSidebar}></i>
               <Link to={'/'} className="navbar-brand">
                  Restaurant Admin Panel
               </Link>
            </div>
         </nav>
         <div style={{ width: '100%', height: '80px', display: 'block' }}></div>
         <div
            id="mySideNav"
            className="sideNav"
            style={{ width: sidebarWidth }}
         >
            <button className="btn-close mx-auto" onClick={closSidebar}>
               &times;
            </button>
            
            <Link to={'/admin/my-restaurant'} onClick={closSidebar}>
               My Restaurant
            </Link>
            <hr style={{ color: '#fff' }} />
            <Link to={'/admin/add-food'} onClick={closSidebar}>
               Add Food To My Restaurant
            </Link>
            <hr style={{ color: '#fff' }} />
            <Link to={'/admin/foods'} onClick={closSidebar}>
               Foods
            </Link>
            <hr style={{ color: '#fff' }} />
            <Link to={'/admin/orders'} onClick={closSidebar}>
               Order List
            </Link>
            <hr style={{ color: '#fff' }} />
            <Link to={'/admin/add-restaurant'} onClick={closSidebar}>
               Add Restaurant
            </Link>
            <hr style={{ color: '#fff' }} />
            <Link to={'/login'} onClick={logout}>
               Log out
            </Link>
         </div>
      </>
   );
};

export default Header;
