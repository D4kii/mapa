'use strict'

const mapa = document.querySelector('svg')

const getEstados = async (event) => {
    const estado = event.target.id.replace('BR-', '')

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

mapa.addEventListener('click', getEstados)

console.log(mapa)