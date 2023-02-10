import AuthLayout from "./pages/auth/index";
import Home from "./pages/home";
import Login from "./pages/login";
import PrivateRoute from "./components/PrivateRoute";
import SignUp from "./pages/signUp";
import Profile from "./pages/profile";
import Message from "./pages/message";
import Direct from "./pages/direct";
import Feed from "./pages/feed";
import Me from "./pages/me";

const routes = [
  {
    path: "/",
    element: <Home />,
    auth: true,
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <SignUp />,
      },
    ],
  },
  {
    path: "/profile/me",
    auth: true,
    element: <Me />,
  },
  {
    path: "/profile/:username",
    auth: true,
    element: <Profile />,
  },
  {
    path: "/message",
    element: <Message />,
    auth: true,
  },
  {
    path: "/message/direct",
    element: <Direct />,
    auth: true,
  },
  {
    path: "/feed",
    element: <Feed />,
    auth: true,
  },
];

const authCheck = (routes) =>
  routes.map((route) => {
    if (route?.auth) {
      route.element = <PrivateRoute>{route.element}</PrivateRoute>;
    }
    if (route?.children) {
      route.children = authCheck(route.children);
    }
    return route;
  });

export default authCheck(routes);
