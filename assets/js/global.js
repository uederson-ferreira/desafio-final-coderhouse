//Menu Lateral
document.getElementById("iconeMenu").addEventListener("click", () => {
  let navbar = document.getElementById("menu");
  let blurBackground = document.getElementById("blurBackground");
  let botaoMenu = document.getElementById("botaoMenu");

  if (navbar.style.left === "0px") {
    navbar.style.left = "-360px";
    blurBackground.style.display = "none";
    botaoMenu.src = "./assets/img/shared/menu.svg";
  } else {
    navbar.style.left = "0";
    blurBackground.style.display = "block";
    botaoMenu.src = "./assets/img/shared/exit.svg";
  }
});

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
