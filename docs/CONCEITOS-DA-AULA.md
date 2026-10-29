# Feira da Vila — conceitos da Aula 09

Este documento relaciona as ideias estudadas em aula às decisões visíveis no projeto.

## JSX

Os arquivos `.jsx` descrevem a interface junto da lógica JavaScript. O catálogo usa expressões dentro de `{}` para apresentar o nome de cada personagem, status, totais e conteúdo encontrado pelos filtros. Os atributos seguem as convenções JSX, como `className`, `htmlFor` (quando necessário) e eventos como `onClick`.

## Componentes e composição

`App` organiza a página e combina `Header`, `MarketIntro`, `MarketToolbar`, `ListingGrid` e `ToastMessage`. Cada anúncio é apresentado por `ListingCard`; `ListingGrid` decide se mostra a lista ou uma mensagem vazia. Essa composição em árvore separa responsabilidades e permite reutilizar a estrutura do cartão para todos os dados.

## Props: dados e ações

Os dados fluem do componente que mantém o estado para os componentes que os apresentam:

- `Header` recebe as quantidades de itens disponíveis e trocados.
- `MarketToolbar` recebe os filtros atuais e funções para solicitar mudanças.
- `ListingGrid` recebe a lista filtrada e a ação de troca.
- Cada `ListingCard` recebe seu próprio objeto (`listing`) e comunica a intenção de troca por `onTrade`.
- `NewTradeForm` recebe a lista de anúncios disponíveis e envia o novo objeto e o destino escolhido por `onSubmit`.
- `ToastMessage` recebe uma mensagem e a função para dispensá-la.

Assim, os filhos apresentam dados e comunicam ações por callbacks, enquanto `App` coordena a coleção.

## Estado, arrays e atualização imutável

`useState` mantém a coleção de anúncios, a busca, a categoria, o status selecionado, o formulário e o aviso temporário. Ao cadastrar uma troca, a aplicação cria um novo anúncio e atualiza o estado do objeto escolhido em uma nova coleção. Os itens originais não são modificados diretamente.

## Listas e keys

O array de anúncios é filtrado e transformado em cartões por `map()`. Cada cartão usa `key={listing.id}`. O seletor de destino do formulário também é construído com `map()` e keys estáveis. O identificador mantém a identidade do anúncio quando seu status se altera ou a coleção visível é filtrada.

## Renderização condicional

- O cartão muda sua apresentação e seu botão de acordo com `listing.status`.
- O formulário mostra somente produtos ainda disponíveis como opções de troca.
- A lista mostra os cartões encontrados ou uma mensagem contextual sem resultados.
- A confirmação de troca só existe enquanto `toast` contém uma mensagem.
- Busca, categoria e status são combinados para determinar quais registros serão exibidos.

## Virtual DOM: o que foi otimizado

React permite declarar como a tela deve ser para cada estado, em vez de modificar os nós HTML manualmente. Quando `handleTrade()` ou `handleNewTrade()` muda o estado, React recalcula a descrição da interface e reconcilia essa descrição com a anterior. As mudanças necessárias são aplicadas ao DOM, incluindo o status dos anúncios envolvidos, os totais do cabeçalho e os resultados do filtro.

O ganho demonstrado é evitar sincronizar manualmente esses elementos em diferentes partes da página. O projeto não usa `document.querySelector()`, `innerHTML` ou `textContent` para atualizar o anúncio. A reconciliação escolhe quais alterações realizar, mas isso não deve ser descrito como garantia de que somente o cartão alterado renderizará.

## Fluxo de uma troca

1. A pessoa escolhe “Começar uma troca” e preenche os dados do próprio objeto.
2. O formulário mostra somente objetos de outros personagens que ainda estão disponíveis.
3. A pessoa escolhe o item que deseja receber e confirma a troca.
4. `App` cria o novo anúncio e associa os identificadores dos dois objetos.
5. Ambos passam para o status `traded`; cartões, totais e avisos são atualizados.
6. Se a troca for desfeita por um dos cartões, os dois objetos voltam a ficar disponíveis e a associação é removida.

## React Router

`main.jsx` envolve a aplicação com `BrowserRouter`. O componente `App` define três rotas:

- `/`: feira interativa;
- `/conceitos`: explicação dos conteúdos aplicados;
- `/inspiracoes`: dados vindos de uma API externa.

`NavLink` mantém a navegação no cabeçalho sem recarregar a página, enquanto `Link` oferece retornos internos nas páginas de conteúdo.

## Formulário e useEffect

`NewTradeForm` usa campos controlados por `useState`, validação nativa do navegador e `onSubmit`. Em `App`, outro `useEffect` controla a duração do aviso temporário.

## Consumo de API

`ApiPage` consulta a ViaCEP com `fetch` quando o usuário envia um CEP. O formulário de nova troca também consulta o CEP ao clicar em “Buscar” e salva o endereço retornado junto do novo anúncio. A interface possui estados explícitos de carregamento, sucesso e erro, e valida o CEP antes de exibir o endereço.
