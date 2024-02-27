//Menu Hamburguer
// document.querySelector(".iconeMenuHamburguer").addEventListener("click", () => {
//   let menu = document.getElementsByClassName("menuHamburguer")[0];
//   let openMenu = document.getElementById("openMenuHamburguer");
//   let closeMenu = document.getElementById("closeMenuHamburguer");

//   console.log("oi");

//   if (menu.id === closeMenu.id) {
//     console.log("O elemento possui o mesmo ID que closeMenuHamburguer");
//     menu.setAttribute("id", "openMenuHamburguer");
//   } else if (menu.id === openMenu) {
//     console.log("O elemento NÃO possui o mesmo ID que closeMenuHamburguer");
//     menu.removeAttribute("id");
//   }
// });

// document.querySelector(".iconeMenuHamburguer").addEventListener("click", () => {
//   let botaoMenu = document.querySelector(".iconeMenuHamburguer");
//   let menu = document.querySelector(".menuHamburguer");

//   let openMenu = document.getElementById("openMenuHamburguer");
//   let closeMenu = document.getElementById("closeMenuHamburguer");

//   if (menu.style.left !== "0px") {
//     closeMenu.toggleAttribute("id");
//     openMenu.toggleAttribute("id");
//   } else {
//     openMenu.toggleAttribute("id");
//     closeMenu.toggleAttribute("id");
//   }
// });

// document.getElementById("iconeMenu").addEventListener("click", () => {
//   let navbar = document.getElementById("menu");
//   let blurBackground = document.getElementById("blurBackground");
//   let botaoMenu = document.getElementById("botaoMenu");

//   if (navbar.style.left === "0px") {
//     navbar.style.left = "-360px";
//     blurBackground.style.display = "none";
//     botaoMenu.src = "./assets/img/shared/menu.svg";
//   } else {
//     navbar.style.left = "0";
//     blurBackground.style.display = "block";
//     botaoMenu.src = "./assets/img/shared/exit.svg";
//   }
// });

const templatePersonagens = document.getElementById("personagens");

function forma(arrayPersonagens) {
  arrayPersonagens.forEach((personagem) => {
    let divPersonagem = document.createElement("div");
    let linkPersonagem = document.createElement("a");
    let fotoPersonagem = document.createElement("img");
    let nomePersonagem = document.createElement("p");

    fotoPersonagem.src = personagem.images.small;
    nomePersonagem.textContent = personagem.name;

    divPersonagem.append(linkPersonagem);
    linkPersonagem.append(fotoPersonagem);
    linkPersonagem.append(nomePersonagem);

    templatePersonagens.appendChild(divPersonagem);
  });
}

fetch("../assets/json/images-people.json")
  .then((response) => response.json())
  .then((personagensImage) => {
    fetch("https://swapi.dev/api/people")
      .then((response) => response.json())
      .then((dada) => {
        const personagens = personagensImage.map((itemImage) => ({
          ...itemImage,
          ...dada.results.find((itemDada) => itemDada.name === itemImage.name),
        }));

        console.log(personagens);

        forma(personagens);
      });
  });
