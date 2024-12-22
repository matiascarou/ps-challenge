import React, { useState } from "react";
import InputComponent from "./InputComponent";
import { CommunicationService } from "../api/CommunicationService";

interface IMainSceneProps {
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
}

const LoginForm = ({ setToken }: IMainSceneProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    try {
      const response = await CommunicationService.loginUser({
        username,
        password,
      });

      if (!response.ok) {
        const errData = await response.json();

        alert(errData?.message ?? "Login failed");
        return;
      }

      const data = await response.json();
      const receivedToken = data.token;

      localStorage.setItem("jwtToken", receivedToken);
      setToken(receivedToken);
    } catch (error) {
      alert("Network error or server unavailable.");
    }
  }

  return (
    <div className="loginForm">
      <div style={{ border: "1px solid #ccc", padding: 20 }}>
        <h1 style={{ marginTop: "10px" }}>Please Login</h1>
        <form
          onSubmit={handleLogin}
          style={{ display: "flex", flexDirection: "column", gap: 8 }}
        >
          <InputComponent
            value={username}
            setStateFn={setUsername}
            type={"text"}
            label={"Username:"}
          />
          <InputComponent
            value={password}
            setStateFn={setPassword}
            type={"password"}
            label={"Password:"}
          />
          <button type="submit" style={{ marginTop: 10 }}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
