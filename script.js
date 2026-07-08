// ===========================================================
// MIP — Manejo Integrado de Pragas
// ===========================================================

document.addEventListener("DOMContentLoaded", () => {

  /* ---------- menu mobile ---------- */
  const alternadorNav = document.getElementById("alternadorNav");
  const navPrincipal = document.getElementById("navPrincipal");

  if (alternadorNav && navPrincipal) {
    alternadorNav.addEventListener("click", () => {
      const estaAberto = navPrincipal.classList.toggle("aberto");
      alternadorNav.setAttribute("aria-expanded", String(estaAberto));
    });

    navPrincipal.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        navPrincipal.classList.remove("aberto");
        alternadorNav.setAttribute("aria-expanded", "false");
      });
    });
  }

 
  const elementosRevelar = document.querySelectorAll(
    ".pilar, .beneficio, .problema-grade p, .painel-mapa, .faixa-chamada, .etapas li, .caixa-acao"
  );
  elementosRevelar.forEach(el => el.classList.add("revelar"));

  const io = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visivel");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  elementosRevelar.forEach(el => io.observe(el));

  const notasRegiao = {
    noroeste: "<strong>Noroeste:</strong> concentra um número expressivo de municípios com MIP em curso, formando um dos blocos mais contínuos do mapa — mas ainda cercado de vizinhos sem cor.",
    norte: "<strong>Norte:</strong> é a região com a maior mancha colorida do estado, sinal de que a prática ganhou escala onde recebeu mais apoio técnico contínuo.",
    oeste: "<strong>Oeste:</strong> mostra adoção espalhada em bolsões, intercalada com áreas brancas — um padrão de avanço desigual dentro da mesma região produtora.",
    sudoeste: "<strong>Sudoeste:</strong> apresenta uma mancha compacta e bem definida, mostrando que, quando a articulação entre produtores é forte, o manejo se espalha rápido pelos municípios vizinhos.",
    sul: "<strong>Sul:</strong> tem municípios com MIP dispersos por uma área grande, mas com muitos vazios entre eles — a região que mais evidencia o tanto de território ainda descoberto."
  };

  const selosLegenda = document.querySelectorAll(".legenda-selo");
  const notaRegiao = document.getElementById("notaRegiao");
  const notaPadrao = notaRegiao ? notaRegiao.innerHTML : "";

  selosLegenda.forEach(chip => {
    chip.addEventListener("click", () => {
      const jaAtivo = chip.classList.contains("ativo");
      selosLegenda.forEach(c => c.classList.remove("ativo"));

      if (jaAtivo) {
        notaRegiao.innerHTML = notaPadrao;
        return;
      }

      chip.classList.add("ativo");
      const regiao = chip.getAttribute("data-regiao");
      notaRegiao.innerHTML = `<p>${notasRegiao[regiao] || ""}</p>`;
    });
  });

});