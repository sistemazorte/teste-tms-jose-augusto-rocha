import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosClient from "../../api/axios-client";
import { UseStateContext } from "../../contexts/ContextProvider";
import type { ValidationErrors } from "../../types/ValidationErrors";

export default function Signup() {
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordConfirmationRef = useRef<HTMLInputElement>(null);
  const [errors, setErrors] = useState<ValidationErrors | null>(null);
  const { setUser, setToken } = UseStateContext();
  const navigate = useNavigate();

  const onSubmit: React.SubmitEventHandler<HTMLFormElement> = (ev) => {
    ev.preventDefault();
    const payload = {
      name: nameRef.current?.value,
      email: emailRef.current?.value,
      password: passwordRef.current?.value,
      password_confirmation: passwordConfirmationRef.current?.value,
    };

    axiosClient
      .post("/signup", payload)
      .then(({ data }) => {
        setUser(data.user);
        setToken(data.token);
        navigate("/dashboard");
      })
      .catch((err) => {
        if (err.response && err.response.status === 422) {
          setErrors(err.response.data.errors);
        }
      });
  };

  return (
    <form onSubmit={onSubmit}>
      <h1 className="title">Criar uma conta</h1>
      {errors && (
        <div className="alert">
          {Object.keys(errors).map((key) => (
            <p key={key}>{errors[key][0]}</p>
          ))}
        </div>
      )}
      <input ref={nameRef} type="text" placeholder="Nome completo" />
      <input ref={emailRef} type="email" placeholder="Endereço de Email" />
      <input ref={passwordRef} type="password" placeholder="Senha" />
      <input
        ref={passwordConfirmationRef}
        type="password"
        placeholder="Confirme sua senha"
      />
      <button className="btn btn-block">Criar Conta</button>
      <p className="message">
        Já Registrado? <Link to="/login">Logar na sua conta</Link>
      </p>
    </form>
  );
}
