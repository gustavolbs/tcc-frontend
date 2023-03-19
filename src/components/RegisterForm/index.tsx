import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { api } from "../../api";
import { City } from "../../interfaces/city";
import "./RegisterForm.scss";

interface RegisterFormProps {
  onLogin: (token: string) => void;
}

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  cityId: number;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({ onLogin }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const [cities, setCities] = useState<City[]>([
    {
      id: 1,
      latitude: 2,
      longitude: 3,
      name: "teste",
    },
  ]);
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
    <form onSubmit={handleSubmit(onSubmit)} className="register-form">
      <div className="form-row">
        <label htmlFor="firstName" className="form-label">
          Nome
        </label>
        <input
          id="firstName"
          type="text"
          {...register("firstName", { required: true })}
          className={`form-input${errors.firstName ? " has-error" : ""}`}
        />
        {errors.firstName && (
          <span className="error-message">Este campo é obrigatório</span>
        )}
      </div>

      <div className="form-row">
        <label htmlFor="lastName" className="form-label">
          Sobrenome
        </label>
        <input
          id="lastName"
          type="text"
          {...register("lastName", { required: true })}
          className={`form-input${errors.lastName ? " has-error" : ""}`}
        />
        {errors.lastName && (
          <span className="error-message">Este campo é obrigatório</span>
        )}
      </div>

      <div className="form-row">
        <label htmlFor="email" className="form-label">
          Email
        </label>
        <input
          id="email"
          type="email"
          {...register("email", { required: true })}
          className={`form-input${errors.email ? " has-error" : ""}`}
        />
        {errors.email && (
          <span className="error-message">Este campo é obrigatório</span>
        )}
      </div>

      <div className="form-row">
        <label htmlFor="password" className="form-label">
          Senha
        </label>
        <input
          id="password"
          type="password"
          {...register("password", { required: true })}
          className={`form-input${errors.password ? " has-error" : ""}`}
        />
        {errors.password && (
          <span className="error-message">Este campo é obrigatório</span>
        )}
      </div>

      <div className="form-row">
        <label htmlFor="city" className="form-label">
          Cidade
        </label>
        <select
          id="city"
          {...register("cityId", { required: true })}
          // onChange={handleCityChange}
          className={`form-input${errors.cityId ? " has-error" : ""}`}
        >
          <option value="">Selecione uma cidade</option>
          {cities.map((city) => (
            <option key={city.id} value={city.id}>
              {city.name} ({city.latitude}, {city.longitude})
            </option>
          ))}
        </select>
        {errors.cityId && (
          <span className="error-message">Este campo é obrigatório</span>
        )}
      </div>

      <button type="submit" className="submit-button">
        Cadastrar
      </button>
    </form>
  );
};
