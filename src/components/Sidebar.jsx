
// import React, { useState, useEffect } from 'react';
// import { NavLink, useLocation, useNavigate } from 'react-router-dom';
// import { LogOut, reset } from '../features/authSlice';
// import { useDispatch, useSelector } from 'react-redux';
// import { useSidebarContext } from '../features/SidebarContext';
// import icon from '../assets/icon.png';
// import styled from 'styled-components';

// // Styled Components
// const SidebarSection = styled.section`
//   background: #f9f9f9;
//   height: 100vh;
//   width: 240px;
//   display: flex;
//   flex-direction: column;
//   position: fixed;
//   top: 0;
//   left: ${({ isSidebarHidden }) => (isSidebarHidden ? '-100%' : '0')};
//   transition: 350ms;
//   z-index: 10;
//   overflow-y: auto;
// `;

// const SidebarHeader = styled(NavLink)`
//   display: flex;
//   align-items: center;
//   padding: 20px;
//   background: #f9f9f9;
//   color: #0f172a;
//   text-decoration: none;

//   img {
//     width: 50px;
//     height: 50px;
//     margin: 20px 15px 15px 18px;
//   }

//   span {
//     font-family: 'Times New Roman', Times, serif;
//     margin-left: 10px;
//     font-size: 20px;
//   }
// `;

// const SidebarMenu = styled.ul`
//   list-style: none;
//   padding: 0;
//   margin: 0;
  

// `;

// const SidebarMenuItem = styled.li`
//   background: ${({ active }) => (active ? '#d2a0ff' : 'transparent')};
//   border-left: ${({ active }) => (active ? '4px solid #632ce4' : 'none')};
//       border-radius: ${({ active }) => (active ? '10px' : '0')}; // Apply border-radius to active items

//   a {
//     display: flex;
//     align-items: center;
//     margin-left: 10px;
//     padding: 10px;
//     color: #15171c;
//     text-decoration: none;
//     font-size: 18px;
//     border-radius: ${({ active }) => (active ? '10px' : '0')}; // Apply border-radius to active items

//     &:hover {
//       background: rgb(237, 231, 246);
//       border-left: 4px solid #632ce4;
//       border-radius:10px;
//     }
//   }
// `;

// const DropdownMenu = styled.ul`
//   list-style: none;
//   padding-left: 1rem;
//   margin: 0;
//   max-height: ${({ isOpen }) => (isOpen ? '200px' : '0')};
//   overflow: hidden;
//   transition: max-height 0.3s ease-in-out;

//   li {
//     background: ${({ active }) => (active ? 'rgb(237, 231, 246)' : 'transparent')};
//     border-left: ${({ active }) => (active ? '4px solid #632ce4' : 'none')};
//       border-radius: ${({ active }) => (active ? '10px' : '0')}; // Apply border-radius to active items

    
//     a {
//       padding: 10px;
//       color: ${({ active }) => (active ? '#632ce4' : '#15171c')};
//       text-decoration: none;
//       font-size: 16px;
//           border-radius: ${({ active }) => (active ? '10px' : '0')}; // Apply border-radius to links


//       &:hover {
//         background: #632ce4;
//         color: #fff;
//               border-radius:10px;

//       }
//     }
//   }
// `;

// // Sidebar Component
// const Sidebar = () => {
//   const location = useLocation();
//   const [activeItem, setActiveItem] = useState('dashboard');
//   const [subnav, setSubnav] = useState({});
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//     const [dropdowns, setDropdowns] = useState({});

