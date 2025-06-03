import React from 'react';
import { cn } from '@/lib/utils';
import SidebarNav from '../Dashboard/SidebarNav'; // Assuming SidebarNav can adapt to width changes

interface SidebarProps {
  isOpen: boolean;
  // onToggle: () => void; // The toggle button is inside SidebarNav, cannot wire it up without modifying SidebarNav
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, className }) => {
  // SidebarNav has fixed w-60. We pass a dynamic width class.
  // Visual issues (text overflow) in SidebarNav might occur if it's not designed for w-16.
  // The hamburger button inside SidebarNav is not wired here as SidebarNav is a context component.
  return (
    <SidebarNav
      className={cn(
        'transition-all duration-300 ease-in-out',
        isOpen ? 'w-60' : 'w-16',
        // When collapsed, text in SidebarNav might need to be hidden.
        // This would ideally be handled within SidebarNav via a prop.
        // For now, overflow-hidden might help, or specific styles if SidebarNav was adaptable.
        !isOpen && 'overflow-hidden',
        className
      )}
    />
  );
};

export default Sidebar;
