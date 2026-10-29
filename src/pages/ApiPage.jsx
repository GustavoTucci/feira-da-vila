import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header.jsx";
import { lookupCep } from "../services/cep.js";
import { PageFooter } from "./ConceptsPage.jsx";

export default function ApiPage() {
  const [cep, setCep] = useState("");
  const [address, setAddress] = useState(null);
  const [status, setStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus("loading");
    setAddress(null);
    setErrorMessage("");

    try {
      const data = await lookupCep(cep);
      setAddress(data);
      setStatus("success");
    } catch (error) {
      setErrorMessage(error.message || "Não foi possível consultar o CEP.");
      setStatus("error");
    }
  }

  return (
    <div className="page-shell">
      <Header />
      <main className="information-page">
        <section className="page-hero page-hero--compact">
          <p className="eyebrow"><span className="eyebrow-star">✳</span> LOCALIZE SUA BANCA</p>
          <h1>De onde vem<br /><em>essa história?</em></h1>
          <p>Consulte um CEP pela ViaCEP e descubra o endereço da sua banca na feira.</p>
        </section>
        <form className="cep-page-form" onSubmit={handleSubmit}>
          <label className="form-field">
            <span>CONSULTE UM CEP</span>
            <div className="cep-input-row">
              <input
                inputMode="numeric"
                value={cep}
                onChange={(event) => {
                  setCep(event.target.value.replace(/\D/g, "").slice(0, 8));
                  setStatus("idle");
                  setErrorMessage("");
                }}
                placeholder="Ex.: 01001000"
                maxLength={8}
                required
              />
              <button type="submit" disabled={status === "loading"}>
                {status === "loading" ? "Consultando..." : "Consultar CEP"}
              </button>
            </div>
          </label>
        </form>
        {status === "error" && (
          <div className="api-feedback api-feedback--error" role="alert">
            <strong>Não foi possível localizar esse CEP.</strong>
            <span>{errorMessage}</span>
          </div>
        )}
        {status === "success" && address && (
          <article className="cep-result" aria-live="polite">
            <span className="listing-category">ENDEREÇO ENCONTRADO</span>
            <h2>{address.logradouro || "Logradouro não informado"}</h2>
            <p>{address.bairro || "Bairro não informado"}</p>
            <strong>{address.localidade}/{address.uf} · CEP {address.cep}</strong>
          </article>
        )}
        <Link className="back-link" to="/">← Voltar para a feira</Link>
      </main>
      <PageFooter />
    </div>
  );
}
