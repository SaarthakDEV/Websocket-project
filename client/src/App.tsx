import { Routes, Route } from "react-router";
import "./App.css";
import PublicWrapper from "./routes/PublicWrapper";
import publicRoutes from "./routes/public";
import { Suspense } from "react";
import AuthWrapper from "./routes/AuthWrapper";
import privateRoutes from "./routes/private";
import NotFound from "./routes/NotFound";

function App() {
  return <Routes>
    <Route element={<PublicWrapper />}>
        {publicRoutes.map(({ path, component: Component }) => (
          <Route
            key={path}
            path={path}
            element={
              <Suspense fallback={<div>Public Loading...</div>}>
                <Component />
              </Suspense>
            }
          />
        ))}
      </Route>

      <Route element={<AuthWrapper />}>
        {privateRoutes.map(({ path, component: Component }) => (
          <Route
            key={path}
            path={path}
            element={
              <Suspense fallback={<div>Private Loading...</div>}>
                <Component />
              </Suspense>
            }
          />
        ))}
      </Route>
      <Route path="*" element={<NotFound />}/>

  </Routes>;
}

export default App;
