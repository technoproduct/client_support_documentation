import logo from "./logo.svg";
import "./App.css";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
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
function App() {
  const dispatch = useDispatch();
  const key = sessionStorage.getItem("key");
  const token = sessionStorage.getItem("token");




  useEffect(() => {
    if (!token && !key) return;
    dispatch(setOldAdmin(token));
  }, [setToken, key]);

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <Routes>
          <Route path="/salonPanel" element={<Login />} />
          <Route path="/salonPanel/login" element={ <Login />} />
          <Route element={<AuthRoute />}>
            <Route path="/salonPanel/*" element={<Admin />} />
          </Route>
        </Routes>
      </div>
    </QueryClientProvider>
  );
}

export default App;
