import React from 'react';
import { cn } from '@/lib/utils';
import Sidebar from './Sidebar';
import Header from './Header';

interface MainAppLayoutProps {
  children: React.ReactNode;
  title?: string; // For document title or a top-level page heading if needed
  className?: string;
}

const MainAppLayout: React.FC<MainAppLayoutProps> = ({
  children,
  title,
  className,
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState<boolean>(true);

  // This toggle function would ideally be connected to a button (e.g., the hamburger in SidebarNav)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const toggleSidebar = React.useCallback(() => {
    setIsSidebarOpen((prev) => !prev);
  }, []);

  React.useEffect(() => {
    if (title) {
      document.title = title;
    }
  }, [title]);

  return (
    <div
      className={cn(
        'flex min-h-screen bg-background text-foreground',
        className
      )}
    >
      {/* Pass isOpen to Sidebar. The onToggle is not passed down as SidebarNav is not modified to accept it. */}
      {/* If SidebarNav's hamburger needs to work, SidebarNav must accept onToggle prop. */}
      <Sidebar isOpen={isSidebarOpen} />
      
      <div className="flex flex-1 flex-col">
        <Header isSidebarOpen={isSidebarOpen} />
        <main
          className={cn(
            'flex-1 overflow-y-auto p-6 transition-all duration-300 ease-in-out',
            isSidebarOpen ? 'ml-60' : 'ml-16',
            'mt-16' // For fixed header height
          )}
        >
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainAppLayout;
