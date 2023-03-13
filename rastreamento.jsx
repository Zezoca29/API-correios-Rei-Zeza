import React, { useState } from "react";
import axios from "axios";

function Rastreamento() {
  const [encomendas, setEncomendas] = useState([]);
  const [codigo, setCodigo] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get(
        `https://api.postmon.com.br/v1/rastreio/ect/${codigo}`
      );
      setEncomendas(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <html>
      <head>
        <meta charset="UTF-8" />
        <title>Rastreamento de Encomendas</title>
        <link rel="stylesheet" href="style3.css" />
      </head>
      <body>
        <div id="header">Rastreamento de Encomendas</div>
        <div id="table-container">
          <form onSubmit={handleSubmit}>
            <label htmlFor="codigo">Código de Rastreamento:</label>
            <input
              type="text"
              id="codigo"
              name="codigo"
              value={codigo}
              onChange={(event) => setCodigo(event.target.value)}
            />
            <button type="submit">Buscar</button>
          </form>
          <table>
            <thead>
              <tr>
                <th>Número do Pedido</th>
                <th>Destino</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {encomendas?.map((encomenda) => (
                <tr key={encomenda.codigo}>
                  <td>{encomenda.codigo}</td>
                  <td>{encomenda.local}</td>
                  <td>{encomenda.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </body>
    </html>
  );
}

export default Rastreamento;
