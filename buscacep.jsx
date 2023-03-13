import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./style2.css";
import BuscaCep from "./BuscaCep";

function App() {
  const [cepInfo, setCepInfo] = useState(null);
  const [cepError, setCepError] = useState(false);

  const handleSearch = async (cep) => {
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();
      if (data.erro) {
        setCepError(true);
      } else {
        setCepInfo(data);
        setCepError(false);
      }
    } catch (error) {
      console.error(error);
      setCepError(true);
    }
  };

  const handleInputChange = (event) => {
    const { value } = event.target;
    if (value.length === 8) {
      handleSearch(value);
    } else {
      setCepInfo(null);
      setCepError(false);
    }
  };

  return (
    <div>
      <div className="header">
        <img src="./img/logoinova1.png" alt="Logo" />
      </div>
      <div className="container">
        <div className="box">
          <label htmlFor="cep-input">Digite o CEP:</label>
          <input
            type="text"
            id="cep-input"
            name="cep-input"
            maxLength="8"
            onChange={handleInputChange}
          />
        </div>
      </div>
      {cepError ? (
        <div className="error-message">CEP não encontrado.</div>
      ) : cepInfo ? (
        <BuscaCep cepInfo={cepInfo} />
      ) : null}
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
