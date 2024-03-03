import './App.css';
import Navbar from './components/Navbar';
import Login from './page/loginPage';
import Signup from './page/signupPage';
import Confessions from './page/confessions';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login></Login>,
  },
  {
    path: "/signup",
    element: <Signup></Signup>,
  },
  {
    path: "/confessions",
    element: <Confessions/>,
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
      {/* <Confessions></Confessions> */}
    </div>
  );
}

export default App;