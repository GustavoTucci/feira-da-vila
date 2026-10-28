import { useEffect, useMemo, useState } from "react";
import Header from "./components/Header.jsx";
import ListingGrid from "./components/ListingGrid.jsx";
import MarketToolbar from "./components/MarketToolbar.jsx";
import NewTradeForm, { getNewListingDetails } from "./components/NewTradeForm.jsx";
import ToastMessage from "./components/ToastMessage.jsx";
import { listings as initialListings } from "./data/listings.js";

function MarketIntro({ availableCount }) {
  return (
    <section className="market-intro" id="inicio">
      <div className="intro-copy">
        <p className="eyebrow"><span className="eyebrow-star">✳</span> SÁBADO DE TROCAS · PRAÇA DA FIGUEIRA</p>
        <h1>O que é seu<br />pode virar <em>história.</em></h1>
        <p className="intro-description">
          Uma vitrola que procura novos discos. Uma muda que sonha com outro quintal.
          Encontre o próximo capítulo de cada objeto.
        </p>
        <a href="#bancas" className="intro-cta">Passear pelas bancas <span>↓</span></a>
      </div>
      <div className="market-illustration" aria-label="Ilustração de uma banca de feira">
        <div className="sun-shape" />
        <div className="market-weather">CLIMA DE HOJE <b>☀ 24°</b></div>
        <div className="string-lights" aria-hidden="true"><i /><i /><i /><i /><i /></div>
        <div className="awning">
          <span>FEIRA</span><span>DA</span><span>VILA</span>
        </div>
        <div className="stall-roof" />
        <div className="stall-front">
          <span className="stall-item stall-item--one">📚</span>
          <span className="stall-item stall-item--two">🪴</span>
          <span className="stall-item stall-item--three">📻</span>
          <span className="stall-crate" />
        </div>
        <div className="stall-leg stall-leg--left" />
        <div className="stall-leg stall-leg--right" />
        <div className="market-illustration-note"><span>01 / PRAÇA</span><span>troque, não descarte</span></div>
        <span className="illustration-spark illustration-spark--one">✳</span>
        <span className="illustration-spark illustration-spark--two">✴</span>
        <span className="illustration-count">{String(availableCount).padStart(2, "0")}<small> ACHADOS</small></span>
      </div>
      <div className="intro-bottom-line"><span>OBJETOS USADOS, HISTÓRIAS NOVAS</span><span>ROLE PARA ENCONTRAR O SEU ↘</span></div>
    </section>
  );
}

