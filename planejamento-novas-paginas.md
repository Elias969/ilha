# Planejamento: Expansão do Site Ilha das Lendas

## 1. Introdução

Este documento detalha o planejamento para a expansão do site Ilha das Lendas, incorporando novas páginas e funcionalidades sugeridas para aumentar o engajamento da comunidade e oferecer mais valor aos fãs. O objetivo é integrar essas novas seções de forma coesa com a estrutura e o design visual existentes.

## 2. Estrutura Geral e Navegação

- **Layout Consistente**: Todas as novas páginas utilizarão o `Layout.tsx` existente, garantindo a presença do `Navbar` e `Footer` e mantendo a consistência visual.
- **Atualização da Navegação**: Os links para as novas páginas principais (Loja, Cartinhas, VODs, Blog, Torneios, Guias) serão adicionados ao `Navbar`. Páginas como Fórum, Parcerias e Área de Membros podem ser agrupadas em um submenu "Comunidade" ou similar, ou ter links no Footer/páginas específicas.
- **Componentes Reutilizáveis**: Utilizaremos os componentes definidos em `UIComponents.tsx` (Card, Button, SectionTitle, etc.) e o esquema de cores de `tailwind.config.js` para manter a identidade visual.
- **Responsividade**: Todas as novas páginas serão desenvolvidas com foco em responsividade, garantindo boa experiência em desktops, tablets e mobile.
- **Animações**: Manteremos o padrão de animações sutis (`framer-motion`, `useInView`) para carregamento de seções e interações, como a `selection-line-animated`.

## 3. Detalhamento por Página

### 3.1. Loja (Merch)

- **Propósito**: Vender produtos oficiais da marca Ilha das Lendas.
- **Rota**: `/loja`
- **Layout**: Grade responsiva exibindo os produtos.
- **Componentes Principais**:
    - `ProductCard`: Exibe imagem do produto, nome, preço e botão "Adicionar ao Carrinho". Usará o componente `Card` como base.
    - `Filtros`: Botões ou dropdowns para filtrar por categoria (camisetas, moletons, acessórios) e tamanho.
    - `Carrinho`: Ícone no Navbar indicando o número de itens (funcionalidade básica inicial, sem checkout completo).
- **Visuals**: Imagens de alta qualidade dos produtos (mockups). Design limpo e direto.
- **Dados**: Mock data para produtos (nome, preço, imagem, descrição).

### 3.2. Seção de Cartinhas

- **Propósito**: Apresentar o programa de cartinhas, permitir visualização e (futuramente) coleção.
- **Rota**: `/cartinhas`
- **Layout**: Galeria de cartinhas com filtros, talvez uma seção "Minha Coleção" (simulada).
- **Componentes Principais**:
    - `CardComponent`: Componente específico para exibir a cartinha (imagem, nome, raridade, atributos). Animações especiais para raridades altas.
    - `Filtros/Busca`: Filtrar por raridade, membro da Ilha, tipo.
    - `Ranking (Opcional)`: Tabela simples exibindo um ranking fictício.
- **Visuals**: Usar imagens demonstrativas de cartinhas (a serem buscadas). Efeitos visuais para destacar raridades.
- **Dados**: Mock data para cartinhas (nome, imagem, raridade, descrição).

### 3.3. Hub de VODs/Replays

- **Propósito**: Biblioteca organizada de vídeos passados (reacts, gameplays, etc.).
- **Rota**: `/videos` ou `/vods`
- **Layout**: Grade de miniaturas de vídeos.
- **Componentes Principais**:
    - `VideoCard`: Miniatura, título, descrição curta, data, tipo (React, Gameplay). Link para a plataforma original (YouTube/Twitch).
    - `Barra de Busca`: Pesquisar vídeos por título ou palavra-chave.
    - `Filtros`: Botões para filtrar por tipo de conteúdo.
    - `Paginação`: Para lidar com grande quantidade de vídeos.
- **Visuals**: Miniaturas chamativas. Layout limpo e fácil de navegar.
- **Dados**: Mock data para vídeos (título, thumbnail, link, tipo, data).

### 3.4. Fórum da Comunidade

- **Propósito**: Espaço para discussão e interação entre fãs.
- **Rota**: `/forum`
- **Layout**: Página inicial com lista de categorias/tópicos recentes. Página de visualização de tópico com posts.
- **Componentes Principais**:
    - `TopicListItem`: Exibe título do tópico, autor, data da última postagem, número de respostas.
    - `PostComponent`: Exibe conteúdo da postagem, autor (avatar, nome), data.
    - `Formulários`: Simples (sem funcionalidade real inicialmente) para criar tópico e responder.
- **Visuals**: Layout claro e organizado, focado na legibilidade.
- **Dados**: Mock data para tópicos e posts.

### 3.5. Página de Parcerias/Patrocinadores

