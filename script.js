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
    tbody.appendChild(tr) // cada item que é carregado nessa função(insertItem) é carregado no body
}

function editItem(index) {

    openModal(true, index)
}

function deleteItem(index) {
    itens.splice(index, 1) // splice(altera o conteudo de uma lista, add novos enquanto remove antigos) do index removendo 1 item
    setItensBD() // atualiza bd
    loadItens() // carrega bd na tela
}

function openModal(edit = false, index = 0) {
    modal.classList.add('active')

    modal.onclick = e => {
        if(e.target.className.indexOf('modal-container') != -1) {
            modal.classList.remove('active')
        }
    }

    if(edit) { // se for edição vai aparecer os dados 
        sNome.value = itens[index].nome
        sFuncao.value = itens[index].funcao
        sSalario.value = itens[index].salario
        id = index
    } else { // se n for, n vai aparecer nada nos dados
        sNome.value = ''
        sFuncao.value = ''
        sSalario.value = ''
    }
}

btnSalvar.onclick = e => {

    if(sNome.value === '' || sFuncao.value === '' || sSalario.value === '') {
        return
    }

    e.preventDefault()

    if(id != undefined) { // se vim de uma edição ele vai atualizar a array com os valores so daquele id
        itens[id].nome = sNome.value
        itens[id].funcao = sFuncao.value
        itens[id].salario = sSalario.value
    } else { // push incluindo um novo item no banco
        itens.push({'nome': sNome.value, 'funcao': sFuncao.value, 'salario': sSalario.value})
    }

    setItensBD()

    modal.classList.remove('active')
    loadItens()
    id = undefined

}
