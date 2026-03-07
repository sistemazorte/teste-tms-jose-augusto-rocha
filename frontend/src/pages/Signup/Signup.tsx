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
    <form
      onSubmit={onSubmit}
      className="w-full max-w-90 bg-white p-8 rounded-lg shadow-sm flex flex-col gap-2"
    >
      <h1 className="text-xl font-semibold text-center">Criar uma conta</h1>
      {errors && (
        <div className="p-3 bg-red-500 text-white rounded">
          {Object.keys(errors).map((key) => (
            <p key={key}>{errors[key][0]}</p>
          ))}
        </div>
      )}
      <input
        ref={nameRef}
        type="text"
        placeholder="Nome completo"
        className="w-full px-4 py-3 border-2 border-gray-200 rounded focus:border-purple-700 outline-none transition"
      />
      <input
        ref={emailRef}
        type="email"
        placeholder="Endereço de Email"
        className="w-full px-4 py-3 border-2 border-gray-200 rounded focus:border-purple-700 outline-none transition"
      />
      <input
        ref={passwordRef}
        type="password"
        placeholder="Senha"
        className="w-full px-4 py-3 border-2 border-gray-200 rounded focus:border-purple-700 outline-none transition"
      />
      <input
        ref={passwordConfirmationRef}
        type="password"
        placeholder="Confirme sua senha"
      />
      <button className="w-full py-3 bg-purple-700 text-white font-medium rounded hover:bg-purple-800 transition">
        Criar Conta
      </button>
      <p className="mt-4 text-center text-gray-500 text-sm">
        Já Registrado? <Link to="/login">Logar na sua conta</Link>
      </p>
    </form>
  );
}
