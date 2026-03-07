import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UseStateContext } from "../../contexts/ContextProvider";
import type { ValidationErrors } from "../../types/ValidationErrors";
import axiosClient from "../../api/axios-client";

export default function Login() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [errors, setErrors] = useState<ValidationErrors | null>(null);
  const { setUser, setToken } = UseStateContext();
  const navigate = useNavigate();

  const onSubmit: React.SubmitEventHandler<HTMLFormElement> = (ev) => {
    ev.preventDefault();
    const payload = {
      email: emailRef.current?.value,
      password: passwordRef.current?.value,
    };
    setErrors(null);
    axiosClient
      .post("/login", payload)
      .then(({ data }) => {
        setUser(data.user);
        setToken(data.token);
        navigate("/dashboard");
      })
      .catch((err) => {
        if (err.response && err.response.status === 422) {
          if (err.response.data.errors) {
            setErrors(err.response.data.errors);
            return;
          }
          setErrors({
            email: [err.response.data.message],
          });
        }
      });
  };

  return (
    <form onSubmit={onSubmit}>
      <h1 className="title">Entrar na sua conta</h1>
      {errors && (
        <div className="alert">
          {Object.keys(errors).map((key) => (
            <p key={key}>{errors[key][0]}</p>
          ))}
        </div>
      )}
      <input ref={emailRef} type="email" placeholder="Email" />
      <input ref={passwordRef} type="password" placeholder="Senha" />
      <button className="btn btn-block">Login</button>
      <p className="message">
        Não Registrado? <Link to="/signup">Criar uma conta</Link>
      </p>
    </form>
  );
}
