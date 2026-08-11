import { Outlet } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar/Navbar';
import { ClosingSection } from '@/components/layout/ClosingSection';

export function MainLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <ClosingSection />
    </>
  );
}
