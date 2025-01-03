// import { NavLink } from "react-router-dom";
// import { FaBars, FaHome, FaLock, FaMoneyBill, FaUser } from "react-icons/fa";
// import { MdMessage } from "react-icons/md";
// import { BiAnalyse, BiSearch } from "react-icons/bi";
// import { BiCog } from "react-icons/bi";
// import { AiFillHeart, AiTwotoneFileExclamation } from "react-icons/ai";
// import { BsCartCheck } from "react-icons/bs";
// import { useState } from "react";
// import { AnimatePresence, motion } from "framer-motion";
// import SidebarMenu from "./SidebarMenu";
// const routes = [
//   {
//     path: "/",
//     name: "Dashboard",
//     icon: <FaHome />,
//   },
//   {
//     path: "/users",
//     name: "Users",
//     icon: <FaUser />,
//   },
//   {
//     path: "/messages",
//     name: "Messages",
//     icon: <MdMessage />,
//   },
//   {
//     path: "/analytics",
//     name: "Analytics",
//     icon: <BiAnalyse />,
//   },
//   {
//     path: "/file-manager",
//     name: "File Manager",
//     icon: <AiTwotoneFileExclamation />,
//     subRoutes: [
//       {
//         path: "/settings/profile",
//         name: "Profile ",
//         icon: <FaUser />,
//       },
//       {
//         path: "/settings/2fa",
//         name: "2FA",
//         icon: <FaLock />,
//       },
//       {
//         path: "/settings/billing",
//         name: "Billing",
//         icon: <FaMoneyBill />,
//       },
//     ],
//   },
//   {
//     path: "/order",
//     name: "Order",
//     icon: <BsCartCheck />,
//   },
//   {
//     path: "/settings",
//     name: "Settings",
//     icon: <BiCog />,
//     exact: true,
//     subRoutes: [
//       {
//         path: "/settings/profile",
//         name: "Profile ",
//         icon: <FaUser />,
//       },
//       {
//         path: "/settings/2fa",
//         name: "2FA",
//         icon: <FaLock />,
//       },
//       {
//         path: "/settings/billing",
//         name: "Billing",
//         icon: <FaMoneyBill />,
//       },
//     ],
//   },
//   {
//     path: "/saved",
//     name: "Saved",
//     icon: <AiFillHeart />,
//   },
// ];

// const SideBar = ({ children }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const toggle = () => setIsOpen(!isOpen);
//   const inputAnimation = {
//     hidden: {
//       width: 0,
//       padding: 0,
//       transition: {
//         duration: 0.2,
//       },
//     },
//     show: {
//       width: "140px",
//       padding: "5px 15px",
//       transition: {
//         duration: 0.2,
//       },
//     },
//   };

//   const showAnimation = {
//     hidden: {
//       width: 0,
//       opacity: 0,
//       transition: {
//         duration: 0.5,
//       },
//     },
//     show: {
//       opacity: 1,
//       width: "auto",
//       transition: {
//         duration: 0.5,
//       },
//     },
//   };

//   return (
//     <>
//       <div className="main-container">
//         <motion.div
//           animate={{
//             width: isOpen ? "200px" : "45px",

//             transition: {
//               duration: 0.5,
//               type: "spring",
//               damping: 10,
//             },
//           }}
//           className={`sidebar `}
//         >
//           <div className="top_section">
//             <AnimatePresence>
//               {isOpen && (
//                 <motion.h1
//                   variants={showAnimation}
//                   initial="hidden"
//                   animate="show"
//                   exit="hidden"
//                   className="logo"
//                 >
//                   DoSomeCoding
//                 </motion.h1>
//               )}
//             </AnimatePresence>

//             <div className="bars">
//               <FaBars onClick={toggle} />
//             </div>
//           </div>
//           <div className="search">
//             <div className="search_icon">
//               <BiSearch />
//             </div>
//             <AnimatePresence>
//               {isOpen && (
//                 <motion.input
//                   initial="hidden"
//                   animate="show"
//                   exit="hidden"
//                   variants={inputAnimation}
//                   type="text"
//                   placeholder="Search"
//                 />
//               )}
//             </AnimatePresence>
//           </div>
//           <section className="routes">
//             {routes.map((route, index) => {
//               if (route.subRoutes) {
//                 return (
//                   <SidebarMenu
//                     setIsOpen={setIsOpen}
//                     route={route}
//                     showAnimation={showAnimation}
//                     isOpen={isOpen}
//                   />
//                 );
//               }

