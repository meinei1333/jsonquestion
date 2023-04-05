import { useState, useEffect } from "react";
import "./styles.css";

type resultProps = {
  email: string;
  gender: string;
};

export default function App() {
  const [result, setResult] = useState<resultProps[]>([]);

  useEffect(() => {
    const api = async () => {
      const data = await fetch("https://randomuser.me/api", {
        method: "GET"
      });
      const jsonData = await data.json();
      setResult(jsonData.results);
    };

    api();
  }, []);

  return (
    <div className="App">
      <h1>
        {result.map((value) => {
          return (
            <div>
              <div>{value.email}</div>
              <div>{value.gender}</div>
            </div>
          );
        })}
      </h1>
      <h2>Start editing to see some magic happen!</h2>
    </div>
  );
}
