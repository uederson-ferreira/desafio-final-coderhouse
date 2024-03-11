//Menu Hamburguer
$(".btnMenu").on("click", function () {
  const menu = $(".menu");
  const innerWrapper = $(".innerWrapper");
  const footer = $("footer");
  const menuIcon = $(".btnMenu");
  const basePath = window.location.pathname === "/index.html" ? "./" : "../";

  menu.toggleClass("menu--positionOpen");
  $("body").toggleClass("noScroll");
  innerWrapper.toggleClass("blurBackground");
  footer.toggleClass("blurBackground");

  if (menu.hasClass("menu--positionOpen")) {
    menuIcon.attr("src", basePath + "assets/img/shared/exit-white.svg");
  } else {
    menuIcon.attr("src", basePath + "assets/img/shared/menu-white.svg");
  }
});

//botão chevron dropdown do menu hamburguer
$(".menu__dropdown--chevron").on("click", () => {
  const submenu = $(".menu__submenu");
  const iconChevron = $(".menu__dropdown--chevron");

  submenu.toggleClass("menu__submenuOpen");
  iconChevron.toggleClass("menu__dropdown--chevronOpen");
});

//fechar a apresentação da pagina
$("#closePresentation").on("click", () => {
  $(".background.presentation--bgPersonagens").slideUp(500, () => {
    $(this).remove();
  });
});

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
