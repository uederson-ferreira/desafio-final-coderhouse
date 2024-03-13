// Função para incorporar seções em importSection
function creatSections(dadaMerged, ordemSecoesInternas) {
  const sectionExterna = $("<section>").addClass("sectionExterna");

  const titulosSecoes = [
    "Personagens",
    "Planetas",
    "Filmes",
    "Espécies",
    "veículos",
    "Naves Espaciais",
  ];

  //Percorrer os dados de acordo com a nova ordem
  ordemSecoesInternas.forEach(function (index) {
    const item = dadaMerged[index];

    const sectionInterna = $("<section>").addClass("sectionInterna background");

    //Seleciona o índice 1 e 2 (seções de Filmes e Planetas)
    const indice1e2 = index === 1 || index === 2;

    const tituloSecao = $("<h2>")
      .addClass("tituloSecao")
      .text(titulosSecoes[index]);

    // Adicionar classes de estilização para os índices 2 e 1
    if (indice1e2) {
      sectionInterna.removeClass("bgWhite");
      tituloSecao.removeClass("bgYellow").addClass("colorWhite");
    } else {
      sectionInterna.addClass("bgWhite");
      tituloSecao.addClass("bgYellow");
    }

    const divGrupo = $("<div>").addClass("sectionInterna__grupo");

    //Iterar sobre os resultados de item(dadaMerged) e criar imagens e parágrafos
    for (let i = 0; i < 4 && item.results[i]; i++) {
      const divItem = $("<div>").addClass("sectionInterna__item");
      const imgSrc = item.results[i].images.small;
      const itemName = item.results[i].name;
      const itemTitle = item.results[i].title;

      //Verificar se o campo 'name' está presente, senão, usar 'title'
      const itemNameText = itemName ? itemName : itemTitle;

      const img = $("<img>")
        .addClass("sectionInterna__img")
        .attr("src", imgSrc);
      const text = $("<p>").addClass("sectionInterna__text").text(itemNameText);

      if (indice1e2) {
        text.addClass("colorWhite");
      }

      divItem.append(img, text);
      divGrupo.append(divItem);
    }

    const botaoDireitaImg = $("<img>")
      .attr("src", "./assets/img/shared/seta-circular-direita.svg")
      .addClass("btn--widthImg");
    const botaoDireita = $("<a>")
      .text("ver mais")
      .attr("href", "#")
      .append(botaoDireitaImg)
      .addClass("botaoDireita btn btn--fonte btn--center btn--bg bgWhite");

    if (indice1e2) {
      botaoDireita.addClass("bgWhite");
    }

    sectionInterna.append(tituloSecao, divGrupo, botaoDireita);
    sectionExterna.append(sectionInterna);
  });

  $("main").append(sectionExterna);
}

//Ordem das seções internas
const ordemSecoesInternas = [0, 3, 5, 4, 2, 1];

// Requisição Root API
$.ajax({
  url: "https://swapi.py4e.com/api/",
  method: "GET",
  dataType: "json",
  success: function (dataRootAPI) {
    let links = Object.values(dataRootAPI);

    // Função para resolução de requisição de links do Root API
    function carregarArquivoJson(url) {
      return new Promise(function (resolve, reject) {
        $.ajax({
          url: url,
          method: "GET",
          dataType: "json",
          success: function (data) {
            resolve(data);
          },
          error: function (error) {
            reject(error);
          },
        });
      });
    }

    // Função que inicia as requisições
    function fazerRequisicoes() {
      let requisicoes = links.map(function (url) {
        return carregarArquivoJson(url);
      });

      // Aguarda todas as promessas serem resolvidas
      Promise.all(requisicoes)
        .then(async function (dataArray) {
          const arquivosJson = [
            "../assets/json/images-people.json",
            "../assets/json/images-planets.json",
            "../assets/json/images-films.json",
            "../assets/json/images-species.json",
            "../assets/json/images-vehicles.json",
            "../assets/json/images-starships.json",
          ];

          // Função para mesclar os dados
          async function mesclarDados() {
            const result = [];

            for (let i = 0; i < dataArray.length; i++) {
              const dataArrayOrigem = dataArray[i];
              const dadosArray = dataArrayOrigem.results;

              const response = await fetch(arquivosJson[i]);
              const dataAquivosJson = await response.json();

              const dadaMerged = dadosArray.map((item) => {
                const campoComparacao = item.hasOwnProperty("name")
                  ? "name"
                  : "title";

                const dadosJson = dataAquivosJson.find(
                  (jsonItem) =>
                    jsonItem[campoComparacao] === item[campoComparacao]
                );

                return { ...item, ...dadosJson };
              });

              result.push({
                ...dataArrayOrigem,
                results: dadaMerged,
              });
            }

            return result;
          }

          const dadaMerged = await mesclarDados();
          console.log(dadaMerged);

          // Chama a função com os dados mesclados
          creatSections(dadaMerged, ordemSecoesInternas);
        })
        .catch(function (error) {
          console.log("Erro na solicitação: ", error);
        });
    }

    fazerRequisicoes();
  },
  error: function (error) {
    console.log("Erro na solicitação: ", error);
  },
});