//   const userRole = useSelector(state => state.auth.user?.role);
//   const { isSidebarHidden, toggleSidebar } = useSidebarContext();
//   const [isEnquiryDropdownOpen, setIsEnquiryDropdownOpen] = useState(false); // State for managing dropdown
//   const toggleEnquiryDropdown = () => {
//     setIsEnquiryDropdownOpen(!isEnquiryDropdownOpen); // Toggle dropdown visibility
//   };
//   useEffect(() => {
//     const pathMap = {
      // '/dashboard': 'dashboard',
      // '/myProfile': 'myprofile',
      // '/courses': 'courses',
      // '/student': 'studentinfo',
      // '/studentinfo': 'studentinfoview',
      // '/courses/viewenrollments': 'viewenrollments',
      // '/courses/add': 'courses',
      // '/courses/edit/:id': 'courses',
      // '/courses/editdocuments/:id': 'courses',
      // '/courses/editdocument/:id': 'courses',
      // '/courses/viewcoursedocuments/:id': 'courses',
      // '/enroll': 'enrollstudent',
      // '/users': 'users',
      // '/payments': 'payments',
      // '/contacts': 'contacts',
      // '/paymentdetails': 'viewpayments',
      // '/settings': 'settings',
      // '/courses/enroll/uploaddocuments': 'uploaddocuments',
      // '/logout': 'logout'
//     };
//     const currentPath = location.pathname;

//     setActiveItem(pathMap[location.pathname] || 'dashboard');
  
//     const dropdownMap = {
//       courses: ['/courses/viewcourses', '/courses/add'],
//       users: ['/users/view', '/users/add'],
//       payments: ['/payments/view', '/payments/add'],
//       student: ['/student/register', '/student/viewinfo']
//     };

//     Object.keys(dropdownMap).forEach((key) => {
//       if (dropdownMap[key].includes(currentPath)) {
//         setDropdowns((prevDropdowns) => ({
//           ...prevDropdowns,
//           [key]: true,
//         }));
//       }
//     });
  
//   }, [location.pathname]);

//   const logout = () => {
//     dispatch(LogOut());
//     dispatch(reset());
//     navigate('/');
//   };

  // const isStudent = () => userRole === 'student';

//   const handleNavLinkClick = () => {
//     if (window.innerWidth <= 767) {
//       toggleSidebar();
//     }
//   };
//   const toggleDropdown = (menu) => {
//     setDropdowns((prevDropdowns) => ({
//       ...prevDropdowns,
//       [menu]: !prevDropdowns[menu],
//     }));
//   };

//   const toggleSubnav = (title) => {
//     setSubnav((prevSubnav) => ({
//       ...prevSubnav,
//       [title]: !prevSubnav[title],
//     }));
//   };

//   return (
//     <SidebarSection isSidebarHidden={isSidebarHidden}>
//       <SidebarHeader to={isStudent() ? '/studentdashboard' : '/dashboard'}>
//         <img src={icon} alt="Icon" />
//         <span>Yuvatech</span>
//       </SidebarHeader>


//       <SidebarMenu>
//         <SidebarMenuItem active={activeItem === 'dashboard'}>
//           <NavLink to={isStudent() ? '/studentdashboard' : '/dashboard'} onClick={handleNavLinkClick}>
//             <i className='bx bxs-dashboard'></i>
//             <span>  Dashboard</span>
//           </NavLink>
//         </SidebarMenuItem>

//         {isStudent() && (
//           <SidebarMenuItem active={activeItem === 'myenrollments'}>
//             <NavLink to="/myEnrollments" onClick={handleNavLinkClick}>
//               <i className='bx bxs-dashboard'></i>
//               <span>My Enrollments</span>
//             </NavLink>
//           </SidebarMenuItem>
//         )}

//         {!isStudent() && (
//           <>
//             <SidebarMenuItem active={activeItem === 'users'}>
//               <NavLink to="/users" onClick={handleNavLinkClick}>
//                 <i className='bx bxs-group'></i>
//                 <span>Users</span>
//               </NavLink>
//             </SidebarMenuItem>
//             <SidebarMenuItem active={activeItem === 'myprofile'}>
//               <NavLink 
//                 to="/myprofile" 
//                 onClick={() => {
//                   setActiveItem('myprofile');
//                   handleNavLinkClick();
//                 }}
//               >
//                 <i className='bx bxs-credit-card'></i>
//                 <span>My Profile</span>
//               </NavLink>
//             </SidebarMenuItem>

