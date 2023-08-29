// useShareMarker.js

import { useEffect } from "react";

export const useShareMarker = (
  router,
  setShareMarkerId,
  setShareMarkerTheme
) => {
  useEffect(() => {
    if (Object.keys(router.query).length === 0) {
      return;
    }

    let didCancel = false;

    const { theme, id } = router.query;

    if (!didCancel) {
      if (!theme || !id) {
        return;
      }
      setShareMarkerId(id);
      setShareMarkerTheme(theme);
    }

    return () => {
      didCancel = true;
    };
  }, [router.query]);
};
