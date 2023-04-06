import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { ReactSVG } from "react-svg";

import { api } from "../../api/client";
import { notify } from "../../helpers/notify";

import { Box } from "../../components/Box";
import { ButtonLayout } from "../../components/ButtonLayout";
import { LabelLayout } from "../../components/LabelLayout";

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
      <Box className="max-w-screen-sm">
        <ReactSVG src={logoSVG} />
        <hr className="w-full my-8 border border-gray-300" />
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-4">
          Criar conta
        </h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full flex flex-col gap-4 text-start"
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
                />
              </LabelLayout>
              {errors.name && (
                <span className="block text-red-500 text-sm mt-2 sm:mt-0 sm:text-base">
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
                />
              </LabelLayout>
              {errors.surname && (
                <span className="block text-red-500 text-sm mt-2 sm:mt-0 sm:text-base">
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
              />
            </LabelLayout>
            {errors.email && (
              <span className="block text-red-500 text-sm mt-2 sm:mt-0 sm:text-base">
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
              />
            </LabelLayout>
            {errors.password && (
              <span className="block text-red-500 text-sm mt-2 sm:mt-0 sm:text-base">
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
              <span className="block text-red-500 text-sm mt-2 sm:mt-0 sm:text-base">
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
      </Box>
    </div>
  );
};