- **Propósito**: Destacar marcas parceiras e patrocinadores.
- **Rota**: `/parcerias`
- **Layout**: Seções dedicadas a cada parceiro, com logo e descrição.
- **Componentes Principais**:
    - `PartnerCard`: Logo do parceiro, breve descrição da parceria, link para o site do parceiro.
- **Visuals**: Design profissional, logos em destaque.
- **Dados**: Mock data para parceiros (nome, logo, descrição, link).

### 3.6. Blog/Notícias

- **Propósito**: Publicar artigos, notícias sobre LoL, atualizações da Ilha.
- **Rota**: `/blog`
- **Layout**: Página inicial com lista de posts recentes (imagem, título, resumo). Página de leitura do post completo.
- **Componentes Principais**:
    - `BlogPostCard`: Imagem de destaque, título, resumo, autor, data.
    - `ArticleView`: Conteúdo completo do post, formatado para leitura.
    - `Categorias/Tags`: Para organizar os posts.
- **Visuals**: Foco na legibilidade, bom uso de imagens.
- **Dados**: Mock data para posts (título, conteúdo, imagem, autor, data).

### 3.7. Área de Membros Premium

- **Propósito**: Oferecer conteúdo e benefícios exclusivos para membros pagantes (simulado).
- **Rota**: `/membros` ou `/premium`
- **Layout**: Painel com seções de conteúdo exclusivo, benefícios.
- **Componentes Principais**:
    - `Login/Registro (Simulado)`: Botões indicando a necessidade de login/assinatura.
    - `ExclusiveContentCard`: Card indicando conteúdo bloqueado, com chamada para assinatura.
    - `BenefitsList`: Lista dos benefícios de ser membro premium.
- **Visuals**: Clara distinção visual entre conteúdo gratuito e pago.
- **Dados**: Mock data para benefícios e exemplos de conteúdo exclusivo.

### 3.8. Página de Torneios

- **Propósito**: Organizar e divulgar torneios da comunidade.
- **Rota**: `/torneios`
- **Layout**: Lista de torneios (próximos, em andamento, passados). Página de detalhes do torneio.
- **Componentes Principais**:
    - `TournamentCard`: Nome do torneio, data, status, prêmio (se houver).
    - `TournamentDetails`: Regras, formato, lista de participantes/times, chaveamento (bracket - inicialmente estático).
    - `Botão de Inscrição (Simulado)`.
- **Visuals**: Chaveamento visual claro (mesmo que estático inicialmente).
- **Dados**: Mock data para torneios (nome, datas, regras, participantes).

### 3.9. Integração com Discord

- **Propósito**: Facilitar o acesso e promover o servidor do Discord.
- **Implementação**: Widget no Footer ou em uma seção específica (ex: na página de Comunidade ou Canais).
- **Componentes Principais**:
    - `DiscordWidget (Simulado)`: Exibe nome do servidor, número de membros online/total (estático inicialmente), botão "Entrar no Servidor".
- **Visuals**: Usar cores e logo do Discord.
- **Dados**: Link do convite do Discord, números fictícios de membros.

### 3.10. Seção de Guias e Tutoriais

- **Propósito**: Conteúdo educativo sobre League of Legends.
- **Rota**: `/guias`
- **Layout**: Página com categorias de guias. Lista de guias dentro de cada categoria. Página de leitura do guia.
- **Componentes Principais**:
    - `GuideCategorySection`: Agrupa guias por tema (Campeões, Roles, Estratégias).
    - `GuideCard`: Título do guia, autor, nível de dificuldade (iniciante, intermediário, avançado).
    - `GuideView`: Conteúdo do guia (texto, imagens, vídeos incorporados).
- **Visuals**: Estrutura clara, fácil de seguir.
- **Dados**: Mock data para guias (título, conteúdo, categoria, autor).

## 4. Considerações Técnicas

- **Roteamento**: Configurar as novas rotas no sistema de roteamento do React (provavelmente React Router DOM, a ser verificado/instalado se necessário).
- **Gerenciamento de Estado**: Para funcionalidades como carrinho de compras ou coleção de cartinhas, um gerenciamento de estado mais robusto (Context API ou Zustand/Redux) pode ser necessário em futuras iterações. Inicialmente, usaremos estado local.
- **Dados Mock**: Todas as páginas serão implementadas inicialmente com dados estáticos (mock data) definidos diretamente nos componentes ou em arquivos JSON/TS separados.

## 5. Próximos Passos

1.  **Buscar Imagens**: Procurar e selecionar imagens demonstrativas (placeholder) para as seções que as exigem (Loja, Cartinhas, Blog, Guias).
2.  **Implementação**: Criar os arquivos de componentes e páginas, adicionar as rotas e desenvolver a estrutura e o conteúdo estático de cada nova seção.
3.  **Integração**: Adicionar links no Navbar/Footer.
4.  **Validação**: Testar a responsividade e a aparência visual.

