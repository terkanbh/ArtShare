import { useImmerReducer } from 'use-immer';
import { createContext, useContext } from 'react';

export const ArtworkContext = createContext(null);
export const ArtworkDispatchContext = createContext(null);

export function ArtworkContextProvider({ children }) {
  const [artwork, dispatch] = useImmerReducer(artworkReducer, null);

  return (
    <ArtworkContext.Provider value={artwork}>
      <ArtworkDispatchContext.Provider value={dispatch}>
        {children}
      </ArtworkDispatchContext.Provider>
    </ArtworkContext.Provider>
  );
}

function artworkReducer(draft, action) {
  switch (action.type) {
    case 'fetch':
      return action.artwork;
    case 'toggleLike':
      draft.likedByCurrentUser = action.status === 'liked';
      draft.artwork.totalLikes = action.totalLikes;
      break;
    case 'comment':
      console.log(draft);
      draft.comments.unshift(action.comment);
      draft.artwork.totalComments++;
      break;
  }
}

export const useArtwork = () => useContext(ArtworkContext);
export const useArtworkDispatch = () => useContext(ArtworkDispatchContext);
