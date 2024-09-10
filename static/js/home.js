document.addEventListener("DOMContentLoaded", function() {
    const tabs = document.querySelectorAll(".tab-item");
    const tabContents = document.querySelectorAll(".tab-content");

    tabs.forEach(tab => {
        tab.addEventListener("click", function() {
            // Remover a classe 'active' de todas as abas e conteúdos
            tabs.forEach(item => item.classList.remove("active"));
            tabContents.forEach(content => content.classList.remove("active"));

            // Adicionar a classe 'active' à aba clicada e ao conteúdo correspondente
            tab.classList.add("active");
            document.getElementById(tab.getAttribute("data-tab")).classList.add("active");
        });
    });
});



