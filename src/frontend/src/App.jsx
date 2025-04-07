import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import { BrowserRouter, Routes, Route } from 'react-router';
import { UserProvider } from './context/UserProvider.jsx';
import Home from './components/Home/Home.jsx';
import Layout from './components/Layout.jsx';
import Login from './components/Login/Login.jsx';
import Register from './components/Register/Register.jsx';
import ArtworkDetails from './components/ArtworkDetails/ArtworkDetails.jsx';
import Profile from './components/UserProfile/Profile.jsx';

function App() {
  return (
    <UserProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path='login' element={<Login />} />
              <Route path='register' element={<Register />} />
              <Route path='users/:id' element={<Profile />} />
              <Route path='artworks/:id' element={<ArtworkDetails />} />
            </Route>
          </Routes>
        </BrowserRouter>
    </UserProvider>
  );
}

export default App
