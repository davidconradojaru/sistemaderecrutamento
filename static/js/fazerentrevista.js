



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


//DAQUI INSERÇÃO DE DADOS DA PAGINA ENTREVISTA
// Função para validar e coletar os dados pessoais
function validarDadosPessoais() {
    // Coletando os valores dos campos
    const nome = document.getElementById('nome_candidato').value.trim();
    const dataNascimento = document.getElementById('data_nascimento').value;
    const cpf = document.getElementById('cpf').value.trim();
    const telefone = document.getElementById('telefone').value.trim();
    const email = document.getElementById('email').value.trim();

    // Validando os campos
    if (!nome || !dataNascimento || !cpf || !telefone || !email) {
        alert('Por favor, preencha todos os campos obrigatórios.');
        return;
    }

    // Exemplo de validação simples para CPF (ajuste conforme necessário)
    const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
    if (!cpfRegex.test(cpf)) {
        alert('Por favor, insira um CPF válido no formato XXX.XXX.XXX-XX.');
        return;
    }

    // Aqui você pode fazer o envio dos dados
    enviarDados({
        nome,
        data_nascimento: dataNascimento,
        cpf,
        telefone,
        email,
    });
}

// Função para enviar os dados para o servidor
function enviarDados(dados) {
    fetch('http://127.0.0.1:5000/insert_entrevista', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(dados),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao enviar os dados.');
        }
        return response.json();
    })
    .then(data => {
        alert('Dados enviados com sucesso!');
        // Aqui você pode redirecionar ou limpar o formulário
    })
    .catch(error => {
        alert(error.message);
    });
}

document.getElementById('botaoEnviar').addEventListener('click', validarDadosPessoais);