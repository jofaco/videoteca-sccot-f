import { useCallback, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
//dependencias
import Context from "../components/context/UserContext";
import {Login} from "../services/auth";
import axiosInstance from "../axios";




export default function useUser() {
    const history = useNavigate();
    const { jwt, setUSER, setJWT } = useContext(Context)
    const [state, setState] = useState({ loading: false, error: false });

  const login = useCallback(
    ({ username, password }) => {
      setState({ loading: true, error: false });
      Login({ username, password }).then(
        (res) => {
          window.localStorage.setItem("access_token", res.data.access_token)
          window.localStorage.setItem("refresh_token", res.data.refresh_token)
          window.localStorage.setItem("user", JSON.stringify(res.data.user))

          axiosInstance.defaults.headers["Authorization"] =
          "JWT " + localStorage.getItem("access_token");

          setState({ loading: false, error: false })
          setJWT(res.data.access_token)
          setUSER(res.data.user)
        })
        .catch((err) => {
          window.localStorage.removeItem("access_token")
          window.localStorage.removeItem("refresh_token")
          window.localStorage.removeItem("user")
          setState({ loading: false, error: true })
          console.error(err)
        });
    },[setJWT, setUSER]);

  const logout = useCallback(() => {
    axiosInstance.post("logout/", {
        refresh_token: localStorage.getItem("refresh_token"),
      });
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user");
  
    axiosInstance.defaults.headers["Authorization"] = null;
    setJWT(null);
    history("/");
    window.location.reload();
  }, [history, setJWT]);

  return {
    isLogged: Boolean(jwt),
    isLoginLoading: state.loading,
    hasLoginError: state.error,
    login,
    logout,
  };
}
