import { Link } from "react-router-dom";
import Header from "../components/Header.jsx";

const concepts = [
  ["01", "JSX", "A interface é descrita junto da lógica, com expressões que apresentam dados reais dos anúncios."],
  ["02", "Componentes", "A aplicação é dividida em Header, filtros, cartões, formulário e mensagens reutilizáveis."],
  ["03", "Props", "O componente pai envia dados e callbacks para os filhos, mantendo o fluxo previsível."],
  ["04", "State e useState", "Filtros, anúncios, formulário e avisos são estados que atualizam a tela sem manipular o DOM."],
  ["05", "Formulários", "O cadastro de troca usa campos controlados, validação nativa e envio com onSubmit."],
  ["06", "useEffect", "O aviso temporário e a busca de inspirações externas sincronizam a interface com efeitos."],
  ["07", "Consumo de APIs", "A rota de inspirações consulta produtos de uma API pública e trata loading e erros."],
  ["08", "React Router", "Rotas organizam a feira, esta página de conceitos e a página de API em URLs diferentes."],
  ["09", "Listas e keys", "Anúncios, filtros, conceitos e produtos são renderizados com map() e identificadores estáveis."],
  ["10", "Renderização condicional", "A interface alterna formulário, estados vazios, carregamento, erro e conteúdo conforme o estado."],
  ["11", "Virtual DOM", "As mudanças de estado descrevem a nova interface e o React reconcilia apenas o necessário."],
];

export default function ConceptsPage() {
  return (
    <div className="page-shell">
      <Header />
      <main className="information-page">
        <section className="page-hero">
          <p className="eyebrow"><span className="eyebrow-star">✳</span> GUIA DO PROJETO</p>
          <h1>React na prática,<br /><em>conceito por conceito.</em></h1>
          <p>Esta feira foi construída para demonstrar os conteúdos da atividade em uma experiência que pode ser explorada e alterada.</p>
        </section>
        <section className="concept-grid" aria-label="Conceitos aplicados">
          {concepts.map(([number, title, description]) => (
            <article className="concept-card" key={number}>
              <span className="concept-number">{number}</span>
              <h2>{title}</h2>
              <p>{description}</p>
            </article>
          ))}
        </section>
        <Link className="back-link" to="/">← Voltar para a feira</Link>
      </main>
      <PageFooter />
    </div>
  );
}

export function PageFooter() {
  return (
    <footer className="site-footer">
      <Link className="footer-brand" to="/">Feira <i>da</i> Vila <span>✳</span></Link>
      <p>PROJETO DE ESTUDO · REACT · AULA 09</p>
      <a href="https://react.dev/learn" target="_blank" rel="noreferrer">continuar aprendendo ↗</a>
    </footer>
  );
}
