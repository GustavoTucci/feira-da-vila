import { useState } from "react";
import { categories } from "../data/listings.js";

const emojisByCategory = {
  Música: "🎵",
  Plantas: "🪴",
  Livros: "📚",
  Fotografia: "📷",
  Jogos: "🎲",
  Casa: "🏺",
  Aventura: "🧭",
  Arte: "🎨",
};

const colorsByCategory = {
  Música: "blue",
  Plantas: "green",
  Livros: "yellow",
  Fotografia: "pink",
  Jogos: "purple",
  Casa: "orange",
  Aventura: "green",
  Arte: "pink",
};

export default function NewTradeForm({ availableItems, onSubmit, onCancel }) {
  const [owner, setOwner] = useState("");
  const [item, setItem] = useState("");
  const [category, setCategory] = useState("Casa");
  const [description, setDescription] = useState("");
  const [targetId, setTargetId] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    if (!targetId) return;

    onSubmit({
      owner: owner.trim(),
      item: item.trim(),
      category,
      description: description.trim(),
      targetId: Number(targetId),
    });
  }

  return (
    <section className="new-trade-panel" id="nova-troca" aria-labelledby="new-trade-title">
      <div className="new-trade-heading">
        <div>
          <p className="eyebrow"><span className="eyebrow-star">✳</span> SUA BANCA COMEÇA AQUI</p>
          <h3 id="new-trade-title">Traga uma coisa.<br /><em>Leve outra história.</em></h3>
          <p className="new-trade-intro">
            Conte o que você trouxe e escolha um anúncio disponível para combinar a troca.
          </p>
        </div>
        <button className="form-close" type="button" onClick={onCancel} aria-label="Fechar formulário">×</button>
      </div>

      {availableItems.length === 0 ? (
        <div className="no-trade-targets" role="status">
          <span>✳</span>
          <p>Todas as bancas já encontraram uma combinação. Volte quando um anúncio estiver disponível.</p>
          <button type="button" onClick={onCancel}>Voltar para a feira</button>
        </div>
      ) : (
        <form className="new-trade-form" onSubmit={handleSubmit}>
          <div className="form-fields">
            <label className="form-field">
              <span>SEU NOME</span>
              <input
                autoComplete="name"
                value={owner}
                onChange={(event) => setOwner(event.target.value)}
                placeholder="Como a vizinhança te conhece?"
                maxLength={36}
                required
              />
            </label>
            <label className="form-field">
              <span>O QUE VOCÊ TROUXE?</span>
              <input
                value={item}
                onChange={(event) => setItem(event.target.value)}
                placeholder="Ex.: Uma luminária antiga"
                maxLength={48}
                required
              />
            </label>
            <label className="form-field">
              <span>CATEGORIA</span>
              <select value={category} onChange={(event) => setCategory(event.target.value)}>
                {categories.filter((option) => option !== "Todas").map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </label>
            <label className="form-field form-field--wide">
              <span>UM POUCO DA HISTÓRIA</span>
              <textarea
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                placeholder="Conte algo especial sobre o seu objeto."
                maxLength={120}
                rows={2}
                required
              />
            </label>
          </div>

          <fieldset className="target-picker">
            <legend>QUAL OBJETO VOCÊ QUER LEVAR?</legend>
            <p>Escolha uma banca. O item escolhido e o seu serão trocados juntos.</p>
            <div className="target-options">
              {availableItems.map((target) => (
                <label
                  className={`target-option ${Number(targetId) === target.id ? "is-selected" : ""}`}
                  key={target.id}
                >
                  <input
                    type="radio"
                    name="targetListing"
                    value={target.id}
                    checked={Number(targetId) === target.id}
                    onChange={(event) => setTargetId(event.target.value)}
                    required
                  />
                  <span className={`target-emoji target-emoji--${target.color}`} aria-hidden="true">{target.emoji}</span>
                  <span className="target-copy">
                    <strong>{target.item}</strong>
                    <small>{target.owner} · {target.category}</small>
                  </span>
                  <span className="target-check" aria-hidden="true">{Number(targetId) === target.id ? "✓" : ""}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <div className="form-footer">
            <p>Os dois anúncios ficarão marcados como trocados.</p>
            <div>
              <button className="form-cancel" type="button" onClick={onCancel}>Agora não</button>
              <button
                className="form-submit"
                type="submit"
                disabled={!targetId || availableItems.length === 0}
              >
                Confirmar troca <span aria-hidden="true">↗</span>
              </button>
            </div>
          </div>
        </form>
      )}
    </section>
  );
}

export function getNewListingDetails(category) {
  return {
    emoji: emojisByCategory[category] ?? "🎁",
    color: colorsByCategory[category] ?? "yellow",
  };
}
