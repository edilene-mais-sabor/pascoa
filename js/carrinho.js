// Inicialização do Carrinho
let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

const botoesAdicionar = document.querySelectorAll(".btn-adicionar");
const contador = document.getElementById("contador-carrinho");

// Evento nos botões de compra
botoesAdicionar.forEach(botao => {
    botao.addEventListener("click", () => {
        const id = botao.dataset.id;
        const nome = botao.dataset.nome;
        const preco = parseFloat(botao.dataset.preco);

        adicionarAoCarrinho(id, nome, preco);
    });
});

function adicionarAoCarrinho(id, nome, preco) {
    const item = carrinho.find(p => p.id === id);

    if (item) {
        item.quantidade++;
    } else {
        carrinho.push({ id, nome, preco, quantidade: 1 });
    }

    salvarCarrinho();
    atualizarContador();
    // Dica: Toast customizado fica mais profissional que o alert
    alert("Produto adicionado ao carrinho 🛒");
}

function salvarCarrinho() {
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
}

function atualizarContador() {
    if (!contador) return;
    const totalItens = carrinho.reduce((soma, item) => soma + item.quantidade, 0);
    contador.innerText = totalItens;
}

// Inicializa o contador ao carregar a página
atualizarContador();

// --- EFEITO DO HEADER AO ROLAR ---
let ultimoScroll = 0;
const header = document.querySelector(".header");

if (header) { // Verifica se o header existe para não dar erro
    const tituloHeader = header.querySelector("h1");

    window.addEventListener("scroll", () => {
        const scrollAtual = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollAtual > ultimoScroll && scrollAtual > 60) {
            // Rolando para baixo → Encolhe
            header.style.padding = "8px 12px";
            if (tituloHeader) tituloHeader.style.fontSize = "1.1rem";
        } else {
            // Rolando para cima → Volta ao normal
            header.style.padding = "16px 12px";
            if (tituloHeader) tituloHeader.style.fontSize = "1.4rem";
        }
        
        // Atualiza a posição para a próxima comparação
        ultimoScroll = scrollAtual <= 0 ? 0 : scrollAtual; 
    }, { passive: true });
}
