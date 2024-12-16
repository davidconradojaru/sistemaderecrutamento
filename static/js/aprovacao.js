document.addEventListener("DOMContentLoaded", function() {
    buscaraprovacoes();
});

function buscaraprovacoes() {
    fetch('/aprovacoes')
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao buscar entrevistas');
            }
            return response.json();
        })
        .then(data => {
            exibiraprovacao(data);
        })
        .catch(error => {
            console.error('Erro:', error);
            document.getElementById('aprovresults').innerHTML = '<p>Erro ao carregar candidatos.</p>';
        });
}

function exibiraprovacao(data) {
    const resultadosContainer = document.getElementById('aprovresults');
    resultadosContainer.innerHTML = '';

    if (data.length > 0) {
        data.forEach(item => {
            const resultadoItem = document.createElement("div");
            resultadoItem.className = "resultado-item";
            resultadoItem.innerHTML = `
                <p><strong>ID do candidato:</strong> ${item.id}</p>
                <p><strong>Nome:</strong> ${item.nome_candidato}</p>
                <p><strong>Filial:</strong> ${item.filial}</p>
                <p><strong>Cargo Desejado:</strong> ${item.cargo}</p>
                <p><strong>Data da entrevista:</strong> ${item.data_entrevista}</p>
            `;
            // Criação do botão para ver a entrevista completa
            const button = document.createElement("button");
            button.textContent = "Ver Entrevista Completa";
            button.onclick = () => {
                // Redireciona para a página de entrevista_feita.html com o id do candidato
                window.location.href = `/entrevista_feita/${encodeURIComponent(item.id)}`;
            };
            resultadoItem.appendChild(button);
            resultadosContainer.appendChild(resultadoItem);
        });
    } else {
        resultadosContainer.innerHTML = '<p>Nenhum candidato encontrado.</p>';
    }
}
