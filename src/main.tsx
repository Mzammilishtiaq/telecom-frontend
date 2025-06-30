import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../src/redux/store/store.ts"; // Fixed import: Changed from default to named import
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* <GoogleOAuthProvider clientId="941411364435-2sp8e14gnr9btkfvu5hm0m4lh3rmjphr.apps.googleusercontent.com"> */}
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    {/* </GoogleOAuthProvider> */}
  </StrictMode>
);
