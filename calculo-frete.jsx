import React, { useState } from "react";
import "./style4.css";

function App() {
  const [cepOrigem, setCepOrigem] = useState("");
  const [cepDestino, setCepDestino] = useState("");
  const [peso, setPeso] = useState("");
  const [servico, setServico] = useState("sedex");
  const [resultadoFrete, setResultadoFrete] = useState("");

  const handleCalcFrete = async () => {
    const response = await fetch(
      `https://cors-anywhere.herokuapp.com/http://ws.correios.com.br/calculador/CalcPrecoPrazo.aspx?nCdEmpresa=&sDsSenha=&sCepOrigem=${cepOrigem}&sCepDestino=${cepDestino}&nVlPeso=${peso}&nCdFormato=1&nVlComprimento=16&nVlAltura=5&nVlLargura=15&sCdMaoPropria=n&sCdAvisoRecebimento=n&nVlValorDeclarado=0&sCdServico=${servico}&nVlDiametro=0&StrRetorno=xml&nIndicaCalculo=3`
    );

    const data = await response.text();

    const parser = new DOMParser();
    const xml = parser.parseFromString(data, "text/xml");

    const erro = xml.getElementsByTagName("codigo")[0].childNodes[0].nodeValue;
    if (erro !== "0") {
      setResultadoFrete("Erro ao calcular o frete.");
      return;
    }

    const valorFrete = xml.getElementsByTagName("Valor")[0].childNodes[0].nodeValue;
    setResultadoFrete(`Valor do frete: R$ ${valorFrete}`);
  };

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Cálculo de Frete</h1>
      <div id="container">
        <label htmlFor="cep-origem">CEP de origem:</label>
        <input
          type="text"
          id="cep-origem"
          name="cep-origem"
          value={cepOrigem}
          onChange={(e) => setCepOrigem(e.target.value)}
        />

        <label htmlFor="cep-destino">CEP de destino:</label>
        <input
          type="text"
          id="cep-destino"
          name="cep-destino"
          value={cepDestino}
          onChange={(e) => setCepDestino(e.target.value)}
        />

        <label htmlFor="peso">Peso da encomenda (em kg):</label>
        <input
          type="text"
          id="peso"
          name="peso"
          value={peso}
          onChange={(e) => setPeso(e.target.value)}
        />

        <label htmlFor="servico">Tipo de serviço:</label>
        <select id="servico" name="servico" value={servico} onChange={(e) => setServico(e.target.value)}>
          <option value="sedex">SEDEX</option>
          <option value="pac">PAC</option>
          <option value="transportadora">Transportadora</option>
        </select>

        <button id="calcular-frete" onClick={handleCalcFrete}>
          Calcular Frete
        </button>

        <div id="resultado-frete">{resultadoFrete}</div>
      </div>
    </div>
  );
}