//             <SidebarMenuItem>
//           <NavLink to="#" onClick={() => toggleDropdown('courses')}>
//             <i className='bx bxs-shopping-bag-alt'></i>
//             <span>Courses</span>
//             <i className={`bx ${dropdowns['courses'] ? 'bx-chevron-up' : 'bx-chevron-down'}`}></i>
//           </NavLink>
//           <DropdownMenu isOpen={dropdowns['courses']}>
//   <li>
//     <NavLink 
//       to="/courses/viewcourses" 
//       onClick={handleNavLinkClick}
//       style={{ background: activeItem === 'viewcourses' ? '#d2a0ff' : 'transparent' }}
//     >
//       View Courses
//     </NavLink>
//     {console.log('View Courses active:', activeItem === 'viewcourses')}
//   </li>
//   <li>
//     <NavLink 
//       to="/courses/add" 
//       onClick={handleNavLinkClick}
//       style={{ background: activeItem === 'addcourse' ? '#d2a0ff' : 'transparent' }}
//     >
//       Add Course
//     </NavLink>
//     {console.log('Add Course active:', activeItem === 'addcourse')}
//   </li>
// </DropdownMenu>

//         </SidebarMenuItem>



//             {/* <SidebarMenuItem active={activeItem === 'courses'}>
//               <NavLink to="/courses" onClick={handleNavLinkClick}>
//                 <i className='bx bxs-shopping-bag-alt'></i>
//                 <span>Courses</span>
//               </NavLink>
//             </SidebarMenuItem> */}

//             <SidebarMenuItem active={activeItem === 'studentinfo'}>
//               <NavLink to="/student" onClick={handleNavLinkClick}>
//                 <i className='bx bxs-doughnut-chart'></i>
//                 <span>Add Enquiry</span>
//               </NavLink>
//             </SidebarMenuItem>

//             <SidebarMenuItem active={activeItem === 'studentinfoview'}>
//               <NavLink to="/studentinfo" onClick={handleNavLinkClick}>
//                 <i className='bx bxs-info-circle'></i>
//                 <span>View Student Info</span>
//               </NavLink>
//             </SidebarMenuItem>

//             <SidebarMenuItem active={activeItem === 'viewenrollments'}>
//               <NavLink to="/courses/viewenrollments" onClick={handleNavLinkClick}>
//                 <i className='bx bxs-doughnut-chart'></i>
//                 <span>View Enrollments</span>
//               </NavLink>
//             </SidebarMenuItem>

//             <SidebarMenuItem active={activeItem === 'viewpayments'}>
//               <NavLink to="/paymentdetails" onClick={handleNavLinkClick}>
//                 <i className='bx bx-rupee'></i>
//                 <span>View Payments</span>
//               </NavLink>
//             </SidebarMenuItem>

//             <SidebarMenuItem active={activeItem === 'payments'}>
//               <NavLink to="/payments" onClick={handleNavLinkClick}>
//                 <i className='bx bxs-credit-card'></i>
//                 <span>Payments</span>
//               </NavLink>
//             </SidebarMenuItem>

//             <SidebarMenuItem active={activeItem === 'contacts'}>
//               <NavLink to="/contacts" onClick={handleNavLinkClick}>
//                 <i className='bx bxs-credit-card'></i>
//                 <span>Enquiries</span>
//               </NavLink>
//             </SidebarMenuItem>
//           </>
//         )}

//         <SidebarMenuItem>
//           <NavLink onClick={logout}>
//             <i className='bx bxs-log-out-circle'></i>
//             <span>Logout</span>
//           </NavLink>
//         </SidebarMenuItem>
//       </SidebarMenu>
//     </SidebarSection>
//   );
// };

// export default Sidebar;

// // import React, { useState, useEffect } from 'react';
// // import { NavLink, useLocation, useNavigate } from 'react-router-dom';
// // // import './style.css'; // Make sure this path is correct for your CSS styles
// // import { LogOut, reset } from "../features/authSlice";
// // import { useDispatch, useSelector } from "react-redux";
// // import { useSidebarContext } from '../features/SidebarContext';
// // import icon from '../assets/icon.png'
// // function Sidebar() {
// //   const location = useLocation();
// //   const [activeItem, setActiveItem] = useState('dashboard');
// //   // const [isSidebarHidden, setSidebarHidden] = useState(window.innerWidth < 768);
// //   const navigate = useNavigate();
// //   const dispatch = useDispatch();
// //   const userRole = useSelector(state => {
// //     const role = state.auth.user?.role; // Assuming role is nested under the user object
// //     return role;
// //   });
// //   const apiUrl = process.env.REACT_APP_API_BASE_URL

