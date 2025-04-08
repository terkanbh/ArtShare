import { useEffect, useState } from 'react';
import { Navigate, useParams } from "react-router";
import { useUser } from './context/UserProvider.jsx';
import { checkOwnership } from './services/artworksService.js';

export function ProtectedRoute({ element }) {
  const [user] = useUser();
  return user ? <Navigate to="/" replace /> : element;
}

export function PrivateRoute({ element }) {
  const [user] = useUser();
  return !user ? <Navigate to="/" replace /> : element;
}

export function ProtectedArtworkSettings({ element }) {
  const { id } = useParams();
  const [hasAccess, setHasAccess] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkOwnership(id)
      .then(_ => setHasAccess(true))
      .catch(_ => setHasAccess(false))
      .finally(_ => setLoading(false));
  }, [id]);

  if (loading) return <p>Loading...</p>

  return !hasAccess ? <Navigate to="/" replace /> : element;
}
