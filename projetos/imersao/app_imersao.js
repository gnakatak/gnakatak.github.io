const PESQUISA_EXATA = 'exata';
const PESQUISA_COMPLETA = 'completa';

function pesquisar(tipoPesquisa) {
    let section = document.getElementById("resultados-pesquisa");
     // Loga o elemento section no console para verificação

    let campoPesquisa = document.getElementById("campo-pesquisa").value;

    

    campoPesquisa = campoPesquisa.toLowerCase();

    let resultados = "";
    let titulo = "";
    let sobre = "";
    let pais = "";
    let players = "";

    // Itera sobre cada dado da array 'dados'
    
    if(tipoPesquisa == PESQUISA_EXATA){
        for (let dado of dados) {    
            titulo = dado.nome.toLowerCase();
            sobre = dado.descricao.toLowerCase();
            pais = dado.pais.toLowerCase();
            players = dado.players.join(', ').toLowerCase();
            
            //se includes campoPesquisa for igual a true, ele vai mostrar no console
            
            if(titulo.includes(campoPesquisa) || 
            sobre.includes(campoPesquisa) ||
            pais.includes(campoPesquisa) || 
            players.includes(campoPesquisa)){
                
                if (campoPesquisa == "") {
                    section.innerHTML = "<p>Por favor, digite algo para pesquisar.</p>";
                    return;
                }


                resultados += `
                <div id="loud" class="item-resultado" style="background-image: url('${dado.banner}'); background-size: cover; background-position: center;">
                    <h2>${dado.nome} 
                        <a href="${dado.link}" target="_blank"> 
                            <img src="${dado.logo}" width="30px"> 
                        </a>
                    </h2>
                    <h4>${dado.pais}</h4> 
                    <h3>${dado.players.join(', ')}</h3> 
                    <p class="descricao-meta">${dado.descricao}</p>
                    <a href="${dado.link}" target="_blank">Mais Informações</a>
                </div>
            `;
            }
        // Constrói o HTML para cada resultado com o background-image dinâmico
        }
    }


    if(tipoPesquisa === PESQUISA_COMPLETA){
        for (let dado of dados) {
            resultados += `
                <div id="loud" class="item-resultado" style="background-image: url('${dado.banner}'); background-size: cover; background-position: center;">
                    <h2>${dado.nome} 
                        <a href="${dado.link}" target="_blank"> 
                            <img src="${dado.logo}" width="30px"> 
                        </a>
                    </h2>
                    <h4>${dado.pais}</h4> 
                    <h3>${dado.players.join(', ')}</h3> 
                    <p class="descricao-meta">${dado.descricao}</p>
                    <a href="${dado.link}" target="_blank">Mais Informações</a>
                </div>
            `;
            }
    }
    if (resultados == "") {
        resultados = "<p>Nenhum resultado encontrado.</p>";
    }

    // Atribui o HTML gerado para a seção de resultados
    section.innerHTML = resultados;
}