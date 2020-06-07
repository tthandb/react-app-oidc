import React, { useState, useEffect } from "react";
import { withAuth } from "@okta/okta-react";
import "./App.css";
import { useAuth } from "./auth";
import JSONTree from "react-json-tree";

const App = withAuth(({ auth }) => {
  const object = useAuth(auth);
  const [client] = useState({
    identity_provider_name: "Okta Developer",
    url: process.env.REACT_APP_OKTA_ORG_URL,
    client_id: process.env.REACT_APP_OKTA_CLIENT_ID,
  });
  useEffect(() => {
    console.log({ ...object, ...client });
  }, [object]);
  return (
    <div className="App">
      <header className="App-header">
        <JSONTree theme={{ background: "pink" }} data={{...client,...object} || {}} />
        {object.authenticated !== null && (
          <button
            onClick={() =>
              object.authenticated ? auth.logout() : auth.login()
            }
            className="App-link"
          >
            Log {object.authenticated ? "out" : "in"}
          </button>
        )}
      </header>
    </div>
  );
});

export default App;
