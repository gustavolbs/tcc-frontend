import React, { useState } from "react";
import { ReactSVG } from "react-svg";
import { Link, useNavigate } from "react-router-dom";

import { api } from "../../api/client";

import { ButtonLayout } from "../../components/ButtonLayout";
import { LabelLayout } from "../../components/LabelLayout";

import emailSVG from "../../assets/email.svg";
import keySVG from "../../assets/key.svg";
import logoSVG from "../../assets/logo.svg";

import "./index.scss";

interface LoginFormProps {
  onLogin: (token: string) => void;
}

interface Credentials {
  email: string;
  password: string;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState<Credentials>({
    email: "",
    password: "",
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const { data } = await api.login(credentials);
      const token = data.token;
      onLogin(token);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <div className="box">
        <ReactSVG src={logoSVG} />
        <hr />
        <h2>Entrar</h2>
        <form className="auth-form" onSubmit={handleSubmit}>
          <LabelLayout htmlFor="email">
            <ReactSVG src={emailSVG} />
            <input
              type="text"
              id="email"
              name="email"
              placeholder="Seu email"
              value={credentials.email}
              onChange={handleInputChange}
            />
          </LabelLayout>
          <LabelLayout htmlFor="password">
            <ReactSVG src={keySVG} />
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Sua senha"
              value={credentials.password}
              onChange={handleInputChange}
            />
          </LabelLayout>
          <ButtonLayout type="submit">Login</ButtonLayout>
          <a
            className="recovery"
            href="#"
            target="_self"
            rel="noopener noreferrer"
          >
            Esqueceu sua senha?
          </a>
        </form>
      </div>
      <Link className="register" to="/register">
        Não possui uma conta? Criar uma conta
      </Link>
    </div>
  );
};
