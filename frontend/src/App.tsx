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

  if (token) {
    return (
      <div>
        <MainScene token={token} setToken={setToken} />
      </div>
    );
  }

  return <LoginForm setToken={setToken} />;
}

export default App;
