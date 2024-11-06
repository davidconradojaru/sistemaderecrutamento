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
            // // Criação do botão para agendar entrevista
            // const button = document.createElement("button");
            // button.textContent = "Fazer Entrevista";
            // button.onclick = () => {
            //      // Redireciona para a API com os dados do candidato
            // const url = `http://127.0.0.1:5000/entrevista?id=${encodeURIComponent(item.id)}&nome=${encodeURIComponent(item.nome)}&cpf=${encodeURIComponent(item.cpf)}&data_nascimento=${encodeURIComponent(item.data_nascimento)}`;
            // window.location.href = url;
            // };
            // resultadoItem.appendChild(button);
            resultadosContainer.appendChild(resultadoItem);
        });
    } else {
        resultadosContainer.innerHTML = '<p>Nenhum candidato encontrado.</p>';
    }
}