import React, { FunctionComponent } from "react";
import Home from "./pages/Home";
import {
  BrowserRouter,
  Link,
  Outlet,
  Route,
  Routes,
  useRoutes,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Platform from "./pages/Platform";
import Footer from "./components/Footer";
import Account from "./pages/Account";
import { useAuth0 } from "@auth0/auth0-react";
import Login from "./pages/Login";

const Layout: FunctionComponent = () => {
  const { isLoading, error } = useAuth0();
  return (
    <>
      {error && <p>Authentication Error</p>}
      {!error && !isLoading && (
        <>
          <Navbar />
          <Outlet />
          <Footer />
        </>
      )}
    </>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          {["nintendo", "playstation", "xbox", "sega"].map((platform) => (
            <Route path={platform} element={<Platform children={platform} />} />
          ))}
          <Route path="account" element={<Account />} />
          <Route path="login" element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
