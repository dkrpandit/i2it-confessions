import './App.css';

import Login from './page/loginPage';
import Signup from './page/signupPage';
import Confessions from './page/confessions';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { Logout } from './page/Logout';
import { Error } from './page/Error';
import { useAuth } from './store/auth';

function App() {
  const { isUserHaveToken } = useAuth();
  console.log(isUserHaveToken);
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Login />} /> */}
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
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;