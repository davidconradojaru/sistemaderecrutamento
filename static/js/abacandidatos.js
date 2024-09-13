document.addEventListener("DOMContentLoaded", function() {
    const searchButton = document.getElementById("searchButton");
    const searchInput = document.getElementById("searchInput");
    const searchResults = document.getElementById("searchResults");

    function fetchResults() {
        const query = searchInput.value.trim().toLowerCase();

        fetch(`http://127.0.0.1:5000/pesquisacandidato?query=${encodeURIComponent(query)}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Erro na resposta da API: ${response.status} - ${response.statusText}`);
                }
                return response.json();
            })
            .then(data => {
                searchResults.innerHTML = '';
                if (data.length > 0) {
                    data.forEach(item => {
                        const resultItem = document.createElement("div");
                        resultItem.className = "result-item";
                        resultItem.innerHTML = `
                            <p><strong>Nome:</strong> ${item.nome}</p>
                            <p><strong>Cidade Desejada:</strong> ${item.onde_trabalhar}</p>
                            <p><strong>Data de Inclusão:</strong> ${item.created_at}</p>
                            <p><strong>Cargo Desejado:</strong> ${item.cargo}</p>
                            <button class="view-cv" data-id="${item.id}">Ver Currículo</button>
                        `;
                        searchResults.appendChild(resultItem);
                    });

                    // Adiciona ouvintes de evento para os botões "Ver Currículo"
                    document.querySelectorAll(".view-cv").forEach(button => {
                        button.addEventListener("click", function() {
                            const id = this.getAttribute("data-id");
                            salvarEstadoPagina();
                            viewCurriculo(id);
                        });
                    });
                } else {
                    searchResults.innerHTML = '<p>Nenhum candidato encontrado.</p>';
                }
            })
            .catch(error => {
                console.error('Erro no fetch:', error);
                searchResults.innerHTML = '<p>Erro ao buscar candidatos.</p>';
            });
    }

    




// Função de filtros cidade e cargo
document.getElementById('filterButton').addEventListener('click', function() {
    const city = document.getElementById('city').value;
    const position = document.getElementById('position').value;

    // Função para buscar os candidatos com base nos filtros aplicados
    searchCandidates(city, position);
});

function searchCandidates(city, position) {
    // Esta função deve enviar uma requisição à sua API/backend, passando os filtros como parâmetros
    // Exemplo de uma requisição fetch:
    fetch(`http://127.0.0.1:5000/pesquisacandidato?city=${encodeURIComponent(city)}&position=${encodeURIComponent(position)}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Atualize a div de resultados com os dados filtrados
            displayResults(data);
        })
        .catch(error => console.error('Erro:', error));
}

function displayResults(data) {
    const resultsContainer = document.getElementById('searchResults');
    resultsContainer.innerHTML = ''; // Limpa resultados anteriores

    if (data.length > 0) {
        data.forEach(item => {
            const resultItem = document.createElement("div");
            resultItem.className = "result-item";
            resultItem.innerHTML = `
                <p><strong>Nome:</strong> ${item.nome}</p>
                <p><strong>Cidade Desejada:</strong> ${item.onde_trabalhar}</p>
                <p><strong>Data de Inclusão:</strong> ${item.created_at}</p>
                <p><strong>Cargo Desejado:</strong> ${item.cargo}</p>
                <button class="view-cv" data-id="${item.id}">Ver Currículo</button>
            `;
            resultsContainer.appendChild(resultItem);
        });

        // Adiciona ouvintes de evento para os botões "Ver Currículo"
        document.querySelectorAll(".view-cv").forEach(button => {
            button.addEventListener("click", function() {
                const id = this.getAttribute("data-id");
                salvarEstadoPagina();
                viewCurriculo(id);
            });
        });
    } else {
        resultsContainer.innerHTML = '<p>Nenhum resultado encontrado.</p>';
    }
}


function viewCurriculo(id) {
    // Redireciona para a página do currículo com o ID do candidato
    window.location.href = `http://127.0.0.1:5000/curriculo/${id}`;
}

function salvarEstadoPagina() {
    // Salvar os resultados da pesquisa no localStorage
    localStorage.setItem('searchResults', searchResults.innerHTML);
    // Salvar a posição de rolagem no localStorage
    localStorage.setItem('scrollPosition', window.scrollY);
    // Salvar o termo de pesquisa no localStorage
    localStorage.setItem('searchQuery', searchInput.value.trim());
}

function restaurarEstadoPagina() {
    const savedResults = localStorage.getItem('searchResults');
    const savedScrollPosition = localStorage.getItem('scrollPosition');
    const savedQuery = localStorage.getItem('searchQuery');

    if (savedResults) {
        searchResults.innerHTML = savedResults;
        // Restaurar os eventos de clique dos botões "Ver Currículo"
        document.querySelectorAll(".view-cv").forEach(button => {
            button.addEventListener("click", function() {
                const id = this.getAttribute("data-id");
                salvarEstadoPagina();
                viewCurriculo(id);
            });
        });
    }

    if (savedScrollPosition) {
        window.scrollTo(0, parseInt(savedScrollPosition, 10));
    }

    if (savedQuery) {
        searchInput.value = savedQuery;
    }
}

// Restaurar o estado da página ao carregar
restaurarEstadoPagina();

searchButton.addEventListener("click", function() {
    fetchResults();
});
});