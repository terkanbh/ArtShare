import { createContext, useContext, useReducer } from 'react';

export const ArtworkContext = createContext(null);
export const ArtworkDispatchContext = createContext(null);

export function ArtworkContextProvider({ children }) {
  const [artwork, dispatch] = useReducer(artworkReducer, null);

  return (
    <ArtworkContext.Provider value={artwork}>
      <ArtworkDispatchContext.Provider value={dispatch}>
        {children}
      </ArtworkDispatchContext.Provider>
    </ArtworkContext.Provider>
  );
}

function artworkReducer(state, action) {
  switch (action.type) {
    case 'fetch':
      return action.artwork;
    case 'toggleLike':
      const artworkDetails = { ...state };
      artworkDetails.likedByCurrentUser = action.status === 'liked';
      artworkDetails.artwork = { ...state.artwork, totalLikes: action.totalLikes };
      return artworkDetails;
    case 'comment':
      artworkDetails = { ...state };
      artworkDetails.comments = [ action.comment, ...state.comments];
      return artworkDetails;
  }
}

export const useArtwork = () => useContext(ArtworkContext);
export const useArtworkDispatch = () => useContext(ArtworkDispatchContext);
