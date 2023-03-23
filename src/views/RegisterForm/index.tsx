import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { ReactSVG } from "react-svg";
import { api } from "../../api";
import { City } from "../../interfaces/city";
import "./RegisterForm.scss";
import { LabelLayout } from "../../components/LabelLayout";
import emailSVG from "../../assets/email.svg";
import keySVG from "../../assets/key.svg";
import logoSVG from "../../assets/logo.svg";
import { ButtonLayout } from "../../components/ButtonLayout";

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
  const [cities, setCities] = useState<City[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchCities() {
      const { data } = await api.getCities();
      setCities(data);
    }
    fetchCities();
  }, []);

  const onSubmit = async (data: FormData) => {
    try {
      const response = await api.createUser(data);
      const token = response.data.token;
      onLogin(token);
      navigate("/");
    } catch (error) {
      console.log(error);
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
            <LabelLayout htmlFor="name">
              <ReactSVG src={emailSVG} />
              <input
                id="name"
                type="text"
                placeholder="Nome"
                {...register("name", { required: true })}
                className={`form-input${errors.name ? " has-error" : ""}`}
              />
              {errors.name && (
                <span className="error-message">Este campo é obrigatório</span>
              )}
            </LabelLayout>
            <LabelLayout htmlFor="surname">
              <ReactSVG src={emailSVG} />
              <input
                id="surname"
                type="text"
                placeholder="Sobrenome"
                {...register("surname", { required: true })}
                className={`form-input${errors.surname ? " has-error" : ""}`}
              />
              {errors.surname && (
                <span className="error-message">Este campo é obrigatório</span>
              )}
            </LabelLayout>
          </div>

          <LabelLayout htmlFor="email">
            <ReactSVG src={emailSVG} />
            <input
              id="email"
              type="email"
              placeholder="Email"
              {...register("email", { required: true })}
              className={`form-input${errors.email ? " has-error" : ""}`}
            />
            {errors.email && (
              <span className="error-message">Este campo é obrigatório</span>
            )}
          </LabelLayout>

          <LabelLayout htmlFor="password">
            <ReactSVG src={keySVG} />
            <input
              id="password"
              type="password"
              placeholder="Senha"
              {...register("password", { required: true })}
              className={`form-input${errors.password ? " has-error" : ""}`}
            />
            {errors.password && (
              <span className="error-message">Este campo é obrigatório</span>
            )}
          </LabelLayout>

          <LabelLayout htmlFor="city">
            <ReactSVG src={keySVG} />
            <select
              id="city"
              {...register("city", { required: true })}
              // onChange={handleCityChange}
              className={`form-input${errors.city ? " has-error" : ""}`}
            >
              <option value="">Selecione uma cidade</option>
              {cities.map((city) => (
                <option key={city.id} value={city.id}>
                  {city.name}
                </option>
              ))}
            </select>
            {errors.city && (
              <span className="error-message">Este campo é obrigatório</span>
            )}
          </LabelLayout>
          <ButtonLayout type="submit">Confirmar</ButtonLayout>
          <Link className="recovery" to="/login">
            Já possui uma conta? Entrar
          </Link>
        </form>
      </div>
    </div>
  );
};
