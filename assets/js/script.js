const queryString = window.location.search;

fetch("https://swapi.dev/api/starships/" + queryString.replace("?", ""))
  .then((response) => response.json())
  .then((response) => {
    const h4Elements = document.querySelectorAll("h4"); // Seleciona todos os elementos h4
    response.results.forEach((element, index) => {
      const h4Element = h4Elements[index]; // Seleciona o elemento h4 correspondente ao índice atual
      if (h4Element) {
        h4Element.textContent = element.name; // Atribui o valor de element.name ao texto do h4
      }
    });
  });

// window.onload = function () {
//     // Aguardar 5 segundos (5000 milissegundos) antes de chamar mostrarPopup()
//     setTimeout(function () {
//         mostrarPopup();
//     }, 5000);
// };

// // Função para definir um cookie
// function setCookie(cname, cvalue, exdays) {
//     var d = new Date();
//     d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
//     var expires = "expires=" + d.toUTCString();
//     document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
// }

// // Função para obter o valor de um cookie
// function getCookie(cname) {
//     var name = cname + "=";
//     var decodedCookie = decodeURIComponent(document.cookie);
//     var ca = decodedCookie.split(';');
//     for (var i = 0; i < ca.length; i++) {
//         var c = ca[i];
//         while (c.charAt(0) == ' ') {
//             c = c.substring(1);
//         }
//         if (c.indexOf(name) == 0) {
//             return c.substring(name.length, c.length);
//         }
//     }
//     return "";
// }

// // Função para verificar se o popup já foi exibido
// function checkPopup() {
//     var popupShown = getCookie("popupShown");
//     if (!popupShown) {
//         mostrarPopup();
//         setCookie("popupShown", "true", 1);  // Define o cookie para indicar que o popup foi exibido
//     }
// }

// function mostrarPopup() {
//     document.getElementById('popup').style.display = 'block';
//     document.getElementById('overlay').style.display = 'block';
// }

// function fecharPopup() {
//     document.getElementById('popup').style.display = 'none';
//     document.getElementById('overlay').style.display = 'none';
// }

// function enviarFormulario() {
//     // Lógica de processamento do formulário

//     // Exemplo de exibição de mensagem
//     alert('Cadastro realizado com sucesso!');

//     // Fechar o popup após o cadastro
//     fecharPopup();
// }