// //   const handleNavLinkClick = () => {
// //     if (window.innerWidth <= 767) {
// //       toggleSidebar();
// //     }
// //   };
// //   const { isSidebarHidden ,toggleSidebar} = useSidebarContext();

// //   useEffect(() => {
// //     const pathMap = {
// //       '/dashboard': 'dashboard',
// //       '/courses': 'courses',
// //       '/student': 'studentinfo',
// //       '/studentinfo': 'studentinfoview',
// //       "/courses/viewenrollments": 'viewenrollments',
// //       "/courses/add": "courses",
// //     "/courses/edit/:id": "courses",
// //     "/courses/editdocuments/:id": "courses",
// //     "/courses/editdocument/:id": "courses",
// //     "/courses/viewcoursedocuments/:id": "courses",
// //       '/enroll': 'enrollstudent',
// //       '/users': 'users',
// //       '/payments': 'payments',
// //       '/contacts': 'contacts',

// //       '/paymentdetails': 'viewpayments',

// //       '/settings': 'settings',
// //       '/courses/enroll/uploaddocuments': 'uploaddocuments',
// //       '/logout': 'logout'
// //     };
// //     setActiveItem(pathMap[location.pathname] || 'dashboard');
// //   }, [location.pathname]);

// //   const logout = () => {
// //     dispatch(LogOut());
// //     dispatch(reset());
// //     navigate("/");
// //   };

// //   // Helper method to check if the current user has the student role
// //   const isStudent = () => {
// //     return userRole === 'student';
// //   };
// //   const titleStyle = {
// //     fontFamily: 'Times New Roman, Times, serif'
// //   };
// //   return (
// //     <section id="sidebar" className={isSidebarHidden ? 'hide' : ''}>
// // <NavLink to={isStudent() ? "/studentdashboard" : "/dashboard"} className="brand">
// //   <img src={icon} alt="Icon" style={{ width: '50px', height: '50px' ,margin:" 20px 15px 15px 18px"}} />
// //   <span className="text" style={titleStyle}>Yuvatech</span>
// // </NavLink>
      
// //       <ul className="side-menu top">
// //       <li className={activeItem === 'dashboard' ? 'active' : ''}onClick={handleNavLinkClick}>
// //   {isStudent() ? (
// //     <NavLink to="/studentdashboard">
// //       <i className='bx bxs-dashboard'></i>
// //       <span className="text">Dashboard</span>
// //     </NavLink>
// //   ) : (
// //     <NavLink to="/dashboard">
// //       <i className='bx bxs-dashboard'></i>
// //       <span className="text">Dashboard</span>
// //     </NavLink>
// //   )}
// // </li>

