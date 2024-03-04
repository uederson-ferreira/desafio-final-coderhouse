// scroll botão voltar ao topo
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
document.querySelector(".btnMenu").addEventListener("click", () => {
  const menu = document.querySelector(".menu");
  const innerWrapper = document.querySelector(".innerWrapper");
  const footer = document.querySelector("footer");
  const menuIcon = document.querySelector(".btnMenu");
  const basePath = window.location.pathname === "/index.html" ? "./" : "../";

  menu.classList.toggle("menu--positionOpen");
  document.body.classList.toggle("noScroll");
  innerWrapper.classList.toggle("blurBackground");
  footer.classList.toggle("blurBackground");

  if (menu.classList.contains("menu--positionOpen")) {
    menuIcon.src = basePath + "assets/img/shared/exit-white.svg";
  } else {
    menuIcon.src = basePath + "assets/img/shared/menu-white.svg";
  }
});

//Conteudo dropdown do menu hamburguer
document
  .querySelector(".menu__dropdown--chevron")
  .addEventListener("click", () => {
    const subMenu = document.querySelector(".menu__submenu");
    const iconChevron = document.querySelector(".menu__dropdown--chevron");

    subMenu.classList.toggle("menu__submenuOpen");
    iconChevron.classList.toggle("menu__dropdown--chevronOpen");
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
