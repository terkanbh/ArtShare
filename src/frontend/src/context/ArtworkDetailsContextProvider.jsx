import { useImmerReducer } from 'use-immer';
import { createContext  } from 'react';

export const ArtworkDetailsContext = createContext(null);
export const ArtworkDetailsDispatchContext = createContext(null);

export function ArtworkDetailsContextProvider({ children }) {
  const [artworkDetails, dispatch] = useImmerReducer(artworkDetailsReducer, null);

  return (
    <ArtworkDetailsContext.Provider value={artworkDetails}>
      <ArtworkDetailsDispatchContext.Provider value={dispatch}>
        {children}
      </ArtworkDetailsDispatchContext.Provider>
    </ArtworkDetailsContext.Provider>
  );
}

function artworkDetailsReducer(draft, action) {
  switch (action.type) {
    case 'fetch':
      return action.artwork;
    case 'toggleLike':
      draft.likedByCurrentUser = action.status === 'liked';
      draft.artwork.totalLikes = action.totalLikes;
      break;
    case 'comment':
      draft.comments.unshift(action.comment);
      draft.artwork.totalComments++;
      break;
  }
}
