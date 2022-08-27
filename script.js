// Declarando variáveis

const modal = document.querySelector('.modal-container')
const tbody = document.querySelector('tbody')
const sNome = document.querySelector('#m-nome')
const sFuncao = document.querySelector('#m-funcao')
const sSalario = document.querySelector('#m-salario')
const btnSalvar = document.querySelector('#btnSalvar')

// armazena os itens do banco
let itens
// armazena o index da ação de edição
let id

// Funções que vão pegar os itens do banco
const getItensBD = () => JSON.parse(localStorage.getItem('dbfunc')) ?? [] // caso n tiver nada retorna um array vazio
const setItensBD = () => localStorage.setItem('dbfunc', JSON.stringify(itens))

// Função executada assim que a tela é carregada
function loadItens() {
    itens = getItensBD() //pega os itens do banco
    tbody.innerHTML = ''
    itens.forEach((item, index) => { // faz um for em cada dado para que seja criada a linha
        insertItem(item, index)
    })
}

loadItens()

function insertItem(item, index) {
    let tr = document.createElement('tr')

    tr.innerHTML = `
        <td>${item.nome}</td>
        <td>${item.funcao}</td>
        <td> R$ ${item.salario}</td>
        <td class="acao">
            <button onclick="editItem(${index})"><i class='bx bx-edit' ></i></button>
        </td>
        <td class="acao">
            <button onclick="deleteItem(${index})"><i class='bx bx-trash'></i></button>
        </td>
    `
    tbody.appendChild(tr)
}
