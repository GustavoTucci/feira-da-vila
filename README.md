# Feira da Vila

Uma feira fictícia de trocas entre personagens da vizinhança. Cada objeto chega com uma história, um dono e uma ideia do que gostaria de encontrar em troca. Explore as bancas, procure um anúncio e experimente concluir uma troca.

Este projeto foi desenvolvido como atividade da Aula 09 para aplicar os conceitos de React estudados em sala.

## Funcionalidades

- Catálogo de objetos com nome, categoria, descrição, personagem e proposta de troca.
- Busca por nome do objeto, dono, descrição ou o que a pessoa procura.
- Filtros por categoria e por status: todos, à procura ou já trocados.
- Ação para concluir uma troca e reabrir um anúncio.
- Cadastro de um novo objeto, personagem e descrição, com escolha de um anúncio disponível para trocar.
- Troca combinada que cadastra o novo objeto e atualiza os dois anúncios; ao desfazê-la, os dois itens retornam à feira.
- Indicadores atualizados de anúncios disponíveis e trocados.
- Confirmação acessível para cada troca.
- Mensagem de estado vazio quando uma busca ou filtro não encontra anúncios.
- Layout responsivo com ilustrações, cores e identidade visual próprias.
- Navegação entre páginas com React Router (`/`, `/conceitos` e `/inspiracoes`).
- Consulta de CEP pela API pública ViaCEP com estados de carregamento e erro.

Os anúncios iniciais são fictícios e ficam no código. Os anúncios cadastrados e mudanças de status acontecem durante o uso da aplicação e voltam ao estado inicial ao recarregar a página. A consulta de CEP depende de conexão com a internet para acessar a ViaCEP.

## Conceitos da atividade

Além da feira interativa, as rotas **Conceitos** e **API** apresentam de forma visível onde cada conteúdo foi aplicado:

- **State e useState:** anúncios, filtros, formulário, toast e estados da página de API.
- **Formulários:** campos controlados, validação nativa e `onSubmit` para criar uma troca.
- **useEffect:** temporizador do aviso e carregamento assíncrono da API com cancelamento.
- **Consumo de APIs:** o ViaCEP é consultado com `fetch` para preencher endereços e localizar as bancas.
- **React Router:** `BrowserRouter`, `Routes`, `Route`, `NavLink` e `Link` organizam as páginas.
- JSX, componentes, props, listas com `key`, renderização condicional e Virtual DOM.

## Os seis conceitos da Aula 08

### 1. JSX

O JSX descreve a estrutura dos cartões, filtros, mensagens e demais partes da tela dentro dos componentes JavaScript. Expressões entre chaves mostram valores dos anúncios e resultados calculados, por exemplo `{listing.item}` e `{filteredItems.length}`.

### 2. Componentes

A interface é dividida em componentes com responsabilidades específicas:

- `Header`: apresenta o nome da feira e os totais.
- `MarketToolbar`: recebe os valores e ações da busca e dos filtros.
- `ListingGrid`: apresenta a lista ou o estado sem resultados.
- `ListingCard`: mostra os dados e o botão de troca de um anúncio.
- `NewTradeForm`: cadastra um objeto e permite escolher o anúncio da troca.
- `ToastMessage`: confirma a troca concluída ou o anúncio reaberto.
- `MarketIntro`: apresenta a feira e sua ilustração.
- `App`: coordena o estado e compõe a aplicação.

### 3. Props

O componente pai envia dados e funções para os filhos. `ListingGrid` recebe `items` e `onTrade`; por sua vez, cada `ListingCard` recebe o anúncio individual (`listing`) e a ação `onTrade`. `NewTradeForm` recebe os anúncios disponíveis e `onSubmit` para enviar os dados do produto novo e o item escolhido ao `App`. A barra de filtros também recebe valores atuais e funções para comunicar mudanças.

### 4. Virtual DOM

O Virtual DOM não é implementado manualmente pelo projeto; ele faz parte de como React coordena a renderização. Ao concluir uma troca, `App` cria um novo array com o status do anúncio atualizado. React calcula novamente a descrição da interface, reconcilia o resultado com a renderização anterior e aplica ao DOM as alterações necessárias — como o selo “Já trocou”, os contadores e os resultados que permanecem visíveis conforme os filtros.

**Otimização demonstrada:** não precisamos localizar o cartão com `querySelector()` nem reescrever seu texto, classe e contadores manualmente. Atualizamos os dados do estado e React coordena a atualização da interface declarada. Isso não significa que apenas um componente sempre renderize novamente; a atualização necessária depende da árvore e do estado da aplicação.

### 5. Listas e keys

Os anúncios são objetos em um array e a tela é construída com `map()`. Cada cartão recebe `key={listing.id}`. O formulário também monta as opções de troca com `map()` e utiliza o identificador do anúncio como `key`.

### 6. Renderização condicional

O status do anúncio determina a aparência e a ação disponível no cartão. A `ListingGrid` apresenta anúncios quando existem resultados ou uma mensagem adequada quando nenhum item corresponde à busca. O `ToastMessage` só aparece enquanto existe uma confirmação para exibir. O formulário só apresenta destinos ainda disponíveis; se todas as bancas estiverem ocupadas, informa essa situação.

## Organização dos arquivos

```text
projeto08/
├── docs/
│   └── CONCEITOS-DA-AULA.md
├── src/
│   ├── components/
│   ├── data/
│   ├── App.jsx
│   ├── main.jsx
│   └── styles.css
├── index.html
├── package.json
└── README.md
```

## Executar localmente

Requer Node.js 20.19+ ou 22.12+.

```bash
npm install
npm run dev
```

Para gerar e visualizar a versão de produção:

```bash
npm run build
npm run preview
```

## Referências de estudo

- [Projeto React usado como referência conceitual](https://github.com/deivisontakatu/projeto-react)
- [Aplicação usada como referência conceitual](https://projeto-react-five-swart.vercel.app/)
- [Documentação oficial: React — Learn](https://react.dev/learn)
