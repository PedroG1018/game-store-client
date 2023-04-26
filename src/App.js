import React, { useContext } from "react";
import Home from "./pages/Home";
import {
  BrowserRouter,
  Outlet,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Platform from "./pages/Platform";
import Footer from "./components/Footer";
import Account from "./pages/Account";
import Login from "./pages/Login";
import { AuthContext } from "./context/AuthContext";
import New from "./pages/New";
import Product from "./pages/Product";
import Signup from "./pages/Signup";

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

function App() {
  const { currentUser } = useContext(AuthContext);
  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to="/login" />;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route
            index
            element={
              <RequireAuth>
                <Home />
              </RequireAuth>
            }
          />
          {["nintendo", "playstation", "xbox", "sega"].map((platform) => (
            <Route
              key={platform}
              path={platform}
              element={<Platform children={platform} />}
            />
          ))}
          <Route
            path="account"
            element={
              <RequireAuth>
                <Account />
              </RequireAuth>
            }
          />
          <Route
            path="new"
            element={
              <RequireAuth>
                <New />
              </RequireAuth>
            }
          />
          <Route path=":productId" element={<Product />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