//               return (
//                 <NavLink
//                   to={route.path}
//                   key={index}
//                   className="link"
//                   activeClassName="active"
//                 >
//                   <div className="icon">{route.icon}</div>
//                   <AnimatePresence>
//                     {isOpen && (
//                       <motion.div
//                         variants={showAnimation}
//                         initial="hidden"
//                         animate="show"
//                         exit="hidden"
//                         className="link_text"
//                       >
//                         {route.name}
//                       </motion.div>
//                     )}
//                   </AnimatePresence>
//                 </NavLink>
//               );
//             })}
//           </section>
//         </motion.div>

//         <main>{children}</main>
//       </div>
//     </>
//   );
// };

// export default SideBar;



import React, { useState, useEffect } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { LogOut, reset } from '../features/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useSidebarContext } from '../features/SidebarContext';
import icon from '../assets/icon.png';
import styled from 'styled-components';

// Styled Components
const SidebarSection = styled.section`
  background: #f9f9f9;
  height: 100vh;
  width: 240px;
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  left: ${({ isSidebarHidden }) => (isSidebarHidden ? '-100%' : '0')};
  transition: 350ms;
  z-index: 10;
  overflow-y: auto;
`;

const SidebarHeader = styled(NavLink)`
  display: flex;
  align-items: center;
  padding: 20px;
  background: #f9f9f9;
  color: #0f172a;
  text-decoration: none;

  img {
    width: 50px;
    height: 50px;
    margin: 20px 15px 15px 18px;
  }

  span {
    font-family: 'Times New Roman', Times, serif;
    margin-left: 10px;
    font-size: 20px;
  }
`;

const SidebarMenu = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  

`;

const SidebarMenuItem = styled.li`
  background: ${({ active }) => (active ? '#d2a0ff' : 'transparent')};
  border-left: ${({ active }) => (active ? '4px solid #632ce4' : 'none')};
      border-radius: ${({ active }) => (active ? '10px' : '0')}; // Apply border-radius to active items

  a {
    display: flex;
    align-items: center;
    margin-left: 10px;
    padding: 10px;
    color: #15171c;
    text-decoration: none;
    font-size: 18px;
    border-radius: ${({ active }) => (active ? '10px' : '0')}; // Apply border-radius to active items

    &:hover {
      background: rgb(237, 231, 246);
      border-left: 4px solid #632ce4;
      border-radius:10px;
    }
  }
`;

const DropdownMenu = styled.ul`
  list-style: none;
  padding-left: 1rem;
  margin: 0;
  max-height: ${({ isOpen }) => (isOpen ? '200px' : '0')};
  overflow: hidden;
  transition: max-height 0.3s ease-in-out;

  li {
    background: ${({ active }) => (active ? 'rgb(237, 231, 246)' : 'transparent')};
    border-left: ${({ active }) => (active ? '4px solid #632ce4' : 'none')};
      border-radius: ${({ active }) => (active ? '10px' : '0')}; // Apply border-radius to active items

    
    a {
      padding: 10px;
      color: ${({ active }) => (active ? '#632ce4' : '#15171c')};
      text-decoration: none;
      font-size: 16px;
          border-radius: ${({ active }) => (active ? '10px' : '0')}; // Apply border-radius to links


      &:hover {
        background: #632ce4;
        color: #fff;
              border-radius:10px;

      }
    }
  }
