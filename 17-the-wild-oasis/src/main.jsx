import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import ErrorFallback from "./ui/ErrorFallback";
import GlobalStyles from "./styles/GlobalStyles";
import { ErrorBoundary } from "react-error-boundary";

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <GlobalStyles />
    <React.StrictMode>
      <ErrorBoundary
        FallbackComponent={ErrorFallback}
        onReset={() => window.location.replace("/")}
      >
        <App />
      </ErrorBoundary>
    </React.StrictMode>
  </>
);
