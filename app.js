import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './style.css';
const apiKey = "SUA_CHAVE_DE_API_AQUI";

function App() {
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);
    const [encomendas, setEncomendas] = React.useState([]);
    const [vendedorSelecionado, setVendedorSelecionado] = React.useState("todos");

    async function getEncomendas() {
        const response = await fetch(`sua-api-aqui?key=${apiKey}`);
        const data = await response.json();
        return data.encomendas;
    }

    function filterEncomendasPorVendedor(encomendas, vendedor) {
        return encomendas.filter((encomenda) => {
            if (vendedor === "todos") {
                return true;
            } else {
                return encomenda.vendedor === vendedor;
            }
        });
    }

    function handleLogin(event) {
        event.preventDefault();
        const senhaInput = document.querySelector("#senha-input");
        if (senhaInput.value === "Inova1") {
            setIsLoggedIn(true);
            getEncomendas().then((data) => {
                setEncomendas(filterEncomendasPorVendedor(data, vendedorSelecionado));
            });
        } else {
            alert("Senha incorreta!");
        }
    }

    function handleVendedorChange(event) {
        setVendedorSelecionado(event.target.value);
    }

    function handleLogoutClick() {
        setIsLoggedIn(false);
        setEncomendas([]);
    }

    React.useEffect(() => {
        if (isLoggedIn) {
            getEncomendas().then((data) => {
                setEncomendas(filterEncomendasPorVendedor(data, vendedorSelecionado));
            });
        }
    }, [isLoggedIn, vendedorSelecionado]);

    return (
        <>
            <h1>Minhas Encomendas</h1>
            <form onSubmit={handleLogin}>
                <label htmlFor="senha-input">Digite a senha:</label>
                <input type="password" id="senha-input" />
                <button type="submit">Entrar</button>
            </form>
            {isLoggedIn ? (
                <>
                    <p>Olá, usuário!</p>
                    <p>Filtrar por vendedor:</p>
                    <select value={vendedorSelecionado} onChange={handleVendedorChange}>
                        <option value="todos">Todos</option>
                        <option value="João">João</option>
                        <option value="Maria">Maria</option>
                        <option value="Pedro">Pedro</option>
                    </select>
                    <table>
                        <thead>
                            <tr>
                                <th>Cliente</th>
                                <th>Produto</th>
                                <th>Vendedor</th>
                                <th>Data</th>
                            </tr>
                        </thead>
                        <tbody>
                            {encomendas.map((encomenda) => (
                                <tr key={encomenda.id}>
                                    <td>{encomenda.cliente}</td>
                                    <td>{encomenda.produto}</td>
                                    <td>{encomenda.vendedor}</td>
                                    <td>{encomenda.data}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <button onClick={handleLogoutClick}>Sair</button>
                </>
            ) : null}
        </>
    );
}

ReactDOM.render(<App />, document.getElementById("root"));