// // SidebarContext.js
// import React, { createContext, useContext, useEffect, useState } from 'react';

// const SidebarContext = createContext();

// export const SidebarProvider = ({ children }) => {
//   const [isSidebarHidden, setSidebarHidden] = useState(false);

//   const toggleSidebar = () => {
//     setSidebarHidden((prev) => !prev);
//   };

//   useEffect(() => {
//     function handleResize() {
//         if (window.innerWidth >= 768 && isSidebarHidden) {
//             setSidebarHidden(false);
//         } else if (window.innerWidth < 768 && !isSidebarHidden) {
//             setSidebarHidden(true);
//         }
//     }

//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
// }, [isSidebarHidden]);

//   return (
//     <SidebarContext.Provider value={{ isSidebarHidden, toggleSidebar }}>
//       {children}
//     </SidebarContext.Provider>
//   );
// };

// export const useSidebarContext = () => useContext(SidebarContext);

// SidebarContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';

const SidebarContext = createContext();

export const SidebarProvider = ({ children }) => {
  const [isSidebarHidden, setSidebarHidden] = useState(false);

  const toggleSidebar = () => {
    setSidebarHidden((prev) => {
      const newState = !prev;
      // console.log('Toggling Sidebar. New state:', newState); // Log new state
      return newState;
    });
  };

  useEffect(() => {
    // console.log('SidebarProvider mounted'); // Log when provider mounts
    function handleResize() {
      // console.log('Window resized to:', window.innerWidth);
      if (window.innerWidth >= 768) {
        setSidebarHidden(false);
        // console.log('Sidebar should be visible (width >= 768).');
      } else {
        setSidebarHidden(true);
        // console.log('Sidebar should be hidden (width < 768).');
      }
    }

    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
  }, [isSidebarHidden]);

  return (
    <SidebarContext.Provider value={{ isSidebarHidden, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebarContext = () => {
  const context = useContext(SidebarContext);
  return context;
};