import React, { useContext } from "react";
import { Toast, Toaster } from "react-hot-toast";
import Home from "./pages/Home";
import {
  BrowserRouter,
  Outlet,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Nav from "./components/Nav";
import Platform from "./pages/Platform";
import Footer from "./components/Footer";
import Account from "./pages/Account";
import Login from "./pages/Login";
import { AuthContext } from "./context/AuthContext";
import New from "./pages/New";
import Product from "./pages/Product";
import Signup from "./pages/Signup";
import Cart from "./pages/Cart";

const Layout = () => {
  return (
    <>
      <Nav />
      <Outlet />
      <Footer />
      <Toaster
        position="top-center"
        toastOptions={{ style: { fontSize: ".9rem" } }}
      ></Toaster>
    </>
  );
};

function App() {
  const { currentUser } = useContext(AuthContext);

  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to="/login" />;
  };

  const RequireNoAuth = ({ children }) => {
    return currentUser ? <Navigate to="/" /> : children;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            path="login"
            element={
              <RequireNoAuth>
                <Login />
              </RequireNoAuth>
            }
          />
          <Route
            path="signup"
            element={
              <RequireNoAuth>
                <Signup />
              </RequireNoAuth>
            }
          />
          <Route index element={<Home />} />
          <Route path="platforms/">
            {["nintendo", "playstation", "xbox", "sega"].map((platform) => (
              <Route
                key={platform}
                path={platform}
                element={<Platform children={platform} />}
              />
            ))}
          </Route>
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
          <Route path="products/">
            <Route path=":productId" element={<Product />} />
          </Route>
          <Route path="cart" element={<Cart />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
