//scroll botão voltar ao topo
$(document).ready(() => {
  const scrollButton = $(".btnTopo");

  scrollButton.click(() => {
    console.log("Clicou no botão de scroll 'voltar ao topo'");

    $("html, body").animate(
      {
        scrollTop: 0,
      },
      500
    );
  });
});

//Menu Hamburguer
document.querySelector(".btnMenuHamburguer").addEventListener("click", () => {
  const menu = document.querySelector(".menuHamburguer");
  const innerWrapper = document.querySelector(".innerWrapper");
  const footer = document.querySelector("footer");
  const iconMenu = document.querySelector("#iconMenu");
  const basePath = window.location.pathname === "/index.html" ? "./" : "../";

  console.log("clicou no botão Menu Hamburguer");

  if (menu.classList.contains("openMenuHamburguer")) {
    console.log("Fechando menu");
    menu.classList.toggle("openMenuHamburguer");
    document.body.classList.toggle("noScroll");
    innerWrapper.classList.toggle("blurBackground");
    footer.classList.toggle("blurBackground");
    iconMenu.src = basePath + "assets/img/shared/menu-white.svg";
  } else {
    console.log("Abrindo menu");
    menu.classList.toggle("openMenuHamburguer");
    document.body.classList.toggle("noScroll");
    innerWrapper.classList.toggle("blurBackground");
    footer.classList.toggle("blurBackground");
    iconMenu.src = basePath + "assets/img/shared/exit-white.svg";
  }
});

//Conteudo dropdown do menu hamburguer
document
  .querySelector(".conteudo__dropdown--chevron")
  .addEventListener("click", () => {
    const subMenu = document.querySelector(".dropdown__subMenu");
    const iconChevron = document.querySelector(".conteudo__dropdown--chevron");

    if (subMenu.classList.contains("subMenuOpen")) {
      console.log("fechando subMenu");
      subMenu.classList.toggle("subMenuOpen");
      iconChevron.classList.toggle("conteudo__dropdown--chevronOpen");
    } else {
      console.log("abrindo subMenu");
      subMenu.classList.toggle("subMenuOpen");
      iconChevron.classList.toggle("conteudo__dropdown--chevronOpen");
    }
  });

// const templatePersonagens = document.getElementById("personagens");

// function forma(arrayPersonagens) {
//   arrayPersonagens.forEach((personagem) => {
//     let divPersonagem = document.createElement("div");
//     let linkPersonagem = document.createElement("a");
//     let fotoPersonagem = document.createElement("img");
//     let nomePersonagem = document.createElement("p");

//     fotoPersonagem.src = personagem.images.small;
//     nomePersonagem.textContent = personagem.name;

//     divPersonagem.append(linkPersonagem);
//     linkPersonagem.append(fotoPersonagem);
//     linkPersonagem.append(nomePersonagem);

//     templatePersonagens.appendChild(divPersonagem);
//   });
// }

// fetch("../assets/json/images-characters.json")
//   .then((response) => response.json())
//   .then((personagensImage) => {
//     fetch("https://swapi.dev/api/people")
//       .then((response) => response.json())
//       .then((dada) => {
//         const personagens = personagensImage.map((itemImage) => ({
//           ...itemImage,
//           ...dada.results.find((itemDada) => itemDada.name === itemImage.name),
//         }));

//         console.log(personagens);

//         forma(personagens);
//       });
//   });
