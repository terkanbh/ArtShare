import Navbar from './Navbar/Navbar.jsx';
import { Outlet } from 'react-router';

export default function Layout() {
  return (
    <>
      <Navbar />
      <br/>
      <Outlet />
    </>
  );
}