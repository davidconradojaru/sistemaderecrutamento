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

    // Coletando os dados do segundo formulário, dependendo do cargo
    const dadosEntrevista = {};

    if (cargo === 'Montador') {
        dadosEntrevista.moradia = document.getElementById("moradia_mont").value;
        dadosEntrevista.planos_futuros = document.getElementById("planos_futuros_mont").value;
        dadosEntrevista.coisas_importantes = document.getElementById("coisas_importantes_mont").value;
        dadosEntrevista.hobbies = document.getElementById("hobbies_mont").value;
        dadosEntrevista.atualizacao = document.getElementById("atualizacao_mont").value;
        dadosEntrevista.residencia = document.getElementById("residencia_mont").value;
        dadosEntrevista.redes_sociais = document.getElementById("redes_sociais_mont").value;
        dadosEntrevista.ponto_forte = document.getElementById("ponto_forte_mont").value;
        dadosEntrevista.realizacao = document.getElementById("realizacao_mont").value;
        dadosEntrevista.cursos = document.getElementById("cursos_mont").value;
        dadosEntrevista.horas_extras = document.getElementById("horas_extras_mont").value;
        dadosEntrevista.veiculo = document.getElementById("veiculo_mont").value;
        dadosEntrevista.caracteristicas = document.getElementById("caracteristicas_montador_mont").value;
        dadosEntrevista.experiencia = document.getElementById("experiencia_montagem_mont").value;
        dadosEntrevista.novalar = document.getElementById("novalar_mont").value;
        dadosEntrevista.obs = document.getElementById("obs_mont").value;
    } else if (cargo === 'Vendedor') {
        dadosEntrevista.casa = document.getElementById("casa").value;
        dadosEntrevista.futuro = document.getElementById("futuro").value;
        dadosEntrevista.importancia = document.getElementById("importancia").value;
        dadosEntrevista.hobbies = document.getElementById("hobbies").value;
        dadosEntrevista.atualizado = document.getElementById("atualizado").value;
        dadosEntrevista.residencia = document.getElementById("residencia").value;
        dadosEntrevista.redes_sociais = document.getElementById("redes_sociais").value;
        dadosEntrevista.ponto_forte = document.getElementById("ponto_forte").value;
        dadosEntrevista.realizacao = document.getElementById("realizacao").value;
        dadosEntrevista.desapontamento = document.getElementById("desapontamento").value;
        dadosEntrevista.experiencia = document.getElementById("experiencia").value;
        dadosEntrevista.cursos = document.getElementById("cursos").value;
        dadosEntrevista.horas_extras = document.getElementById("horas_extras").value;
        dadosEntrevista.informatica = document.getElementById("informatica").value;
        dadosEntrevista.vendas = document.getElementById("vendas").value;
        dadosEntrevista.confianca_cliente = document.getElementById("confianca_cliente").value;
        dadosEntrevista.estrategias_vendas = document.getElementById("estrategias_vendas").value;
        dadosEntrevista.convencimento = document.getElementById("convencimento").value;
        dadosEntrevista.redes_sociais2 = document.getElementById("redes_sociais2").value;
        dadosEntrevista.gerente_vendas = document.getElementById("gerente_vendas").value;
        dadosEntrevista.novalar = document.getElementById("novalar").value;
        dadosEntrevista.obs = document.getElementById("obs").value;
    }

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

    // Verificando se os dados estão corretos antes de enviar para o servidor
    console.log(dados); // Para depuração, veja os dados sendo enviados

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
        document.getElementById('form-entrevista').reset(); // Exemplo de limpeza de formulário
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
