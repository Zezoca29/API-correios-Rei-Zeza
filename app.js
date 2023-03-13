import axios from 'axios';
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './style.css';

function App() {
  const [data, setData] = useState(null);

  async function fetchData(endpoint) {
    try {
      const response = await axios.get(endpoint);
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <div className="header">
        <img src="./img/logoinova1.png" alt="Logo" />
      </div>
      <div className="container">
        <div className="box">
          <button className="btn" onClick={() => fetchData('https://api-dos-correios/busca-cep')}>
            <span>Buscar CEP</span>
          </button>
        </div>
        <div className="box">
          <button className="btn" onClick={() => fetchData('https://api-dos-correios/rastreamento')}>
            <span>Rastreamento</span>
          </button>
        </div>
        <div className="box">
          <button className="btn" onClick={() => fetchData('https://api-dos-correios/calculo-frete')}>
            <span>Cálculo de Frete</span>
          </button>
        </div>
        <div className="box">
          <button className="btn" onClick={() => fetchData('https://api-dos-correios/precos-prazos')}>
            <span>Preços e Prazos</span>
          </button>
        </div>
      </div>
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
