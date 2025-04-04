import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import Home from './components/Home/Home.jsx';
import Layout from './components/Layout.jsx';
import Login from './components/Login/Login.jsx';
import Register from './components/Register/Register.jsx';
import ArtworkDetails from './components/ArtworkDetails/ArtworkDetails.jsx';
import UserDetails from './components/UserDetails/UserDetails.jsx';
import { BrowserRouter, Routes, Route } from 'react-router';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='login' element={<Login />} />
          <Route path='register' element={<Register />} />
          <Route path='users/:id' element={<UserDetails />} />
          <Route path='artworks/:id' element={<ArtworkDetails />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App
