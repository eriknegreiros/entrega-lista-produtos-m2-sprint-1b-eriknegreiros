const ul = document.querySelector('.listaDeCard')

const todosOsProdutos = document.querySelector('.botaoSecaoUnico')
todosOsProdutos.addEventListener('click', function () {
    return imprimirCards(produtos)
})

const hortifruit = document.querySelector('.botaoSecaoHortifruti')
hortifruit.addEventListener('click', function () {
    const secaoHortifruit = filtrarPorCategoria('Hortifruti')
    return imprimirCards(secaoHortifruit)
})

const panificadora = document.querySelector('.botaoSecaoPanificadora')
panificadora.addEventListener('click', function () {
    const secaoPanificadora = filtrarPorCategoria('Panificadora')
    return imprimirCards(secaoPanificadora)
})

const laticinio = document.querySelector('.botaoSecaoLaticinios')
laticinio.addEventListener("click", function () {
    const secaoLaticinio = filtrarPorCategoria('Laticinio')
    return imprimirCards(secaoLaticinio)
})

const botao = document.querySelector('.botaoPesquisar')
botao.addEventListener('click', function () {
    const pesquisar = document.querySelector('.caixaDeTexto')
    const busca = filtrarPorNome(pesquisar.value.toLowerCase())
    imprimirCards(busca)

})

function montarDados(data) {
    const li = document.createElement('li')
    const img = document.createElement('img')
    const div = document.createElement('div')
    const h2 = document.createElement('h2')
    const secaoProduto = document.createElement('p')
    const componentesDoProduto = document.createElement('ol')

    const divbotao = document.createElement('div')
    const valorTotal = document.createElement('p')
    const adicionarAoCarrinho = document.createElement('button')
    adicionarAoCarrinho.addEventListener('click', () => {
          
        const semProdutosNoCarrinho = document.querySelector('.semProdutosNoCarrinho')
        semProdutosNoCarrinho.classList.add('none')

        const divPrincipalQuantidadeTotal = document.querySelector('.divPrincipalQuantidadeTotal')
        divPrincipalQuantidadeTotal.classList.remove('none')

    })

    data.componentes.forEach(nutriente => {
        const novoNutrientes = document.createElement('li');
        novoNutrientes.innerText = nutriente
        novoNutrientes.classList.add('novoNutrientes')
        componentesDoProduto.append(novoNutrientes)

    })

    li.classList.add('cardIndividual')
    div.classList.add('descricao')
    h2.classList.add('nomeProduto')
    componentesDoProduto.classList.add('componentesDoProduto')
    secaoProduto.classList.add('secaoProduto')
    divbotao.classList.add('divbotao')
    valorTotal.classList.add('valorTotal')
    adicionarAoCarrinho.classList.add("adicionarAoCarrinho")

    adicionarAoCarrinho.innerText = 'Comprar'
    adicionarAoCarrinho.addEventListener('click', function (event) {
        const add = (event.target.value)
        const bancoDeDadosFiltrado = produtos.filter((item) => {
            return item.nome.includes(add)
        })
        carrinhoVazio.push(bancoDeDadosFiltrado[0])
        criarCardsCarrinho(carrinhoVazio)

        const valorNumericoQuantidadeDeProdutos = document.querySelector('.valorNumericoQuantidadeDeProdutos')

        valorNumericoQuantidadeDeProdutos.innerText++
        
        somaTotal()
    })

    adicionarAoCarrinho.value = data.nome

    img.width = 220
    img.src = data.img
    h2.innerText = data.nome
    secaoProduto.innerText = data.secao
    valorTotal.innerText = data.preco

    divbotao.append(valorTotal, adicionarAoCarrinho)
    div.append(h2, secaoProduto, componentesDoProduto, divbotao)
    li.append(img, div)
    ul.append(li)

    return li
}


function imprimirCards(array) {
    ul.innerHTML = ''
    const cards = array.forEach((element) => {
        montarDados(element)
    })
    return cards
}

imprimirCards(produtos)

function filtrarPorCategoria(secao) {
    const cards = produtos.filter((element) => {
        return element.secao === secao
    })
    return cards
}


function filtrarPorNome(busca) {
    const cards = produtos.filter((element) => {
        return element.nome.toLowerCase().includes(busca) ||
            element.secao.toLowerCase().includes(busca)
    })
    return cards
}

const carrinhoComProdutos = document.querySelector('.carrinhoComProdutos')

function DadoscarrinhoDeCompras(array) {
    const imagemProdutoCarrinho = document.createElement('img')
    const descricaoCarrinho = document.createElement('div')
    const nomeProdutoCarrinho = document.createElement('h2')
    const secaoProdutoCarrinho = document.createElement('p')
    const precoProdutoCarrinho = document.createElement('p')
    const lixeira = document.createElement('button')
    const imagemLixeira = document.createElement('img')

    imagemProdutoCarrinho.classList.add('imagemProdutoCarrinho')
    descricaoCarrinho.classList.add('descricaoCarrinho')
    nomeProdutoCarrinho.classList.add('nomeProdutoCarrinho')
    secaoProdutoCarrinho.classList.add('secaoProdutoCarrinho')
    precoProdutoCarrinho.classList.add('precoProdutoCarrinho')
    lixeira.classList.add('Lixeira')
    imagemLixeira.classList.add('imagemLixeira')


    lixeira.addEventListener('click', () => {
        const semProdutosNoCarrinho = document.querySelector('.semProdutosNoCarrinho')
        const divPrincipalQuantidadeTotal = document.querySelector('.divPrincipalQuantidadeTotal')
        
        
        if(carrinhoVazio.length === 1){
            semProdutosNoCarrinho.classList.remove('none') 
            divPrincipalQuantidadeTotal.classList.add('none')
            
        } 
      
        const number = document.querySelector('.valorNumericoQuantidadeDeProdutos')
        number.innerText--

        carrinhoVazio.splice(array, 1)
        criarCardsCarrinho(carrinhoVazio)
        somaTotal()
    })

    imagemProdutoCarrinho.src = array.img
    nomeProdutoCarrinho.innerText = array.nome
    secaoProdutoCarrinho.innerText = array.secao
    precoProdutoCarrinho.innerText = array.preco
    imagemLixeira.src = './src/img/lixeira.png'

    lixeira.appendChild(imagemLixeira)
    descricaoCarrinho.append(nomeProdutoCarrinho, secaoProdutoCarrinho, precoProdutoCarrinho)
    carrinhoComProdutos.append(imagemProdutoCarrinho, descricaoCarrinho, lixeira)

}



function criarCardsCarrinho(array) {
    carrinhoComProdutos.innerHTML = ''
    const cards = array.forEach((element) => {
        return DadoscarrinhoDeCompras(element)
    })
    return cards
}

const carrinhoVazio = []

function somaTotal() {
    let soma = 0
    for (let i = 0; i < carrinhoVazio.length; i++) {
        soma += Number(carrinhoVazio[i].preco)
    }
    document.querySelector('.valorNumericovalorDosProdutos').innerText = `R$${soma.toFixed(2)}`
    
}

