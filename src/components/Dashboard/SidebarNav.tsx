import React from 'react';
import { cn } from '@/lib/utils';
import {
  LayoutGrid,
  Users,
  UserCircle2,
  FileText,
  Receipt,
  ShoppingCart,
  Mail as MailIcon,
  Archive,
  CalendarDays,
  HelpCircle,
  Settings as SettingsIcon,
  Briefcase // Using Briefcase as a generic icon for one of the 'Help' or a placeholder
} from 'lucide-react';

interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType;
  href: string;
  isActive?: boolean;
}

const navItemsData: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutGrid, href: '#', isActive: true },
  { id: 'leads', label: 'Leads', icon: Users, href: '#' },
  { id: 'customers', label: 'Customers', icon: UserCircle2, href: '#' },
  { id: 'proposals', label: 'Proposals', icon: FileText, href: '#' },
  { id: 'invoices', label: 'Invoices', icon: Receipt, href: '#' },
  { id: 'items', label: 'Items', icon: ShoppingCart, href: '#' },
  { id: 'mail', label: 'Mail', icon: MailIcon, href: '#' },
  { id: 'shoebox', label: 'Shoebox', icon: Archive, href: '#' },
  { id: 'calendar', label: 'Calendar', icon: CalendarDays, href: '#' },
];

const utilityNavItemsData: NavItem[] = [
  { id: 'help1', label: 'Help', icon: HelpCircle, href: '#' },
  { id: 'settings', label: 'Settings', icon: SettingsIcon, href: '#' },
  { id: 'help2', label: 'Help', icon: Briefcase, href: '#' }, // Assuming a second, different help or utility link
];

interface SidebarNavProps {
  className?: string;
}

const SidebarNav: React.FC<SidebarNavProps> = ({ className }) => {
  const [activeItem, setActiveItem] = React.useState<string>('dashboard');

  return (
    <nav className={cn('fixed top-0 left-0 h-full w-60 bg-sidebar text-sidebar-foreground flex flex-col px-4 py-6', className)}>
      <div className="mb-8 flex items-center space-x-2 px-2">
        {/* Placeholder for Logo, matching the image's BO circle */}
        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-sm">
          BO
        </div>
        <button className="text-foreground">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
        </button>
      </div>

      <div className="flex-grow overflow-y-auto">
        <ul className="space-y-1.5">
          {navItemsData.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.id}>
                <a
                  href={item.href}
                  onClick={() => setActiveItem(item.id)}
                  className={cn(
                    'flex items-center space-x-3 px-3 py-2.5 rounded-md text-sm font-medium',
                    item.id === activeItem
                      ? 'bg-primary text-primary-foreground'
                      : 'hover:bg-muted hover:text-foreground text-muted-foreground'
                  )}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="mt-auto">
        <ul className="space-y-1.5">
          {utilityNavItemsData.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.id}>
                <a
                  href={item.href}
                  className={cn(
                    'flex items-center space-x-3 px-3 py-2.5 rounded-md text-sm font-medium hover:bg-muted hover:text-foreground text-muted-foreground'
                  )}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};

export default SidebarNav;
