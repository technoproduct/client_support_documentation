import logo from "./logo.svg";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Login from "./component/pages/Login";
import { Route, Routes } from "react-router-dom";
import Admin from "./component/pages/Admin";
import AuthRoute from "./component/utils/authRoute";
import "../src/assets/scss/custom/custom.css";
import "../src/assets/scss/default/default.css";
import "../src/assets/scss/style/style.css";
import "../src/assets/scss/dateRange.css";
import { setOldAdmin } from "./redux/slice/authSlice";
import { setToken } from "./component/utils/setAuth";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import axios from "axios";
import { apiInstanceFetch } from "./component/api/axiosApi";
import { useState } from "react";
import Registration from "./component/pages/Registration";
import UpdateCode from "./component/pages/UpdateCode";
function App() {
  const dispatch = useDispatch();
  const key = localStorage.getItem("key");
  const token = localStorage.getItem("token");
  const { isAuth } = useSelector((state) => state.auth);

  const [login, setLogin] = useState(false);

  useEffect(() => {
    axios
      .get("admin/login/login")
      .then((res) => {
        setLogin(res.data.login);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    console.log("token", token);
    console.log("token", isAuth);
    if (!token && !key) return;
    dispatch(setOldAdmin(token));
  }, [setToken, key, token, isAuth]);

  const queryClient = new QueryClient();
  return (
    <>
      {/* <QueryClientProvider client={queryClient}> */}
      <div className="App">
        <Routes>
          <Route path="/" element={login ? <Login /> : <Registration />} />
          <Route path="/code" element={<UpdateCode />} />
          <Route path="/login" element={<Login />} />
          <Route element={<AuthRoute />}>
            <Route path="/admin/*" element={<Admin />} />
          </Route>
          {window.location.pathname === "/SalonPanel/login" ||
          window.location.pathname === "/SalonPanel" ? (
            "Error"
          ) : (
            <>Error</>
          )}
        </Routes>
      </div>
      {/* The rest of your application */}
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      {/* </QueryClientProvider> */}
    </>
  );
}

export default App;
