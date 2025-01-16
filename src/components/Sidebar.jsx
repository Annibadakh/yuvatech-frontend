
import React, { useState, useEffect } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { LogOut, reset } from '../features/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useSidebarContext } from '../features/SidebarContext';
import icon from '../assets/logo.png';
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
  padding: 20px;
  background: #f9f9f9;
  color: #0f172a;
  text-decoration: none;

  img {
    width: 200px;
    height: 60px;
    margin: 0px 15px 15px 0px;
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
  background: ${({ active }) => (active ? '#3c91e6' : 'transparent')};
  color: ${({ active }) => (active ? '#632ce4' : 'transparent')};
  border-left: ${({ active }) => (active ? '4px solid #3c91e6' : 'none')};
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
      background:rgb(213, 229, 245);
      border-left: 4px solid #3c91e6;
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
      border-radius: ${({ active }) => (active ? '10px' : '')}; // Apply border-radius to active items

    
    a {
      padding: 10px;
      color: ${({ active }) => (active ? '#632ce4' : '#15171c')};
      text-decoration: none;
      font-size: 16px;
          border-radius: ${({ active }) => (active ? '10px' : '10px')}; // Apply border-radius to links


      &:hover {
        background: #3c91e6;
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
      '/studentdashboard': 'studentdashboard',
      '/profile': 'profile',
      '/myenrollments': 'myenrollments',
      '/mytransactions': 'mytransactions',
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
      '/student': 'student',
      '/studentinfo': 'studentinfo',
      '/register': 'register',
      '/courses/viewenrollments': 'viewenrollments',
      // '/cancelledenrollments':'cancelledenrollments',
      // '/completedenrollments':'completedenrollments',
      '/courses/add': 'addcourse',
      '/courses/edit/:id': 'courses',
      '/courses/editdocuments/:id': 'courses',
      '/courses/editdocument/:id': 'courses',
      '/courses/viewcoursedocuments/:id': 'courses',
      '/enroll': 'enrollstudent',
      '/users': 'viewusers',
      '/users/add': 'addusers',
      '/bloginput': 'bloginput',
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
      student: ['/student', '/studentinfo'],
      enrollments:['/courses/viewenrollments', '/register'],
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
    <SidebarSection isSidebarHidden={isSidebarHidden} style={{borderRight:"1px solid gray"}}>

      <SidebarHeader to={userRole === 'student' ? '/studentdashboard' : '/dashboard'}>
        <img className='sidebar-icon' src={icon} alt="Icon" />
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
  <SidebarMenuItem active={activeItem === 'studentdashboard'}>
    <NavLink to='/studentdashboard' onClick={handleNavLinkClick}>       
      
      <i className='bx bxs-dashboard'></i>
      <span>Dashboard</span>
    </NavLink>
  </SidebarMenuItem>
  <SidebarMenuItem active={activeItem === 'profile'}>
    <NavLink to='/profile' onClick={handleNavLinkClick}>       
      
      <i className='bx bxs-user'></i>
      <span>Profile</span>
    </NavLink>
  </SidebarMenuItem>
  <SidebarMenuItem active={activeItem === 'myenrollments'}>
    <NavLink to='/myenrollments' onClick={handleNavLinkClick}>       
      
      <i className='bx bxs-edit'></i>
      <span>My Enrollments</span>
    </NavLink>
  </SidebarMenuItem>
  <SidebarMenuItem active={activeItem === 'mytransactions'}>
    <NavLink to='/mytransactions' onClick={handleNavLinkClick}>       
      
      <i className='bx bxs-wallet-alt'></i>
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
          <NavLink to='/dashboard' onClick={handleNavLinkClick}>
            <i className='bx bxs-dashboard'></i>
            <span>Dashboard</span>
          </NavLink>
        </SidebarMenuItem>

        <SidebarMenuItem active={activeItem === 'myprofile'}>
          <NavLink to='/myprofile' onClick={handleNavLinkClick}>
            <i className='bx bxs-user'></i>
            <span>My Profile</span>
          </NavLink>
        </SidebarMenuItem>

        {/* Courses Dropdown */}
        

        <SidebarMenuItem>
          <NavLink to="#" onClick={() => toggleDropdown('users')}>
            <i className='bx bxs-group'></i>
            <span>Users</span>
            <i className={`bx ${dropdowns['users'] ? 'bx-chevron-up' : 'bx-chevron-down'}`}></i>
          </NavLink>
          <DropdownMenu isOpen={dropdowns['users']}>
  <li>
    <NavLink 
      to="/users" 
      onClick={handleNavLinkClick}
      style={{ background: activeItem === 'viewusers' ? '#3c91e6' : '' }}
    >
      View Users
    </NavLink>
    {/* {console.log('View Courses active:', activeItem === 'viewusers')} */}
  </li>
  <li>
    {userRole === 'admin' && (
      <NavLink 
      to="/users/add" 
      onClick={handleNavLinkClick}
      style={{ background: activeItem === 'addusers' ? '#3c91e6' : 'transparent' }}
    >
      Add Users
    </NavLink>
    )}
  </li>
</DropdownMenu>

        </SidebarMenuItem>

        <SidebarMenuItem>
          <NavLink to="#" onClick={() => toggleDropdown('courses')}>
            <i className='bx bxs-book'></i>
            <span>Courses</span>
            <i className={`bx ${dropdowns['courses'] ? 'bx-chevron-up' : 'bx-chevron-down'}`}></i>
          </NavLink>
          <DropdownMenu isOpen={dropdowns['courses']}>
  <li>
    <NavLink 
      to="/courses" 
      onClick={handleNavLinkClick}
      style={{ background: activeItem === 'viewcourses' ? '#3c91e6' : ''}}
    >
      View Courses
    </NavLink>
    {/* {console.log('View Courses active:', activeItem === 'viewcourses')} */}
  </li>
  <li>
    <NavLink 
      to="/courses/add" 
      onClick={handleNavLinkClick}
      style={{ background: activeItem === 'addcourse' ? '#3c91e6' : 'transparent' }}
    >
      Add Course
    </NavLink>
    {/* {console.log('Add Course active:', activeItem === 'addcourse')} */}
  </li>
</DropdownMenu>

        </SidebarMenuItem>

<SidebarMenuItem>
  <NavLink to="#" onClick={() => toggleDropdown('payments')}>
    <i className='bx bxs-credit-card'></i>
    <span>Payments</span>
    <i className={`bx ${dropdowns['payments'] ? 'bx-chevron-up' : 'bx-chevron-down'}`}></i>
  </NavLink>
  <DropdownMenu isOpen={dropdowns['payments']}>
    <li>
      <NavLink 
        to="/paymentdetails" 
        onClick={handleNavLinkClick}
        style={{ background: activeItem === 'viewpayments' ? '#3c91e6' : '' }}
      >
        View Payments
      </NavLink>
      {/* {console.log('View payments active:', activeItem === 'viewpayments')} */}
    </li>
    <li>
      <NavLink 
        to="/payments" 
        onClick={handleNavLinkClick}
        style={{ background: activeItem === 'addpayments' ? '#3c91e6' : 'transparent' }}
      >
        Add Payments
      </NavLink>
      {/* {console.log('Add Payments active:', activeItem === 'addpayments')} */}
    </li>
    
</DropdownMenu>

</SidebarMenuItem>



        <SidebarMenuItem>
          <NavLink to="#" onClick={() => toggleDropdown('enrollments')}>
            <i className='bx bxs-edit'></i>
            <span>Enrollments</span>
            <i className={`bx ${dropdowns['enrollments'] ? 'bx-chevron-up' : 'bx-chevron-down'}`}></i>
          </NavLink>
          <DropdownMenu isOpen={dropdowns['enrollments']}>
  <li>
    <NavLink 
      to="/courses/viewenrollments" 
      onClick={handleNavLinkClick}
      style={{ background: activeItem === 'viewenrollments' ? '#3c91e6' : '' }}
    >
      View Enrollments 
    </NavLink>
  </li>
  <li>
    <NavLink
    to="/register" 
    style={{ background: activeItem === 'register' ? '#3c91e6' : 'transparent'}}
    onClick={handleNavLinkClick}>Enroll Student
    </NavLink>
  </li>
  {/* <li>
    <NavLink 
      to="/cancelledenrollments" 
      onClick={handleNavLinkClick}
      style={{ background: activeItem === 'cancelledenrollments' ? '#3c91e6' : 'transparent' }}
    >
      Cancelled 
    </NavLink>
  </li>
  <li>
    <NavLink 
      to="/completedenrollments" 
      onClick={handleNavLinkClick}
      style={{ background: activeItem === 'completedenrollments' ? '#3c91e6' : 'transparent' }}
    >
      Completed 
    </NavLink>
  </li> */}
</DropdownMenu>

  </SidebarMenuItem>


    
          
        <SidebarMenuItem>
          <NavLink to="#" onClick={() => toggleDropdown('student')}>
            <i className='bx bxs-help-circle'></i>
            <span>Enquiry</span>
            <i className={`bx ${dropdowns['student'] ? 'bx-chevron-up' : 'bx-chevron-down'}`}></i>
          </NavLink>
          <DropdownMenu isOpen={dropdowns['student']}>
            <li>
              <NavLink to="/studentinfo" style={{ background: activeItem === 'studentinfo' ? '#3c91e6' : 'transparent'}} onClick={handleNavLinkClick}>View Students</NavLink>
            </li>
            <li>
              <NavLink to="/student" onClick={handleNavLinkClick} style={{ background: activeItem === 'student' ? '#3c91e6' : 'transparent' }}>Add Enquiry</NavLink>
            </li>
            {/* <li>
              <NavLink to="/register" style={{ background: activeItem === 'register' ? '#3c91e6' : 'transparent'}} onClick={handleNavLinkClick}>Enroll Student</NavLink>
            </li> */}
          </DropdownMenu>
        </SidebarMenuItem>
        <SidebarMenuItem active={activeItem === 'budget'}>
      <NavLink to="/budget" onClick={handleNavLinkClick}>
        <i className='bx bxs-pie-chart-alt-2'></i>
        <span>Budget </span>
      </NavLink>
        </SidebarMenuItem>
        
      {userRole === 'admin' && (
        <SidebarMenuItem active={activeItem === 'bloginput'}>
        <NavLink to='/bloginput' onClick={handleNavLinkClick}>
        <i className='bx bxs-pencil'></i>
        <span>Blog Input </span>
      </NavLink>
      </SidebarMenuItem>
      )}
      {userRole === 'admin' && (
        <SidebarMenuItem active={activeItem === 'contacts'}>
        <NavLink to='/contacts' onClick={handleNavLinkClick}>
          <i className='bx bxs-envelope'></i>
          <span>Contactus </span>
        </NavLink>
      </SidebarMenuItem>
      )}
        
        
        
        

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
