import axios from 'axios';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Home from "./views/Home/Home";
import Dashboard from "./views/Dashboard/Dashboard";
import UserProfile from "./views/UserProfile/UserProfile";

const allRoutes = [
  {path: "/", component: Home},
  {path: "/dashboard", component: Dashboard},
  {path: "/profile", component: UserProfile}
];

function App() {

  axios.defaults.withCredentials = true;

  const appRoutes = allRoutes.map((element, index) => {
    return (
      <>
        <Route key={index} exact path={element.path} element={
          <>
            <Toaster position='top-center' reverseOrder={false} toastOptions={{success: {style: {textAlign: "center"}}}}/>
            <element.component/>
          </>
        }
        />
      </>
    )
  });

  return (
    <Router>
      <Routes>
        {appRoutes}
      </Routes>
    </Router>
  );
}

export default App;
