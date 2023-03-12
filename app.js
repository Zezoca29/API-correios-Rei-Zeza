import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import './style.css';



function App() {
    return (
        <Router>
            <html>
                <head>
                    <meta charset="UTF-8" />
                    <title>API dos Correios</title>

                </head>

                <body>
                    <div className="header">
                        <img src="logoinova1.png" />
                    </div>

                    <div className="container">
                        <div className="box">
                            <Link to="/cep" className="btn">
                                <span>Buscar CEP</span>
                            </Link>
                        </div>

                        <div className="box">
                            <button className="btn">
                                <span>Rastreamento</span>
                            </button>
                        </div>
                        <div className="box">
                            <button className="btn">
                                <span>Cálculo de Frete</span>
                            </button>
                        </div>
                        <div className="box">
                            <button className="btn">
                                <span>Preços e Prazos</span>
                            </button>
                        </div>
                    </div>
                    <Switch>
                        <Route path="/cep" component={'Buscar Cep'} />
                    </Switch>
                    <script src="https://unpkg.com/react@17.0.2/umd/react.development.js"></script>
                    <script src="https://unpkg.com/react-dom@17.0.2/umd/react-dom.development.js"></script>
                    <script type="module" src="app.js"></script>
                </body>
            </html>
        </Router>
    );
}



export default App;







ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
);


const apiKey = "SUA_CHAVE_DE_API_AQUI";
const rastreioUrl = "https://api-segmento-de-mercado.com/rastreamento/";

function App() {
    const [peso, setPeso] = useState('');
    const [comprimento, setComprimento] = useState('');
    const [largura, setLargura] = useState('');
    const [altura, setAltura] = useState('');
    const [valorDeclarado, setValorDeclarado] = useState('');
    const [resultadoFrete, setResultadoFrete] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    function handleBuscarCepClick() {
        const cep = prompt("Digite o CEP que deseja buscar:");
        const regex = /^[0-9]{8}$/;
        if (regex.test(cep)) {
            fetch(`https://viacep.com.br/ws/${cep}/json/`)
                .then((response) => response.json())
                .then((data) => {
                    alert(`CEP: ${data.cep}\nLogradouro: ${data.logradouro}\nComplemento: ${data.complemento}\nBairro: ${data.bairro}\nCidade: ${data.localidade}\nEstado: ${data.uf}\nIBGE: ${data.ibge}\nGIA: ${data.gia}\nDDD: ${data.ddd}\nSIAFI: ${data.siafi}`);
                })
                .catch((error) => {
                    alert("Não foi possível buscar o CEP.");
                });
        } else {
            alert("CEP inválido!");
        }
    }

    function handleLogoutClick() {
        setIsLoggedIn(false);
    }

    function handleLogin(event) {
        event.preventDefault();
        const senhaInput = document.querySelector("#senha-input");
        if (senhaInput.value === "Inova1") {
            setIsLoggedIn(true);
        } else {
            alert("Senha incorreta!");
        }
    }

    function handleRastrearObjetoClick() {
        const objeto = prompt("Digite o número do objeto que deseja rastrear:");
        fetch(`${rastreioUrl}?objeto=${objeto}&apiKey=${apiKey}`)
            .then((response) => response.json())
            .then((data) => {
                alert(`Status atual do objeto ${objeto}: ${data.status}`);
            })
            .catch((error) => {
                alert("Não foi possível rastrear o objeto.");
            });
    }

    function handleCalcularFreteClick() {
        const cep = prompt("Digite o CEP de destino:");

        // Verifica se os campos de entrada estão preenchidos
        if (!peso || !comprimento || !largura || !altura || !valorDeclarado) {
            alert("Por favor, preencha todos os campos de entrada.");
            return;
        }

        // Cria o objeto de parâmetros da requisição
        const params = new URLSearchParams({
            nCdEmpresa: "",
            sDsSenha: "",
            sCepOrigem: "01000-000",
            sCepDestino: cep,
            nVlPeso: peso,
            nVlComprimento: comprimento,
            nVlLargura: largura,
            nVlAltura: altura,
            nVlValorDeclarado: valorDeclarado,
            sCdMaoPropria: "n",
            sCdAvisoRecebimento: "n",
            nCdServico: "40010,41106",
            nVlDiametro: 0,
            StrRetorno: "xml",
        });

        // Cria a URL da requisição
        const url = `http://ws.correios.com.br/calculador/CalcPrecoPrazo.aspx?${params}`;

        // Faz a requisição
        fetch(url)
            .then((response) => response.text())
            .then((data) => {
                // Faz o parsing do XML retornado pela API dos Correios
                const parser = new DOMParser();
                const xml = parser.parseFromString(data, "application/xml");
                const valorNode = xml.querySelector("Valor");
                const prazoNode = xml.querySelector("PrazoEntrega");

                if (!valorNode || !prazoNode) {
                    throw new Error("Resposta inválida do servidor");
                }

                const valorFrete = parseFloat(valorNode.textContent.replace(",", "."));
                const prazoEntrega = parseInt(prazoNode.textContent);

                // Atualiza o estado com o resultado
                setResultadoFrete(
                    `Valor do frete: R$ ${valorFrete.toFixed(2)}. Prazo de entrega: ${prazoEntrega} dias úteis.`
                );
            })
            .catch((error) => {
                alert("Não foi possível calcular o frete.");
            });
    }

}
