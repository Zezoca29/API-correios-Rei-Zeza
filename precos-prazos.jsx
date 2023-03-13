import React, { useState } from 'react';
import axios from 'axios';

function PrecosEPrazos() {
  const [preco, setPreco] = useState(null);
  const [prazo, setPrazo] = useState(null);
  const [encomenda, setEncomenda] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const destino = event.target.elements.destino.value;
    const numeroEncomenda = event.target.elements['numero-encomenda'].value;

    try {
      const response = await axios.get(
        `https://api.postmon.com.br/v1/postal/${destino}`,
      );

      const { data } = response;

      const { preco, prazo } = await getPrecoEPrazo(
        numeroEncomenda,
        data.estado,
      );

      setEncomenda(numeroEncomenda);
      setPreco(preco);
      setPrazo(prazo);
    } catch (err) {
      setError('Erro ao buscar informações da encomenda.');
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const getPrecoEPrazo = async (numeroEncomenda, estadoDestino) => {
    const response = await axios.get(
      `https://cors-anywhere.herokuapp.com/http://ws.correios.com.br/calculador/CalcPrecoPrazo.asmx/CalcPrecoPrazo?nCdServico=40010&sCepOrigem=01101000&sCepDestino=${estadoDestino}&nVlPeso=1&nCdFormato=1&nVlComprimento=16&nVlAltura=5&nVlLargura=15&nVlDiametro=0&sCdMaoPropria=n&sCdAvisoRecebimento=n&nVlValorDeclarado=0,nCdEmpresa=&sDsSenha=&StrRetorno=xml`,
    );

    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(response.data, 'text/xml');

    const errorElement = xmlDoc.getElementsByTagName('Error');

    if (errorElement.length > 0) {
      throw new Error(errorElement[0].getElementsByTagName('MsgErro')[0].childNodes[0].nodeValue);
    }

    const preco = xmlDoc.getElementsByTagName('Valor')[0].childNodes[0].nodeValue;
    const prazo = xmlDoc.getElementsByTagName('PrazoEntrega')[0].childNodes[0].nodeValue;

    return { preco, prazo };
  };

  return (
    <div id="container">
      <h2>Preços e Prazos</h2>
      <div id="encomenda-form">
        <form onSubmit={handleSubmit}>
          <label htmlFor="destino">Destino:</label>
          <select id="destino" name="destino">
            <option value="SP">São Paulo</option>
            <option value="RJ">Rio de Janeiro</option>
            <option value="MG">Minas Gerais</option>
          </select>
          <label htmlFor="numero-encomenda">Número da Encomenda:</label>
          <input type="text" id="numero-encomenda" name="numero-encomenda" />
          <button type="submit">Calcular</button>
</form>
</div>
<div id="encomenda-result">
    {preco && prazo &&
      <table>
        <thead>
          <tr>
            <th>Preço</th>
            <th>Prazo de Entrega</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{preco}</td>
            <td>{prazo}</td>
          </tr>
        </tbody>
      </table>
    }
  </div>

  <div id="encomenda-result2">
    <table>
      <thead>
        <tr>
          <th>Destino</th>
          <th>Número da Encomenda</th>
          <th>Preço</th>
          <th>Prazo de Entrega</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>São Paulo</td>
          <td>1234567890</td>
          <td>R$ 25,00</td>
          <td>3 dias úteis</td>
        </tr>
        <tr>
          <td>Rio de Janeiro</td>
          <td>0987654321</td>
          <td>R$ 30,00</td>
          <td>4 dias úteis</td>
        </tr>
        <tr>
          <td>Belo Horizonte</td>
          <td>2468013579</td>
          <td>R$ 20,00</td>
          <td>2 dias úteis</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
);
}

export default PrecosEPrazos;
