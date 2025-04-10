import { Outlet } from 'react-router';
import Navbar from './Navbar/Navbar.jsx';

export default function Layout() {
  return (
    <>
      <Navbar />
      <br/>
      <Outlet />
    </>
  );
}