const queryString = window.location.search;
fetch("https://swapi.py4e.com/api/starships/" + queryString.replace("?", ""))
  .then((response) => response.json())
  .then((response) => {
    const containerH4 = document.getElementById("containerDiv"); // Assume que há um elemento com id="container" onde os novos elementos serão inseridos
    const containerDiv = document.getElementById("containerDiv"); // Assume que há um elemento com id="container" onde os novos elementos serão inseridos
    
    response.results.forEach((element) => {
      const divIn = document.createElement("div"); // Cria um novo elemento <Div>
      divIn.className  = "container-in"; // Atribui a classe container-in para o Div criado acima
      
      const imgIn = document.createElement("img"); // Cria um novo elemento <img>
      imgIn.className  = "container-in-img"; // Atribui a classe container-in para o Div criado acima
      
      // Buscar informações adicionais do JSON local
      fetch("../assets/json/images-starships.json")
      .then((response) => response.json())
      .then((json) => {
            // Procurar a entrada no JSON local com o mesmo nome da nave espacial
            const shipInfo = json.find((item) => item.name === element.name);
            imgIn.src = "." + shipInfo.images.small;
        
            const h4Element = document.createElement("h4"); // Cria um novo elemento <h4>
            h4Element.textContent = element.name; // Define o texto do novo elemento <h4> como o nome da nave espacial

            divIn.appendChild(imgIn);
            divIn.appendChild(h4Element)
            
            containerDiv.appendChild(divIn);
      });
  });

  });

  
  