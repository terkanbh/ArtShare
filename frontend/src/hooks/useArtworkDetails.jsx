import { useContext } from 'react';
import { ArtworkDetailsContext, ArtworkDetailsDispatchContext } from '../context/ArtworkDetailsContextProvider.jsx';

export const useArtworkDetails = () => useContext(ArtworkDetailsContext);
export const useArtworkDetailsDispatch = () => useContext(ArtworkDetailsDispatchContext);