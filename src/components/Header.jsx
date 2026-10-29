import { NavLink } from "react-router-dom";

export default function Header({ availableCount, tradedCount }) {
  return (
    <header className="site-header">
      <NavLink className="brand" to="/" aria-label="Feira da Vila, início">
        <span className="brand-stamp" aria-hidden="true">FV</span>
        <span className="brand-title">Feira <i>da</i> Vila</span>
      </NavLink>
      <p className="header-note">objetos com passado,<br />novas histórias pela frente</p>
      <nav className="main-nav" aria-label="Navegação principal">
        <NavLink to="/" end>Feira</NavLink>
        <NavLink to="/conceitos">Conceitos</NavLink>
        <NavLink to="/inspiracoes">API</NavLink>
      </nav>
      {Number.isFinite(availableCount) && Number.isFinite(tradedCount) && (
        <div className="market-counts" aria-label="Resumo da feira">
          <span><b>{String(availableCount).padStart(2, "0")}</b> disponíveis</span>
          <span className="count-divider">/</span>
          <span><b>{String(tradedCount).padStart(2, "0")}</b> trocados</span>
        </div>
      )}
    </header>
  );
}
