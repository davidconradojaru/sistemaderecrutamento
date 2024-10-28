



document.addEventListener("DOMContentLoaded", function() {
    buscarEntrevistas();
});

function buscarEntrevistas() {
    fetch('http://127.0.0.1:5000/entrevistas')
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
    resultadosContainer.innerHTML = '';

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
            // Criação do botão para agendar entrevista
            const button = document.createElement("button");
            button.textContent = "Fazer Entrevista";
            button.onclick = () => {
                 // Redireciona para a API com os dados do candidato
            const url = `http://127.0.0.1:5000/entrevista?nome=${encodeURIComponent(item.nome)}&cpf=${encodeURIComponent(item.cpf)}&data_nascimento=${encodeURIComponent(item.data_nascimento)}`;
            window.location.href = url;
            };
            resultadoItem.appendChild(button);
            resultadosContainer.appendChild(resultadoItem);
        });
    } else {
        resultadosContainer.innerHTML = '<p>Nenhum candidato encontrado.</p>';
    }
}

