document.addEventListener("DOMContentLoaded", function() {
    const searchButton = document.getElementById("searchButton");
    const searchInput = document.getElementById("searchInput");
    const searchResults = document.getElementById("searchResults");

    function fetchResults() {
        const query = searchInput.value.trim().toLowerCase();

        fetch(`http://192.168.121.246:5000/pesquisacandidato?query=${encodeURIComponent(query)}`)
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
                            <p><strong>Já foi chamado para entrevista:</strong> ${Boolean(item.chamar_entrevista) ? 'SIM' : 'NÃO'}</p>
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
    const chamarEntrevista = document.getElementById('chamar_entrevista').value;

    // Função para buscar os candidatos com base nos filtros aplicados
    searchCandidates(city, position, chamarEntrevista);
});

function searchCandidates(city, position, chamarEntrevista) {
    let url = `http://192.168.121.246:5000/pesquisacandidato?`;

    if (city) {
        url += `city=${encodeURIComponent(city)}&`;
    }
    if (position) {
        url += `position=${encodeURIComponent(position)}&`;
    }
    if (chamarEntrevista) {
        url += `chamar_entrevista=${encodeURIComponent(chamarEntrevista)}&`;
    }

    // Remover o último '&' se existir
    url = url.slice(0, -1); 

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
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
                <p><strong>Já foi chamado para entrevista:</strong> ${Boolean(item.chamar_entrevista) ? 'SIM' : 'NÃO'}</p>
                <button class="view-cv" data-id="${item.id}">Ver Currículo</button>
            `
            ;
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
    window.location.href = `http://192.168.121.246:5000/curriculo/${id}`;
}

function salvarEstadoPagina() {
    // Salvar os resultados da pesquisa no localStorage
    //localStorage.setItem('searchResults', searchResults.innerHTML);
    // Salvar a posição de rolagem no localStorage
    localStorage.setItem('scrollPosition', window.scrollY);
    // Salvar o termo de pesquisa no localStorage
    localStorage.setItem('searchQuery', searchInput.value.trim());
    // Salvar a aba ativa no localStorage
    localStorage.setItem('activeTab', document.querySelector('.tab-item.active').getAttribute('data-tab'));
}


function restaurarEstadoPagina() {
    const savedResults = localStorage.getItem('searchResults');
    const savedScrollPosition = localStorage.getItem('scrollPosition');
    const savedQuery = localStorage.getItem('searchQuery');
    const activeTab = localStorage.getItem('activeTab');

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

    
    if (activeTab) {
        document.querySelectorAll('.tab-item').forEach(tab => {
            tab.classList.remove('active');
        });
        document.querySelector(`.tab-item[data-tab="${activeTab}"]`).classList.add('active');
        
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
        });
        
        document.getElementById(activeTab).classList.add('active');
    }
}


restaurarEstadoPagina();

searchButton.addEventListener("click", function() {
    fetchResults();
});
});
