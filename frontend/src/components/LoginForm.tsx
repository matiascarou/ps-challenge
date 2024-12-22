import React, { useState } from "react";
import { BASE_URL } from "../constants";
import InputComponent from "./InputComponent";

interface IMainSceneProps {
  setToken: (token: string | null) => void;
}

const LoginForm = ({ setToken }: IMainSceneProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    const authUrl = BASE_URL + "auth";

    try {
      const response = await fetch(authUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
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
      console.error("Error logging in:", error);
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
