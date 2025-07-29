import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./styles/global.scss";
import Login from "./pages/login/login";
import Layout from "./components/layout/layout";
import Profile from "./pages/profile/profile";
import LandingPage from "./pages/landingPage/landingPage";
import SavedWork from './pages/saved-work/saved-work'
import ProtectedRoute from "./routes/protectedRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Login />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/profile" element={<Profile userName="aditya" fullName="aditya shah" />} />
            <Route path="/landingPage" element={<LandingPage />} />
            <Route path='/saved-work' element={<SavedWork userName='aditya' fullName='aditya shah' />} />
          </Route>
        </Route>
      </Routes>
      <ToastContainer />
    </BrowserRouter>

  );
}

export default App;
