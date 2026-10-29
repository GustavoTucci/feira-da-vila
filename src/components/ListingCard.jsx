export default function ListingCard({ listing, onTrade }) {
  const isTraded = listing.status === "traded";

  return (
    <article className={`listing-card listing-card--${listing.color} ${isTraded ? "is-traded" : ""}`}>
      <div className="listing-art" aria-hidden="true">
        <span className="art-sticker">{listing.category}</span>
        <span className="art-emoji">{listing.emoji}</span>
        <span className="art-spark art-spark--one">✳</span>
        <span className="art-spark art-spark--two">✳</span>
        <span className="art-number">FEIRA Nº {String(listing.id).padStart(2, "0")}</span>
        {isTraded && <span className="traded-stamp">JÁ<br />TROCOU</span>}
      </div>
      <div className="listing-content">
        <div className="listing-title-row">
          <div>
            <span className="listing-category">{listing.category}</span>
            <h3>{listing.item}</h3>
          </div>
          <span className={`status-dot ${isTraded ? "status-dot--traded" : ""}`} title={isTraded ? "Troca concluída" : "Disponível"} />
        </div>
        <p className="listing-description">{listing.description}</p>
        <div className="owner-row">
          <span className={`owner-avatar owner-avatar--${listing.color}`}>{listing.initials}</span>
          <span>na banca de <strong>{listing.owner}</strong></span>
        </div>
        <div className="looking-for">
          <span>{isTraded && listing.tradePartnerItem ? "TROCOU POR" : "EM TROCA, PROCURA"}</span>
          <p>{isTraded && listing.tradePartnerItem ? listing.tradePartnerItem : listing.lookingFor}</p>
        </div>
        <button
          className={`trade-button ${isTraded ? "trade-button--done" : ""}`}
          onClick={() => onTrade(listing.id)}
          aria-label={isTraded ? `Reabrir anúncio de ${listing.item}` : `Concluir troca de ${listing.item}`}
        >
          {isTraded ? "Reabrir anúncio" : "Combinar esta troca"}
          <span aria-hidden="true">{isTraded ? "↺" : "↗"}</span>
        </button>
      </div>
    </article>
  );
}
