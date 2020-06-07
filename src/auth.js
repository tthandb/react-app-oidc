import { useState, useEffect } from "react";
export const useAuth = (auth) => {
  const [authenticated, setAuthenticated] = useState(null);
  const [user, setUser] = useState(null);
  const [idToken, setIdToken] = useState(null);
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    auth.isAuthenticated().then((isAuthenticated) => {
      if (isAuthenticated !== authenticated) {
        setAuthenticated(isAuthenticated);
      }
    });
  });

  useEffect(() => {
    if (authenticated) {
      auth.getUser().then(setUser);
      auth.getIdToken().then(setIdToken);
      auth.getAccessToken().then(setAccessToken);
    } else {
      setUser(null);
      setIdToken(null);
      setAccessToken(null);
    }
  }, [authenticated]);

  return { authenticated, user, idToken, accessToken };
};
