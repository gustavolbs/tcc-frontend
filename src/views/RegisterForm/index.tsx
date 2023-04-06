import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { ReactSVG } from "react-svg";

import { api } from "../../api/client";
import { notify } from "../../helpers/notify";

import { LabelLayout } from "../../components/LabelLayout";
import { ButtonLayout } from "../../components/ButtonLayout";

import "./RegisterForm.scss";

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
    <div className="container">
      <div className="box">
        <ReactSVG src={logoSVG} />
        <hr />
        <h2>Criar conta</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
          <div className="grid-row">
            <div>
              <LabelLayout htmlFor="name">
                <ReactSVG src={emailSVG} />
                <input
                  id="name"
                  type="text"
                  placeholder="Nome"
                  {...register("name", { required: true })}
                  className={`form-input${errors.name ? " has-error" : ""}`}
                />
              </LabelLayout>
              {errors.name && (
                <span className="error-message">Este campo é obrigatório</span>
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
                  className={`form-input${errors.surname ? " has-error" : ""}`}
                />
              </LabelLayout>
              {errors.surname && (
                <span className="error-message">Este campo é obrigatório</span>
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
                className={`form-input${errors.email ? " has-error" : ""}`}
              />
            </LabelLayout>
            {errors.email && (
              <span className="error-message">Este campo é obrigatório</span>
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
                className={`form-input${errors.password ? " has-error" : ""}`}
              />
            </LabelLayout>
            {errors.password && (
              <span className="error-message">Este campo é obrigatório</span>
            )}
          </div>

          <div>
            <LabelLayout htmlFor="city">
              <ReactSVG src={keySVG} />
              <select
                id="city"
                {...register("city", { required: true })}
                // onChange={handleCityChange}
                className={`form-input${errors.city ? " has-error" : ""}`}
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
              <span className="error-message">Este campo é obrigatório</span>
            )}
          </div>

          <ButtonLayout
            type="submit"
            disabled={isLoading}
            isLoading={isLoading}
          >
            Confirmar
          </ButtonLayout>
          <Link className="recovery" to="/login">
            Já possui uma conta? Entrar
          </Link>
        </form>
      </div>
    </div>
  );
};
