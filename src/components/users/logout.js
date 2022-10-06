import React, { useEffect } from "react";
import axiosInstance from "../../axios";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const history = useNavigate();

  useEffect(() => {
    axiosInstance.post("logout/", {
      refresh_token: localStorage.getItem("refresh_token"),
    });
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user");

    axiosInstance.defaults.headers["Authorization"] = null;
    history("/login");
    window.location.reload();
  });
  return <div>Logout</div>;
}
