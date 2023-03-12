import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";




function App() {
    return (
        <Router>
            <html>
                <head>
                    <meta charset="UTF-8" />
                    <title>API dos Correios</title>
                    <style>
                        {`
body {
background-image: url("correios.jpg");
background-size: cover;
background-repeat: no-repeat;
background-position: center center;
}
      .header {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 80px;
        background-color: transparent;
        color: #fff;
        font-size: 36px;
        font-weight: bold;
      }

      .header img {
        width: 331px;
        height: 61px;
        margin: auto;
      }

      .container {
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        margin-top: 100px;
        flex-wrap: wrap;
      }

      .box {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 150px;
        height: 75px;
        border-radius: 10px;
        background-color: #3700ff;
        color: #2f00ff;
        font-size: 22px;
        font-weight: bold;
        box-shadow: 0px 0px 20px #000000;
        border: 6px solid #000000;
        transition: all 0.3s ease-in-out;
        box-shadow: 0px 0px 20px #000000;
      }

      .box:hover {
        transform: scale(1.1);
        border-color: #0026ff;
        background-color: #a003cf;
        color: #009dff;
      }

      .box p {
        margin-top: 20px;
        font-size: 16px;
        font-weight: bold;
      }

      .btn {
        border: none;
        background-color: transparent;
        font-size: 22px;
        font-weight: bold;
        color: #000000;
        cursor: pointer;
        font-family: 'Nunito Sans', sans-serif;
      }
    `}
                    </style>
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




