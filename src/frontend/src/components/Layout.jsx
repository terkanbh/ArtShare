import MyNavbar from './MyNavbar.jsx';
import { Outlet } from 'react-router';

export default function Layout() {
  return (
    <>
      <MyNavbar />
      <br/>
      <Outlet />
    </>
  );
}