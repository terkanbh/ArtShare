import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import { BrowserRouter, Routes, Route } from 'react-router';
import { UserProvider } from './context/UserProvider.jsx';
import { PrivateRoute, ProtectedRoute, ProtectedArtworkSettings } from './routeGuards.jsx';
import Home from './components/Home/Home.jsx';
import Layout from './components/Layout.jsx';
import Login from './components/Login/Login.jsx';
import Register from './components/Register/Register.jsx';
import ArtworkDetails from './components/ArtworkDetails/ArtworkDetails.jsx';
import Profile from './components/UserProfile/Profile.jsx';
import UpdateUser from './components/Users/Update/Update.jsx';
import CreateArtwork from './components/Artworks/Create/Create.jsx';
import UpdateArtwork from './components/Artworks/Update/Update.jsx';

function App() {
  return (
    <UserProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
            
            {/* Public Routes */}
            <Route index element={<Home />} />
            <Route path="login" element={<ProtectedRoute element={<Login />} />} />
            <Route path="register" element={<ProtectedRoute element={<Register />} />} />
            
            {/* User Routes */}
            <Route path="users/:id" element={<Profile />} />
            <Route path="users/settings" element={<PrivateRoute element={<UpdateUser />} />} />
            
            {/* Artwork Routes */}
            <Route path="artworks/new" element={<PrivateRoute element={<CreateArtwork />} />} />
            <Route path="artworks/settings/:id" element={<ProtectedArtworkSettings element={<UpdateArtwork />} />} />
            <Route path="artworks/:id" element={<ArtworkDetails />} />

            </Route>
          </Routes>
        </BrowserRouter>
    </UserProvider>
  );
}

export default App
