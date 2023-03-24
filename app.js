'use strict'

const mapa = document.querySelector('svg')


const preencherCard = async (event) => {

    
    const estado = event.target.id.replace('BR-', '');
    const dados = await getEstados(estado)

    const dadosCidades = await dados.cidades
   


    document.getElementById('sigla').textContent = dados.sigla
    document.getElementById('estado').textContent = dados.estado
    document.getElementById('capital').textContent = `Capital: ${dados.capital}`
    document.getElementById('regiao').textContent = `Região: ${dados.regiao}`
    

    const cidadeBox = document.getElementById('box-cidades')
    const cardCidade = await dados.cidades.map(criarCardCidades)
    console.log(cidadeBox)
    cidadeBox.replaceChildren(...cardCidade)
}
const criarCardCidades =  (cidadeDado) =>{
    const cidade =  cidadeDado;
    
        const cidadeList = document.createElement('p')
        cidadeList.classList.add('cidade')
        cidadeList.textContent = `- ${cidade}`

        console.log(cidadeList)
        return cidadeList
    
}
const getEstados = async (estado) => {

    const urlCidades = `http://localhost:8080/v1/senai/estado/cidades/sigla/${estado}`
    const response = await fetch(urlCidades);
    const data = await response.json();

    const urlRegiao = `http://localhost:8080/senai/estado/sigla/${estado}`
    const responseRegiao = await fetch(urlRegiao);
    const dataRegiao = await responseRegiao.json();

    return {
        sigla: dataRegiao.uf,
        estado: data.descricao,
        capital: dataRegiao.capital,
        regiao: dataRegiao.regiao,
        cidades: data.cidades
    }
}
mapa.addEventListener('click',preencherCard)

