import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { ReactSVG } from "react-svg";

import { api } from "../../api/client";
import { notify } from "../../helpers/notify";

import { LabelLayout } from "../../components/LabelLayout";
import { ButtonLayout } from "../../components/ButtonLayout";

import emailSVG from "../../assets/email.svg";
import keySVG from "../../assets/key.svg";
import logoSVG from "../../assets/logo.svg";

interface RegisterFormProps {
  onLogin: (token: string) => void;
}

interface FormData {
  name: string;
  surname: string;
  email: string;
  password: string;
  city: number;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({ onLogin }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const [isLoading, setIsLoading] = useState(false);
  const { data: cities } = api.getCities();
  const navigate = useNavigate();

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    try {
      const response = await api.createUser(data);
      const token = response.data.token;

      notify("success", "Usuário criado com sucesso!");
      onLogin(token);
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-600 px-4">
      <div className="flex flex-col items-center bg-white shadow-lg rounded-lg px-4 md:px-12 lg:px-24  py-10 w-full max-w-screen-md">
        <ReactSVG src={logoSVG} />
        <hr className="w-full my-8 border border-gray-300" />
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-4">
          Criar conta
        </h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full flex flex-col gap-4"
        >
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <LabelLayout htmlFor="name">
                <ReactSVG src={emailSVG} />
                <input
                  id="name"
                  type="text"
                  placeholder="Nome"
                  {...register("name", { required: true })}
                  className={`w-full px-3 py-2 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-blue-500 form-input${
                    errors.name ? " has-error" : ""
                  }`}
                />
              </LabelLayout>
              {errors.name && (
                <span className="error-message block text-red-500 text-sm mt-2 sm:mt-0 sm:text-base">
                  Este campo é obrigatório
                </span>
              )}
            </div>

            <div>
              <LabelLayout htmlFor="surname">
                <ReactSVG src={emailSVG} />
                <input
                  id="surname"
                  type="text"
                  placeholder="Sobrenome"
                  {...register("surname", { required: true })}
                  className={`w-full px-3 py-2 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-blue-500 form-input${
                    errors.surname ? " has-error" : ""
                  }`}
                />
              </LabelLayout>
              {errors.surname && (
                <span className="error-message block text-red-500 text-sm mt-2 sm:mt-0 sm:text-base">
                  Este campo é obrigatório
                </span>
              )}
            </div>
          </div>

          <div>
            <LabelLayout htmlFor="email">
              <ReactSVG src={emailSVG} />
              <input
                id="email"
                type="email"
                placeholder="Email"
                {...register("email", { required: true })}
                className={`w-full px-3 py-2 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-blue-500 form-input${
                  errors.email ? " has-error" : ""
                }`}
              />
            </LabelLayout>
            {errors.email && (
              <span className="error-message block text-red-500 text-sm mt-2 sm:mt-0 sm:text-base">
                Este campo é obrigatório
              </span>
            )}
          </div>

          <div>
            <LabelLayout htmlFor="password">
              <ReactSVG src={keySVG} />
              <input
                id="password"
                type="password"
                placeholder="Senha"
                {...register("password", { required: true })}
                className={`w-full px-3 py-2 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-blue-500 form-input${
                  errors.password ? " has-error" : ""
                }`}
              />
            </LabelLayout>
            {errors.password && (
              <span className="error-message block text-red-500 text-sm mt-2 sm:mt-0 sm:text-base">
                Este campo é obrigatório
              </span>
            )}
          </div>

          <div>
            <LabelLayout htmlFor="city">
              <ReactSVG src={keySVG} />
              <select
                id="city"
                {...register("city", { required: true })}
                // onChange={handleCityChange}
                className={`w-full px-3 py-2 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-blue-500 form-input${
                  errors.city ? " has-error" : ""
                }`}
              >
                <option value="">Selecione uma cidade</option>
                {cities?.map((city) => (
                  <option key={city.id} value={city.id}>
                    {city.name}
                  </option>
                ))}
              </select>
            </LabelLayout>
            {errors.city && (
              <span className="error-message block text-red-500 text-sm mt-2 sm:mt-0 sm:text-base">
                Este campo é obrigatório
              </span>
            )}
          </div>

          <ButtonLayout
            type="submit"
            disabled={isLoading}
            isLoading={isLoading}
            className="w-full"
          >
            Confirmar
          </ButtonLayout>
          <Link
            className="block text-center font-semibold text-blue-600 hover:text-blue-800 mt-4"
            to="/login"
          >
            Já possui uma conta? Entrar
          </Link>
        </form>
      </div>
    </div>
  );
};
