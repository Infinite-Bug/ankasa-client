import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Background from "../components/Background";
import "../assets/styles/ian.css";
import { forgot } from "../redux/actions/auth";
import Swal from "sweetalert2";

export default function Reset() {
  const navigate = useNavigate();
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    email: "",
  });
  const onSubmitted = (e) => {
    e.preventDefault();
    setErrors([]);
    setIsLoading(true);
    forgot(form,setErrors).then((res) => {
      if (res === true) {
        Swal.fire({
          title: "Success",
          text: "you success to reset password, now check your email to reset your password",
          icon: "success",
        });
        return navigate("/login");
      }
    });
    setIsLoading(false);
  };
  return (
    <>
      <div className="ian">
        <div className="background">
          <Background />
          <div className="jumbotron">
            <div className="form-title">
              <div className="icon"></div>
              <div className="text">Ankasa</div>
            </div>
            <form onSubmit={(e) => onSubmitted(e)}>
              <div className="form-input">
                <h1>Forgot Password</h1>
                <input
                  type="email"
                  className="input"
                  placeholder="  Email"
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>
              {errors.length > 0 && (
                <div className="alert alert-danger mx-0">
                  <ul className="m-0">
                    {errors.map((error, index) => (
                      <li key={index}>{error.msg}</li>
                    ))}
                  </ul>
                </div>
              )}
              {isLoading ? (
                <button
                  className="btn btn-success btn-lg ms-2"
                  type="button"
                  disabled
                >
                  <span
                    className="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>{" "}
                  Loading...
                </button>
              ) : (
                <button type="submit" className="button">
                  Send
                </button>
              )}
            </form>
            <div className="text">You’ll get message soon on your email</div>
          </div>
        </div>
      </div>
    </>
  );
}
