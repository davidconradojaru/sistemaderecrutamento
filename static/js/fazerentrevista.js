document.addEventListener("DOMContentLoaded", function() {
    buscarEntrevistas();
});

function buscarEntrevistas() {
    fetch('/entrevistas')
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao buscar entrevistas');
            }
            return response.json();
        })
        .then(data => {
            exibirEntrevistas(data);
        })
        .catch(error => {
            console.error('Erro:', error);
            document.getElementById('resultadosEntrevista').innerHTML = '<p>Erro ao carregar entrevistas.</p>';
        });
}

function exibirEntrevistas(data) {
    const resultadosContainer = document.getElementById('resultadosEntrevista');
    resultadosContainer.innerHTML = ''; // Limpa resultados anteriores

    if (data.length > 0) {
        data.forEach(item => {
            const resultadoItem = document.createElement("div");
            resultadoItem.className = "resultado-item";
            resultadoItem.innerHTML = `
                <p><strong>Nome:</strong> ${item.nome}</p>
                <p><strong>Cidade Desejada:</strong> ${item.onde_trabalhar}</p>
                <p><strong>Cargo Desejado:</strong> ${item.cargo}</p>
                <p><strong>Data de Inclusão:</strong> ${item.created_at}</p>
            `;
            resultadosContainer.appendChild(resultadoItem);
        });
    } else {
        resultadosContainer.innerHTML = '<p>Nenhum candidato encontrado.</p>';
    }
}




function entrevista_pendente(id) {
    
}


