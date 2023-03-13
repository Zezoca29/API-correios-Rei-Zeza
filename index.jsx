import React from 'react';
import ReactDOM from 'react-dom';
import './style.css';

function App() {
return (
<div>
<div className="header">
<img src="./img/logoinova1" alt="Logo" />
</div>
<div className="container">
<div className="box">
<button className="btn" onClick={() => window.location.href='./paginas/buscacep.html'}>
<span>Buscar CEP</span>
</button>
</div>
<div className="box">
<button className="btn" onClick={() => window.location.href='./paginas/rastreamento.html'}>
<span>Rastreamento</span>
</button>
</div>
<div className="box">
<button className="btn" onClick={() => window.location.href='./paginas/calculo-frete.html'}>
<span>Cálculo de Frete</span>
</button>
</div>
<div className="box">
<button className="btn" onClick={() => window.location.href='./paginas/precos-prazos.html'}>
<span>Preços e Prazos</span>
</button>
</div>
</div>
</div>
);
}

ReactDOM.render(<App />, document.getElementById('root'));