'use strict'

const mapa = document.querySelector('svg')


const preencherCard = async (event) => {

    
    const estado = event.target.id.replace('BR-', '');
    const dados = await getEstados(estado)

    const dadosEstados = await dados.cidades


    document.getElementById('sigla').textContent = dados.sigla
    document.getElementById('estado').textContent = dados.estado
    document.getElementById('capital').textContent = dados.capital
    document.getElementById('regiao').textContent = dados.regiao
    document.getElementById('cidade').textContent = dados.cidades

    // dadosEstados.forEach(dadoCidade => {
    //     const cidadeList = document.createElement('p')
    //     cidadeList.classList.add('cidade')
    //     document.getElementById('cidade').textContent = dadoCidade


    // });

    // const cidadeBox = document.getElementById('card-cidades')
    // cidadeBox.append(cidadeList)


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

