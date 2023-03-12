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





