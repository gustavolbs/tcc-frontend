import React, { useState } from "react";
import { api } from "../../api";
import "./index.scss";

interface LoginFormProps {
  onLogin: (token: string) => void;
}

interface Credentials {
  email: string;
  password: string;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
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
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <label>
        Email:
        <input
          type="text"
          name="email"
          value={credentials.email}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          name="password"
          value={credentials.password}
          onChange={handleInputChange}
        />
      </label>
      <button type="submit">Login</button>
    </form>
  );
};
