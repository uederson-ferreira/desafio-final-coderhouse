//Função para incorporar seções em importSection
// function creatSections() {
//   const importSection = $("<section>").addClass("importSection");

//   const titulosSecoes = [
//     "personagens",
//     "planetas",
//     "espécies",
//     "veículos",
//     "naves espaciais",
//     // Adicione mais textos conforme necessário
//   ];

//   //Percorrer os dados e criar sections interna
//   dadaMerged.forEach(function (item) {
//     const sectionInterna = $("<section>").addClass("background bgWhite");

//     const tituloSecao = $("<h2>")
//       .addClass("tituloSecao bg yellow")
//       .text(titulosSecoes[dadaMerged.indexOf(item)]);

//     const divInterna = $("<div>");

//     item.results.forEach(function (result) {
//       // Criar a tag img com o src da imagem
//       const imagem = $("<img>").attr("src", result.images.small);

//       // Criar a tag p com o nome
//       const nome = $("<p>").text(result.name);

//       // Adicionar imagem e nome à div
//       divInterna.append(imagem, nome);
//     });

//     sectionInterna.append(tituloSecao, divInterna);

//     importSection.append(sectionInterna);
//   });
//   $("main").append(importSection);
// }

// creatSections();

//Requisição Root API
$.ajax({
  url: "https://swapi.py4e.com/api/",
  method: "GET",
  dataType: "json",
  success: function (dataRootAPI) {
    let links = Object.values(dataRootAPI);

    //Função para resolução de requisição de links do Root API
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

    //Função que inicia as requisições
    function fazerRequisicoes() {
      let requisicoes = links.map(function (url) {
        return carregarArquivoJson(url);
      });

      //Aguarda todas as promessas serem resolvidas
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

          //Função para mesclar os dados
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
        })
        .catch(function (error) {
          console.log("Erro na solicitação: ", error);
        });
    }

    fazerRequisicoes();
  },
  error: function (error) {
    console.log("Erro na solicitação:  ", error);
  },
});
