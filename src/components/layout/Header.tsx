import React from 'react';
import { cn } from '@/lib/utils';
import TopHeader from '../Dashboard/TopHeader'; // Assuming TopHeader can adapt to left margin changes

interface HeaderProps {
  isSidebarOpen: boolean;
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ isSidebarOpen, className }) => {
  // TopHeader has fixed left-60. We pass a dynamic class to adjust 'left'.
  // This relies on 'cn' correctly merging/overriding the 'left' utility.
  return (
    <TopHeader
      className={cn(
        'transition-all duration-300 ease-in-out',
        isSidebarOpen ? 'left-60' : 'left-16',
        className
      )}
    />
  );
};

export default Header;
