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

atualizarContador();

// --- EFEITO DO HEADER OTIMIZADO ---
let ultimoScroll = 0;
const header = document.querySelector(".header");

if (header) {
    window.addEventListener("scroll", () => {
        const scrollAtual = window.pageYOffset || document.documentElement.scrollTop;

        // Se rolar para baixo e passar de 60px, adiciona a classe 'shrink'
        if (scrollAtual > ultimoScroll && scrollAtual > 60) {
            header.classList.add("shrink");
        } 
        // Se rolar para cima, remove a classe 'shrink'
        else if (scrollAtual < ultimoScroll) {
            header.classList.remove("shrink");
        }
        
        ultimoScroll = scrollAtual <= 0 ? 0 : scrollAtual; 
    }, { passive: true });
}
