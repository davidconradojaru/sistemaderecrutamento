// Função para validar e coletar os dados pessoais e da entrevista
function validarDados() {
    // Coletando os valores dos campos do primeiro formulário
    const cargo = document.getElementById('cargo').value.trim();
    const Filial = document.getElementById('Filial').value.trim();
    const nome = document.getElementById('nome_candidato').value.trim();
    const dataNascimento = document.getElementById('data_nascimento').value;
    const cpf = document.getElementById('cpf').value.trim();
    const telefone = document.getElementById('telefone').value.trim();
    const email = document.getElementById('email').value.trim();

    // Validando os campos do primeiro formulário
    if (!nome || !dataNascimento || !cpf || !telefone || !email) {
        alert('Por favor, preencha todos os campos obrigatórios.');
        return;
    }

    // Coletando o ID do candidato da URL
    const params = new URLSearchParams(window.location.search);
    const idCandidato = params.get('id');

    // Coletando os dados do segundo formulário
    const dadosEntrevista = {
        moradia: document.getElementById("moradia_mont").value,
        planos_futuros: document.getElementById("planos_futuros_mont").value,
        coisas_importantes: document.getElementById("coisas_importantes_mont").value,
        hobbies: document.getElementById("hobbies_mont").value,
        atualizacao: document.getElementById("atualizacao_mont").value,
        residencia: document.getElementById("residencia_mont").value,
        redes_sociais: document.getElementById("redes_sociais_mont").value,
        ponto_forte: document.getElementById("ponto_forte_mont").value,
        realizacao: document.getElementById("realizacao_mont").value,
        cursos: document.getElementById("cursos_mont").value,
        horas_extras: document.getElementById("horas_extras_mont").value,
        veiculo: document.getElementById("veiculo_mont").value,
        caracteristicas: document.getElementById("caracteristicas_montador_mont").value,
        experiencia: document.getElementById("experiencia_montagem_mont").value,
        novalar: document.getElementById("novalar_mont").value,
        obs: document.getElementById("obs_mont").value,
    };

    // Montando um objeto único para enviar
    const dados = {
        cargo,
        Filial,
        nome,
        data_nascimento: dataNascimento,
        cpf,
        telefone,
        email,
        id_candidato: idCandidato, // Incluindo o ID do candidato
        ...dadosEntrevista // Mescla os dados do segundo formulário
    };

    // Enviar os dados para o servidor
    enviarDados(dados);
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
            throw new Error('Erro ao enviar os dados: ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        alert('Dados enviados com sucesso!');
        // Aqui você pode limpar os campos do formulário ou redirecionar
        document.getElementById('formulario').reset(); // Exemplo de limpeza de formulário
    })
    .catch(error => {
        alert(error.message);
    });
}

// Configurando o evento de submissão do botão
document.getElementById('botaoEnviar').addEventListener('click', (event) => {
    event.preventDefault(); // Evita o comportamento padrão do botão
    validarDados(); // Chama a função que valida e envia os dados
});
