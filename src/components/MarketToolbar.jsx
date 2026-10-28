import { categories } from "../data/listings.js";

export default function MarketToolbar({
  query,
  onQueryChange,
  category,
  onCategoryChange,
  status,
  onStatusChange,
}) {
  return (
    <section className="market-toolbar" aria-label="Buscar e filtrar anúncios">
      <label className="search-box">
        <span className="search-icon" aria-hidden="true">⌕</span>
        <input
          type="search"
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="O que você está procurando?"
          aria-label="Buscar objeto ou personagem"
        />
        {query && (
          <button className="clear-search" onClick={() => onQueryChange("")} aria-label="Limpar busca">
            ×
          </button>
        )}
      </label>
      <div className="filter-row">
        <div className="category-filters" aria-label="Filtrar por categoria">
          {categories.map((option) => (
            <button
              key={option}
              className={`filter-chip ${category === option ? "is-active" : ""}`}
              onClick={() => onCategoryChange(option)}
              aria-pressed={category === option}
            >
              {option}
            </button>
          ))}
        </div>
        <div className="status-switch" aria-label="Filtrar por status">
          {[
            { value: "all", label: "Tudo" },
            { value: "available", label: "À procura" },
            { value: "traded", label: "Já trocados" },
          ].map((option) => (
            <button
              key={option.value}
              className={status === option.value ? "is-active" : ""}
              onClick={() => onStatusChange(option.value)}
              aria-pressed={status === option.value}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
