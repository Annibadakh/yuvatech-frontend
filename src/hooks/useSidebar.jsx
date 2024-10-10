import { useEffect, useState } from "react";

function useSidebar() {
    const [isSidebarHidden, setSidebarHidden] = useState(window.innerWidth < 768);

    useEffect(() => {
        function handleResize() {
            setSidebarHidden(window.innerWidth < 768);
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return [isSidebarHidden, setSidebarHidden];
}

export default useSidebar;