// //         {isStudent() && (
// //           <li className={activeItem === 'myenrollments' ? 'active' : ''}onClick={handleNavLinkClick}>
// //             <NavLink to="/myEnrollments">
// //               <i className='bx bxs-dashboard'></i>
// //               <span className="text">My Enrollments</span>
// //             </NavLink>
// //           </li>
// //         )}
// //         {!isStudent() && (
// //           <>
// //             <li className={activeItem === 'users' ? 'active' : ''}onClick={handleNavLinkClick}>
// //               <NavLink to="/users">
// //                 <i className='bx bxs-group'></i>
// //                 <span className="text">Users</span>
// //               </NavLink>
// //             </li>
// //             <li className={activeItem === 'courses' ? 'active' : ''}onClick={handleNavLinkClick}>
// //               <NavLink to="/courses">
// //                 <i className='bx bxs-shopping-bag-alt'></i>
// //                 <span className="text">Courses</span>
// //               </NavLink>
// //             </li>
// //             <li className={activeItem === 'studentinfo' ? 'active' : ''}onClick={handleNavLinkClick}>
// //               <NavLink to="/student">
// //                 <i className='bx bxs-doughnut-chart'></i>
// //                 <span className="text">Add Enquiry</span>
// //               </NavLink>
// //             </li>
// //             <li className={activeItem === 'studentinfoview' ? 'active' : ''}onClick={handleNavLinkClick}>
// //               <NavLink to="/studentinfo">
// //               <i class='bx bxs-info-circle'></i>
// //                 <span className="text">View Student Info</span>
// //               </NavLink>
// //             </li>
// //             {/* <li className={activeItem === 'enrollstudent' ? 'active' : ''}>
// //               <NavLink to="/enroll">
// //                 <i className='bx bxs-message-dots'></i>
// //                 <span className="text">Add Enrollment</span>
// //               </NavLink>
// //             </li> */}
// //             <li className={activeItem === 'viewenrollments' ? 'active' : ''} onClick={handleNavLinkClick}>
// //               <NavLink to="/courses/viewenrollments">
// //                 <i className='bx bxs-doughnut-chart'></i>
// //                 <span className="text">View Enrollments</span>
// //               </NavLink>
// //             </li>
// //             <li className={activeItem === 'viewpayments' ? 'active' : ''}onClick={handleNavLinkClick}>
// //               <NavLink to="/paymentdetails">
// //               <i class='bx bx-rupee'></i>
// //                               <span className="text">View Payments</span>
// //               </NavLink>
// //             </li>
// //             {/* <li className={activeItem === 'uploaddocuments' ? 'active' : ''}>
// //               <NavLink to="/courses/enroll/uploaddocuments">
// //                 <i className='bx bxs-doughnut-chart'></i>
// //                 <span className="text">Upload Documents</span>
// //               </NavLink>
// //             </li> */}
// //             <li className={activeItem === 'payments' ? 'active' : ''}onClick={handleNavLinkClick}>
// //               <NavLink to="/payments">
// //                 <i className='bx bxs-credit-card'></i>
// //                 <span className="text">Payments</span>
// //               </NavLink>
// //             </li>
// //             <li className={activeItem === 'contacts' ? 'active' : ''}onClick={handleNavLinkClick}>
// //               <NavLink to="/contacts">
// //                 <i className='bx bxs-credit-card'></i>
// //                 <span className="text">Enquiries</span>
// //               </NavLink>
// //             </li>
// //             {/* <li>
// //               <NavLink to="/settings">
// //                 <i className='bx bxs-cog'></i>
// //                 <span className="text">Settings</span>
// //               </NavLink>
// //             </li> */}
// //           </>
// //         )}
// //         <li onClick={logout}>
// //           <NavLink onClick={logout}>
// //             <i className='bx bxs-log-out-circle'></i>
// //             <span className="text">Logout</span>
// //           </NavLink>
// //         </li>
// //       </ul>
// //     </section>
// //   );
// // }

