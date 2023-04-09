import React, { useState } from "react";
import { ReactSVG } from "react-svg";
import { Link, useNavigate } from "react-router-dom";

import { api } from "../../api/client";

import { Box } from "../../components/Box";
import { ButtonLayout } from "../../components/ButtonLayout";
import { LabelLayout } from "../../components/LabelLayout";

import emailSVG from "../../assets/email.svg";
import keySVG from "../../assets/key.svg";
import logoSVG from "../../assets/logo.svg";

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
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const { data } = await api.login(credentials);
      const token = data.token;
      onLogin(token);
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-600 px-4">
      <Box className="max-w-screen-sm">
        <ReactSVG src={logoSVG} />
        <hr className="w-full my-8 border border-gray-300" />
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-4">
          Entrar
        </h2>
        <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
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
          <ButtonLayout
            type="submit"
            disabled={isLoading}
            isLoading={isLoading}
            className="w-full"
          >
            Login
          </ButtonLayout>
          <a
            className="block text-center font-semibold text-blue-600 hover:text-blue-800 mt-4 cursor-not-allowed opacity-50"
            href="#"
            target="_self"
            rel="noopener noreferrer"
          >
            Esqueceu sua senha?
          </a>
        </form>
      </Box>
      <Link
        className="text-white font-semibold mt-8 cursor-pointer hover:underline"
        to="/register"
      >
        Não possui uma conta? Criar uma conta
      </Link>
    </div>
  );
};
