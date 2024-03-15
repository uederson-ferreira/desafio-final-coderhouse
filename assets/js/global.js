const content = $("main");
let h1;
let h2;
let h3;
const sectionExterna = $("<section>")
  .addClass("sectionExterna")
  .appendTo(content);
let sectionInterna;
let tituloSecao;

h1 = $("<h1>").text("universo star wars").addClass("tituloPagina colorYellow");
content.prepend(h1);

function presentation() {
  sectionInterna = $("<section>").addClass("background presentation bgWhite");

  const exitPresentation = $("<img>")
    .attr({
      src: "./assets/img/shared/exit-black.svg",
      alt: "fechar",
      class: "btn btn--width btn--left",
    })
    .on("click", () => {
      //fechar a apresentação da pagina
      $(".background.presentation").slideUp(550, () => {
        $(this).remove();
      });
    });

  tituloSecao = $("<h2>")
    .addClass("presentation__titulo tituloSecao bgYellow")
    .text("Explorando a saga intergalatica");

  const divPresentation = $("<div>").addClass("divPresentation");

  const textPresentation = $("<p>")
    .addClass("presentation__paragrafo")
    .html(
      "Este site foi desenvolvido como parte do curso de Desenvolvimento Web da Coderhouse BR, utilizando a <a href='https://swapi.py4e.com/' target='_blank' class='presentation__paragrafo--link'>API SWAPI</a> para agregar funcionalidades e dados específicos relacionados ao universo de Star Wars."
    );

  const imgPersonagens = $("<img>").attr({
    src: "./assets/img/shared/personagens-animados.png",
    class: "imgPersonagens",
  });

  sectionInterna
    .append(
      exitPresentation,
      tituloSecao,
      divPresentation.append(textPresentation)
    )
    .appendTo(sectionExterna);

  $(window)
    .on("resize", () => {
      const windowWidth = $(window).width();
      if (windowWidth <= 768) {
        imgPersonagens.remove();
      } else {
        divPresentation.prepend(imgPersonagens);
      }
    })
    .resize();
}
presentation();

function trilogia(dadaMerged) {
  sectionInterna = $("<section>").addClass("background");

  const h2 = $("<h2>")
    .text("Trilogia Star wars")
    .addClass("tituloSecao colorWhite tituloTrilogia");
  const setaH2 = $("<img>")
    .attr("src", "./assets/img/shared/seta-circular-direita.svg")
    .addClass("tituloTrilogia--img")
    .appendTo(h2);

  const roloTrilogia = $("<div>").addClass("roloFilmes");

  $(document).ready(() => {
    $(".roloFilmes").slick({
      centerMode: true,
      centerPadding: "50px",
      slidesToShow: 5,
      autoplay: true,
      autoplaySpeed: 2000,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            arrows: false,
            centerMode: true,
            centerPadding: "40px",
            slidesToShow: 4,
          },
        },
        {
          breakpoint: 768,
          settings: {
            arrows: false,
            centerMode: true,
            centerPadding: "30px",
            slidesToShow: 2,
          },
        },
      ],
    });
  });

  const itemFilmes = dadaMerged[2].results;

  for (let i = 0; i < 6; i++) {
    const titleFilm = itemFilmes[i].title;
    const imgFilmSrc = itemFilmes[i].trilogia
      ? itemFilmes[i].trilogia.small
      : "";

    const divFilm = $("<div>").addClass("roloFilmes__item");
    const img = $("<img>")
      .addClass("roloFilmes__item--img")
      .attr("src", imgFilmSrc);
    const title = $("<p>")
      .addClass("roloFilmes__item--text colorWhite")
      .text(titleFilm);

    divFilm.append(img, title).appendTo(roloTrilogia);
  }

  sectionInterna.append(h2, roloTrilogia).appendTo(sectionExterna);
}

//Função para incorporar seções com conteudos da API em sectionExterna
function creatSections(dadaMerged, ordemSecoesInternas) {
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
    const item = dadaMerged[index].results;

    sectionInterna = $("<section>").addClass("sectionInterna background");

    //Seleciona o índice 1 e 2 (seções de Filmes e Planetas)
    const indice1e2 = index === 1 || index === 2;

    tituloSecao = $("<h2>").addClass("tituloSecao").text(titulosSecoes[index]);

    //Adicionar classes de estilização para os índices 2 e 1
    if (indice1e2) {
      sectionInterna.removeClass("bgWhite");
      tituloSecao.removeClass("bgYellow").addClass("colorWhite");
    } else {
      sectionInterna.addClass("bgWhite");
      tituloSecao.addClass("bgYellow");
    }

    const divGrupo = $("<div>").addClass("sectionInterna__grupo");

    //Iterar sobre os resultados de item(dadaMerged) e criar imagens e textos
    for (let i = 0; i < 4; i++) {
      const divItem = $("<div>").addClass("sectionInterna__grupo__item");
      const imgSrc = item[i].images.small;
      const itemName = item[i].name;
      const itemTitle = item[i].title;

      //Verificar se o campo 'name' está presente, senão, usar 'title'
      const itemNameText = itemName ? itemName : itemTitle;

      const img = $("<img>")
        .addClass("sectionInterna__grupo__item--img")
        .attr("src", imgSrc);
      const text = $("<p>")
        .addClass("sectionInterna__grupo__item--text")
        .text(itemNameText);

      if (indice1e2) {
        text.addClass("colorWhite");
      }

      divItem.append(img, text).appendTo(divGrupo);
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

    sectionInterna
      .append(tituloSecao, divGrupo, botaoDireita)
      .appendTo(sectionExterna);
  });
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

          //Chama função para o rolo de trilogia
          trilogia(dadaMerged);
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