// // export default Sidebar;



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
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

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
          // border: solid 1px;
    border-radius: 20px;
    margin: 5px;

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
        color: rgb(237, 231, 246);
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
  const [photoPreview, setPhotoPreview] = useState(''); // New state for image preview
  const [photo, setPhoto] = useState(null); // New state for the selected file
  const isStudent = () => userRole === 'student';
  const apiUrl = process.env.REACT_APP_API_BASE_URL

  useEffect(() => {
    const fetchProfileData = async () => {
      try {

        const profileUrl = isStudent() 
      ? `${apiUrl}/profile`  // URL for students
      : `${apiUrl}/myprofile`;      // URL for other roles

    // Make the API call
    const response = await axios.get(profileUrl);
        // const response = await axios.get('http://localhost:5000/myprofile');
        const data = response.data;
        // setFormData(data);
        setPhotoPreview(`${apiUrl}/${data.photo}`); // Set the existing photo as preview
        // setStudentId(data.studentId); // Set the student ID
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    fetchProfileData();
  }, []);
  useEffect(() => {
    const pathMap = {
      // '/dashboard': 'dashboard',
      // '/myProfile': 'myprofile',
      //  '/courses': 'viewcourses',
      // '/courses/add': 'addcourse',
      // '/users/view': 'viewusers',
      // '/users/add': 'adduser',
      // '/payments/view': 'viewpayments',
      // '/payments/add': 'addpayment',
      // '/student/register': 'registerstudent',
      // '/student/viewinfo': 'viewstudentinfo',
      // '/contacts': 'contacts',
      // '/settings': 'settings',
      // '/logout': 'logout'
      '/dashboard': 'dashboard',
      '/myprofile': 'myprofile',
      '/courses': 'viewcourses',
      '/student': 'studentinfo',
      '/studentinfo': 'studentinfoview',
      '/courses/viewenrollments': 'viewenrollments',
      '/cancelledenrollments':'cancelledenrollments',
      '/completedenrollments':'completedenrollments',
      '/courses/add': 'addcourse',
      '/courses/edit/:id': 'courses',
      '/courses/editdocuments/:id': 'courses',
      '/courses/editdocument/:id': 'courses',
      '/courses/viewcoursedocuments/:id': 'courses',
      '/enroll': 'enrollstudent',
      '/users': 'viewusers',
      '/users/add': 'addusers',
      
      '/payments': 'addpayments',
      '/contacts': 'contacts',
      '/budget': 'budget',
      '/paymentdetails': 'viewpayments',
      '/settings': 'settings',
      '/courses/enroll/uploaddocuments': 'uploaddocuments',
      '/logout': 'logout'
      
    };
    const currentPath = location.pathname;
    setActiveItem(pathMap[currentPath] || null);

    // Open the corresponding dropdown if a sub-item is active
    const dropdownMap = {
      courses: ['/courses', '/courses/add'],
      users: ['/users', '/users/add'],
      payments: ['/payments/view', '/payments','/paymentdetails'],
      student: ['/student/register', '/student/viewinfo'],
      enrollments:['/courses/viewenrollments','/cancelledenrollments','/completedenrollments'],
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
        <span>Yuvatech</span>
      </SidebarHeader>
      <div
  style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '120px', // This makes the container take the full height of the viewport (or parent)
  }}
>
<div
      className="profile-img"
      style={{
        width: '100px',
        height: '100px',
        overflow: 'hidden',
        borderRadius: '50%', // Makes the container round
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f0f0f0', // Fallback background color
      }}
    >
      {photoPreview ? (
        <img
          src={photoPreview}
          alt="User Image"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover', // Ensures the image covers the entire container
          }}
        />
      ) : (
        <FontAwesomeIcon icon={faUser} size="2x" color="#ccc" />
      )}
    </div>
</div>
{isStudent() && (
<SidebarMenu>
  <SidebarMenuItem active={activeItem === 'dashboard'}>
    <NavLink to={userRole === 'student' ? '/studentdashboard' : '/dashboard'} onClick={handleNavLinkClick}>       
      
      <i className='bx bxs-dashboard'></i>
      <span>Dashboard</span>
    </NavLink>
  </SidebarMenuItem>
  <SidebarMenuItem active={activeItem === 'myenrollments'}>
    <NavLink to={userRole === 'student' ? '/profile' : '/myprofile'} onClick={handleNavLinkClick}>       
      
      <i className='bx bxs-dashboard'></i>
      <span>Profile</span>
    </NavLink>
  </SidebarMenuItem>
  <SidebarMenuItem active={activeItem === 'myenrollments'}>
    <NavLink to={userRole === 'student' ? '/myenrollments' : '/dashboard'} onClick={handleNavLinkClick}>       
      
      <i className='bx bxs-dashboard'></i>
      <span>My Enrollments</span>
    </NavLink>
  </SidebarMenuItem>
  <SidebarMenuItem active={activeItem === 'myenrollments'}>
    <NavLink to={userRole === 'student' ? '/mytransactions' : '/dashboard'} onClick={handleNavLinkClick}>       
      
      <i className='bx bxs-dashboard'></i>
      <span>My Transactions</span>
    </NavLink>
  </SidebarMenuItem>
  <SidebarMenuItem>
<li  style={{marginLeft:`25px`}}
    onClick={logout}> <i className='bx bxs-log-out-circle'></i>
    <span>Logout</span></li>    
    
</SidebarMenuItem>
  
        </SidebarMenu>)
        }

{!isStudent() && (<SidebarMenu>
        <SidebarMenuItem active={activeItem === 'dashboard'}>
          <NavLink to={userRole === 'student' ? '/studentdashboard' : '/dashboard'} onClick={handleNavLinkClick}>
            <i className='bx bxs-dashboard'></i>
            <span>Dashboard</span>
          </NavLink>
        </SidebarMenuItem>

        <SidebarMenuItem active={activeItem === 'myprofile'}>
          <NavLink to={userRole === 'student' ? '/profile' : '/myprofile'} onClick={handleNavLinkClick}>
            <i className='bx bxs-dashboard'></i>
            <span>My Profile</span>
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
      to="/courses" 
      onClick={handleNavLinkClick}
      style={{ background: activeItem === 'viewcourses' ? '#d2a0ff' : '' }}
    >
      View Courses
    </NavLink>
    {/* {console.log('View Courses active:', activeItem === 'viewcourses')} */}
  </li>
  <li>
    <NavLink 
      to="/courses/add" 
      onClick={handleNavLinkClick}
      style={{ background: activeItem === 'addcourse' ? '#d2a0ff' : 'transparent' }}
    >
      Add Course
    </NavLink>
    {/* {console.log('Add Course active:', activeItem === 'addcourse')} */}
  </li>
</DropdownMenu>

        </SidebarMenuItem>

        <SidebarMenuItem>
          <NavLink to="#" onClick={() => toggleDropdown('users')}>
            <i className='bx bxs-shopping-bag-alt'></i>
            <span>Users</span>
            <i className={`bx ${dropdowns['users'] ? 'bx-chevron-up' : 'bx-chevron-down'}`}></i>
          </NavLink>
          <DropdownMenu isOpen={dropdowns['users']}>
  <li>
    <NavLink 
      to="/users" 
      onClick={handleNavLinkClick}
      style={{ background: activeItem === 'viewusers' ? '#d2a0ff' : '' }}
    >
      View Users
    </NavLink>
    {/* {console.log('View Courses active:', activeItem === 'viewusers')} */}
  </li>
  <li>
    <NavLink 
      to="/users/add" 
      onClick={handleNavLinkClick}
      style={{ background: activeItem === 'addusers' ? '#d2a0ff' : 'transparent' }}
    >
      Add Users
    </NavLink>
    {/* {console.log('Add USers active:', activeItem === 'addusers')} */}
  </li>
</DropdownMenu>

        </SidebarMenuItem>

        <SidebarMenuItem>
          <NavLink to="#" onClick={() => toggleDropdown('payments')}>
            <i className='bx bxs-shopping-bag-alt'></i>
            <span>Payments</span>
            <i className={`bx ${dropdowns['payments'] ? 'bx-chevron-up' : 'bx-chevron-down'}`}></i>
          </NavLink>
          <DropdownMenu isOpen={dropdowns['payments']}>
  <li>
    <NavLink 
      to="/paymentdetails" 
      onClick={handleNavLinkClick}
      style={{ background: activeItem === 'viewpayments' ? '#d2a0ff' : '' }}
    >
      View Payments
    </NavLink>
    {/* {console.log('View payments active:', activeItem === 'viewpayments')} */}
  </li>
  <li>
    <NavLink 
      to="/payments" 
      onClick={handleNavLinkClick}
      style={{ background: activeItem === 'addpayments' ? '#d2a0ff' : 'transparent' }}
    >
      Add Payments
    </NavLink>
    {/* {console.log('Add Payments active:', activeItem === 'addpayments')} */}
  </li>
</DropdownMenu>

        </SidebarMenuItem>



        <SidebarMenuItem>
          <NavLink to="#" onClick={() => toggleDropdown('enrollments')}>
            <i className='bx bxs-shopping-bag-alt'></i>
            <span>Enrollments</span>
            <i className={`bx ${dropdowns['enrollments'] ? 'bx-chevron-up' : 'bx-chevron-down'}`}></i>
          </NavLink>
          <DropdownMenu isOpen={dropdowns['enrollments']}>
  <li>
    <NavLink 
      to="/courses/viewenrollments" 
      onClick={handleNavLinkClick}
      style={{ background: activeItem === 'viewenrollments' ? '#d2a0ff' : '' }}
    >
      Ongoing 
    </NavLink>
    {/* {console.log('View payments active:', activeItem === 'viewpayments')} */}
  </li>
  <li>
    <NavLink 
      to="/cancelledenrollments" 
      onClick={handleNavLinkClick}
      style={{ background: activeItem === 'cancelledenrollments' ? '#d2a0ff' : 'transparent' }}
    >
      Cancelled 
    </NavLink>
    {/* {console.log('Add Payments active:', activeItem === 'addpayments')} */}
  </li>
  <li>
    <NavLink 
      to="/completedenrollments" 
      onClick={handleNavLinkClick}
      style={{ background: activeItem === 'completedenrollments' ? '#d2a0ff' : 'transparent' }}
    >
      Completed 
    </NavLink>
    {/* {console.log('Add Payments active:', activeItem === 'addpayments')} */}
  </li>
</DropdownMenu>

        </SidebarMenuItem>


        {/* Users Dropdown */}
        {/* <SidebarMenuItem>
          <NavLink to="#" onClick={() => toggleDropdown('users')}>
            <i className='bx bxs-group'></i>
            <span>Users</span>
            <i className={`bx ${dropdowns['users'] ? 'bx-chevron-up' : 'bx-chevron-down'}`}></i>
          </NavLink>
          <DropdownMenu isOpen={dropdowns['users']}>
            <li active={activeItem === 'viewusers'}>
              <NavLink to="/users" onClick={handleNavLinkClick}>View Users</NavLink>
            </li>
            <li active={activeItem === 'adduser'}>
              <NavLink to="/users/add" onClick={handleNavLinkClick}>Add User</NavLink>
            </li>
          </DropdownMenu>
        </SidebarMenuItem> */}

        {/* Payments Dropdown */}
        {/* <SidebarMenuItem>
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
        </SidebarMenuItem> */}

        {/* Student Dropdown */}

          
        <SidebarMenuItem>
          <NavLink to="#" onClick={() => toggleDropdown('student')}>
            <i className='bx bxs-doughnut-chart'></i>
            <span>Student</span>
            <i className={`bx ${dropdowns['student'] ? 'bx-chevron-up' : 'bx-chevron-down'}`}></i>
          </NavLink>
          <DropdownMenu isOpen={dropdowns['student']}>
            <li active={activeItem === 'registerstudent'}>
              <NavLink to="/student" onClick={handleNavLinkClick}>Add Enquiry</NavLink>
            </li>
            <li active={activeItem === 'viewstudentinfo'}>
              <NavLink to="/studentinfo" onClick={handleNavLinkClick}>View Students</NavLink>
            </li>
            <li active={activeItem === 'register'}>
              <NavLink to="/register" onClick={handleNavLinkClick}>Enroll Student</NavLink>
            </li>
          </DropdownMenu>
        </SidebarMenuItem>
        <SidebarMenuItem active={activeItem === 'budget'}>
      <NavLink to={userRole === 'admin' ? '/budget' : '/budget'} onClick={handleNavLinkClick}>
        <i className='bx bxs-dashboard'></i>
        <span>Budget </span>
      </NavLink>
        </SidebarMenuItem>
        <SidebarMenuItem active={activeItem === 'contacts'}>
          <NavLink to={userRole === 'admin' ? '/contacts' : '/dashboard'} onClick={handleNavLinkClick}>
            <i className='bx bxs-dashboard'></i>
            <span>Contactus </span>
          </NavLink>
        </SidebarMenuItem>
        
        

        {/* <SidebarMenuItem>
          <NavLink onClick={logout}>
            <i className='bx bxs-log-out-circle'></i>
            <span>Logout</span>
          </NavLink>
        </SidebarMenuItem> */}
      </SidebarMenu>)
      }



    </SidebarSection>
  );
};

export default Sidebar;
