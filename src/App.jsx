import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import ProfilePage from "./pages/ProfilePage";
import ErrorPage from "./pages/ErrorPage";
import EditProfile from "./pages/EditProfile";
import AuthProvider from "./components/AuthProvider";
import RequireAuth from "./components/RequireAuth";
import "bootstrap/dist/css/bootstrap.min.css";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={
              <RequireAuth>
                <ProfilePage />
              </RequireAuth>
            } />
            <Route path="/edit-profile" element={
              <RequireAuth>
                <EditProfile />
              </RequireAuth>
            } />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </Layout>
      </AuthProvider>
    </BrowserRouter>
  );
}
