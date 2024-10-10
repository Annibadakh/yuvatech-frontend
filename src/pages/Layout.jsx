// import React from "react";
// import Navbar from "../components/Navbar";
// import Sidebar from "../components/Sidebar";
// import '../styles/index.css'
// import { useSidebarContext } from '../features/SidebarContext';

// const Layout = ({ children }) => {
//   const { isSidebarHidden, toggleSidebar } = useSidebarContext();


//   return (
//     <React.Fragment>
//       {/* <section id='content'>
//       <Navbar />
//       </section>
//       <div className="columns mt-6" style={{ minHeight: "100vh" }}>
//         <div className="column is-2">
//           <Sidebar />
//         </div>
//         <div className="column has-background-light">
//           <main></main>
//         </div>
//       </div> */}

//       <div>
//       <Sidebar />
//       <section id="content">
//         <Navbar />
//         <main>
//         {children}
//         </main>
        
//       </section>
//     </div>
//     </React.Fragment>
//   );
// };

// export default Layout;
import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import '../styles/index.css';
import { useSidebarContext } from '../features/SidebarContext';

const Layout = ({ children }) => {
  const { isSidebarHidden } = useSidebarContext();

  return (
    <React.Fragment>
      <div style={{ display: 'flex' }}>
        {/* Sidebar visibility based on isSidebarHidden */}
        {!isSidebarHidden && <Sidebar />}
        <section
          id="content"
          style={{
            width: isSidebarHidden ? '-webkit-fill-available' : '', // Adjust '60px' according to your sidebar width
            left: isSidebarHidden ? '0' : '', // Adjust '60px' according to your sidebar width
            transition: 'all 0.3s ease', // Smooth transition when hiding or showing sidebar
          }}
        >
          <Navbar />
          <main>{children}</main>
        </section>
      </div>
    </React.Fragment>
  );
};

export default Layout;