`;

// Sidebar Component
const Sidebar = () => {
  const location = useLocation();
  const [activeItem, setActiveItem] = useState(null);
  const [dropdowns, setDropdowns] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userRole = useSelector(state => state.auth.user?.role);
  const { isSidebarHidden, toggleSidebar } = useSidebarContext();

  useEffect(() => {
    const pathMap = {
      '/dashboard': 'dashboard',
      '/myProfile': 'myprofile',
      '/courses/viewcourses': 'viewcourses',
      '/courses/add': 'addcourse',
      '/users/view': 'viewusers',
      '/users/add': 'adduser',
      '/payments/view': 'viewpayments',
      '/payments/add': 'addpayment',
      '/student/register': 'registerstudent',
      '/student/viewinfo': 'viewstudentinfo',
      '/contacts': 'contacts',
      '/settings': 'settings',
      '/logout': 'logout'
    };
    const currentPath = location.pathname;
    setActiveItem(pathMap[currentPath] || null);

    // Open the corresponding dropdown if a sub-item is active
    const dropdownMap = {
      courses: ['/courses/viewcourses', '/courses/add'],
      users: ['/users/view', '/users/add'],
      payments: ['/payments/view', '/payments/add'],
      student: ['/student/register', '/student/viewinfo']
    };

    Object.keys(dropdownMap).forEach((key) => {
      if (dropdownMap[key].includes(currentPath)) {
        setDropdowns((prevDropdowns) => ({
          ...prevDropdowns,
          [key]: true,
        }));
      }
    });
  }, [location.pathname]);

  const toggleDropdown = (menu) => {
    setDropdowns((prevDropdowns) => ({
      ...prevDropdowns,
      [menu]: !prevDropdowns[menu],
    }));
  };

  const logout = () => {
    dispatch(LogOut());
    dispatch(reset());
    navigate('/');
  };

  const handleNavLinkClick = () => {
    if (window.innerWidth <= 767) {
      toggleSidebar();
    }
  };

  return (
    <SidebarSection isSidebarHidden={isSidebarHidden}>
      <SidebarHeader to={userRole === 'student' ? '/studentdashboard' : '/dashboard'}>
        <img src={icon} alt="Icon" />
        <span>YuvaTech</span>
      </SidebarHeader>
      <SidebarMenu>
        <SidebarMenuItem active={activeItem === 'dashboard'}>
          <NavLink to={userRole === 'student' ? '/studentdashboard' : '/dashboard'} onClick={handleNavLinkClick}>
            <i className='bx bxs-dashboard'></i>
            <span>Dashboard</span>
          </NavLink>
        </SidebarMenuItem>

        {/* Courses Dropdown */}
        <SidebarMenuItem>
          <NavLink to="#" onClick={() => toggleDropdown('courses')}>
            <i className='bx bxs-shopping-bag-alt'></i>
            <span>Courses</span>
            <i className={`bx ${dropdowns['courses'] ? 'bx-chevron-up' : 'bx-chevron-down'}`}></i>
          </NavLink>
          <DropdownMenu isOpen={dropdowns['courses']}>
  <li>
    <NavLink 
      to="/courses/viewcourses" 
      onClick={handleNavLinkClick}
      style={{ background: activeItem === 'viewcourses' ? '#d2a0ff' : 'transparent' }}
    >
      View Courses
    </NavLink>
    {console.log('View Courses active:', activeItem === 'viewcourses')}
  </li>
  <li>
    <NavLink 
      to="/courses/add" 
      onClick={handleNavLinkClick}
      style={{ background: activeItem === 'addcourse' ? '#d2a0ff' : 'transparent' }}
    >
      Add Course
    </NavLink>
    {console.log('Add Course active:', activeItem === 'addcourse')}
  </li>
</DropdownMenu>

        </SidebarMenuItem>

        {/* Users Dropdown */}
        <SidebarMenuItem>
          <NavLink to="#" onClick={() => toggleDropdown('users')}>
            <i className='bx bxs-group'></i>
            <span>Users</span>
            <i className={`bx ${dropdowns['users'] ? 'bx-chevron-up' : 'bx-chevron-down'}`}></i>
          </NavLink>
          <DropdownMenu isOpen={dropdowns['users']}>
            <li active={activeItem === 'viewusers'}>
              <NavLink to="/users/view" onClick={handleNavLinkClick}>View Users</NavLink>
            </li>
            <li active={activeItem === 'adduser'}>
              <NavLink to="/users/add" onClick={handleNavLinkClick}>Add User</NavLink>
            </li>
          </DropdownMenu>
        </SidebarMenuItem>

        {/* Payments Dropdown */}
        <SidebarMenuItem>
          <NavLink to="#" onClick={() => toggleDropdown('payments')}>
            <i className='bx bxs-credit-card'></i>
            <span>Payments</span>
            <i className={`bx ${dropdowns['payments'] ? 'bx-chevron-up' : 'bx-chevron-down'}`}></i>
          </NavLink>
          <DropdownMenu isOpen={dropdowns['payments']}>
            <li active={activeItem === 'viewpayments'}>
              <NavLink to="/payments/view" onClick={handleNavLinkClick}>View Payments</NavLink>
            </li>
            <li active={activeItem === 'addpayment'}>
              <NavLink to="/payments/add" onClick={handleNavLinkClick}>Add Payment</NavLink>
            </li>
          </DropdownMenu>
        </SidebarMenuItem>

        {/* Student Dropdown */}
        <SidebarMenuItem>
          <NavLink to="#" onClick={() => toggleDropdown('student')}>
            <i className='bx bxs-doughnut-chart'></i>
            <span>Student</span>
            <i className={`bx ${dropdowns['student'] ? 'bx-chevron-up' : 'bx-chevron-down'}`}></i>
          </NavLink>
          <DropdownMenu isOpen={dropdowns['student']}>
            <li active={activeItem === 'registerstudent'}>
              <NavLink to="/student/register" onClick={handleNavLinkClick}>Register</NavLink>
            </li>
            <li active={activeItem === 'viewstudentinfo'}>
              <NavLink to="/student/viewinfo" onClick={handleNavLinkClick}>View Info</NavLink>
            </li>
          </DropdownMenu>
        </SidebarMenuItem>

        <SidebarMenuItem>
          <NavLink onClick={logout}>
            <i className='bx bxs-log-out-circle'></i>
            <span>Logout</span>
          </NavLink>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarSection>
  );
};

export default Sidebar;
