import { useContext } from 'react';
import { AuthContext } from '../context/AuthContextProvider.jsx';

export const useAuth = () => useContext(AuthContext);