function App() {
  const [items, setItems] = useState(initialListings);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Todas");
  const [status, setStatus] = useState("all");
  const [toast, setToast] = useState("");
  const [isNewTradeOpen, setIsNewTradeOpen] = useState(false);

  useEffect(() => {
    if (!toast) return undefined;
    const timeoutId = window.setTimeout(() => setToast(""), 3200);
    return () => window.clearTimeout(timeoutId);
  }, [toast]);

  const availableCount = items.filter((item) => item.status === "available").length;
  const tradedCount = items.length - availableCount;

  const filteredItems = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase("pt-BR");
    return items.filter((item) => {
      const matchesCategory = category === "Todas" || item.category === category;
      const matchesStatus = status === "all" || item.status === status;
      const searchableText = `${item.item} ${item.owner} ${item.description} ${item.lookingFor} ${item.category}`
        .toLocaleLowerCase("pt-BR");
      return matchesCategory && matchesStatus && (!normalizedQuery || searchableText.includes(normalizedQuery));
    });
  }, [category, items, query, status]);

  function handleTrade(id) {
    const listing = items.find((item) => item.id === id);
    if (!listing) {
      console.error(`Não foi possível encontrar o anúncio ${id} para atualizar.`);
      return;
    }

    const nextStatus = listing.status === "available" ? "traded" : "available";
    const affectedIds = new Set([listing.id, listing.tradePartnerId].filter(Boolean));
    setItems((currentItems) =>
      currentItems.map((item) => {
        if (!affectedIds.has(item.id)) return item;
        if (nextStatus === "available" && item.tradePartnerId) {
          const { tradePartnerId, tradePartnerItem, ...reopenedListing } = item;
          return { ...reopenedListing, status: nextStatus };
        }
        return { ...item, status: nextStatus };
      }),
    );
    setToast(
      nextStatus === "traded"
        ? `Troca concluída! ${listing.item} ganhou uma nova história.`
        : `A troca de ${listing.item} foi desfeita. Os dois objetos voltaram à feira.`,
    );
  }

  function handleNewTrade({ owner, item, category: itemCategory, description, targetId }) {
    const target = items.find((listing) => listing.id === targetId);
    if (!target || target.status !== "available") {
      setToast("Esse anúncio não está mais disponível. Escolha outro objeto.");
      return;
    }

    const id = Math.max(0, ...items.map((listing) => listing.id)) + 1;
    const initials = owner.split(/\s+/).slice(0, 2).map((part) => part[0]).join("").toLocaleUpperCase("pt-BR");
    const { emoji, color } = getNewListingDetails(itemCategory);
    const newListing = {
      id,
      item,
      category: itemCategory,
      owner,
      initials,
      description,
      lookingFor: `Troco por ${target.item}.`,
      emoji,
      color,
      status: "traded",
      tradePartnerId: target.id,
    };

    setItems((currentItems) => [
      ...currentItems.map((listing) => (
        listing.id === target.id
        ? { ...listing, status: "traded", tradePartnerId: id, tradePartnerItem: item }
        : listing
      )),
      { ...newListing, tradePartnerItem: target.item },
    ]);
    setIsNewTradeOpen(false);
    setQuery("");
    setCategory("Todas");
    setStatus("all");
    setToast(`Troca concluída! ${item} e ${target.item} agora têm novos donos.`);
  }

  function resetFilters() {
    setQuery("");
    setCategory("Todas");
    setStatus("all");
  }

  return (
    <div className="page-shell">
      <Header availableCount={availableCount} tradedCount={tradedCount} />
      <main>
        <MarketIntro availableCount={availableCount} />
        <section className="market-section" id="bancas">
          <div className="section-heading">
            <div>
              <p className="eyebrow"><span className="eyebrow-star">✳</span> ANÚNCIOS DE VIZINHANÇA</p>
              <h2>As bancas <em>de hoje</em></h2>
            </div>
            <div className="section-heading-side">
              <p className="section-aside">Cada objeto tem uma história e uma pessoa esperando para começar a próxima.</p>
              <button
                className="start-trade-button"
                onClick={() => setIsNewTradeOpen((current) => !current)}
                aria-expanded={isNewTradeOpen}
                aria-controls={isNewTradeOpen ? "nova-troca" : undefined}
              >
                {isNewTradeOpen ? "Fechar formulário" : "＋ Começar uma troca"}
              </button>
            </div>
          </div>
          {isNewTradeOpen && (
            <NewTradeForm
              availableItems={items.filter((item) => item.status === "available")}
              onSubmit={handleNewTrade}
              onCancel={() => setIsNewTradeOpen(false)}
            />
          )}
          <MarketToolbar
            query={query}
            onQueryChange={setQuery}
            category={category}
            onCategoryChange={setCategory}
            status={status}
            onStatusChange={setStatus}
          />
          <div className="results-line" aria-live="polite">
            <span><b>{String(filteredItems.length).padStart(2, "0")}</b> {filteredItems.length === 1 ? "ANÚNCIO NA BANCA" : "ANÚNCIOS NA BANCA"}</span>
            <span>ENCONTRE POR NOME, PESSOA OU CATEGORIA</span>
          </div>
          <ListingGrid
            items={filteredItems}
            onTrade={handleTrade}
            hasActiveFilters={Boolean(query.trim()) || category !== "Todas" || status !== "all"}
            onResetFilters={resetFilters}
          />
        </section>
        <section className="market-note">
          <span className="market-note-star">✳</span>
          <div>
            <p className="eyebrow">UMA COMBINAÇÃO SIMPLES</p>
            <h2>Menos coisas paradas.<br /><em>Mais histórias circulando.</em></h2>
          </div>
          <p className="market-note-copy">A feira é fictícia. A ideia de dar uma nova vida ao que já existe pode acontecer em qualquer vizinhança.</p>
        </section>
      </main>
      <footer className="site-footer">
        <a className="footer-brand" href="#inicio">Feira <i>da</i> Vila <span>✳</span></a>
        <p>PROJETO DE ESTUDO · REACT · AULA 08</p>
        <a href="https://react.dev/learn" target="_blank" rel="noreferrer">continuar aprendendo ↗</a>
      </footer>
      <ToastMessage message={toast} onDismiss={() => setToast("")} />
    </div>
  );
}

export default App;
