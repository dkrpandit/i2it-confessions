import './App.css';

import Login from './page/Login';
import Signup from './page/Signup';
import Confessions from './page/Confessions';
import ForgotPassword  from './page/ForgotPassword';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { Logout } from './page/Logout';
import { Error } from './page/Error';
import { useAuth } from './store/auth';

import About from './page/About';

function App() {
  // const { isUserHaveToken } = useAuth();
  const  isUserHaveToken  = true;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup />} />

        <Route
          path="/"
          element={isUserHaveToken ? <Navigate to="/confessions" /> : <Login />}
        />
        <Route
          path="/confessions"
          element={isUserHaveToken ? <Confessions /> : <Navigate to="/" />}
        />
        <Route path="/logout" element={<Logout />} />
        <Route path="/about" element={<About />} />
        <Route path="/reset-password" element={<ForgotPassword />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;