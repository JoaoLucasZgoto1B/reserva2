/* ========================================================
   EXECUTADO QUANDO O DOM ESTÁ COMPLETAMENTE CARREGADO
   ======================================================== */
document.addEventListener("DOMContentLoaded", () => {

  /* ========================================================
     SEÇÃO 1: MENU MOBILE - Abrir/fechar navegação em mobile
     ======================================================== */
  const alternadorNav = document.getElementById("alternadorNav"); // Botão hambúrguer
  const navPrincipal = document.getElementById("navPrincipal");   // Menu de navegação

  /* Verifica se os elementos existem antes de adicionar listeners */
  if (alternadorNav && navPrincipal) {
    
    /* Clique no botão hambúrguer alterna a classe "aberto" */
    alternadorNav.addEventListener("click", () => {
      const estaAberto = navPrincipal.classList.toggle("aberto");
      /* Atualiza aria-expanded para acessibilidade */
      alternadorNav.setAttribute("aria-expanded", String(estaAberto));
    });

    /* Cada link do menu fecha o menu ao ser clicado */
    navPrincipal.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        navPrincipal.classList.remove("aberto"); // Remove classe "aberto"
        alternadorNav.setAttribute("aria-expanded", "false"); // Atualiza acessibilidade
      });
    });
  }

 
  /* ========================================================
     SEÇÃO 2: ANIMAÇÃO DE REVEAL - Elementos aparecem ao scroll
     ======================================================== */
  
  /* Seleciona todos os elementos que devem ter animação de reveal */
  const elementosRevelar = document.querySelectorAll(
    ".pilar, .beneficio, .problema-grade p, .painel-mapa, .faixa-chamada, .etapas li, .caixa-acao"
  );
  
  /* Adiciona classe "revelar" a cada elemento (estado inicial com opacity:0) */
  elementosRevelar.forEach(el => el.classList.add("revelar"));

  /* IntersectionObserver monitora quando elementos entram na viewport */
  const io = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        /* Quando o elemento fica visível na tela */
        if (entry.isIntersecting) {
          entry.target.classList.add("visivel"); // Adiciona "visivel" (opacity:1)
          io.unobserve(entry.target); // Para de monitorar após animação
        }
      });
    },
    { threshold: 0.15 } /* Dispara quando 15% do elemento está visível */
  );
  
  /* Começa a observar cada elemento */
  elementosRevelar.forEach(el => io.observe(el));

  
  /* ========================================================
     SEÇÃO 3: LEGENDA INTERATIVA DO MAPA - Botões por região
     ======================================================== */
  
  /* Objeto com textos descritivos para cada região do Paraná */
  const notasRegiao = {
    noroeste: "<strong>Noroeste:</strong> concentra um número expressivo de municípios com MIP em curso, formando um dos blocos mais contínuos do mapa — mas ainda cercado de vizinhos sem cor.",
    norte: "<strong>Norte:</strong> é a região com a maior mancha colorida do estado, sinal de que a prática ganhou escala onde recebeu mais apoio técnico contínuo.",
    oeste: "<strong>Oeste:</strong> mostra adoção espalhada em bolsões, intercalada com áreas brancas — um padrão de avanço desigual dentro da mesma região produtora.",
    sudoeste: "<strong>Sudoeste:</strong> apresenta uma mancha compacta e bem definida, mostrando que, quando a articulação entre produtores é forte, o manejo se espalha rápido pelos municípios vizinhos.",
    sul: "<strong>Sul:</strong> tem municípios com MIP dispersos por uma área grande, mas com muitos vazios entre eles — a região que mais evidencia o tanto de território ainda descoberto."
  };

  /* Seleciona todos os botões da legenda (5 regiões) */
  const selosLegenda = document.querySelectorAll(".legenda-selo");
  const notaRegiao = document.getElementById("notaRegiao"); /* Box que exibe o texto */
  const notaPadrao = notaRegiao ? notaRegiao.innerHTML : ""; /* Guarda o texto padrão original */

  /* Adiciona listener para cada botão de região */
  selosLegenda.forEach(chip => {
    chip.addEventListener("click", () => {
      /* Verifica se o chip clicado já estava ativo */
      const jaAtivo = chip.classList.contains("ativo");
      
      /* Remove classe "ativo" de todos os chips */
      selosLegenda.forEach(c => c.classList.remove("ativo"));

      /* Se clicou em um chip que já estava ativo, volta ao texto padrão */
      if (jaAtivo) {
        notaRegiao.innerHTML = notaPadrao;
        return;
      }

      /* Se clicou em um chip inativo, ativa-o */
      chip.classList.add("ativo");
      
      /* Pega o atributo data-regiao (noroeste, norte, etc) */
      const regiao = chip.getAttribute("data-regiao");
      
      /* Exibe o texto correspondente da região no box notaRegiao */
      notaRegiao.innerHTML = `<p>${notasRegiao[regiao] || ""}</p>`;
    });
  });

});
