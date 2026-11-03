// ---- Dados dos 30 sabores (mesma lista do SQL) ----
const SABORES = [
    { id: 1,  sabor: 'Chocolate',                       categoria: 'Clássico', preco: 12.00 },
    { id: 2,  sabor: 'Baunilha',                        categoria: 'Clássico', preco: 11.50 },
    { id: 3,  sabor: 'Morango',                         categoria: 'Clássico', preco: 12.00 },
    { id: 4,  sabor: 'Creme',                           categoria: 'Clássico', preco: 11.50 },
    { id: 5,  sabor: 'Chocolate com menta',             categoria: 'Clássico', preco: 13.50 },
    { id: 6,  sabor: 'Napolitano',                      categoria: 'Clássico', preco: 12.50 },
    { id: 7,  sabor: 'Flocos',                          categoria: 'Clássico', preco: 12.50 },
    { id: 8,  sabor: 'Cookies and Cream',               categoria: 'Clássico', preco: 15.00 },
    { id: 9,  sabor: 'Pistache',                        categoria: 'Clássico', preco: 18.00 },
    { id: 10, sabor: 'Chocolate belga',                 categoria: 'Clássico', preco: 16.50 },
    { id: 11, sabor: 'Milho verde',                     categoria: 'Regional', preco: 13.00 },
    { id: 12, sabor: 'Açaí',                            categoria: 'Regional', preco: 17.00 },
    { id: 13, sabor: 'Cupuaçu',                         categoria: 'Regional', preco: 16.00 },
    { id: 14, sabor: 'Tapioca',                         categoria: 'Regional', preco: 14.00 },
    { id: 15, sabor: 'Coco',                            categoria: 'Regional', preco: 13.00 },
    { id: 16, sabor: 'Cajá',                            categoria: 'Regional', preco: 14.50 },
    { id: 17, sabor: 'Graviola',                        categoria: 'Regional', preco: 15.00 },
    { id: 18, sabor: 'Maracujá',                        categoria: 'Frutado',  preco: 12.50 },
    { id: 19, sabor: 'Limão',                           categoria: 'Frutado',  preco: 11.50 },
    { id: 20, sabor: 'Laranja',                         categoria: 'Frutado',  preco: 11.50 },
    { id: 21, sabor: 'Abacaxi',                         categoria: 'Frutado',  preco: 12.00 },
    { id: 22, sabor: 'Manga',                           categoria: 'Frutado',  preco: 12.50 },
    { id: 23, sabor: 'Morango com leite condensado',    categoria: 'Frutado',  preco: 15.50 },
    { id: 24, sabor: 'Framboesa',                       categoria: 'Frutado',  preco: 16.00 },
    { id: 25, sabor: 'Doce de leite',                   categoria: 'Especial', preco: 16.50 },
    { id: 26, sabor: 'Paçoca',                          categoria: 'Especial', preco: 15.00 },
    { id: 27, sabor: 'Nutella',                         categoria: 'Especial', preco: 19.50 },
    { id: 28, sabor: 'Churros',                         categoria: 'Especial', preco: 18.00 },
    { id: 29, sabor: 'Red Velvet',                      categoria: 'Especial', preco: 20.00 },
    { id: 30, sabor: 'Cheesecake com frutas vermelhas', categoria: 'Especial', preco: 21.00 },
  ];
  
  // ---- Configurações ----
  const LIMITE_POR_PAGINA = 10;
  
  // ---- Estado ----
  let paginaAtual = 1;
  
  // ---- Emoji por categoria ----
  const EMOJI_POR_CATEGORIA = {
    'Clássico': '🍦',
    'Regional':  '🥥',
    'Frutado':   '🍓',
    'Especial':  '🍫',
  };
  
  // ---- Helpers ----
  function formatarPreco(preco) {
    const [inteiro, decimal] = preco.toFixed(2).split('.');
    return `R$ ${inteiro} <span>,${decimal}</span>`;
  }
  
  function filtrarSabores() {
    const busca = document.getElementById('busca').value.trim().toLowerCase();
    const categoria = document.getElementById('categoria').value;
    const ordenacao = document.getElementById('ordenacao').value;
    const precoMin = parseFloat(document.getElementById('preco_min').value);
    const precoMax = parseFloat(document.getElementById('preco_max').value);
  
    let lista = SABORES.filter((s) => {
      if (busca && !s.sabor.toLowerCase().includes(busca)) return false;
      if (categoria && s.categoria !== categoria) return false;
      if (!isNaN(precoMin) && s.preco < precoMin) return false;
      if (!isNaN(precoMax) && s.preco > precoMax) return false;
      return true;
    });
  
    if (ordenacao === 'menor preco') lista.sort((a, b) => a.preco - b.preco);
    else if (ordenacao === 'maior preco') lista.sort((a, b) => b.preco - a.preco);
  
    return lista;
  }
  
  function renderizarProdutos() {
    const grid = document.getElementById('produtos-grid');
    const lista = filtrarSabores();
  
    // Ajusta página se ultrapassar o total
    const totalPaginas = Math.max(1, Math.ceil(lista.length / LIMITE_POR_PAGINA));
    if (paginaAtual > totalPaginas) paginaAtual = totalPaginas;
  
    const inicio = (paginaAtual - 1) * LIMITE_POR_PAGINA;
    const pagina = lista.slice(inicio, inicio + LIMITE_POR_PAGINA);
  
    if (pagina.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1/-1; text-align:center; color:#b28a78; font-weight:600; padding:2rem;">
          <i class="fas fa-search" style="font-size:2rem; margin-bottom:0.5rem; display:block; color:#d67a5a;"></i>
          Nenhum sabor encontrado 🍦
        </div>`;
      renderizarPaginacao(0);
      return;
    }
  
    grid.innerHTML = pagina.map((p) => `
      <div class="produto-card">
        <div class="produto-icone">${EMOJI_POR_CATEGORIA[p.categoria] || '🍨'}</div>
        <span class="produto-categoria">${p.categoria}</span>
        <div class="produto-nome"><i class="fas fa-star"></i> ${p.sabor}</div>
        <div class="produto-preco">${formatarPreco(p.preco)}</div>
        <button class="btn_enviar"><i class="fas fa-cart-plus"></i> Adicionar</button>
      </div>
    `).join('');
  
    renderizarPaginacao(totalPaginas);
  }
  
  function renderizarPaginacao(totalPaginas) {
    const el = document.getElementById('paginacao');
    if (totalPaginas <= 1) { el.innerHTML = ''; return; }
  
    let html = `
      <button ${paginaAtual === 1 ? 'disabled' : ''} onclick="irParaPagina(${paginaAtual - 1})">
        <i class="fas fa-chevron-left"></i>
      </button>`;
  
    for (let i = 1; i <= totalPaginas; i++) {
      html += `<button class="${i === paginaAtual ? 'ativo' : ''}" onclick="irParaPagina(${i})">${i}</button>`;
    }
  
    html += `
      <button ${paginaAtual === totalPaginas ? 'disabled' : ''} onclick="irParaPagina(${paginaAtual + 1})">
        <i class="fas fa-chevron-right"></i>
      </button>`;
  
    el.innerHTML = html;
  }
  
  function irParaPagina(n) {
    paginaAtual = n;
    renderizarProdutos();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  
  // ---- Eventos ----
  ['busca', 'categoria', 'ordenacao', 'preco_min', 'preco_max'].forEach((id) => {
    document.getElementById(id).addEventListener('input', () => {
      paginaAtual = 1;
      renderizarProdutos();
    });
  });
  
  // ---- Inicializa ----
  renderizarProdutos();