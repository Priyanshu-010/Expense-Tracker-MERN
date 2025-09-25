import { Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import Header from "./components/Header";
import Home from "./pages/Home";
import AddTransaction from "./pages/AddTransaction";
import EditTransaction from "./pages/EditTransaction";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AuthContext from "./AuthContext";
import { Toaster } from "react-hot-toast";

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, loading } = useContext(AuthContext);
  if (loading) {
    return <div>Loading...</div>;
  }
  return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <Header />
      <main className="container mx-auto p-4 md:p-8">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path="/add"
            element={
              <PrivateRoute>
                <AddTransaction />
              </PrivateRoute>
            }
          />
          <Route
            path="/:id/edit"
            element={
              <PrivateRoute>
                <EditTransaction />
              </PrivateRoute>
            }
          />
        </Routes>
      </main>
      <Toaster position="top-right" />
    </div>
  );
}

export default App;
