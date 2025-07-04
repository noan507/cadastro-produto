class Produto {
    #preco;
    #quantidade;

    constructor(nome, preco, quantidade) {
        if (!nome || preco <= 0 || quantidade <= 0) {
            throw new Error("Dados inválidos para o produto");
        }
        this.nome = nome;
        this.#preco = parseFloat(preco);
        this.#quantidade = parseInt(quantidade);
    }

    get preco() {
        return this.#preco;
    }

    get quantidade() {
        return this.#quantidade;
    }

    valorTotal() {
        return this.#preco * this.#quantidade;
    }
}

const produtos = [];

document.getElementById('Produto-Form').addEventListener("submit", function (e) {
    e.preventDefault();

    const nome = document.getElementById("Nome").value;
    const preco = document.getElementById("Preco").value;
    const quantidade = document.getElementById("Quantidade").value;

    try {
        const novoProduto = new Produto(nome, preco, quantidade);
        produtos.push(novoProduto);
        atualizarTabela();
        atualizarTotal();
        e.target.reset();
    } catch (erro) {
        alert(erro.message);
    }
});

function atualizarTabela() {
    const tabela = document.querySelector("#Tabela-Produtos tbody");
    tabela.innerHTML = "";

    produtos.forEach((produto, index) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${produto.nome}</td>
            <td>${produto.preco.toFixed(2)}</td>
            <td>${produto.quantidade}</td>
            <td><button onclick="removerProduto(${index})">Remover</button></td>
        `;

        tabela.appendChild(row);
    });
}

function atualizarTotal() {
    const total = produtos.reduce((acc, p) => acc + p.valorTotal(), 0);
    document.getElementById("Total").textContent = `Total em estoque: R$ ${total.toFixed(2)}`;
}

function removerProduto(index) {
    produtos.splice(index, 1);
    atualizarTabela();
    atualizarTotal();
}

document.getElementById("limpar-tabela").addEventListener("click", function () {
    produtos.length = 0;
    atualizarTabela();
    atualizarTotal();
});