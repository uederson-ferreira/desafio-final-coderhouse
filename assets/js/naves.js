const baseURL = "https://swapi.py4e.com/api/starships/";
let currentPage = 1;
const itemsPerPage = 10; // Número de itens por página

function fetchData(page) {
  fetch(baseURL + "?page=" + page)
    .then(response => response.json())
    .then(data => {
      // Renderiza os dados da página atual
      renderData(data.results);

      // Atualiza os controles de navegação
      updateNavigation(data.count);
    })
    .catch(error => console.error("Erro ao buscar dados:", error));
}

function renderData(results) {
  const container = document.getElementById("data-container");
  container.innerHTML = "";

  results.forEach(result => {
    const divIn = document.createElement("div"); // Cria um novo elemento <Div>
    divIn.className  = "container-in"; // Atribui a classe container-in para o Div criado acima
      
    const itemElement = document.createElement("div");
    itemElement.className  = "container-in"; // Atribui a classe container-in para o Div criado acima
    itemElement.textContent = result.name; // Ou outra propriedade que deseja mostrar

    const imgElement = document.createElement("img");  
    imgElement.className  = "container-in-img"; // Atribui a classe container-in para o Div criado acima

      // Buscar informações adicionais do JSON local
      fetch("../assets/json/images-starships.json")
      .then((response) => response.json())
      .then((json) => {
            // Procurar a entrada no JSON local com o mesmo nome da nave espacial
            const shipInfo = json.find((item) => item.name === result.name);
            imgElement.src = "." + shipInfo.images.small;
        
            const h4Element = document.createElement("h4"); // Cria um novo elemento <h4>
            h4Element.textContent = result.name; // Define o texto do novo elemento <h4> como o nome da nave espacial
      })    .catch(error => console.error("Erro x ao buscar dados:", error));

    divIn.appendChild(imgElement);
    divIn.appendChild(itemElement);

    container.appendChild(divIn);

  });
}

function updateNavigation(totalCount) {
  const numPages = Math.ceil(totalCount / itemsPerPage);
  const navigationContainer = document.getElementById("pagination-container");
  navigationContainer.innerHTML = "";

  // Adiciona botão volta para o inicio
  const primButton = document.createElement("button");
  primButton.textContent = "Primeiro";
  primButton.addEventListener("click", () => {
        fetchData(1);
  });
  
  navigationContainer.appendChild(primButton);
  
  // Adiciona botão de página anterior
  const prevButton = document.createElement("button");
  prevButton.textContent = "Anterior";
  prevButton.addEventListener("click", () => {
    if (currentPage > 1) {
        currentPage--;
        fetchData(currentPage);
    }
  });
  
  navigationContainer.appendChild(prevButton);

  // Adiciona botões de página
  for (let i = 1; i <= numPages; i++) {
    const pageButton = document.createElement("button");
    pageButton.textContent = i;
    pageButton.addEventListener("click", () => {
      currentPage = i;
      fetchData(currentPage);
    });

  navigationContainer.appendChild(pageButton);
  }

  // Adiciona botão de próxima página
  const nextButton = document.createElement("button");
  nextButton.textContent = "Próximo";
  nextButton.addEventListener("click", () => {
    if (currentPage < numPages) {
      currentPage++;
      fetchData(currentPage);
    }
  });

  navigationContainer.appendChild(nextButton);

  // Adiciona botão de ultima
  const finalButton = document.createElement("button");
  finalButton.textContent = "Último";
  finalButton.addEventListener("click", () => {
        fetchData(numPages);
  });

  navigationContainer.appendChild(finalButton);
}

// Inicia a primeira busca
fetchData(currentPage);
