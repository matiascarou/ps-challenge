import { useState, useEffect } from "react";
import MainScene from "./components/MainScene";
import LoginForm from "./components/LoginForm";

function App() {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("jwtToken");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  if (!token) {
    return <LoginForm setToken={setToken} />;
  }

  return <MainScene token={token} setToken={setToken} />;
}

export default App;
