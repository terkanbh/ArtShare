import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import { BrowserRouter, Routes, Route } from 'react-router';
import { PrivateRoute, ProtectedRoute, ProtectedArtworkSettings } from './routeGuards.jsx';
import { AuthContextProvider } from './context/AuthContextProvider.jsx';
import Home from './components/shared/Home/Home.jsx';
import Search from './components/shared/Search/Search.jsx';
import Layout from './components/shared/Layout.jsx';
import UserLogin from './components/users/Login/Login.jsx';
import UserRegister from './components/users/Register/Register.jsx';
import UserDetails from './components/users/Details/Details.jsx';
import UserUpdate from './components/users/Update/Update.jsx';
import ArtworkDetails from './components/artworks/Details/Details.jsx';
import ArtworkCreate from './components/Artworks/Create/Create.jsx';
import ArtworkUpdate from './components/Artworks/Update/Update.jsx';

function App() {
  return (
    <AuthContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
            
            {/* Public Routes */}
            <Route index element={<Home />} />
            <Route path="search" element={<Search />} />
            <Route path="login" element={<ProtectedRoute element={<UserLogin />} />} />
            <Route path="register" element={<ProtectedRoute element={<UserRegister />} />} />
            
            {/* User Routes */}
            <Route path="users/:id" element={<UserDetails />} />
            <Route path="users/settings" element={<PrivateRoute element={<UserUpdate />} />} />
            
            {/* Artwork Routes */}
            <Route path="artworks/new" element={<PrivateRoute element={<ArtworkCreate />} />} />
            <Route path="artworks/settings/:id" element={<ProtectedArtworkSettings element={<ArtworkUpdate />} />} />
            <Route path="artworks/:id" element={<ArtworkDetails />} />
            </Route>
          </Routes>
        </BrowserRouter>
    </AuthContextProvider>
  );
}

export default App
