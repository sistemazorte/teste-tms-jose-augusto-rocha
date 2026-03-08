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
    <form
      onSubmit={onSubmit}
      className="w-full max-w-90 bg-white p-8 rounded-lg shadow-sm flex flex-col gap-2"
    >
      <h1 className="text-xl font-semibold text-center">Entrar na sua conta</h1>
      {errors && (
        <div className="p-3 bg-red-500 text-white rounded">
          {Object.keys(errors).map((key) => (
            <p key={key}>{errors[key][0]}</p>
          ))}
        </div>
      )}
      <input
        ref={emailRef}
        type="email"
        placeholder="Email"
        className="w-full px-4 py-3 border-2 border-gray-200 rounded focus:border-purple-700 outline-none transition"
      />
      <input
        ref={passwordRef}
        type="password"
        placeholder="Senha"
        className="w-full px-4 py-3 border-2 border-gray-200 rounded focus:border-purple-700 outline-none transition"
      />
      <button className="w-full py-3 bg-green-700 text-white font-medium rounded hover:bg-green-800 transition">
        Login
      </button>
      <p className="mt-4 text-center text-gray-500 text-sm">
        Não Registrado? <Link to="/signup">Criar uma conta</Link>
      </p>
    </form>
  );
}
