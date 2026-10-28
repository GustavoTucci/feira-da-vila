import ListingCard from "./ListingCard.jsx";

export default function ListingGrid({ items, onTrade, hasActiveFilters, onResetFilters }) {
  if (items.length === 0) {
    return (
      <section className="empty-state" aria-live="polite">
        <span className="empty-illustration" aria-hidden="true">⌕</span>
        <p className="empty-kicker">{hasActiveFilters ? "NENHUMA BANCA ENCONTRADA" : "A FEIRA AINDA ESTÁ ABRINDO"}</p>
        <h3>{hasActiveFilters ? "Esse objeto ainda não apareceu por aqui." : "Não há anúncios para mostrar."}</h3>
        <p>{hasActiveFilters ? "Tente outro nome, personagem ou categoria." : "Volte em breve para encontrar novas histórias."}</p>
        {hasActiveFilters && <button onClick={onResetFilters}>Ver toda a feira</button>}
      </section>
    );
  }

  return (
    <section className="listing-grid" aria-label="Anúncios da feira">
      {items.map((listing) => (
        <ListingCard key={listing.id} listing={listing} onTrade={onTrade} />
      ))}
    </section>
  );
}
