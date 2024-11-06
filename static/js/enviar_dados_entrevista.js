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
    } else if (cargo === 'Gerente de Loja') {
        dadosEntrevista.casa = document.getElementById("casa_gerente").value;
        dadosEntrevista.futuro = document.getElementById("planos_gerente").value;
        dadosEntrevista.importancia = document.getElementById("importancia_ger").value;
        dadosEntrevista.hobbies = document.getElementById("hobbies_ger").value;
        dadosEntrevista.atualizado = document.getElementById("atualizacao_ger").value;
        dadosEntrevista.residencia = document.getElementById("residencia_ger").value;
        dadosEntrevista.redes_sociais = document.getElementById("redes_sociais_ger").value;
        dadosEntrevista.ponto_forte = document.getElementById("ponto_forte_ger").value;
        dadosEntrevista.realizacao = document.getElementById("realizacao_ger").value;
        dadosEntrevista.desapontamento = document.getElementById("desapontamento_ger").value;
        dadosEntrevista.cursos = document.getElementById("cursos_ger").value;
        dadosEntrevista.horas_extras = document.getElementById("horas_extras_ger").value;
        dadosEntrevista.informatica = document.getElementById("informatica_ger").value;
        dadosEntrevista.tempo_trabalho = document.getElementById("tempo_trabalho_ger").value;
        dadosEntrevista.motivo_trabalho = document.getElementById("motivo_trabalho_ger").value;
        dadosEntrevista.relacionamento_cliente = document.getElementById("relacionamento_cliente_ger").value;
        dadosEntrevista.gestao_equipe = document.getElementById("gestao_equipe_ger").value;
        dadosEntrevista.convencer = document.getElementById("convencer_ger").value;
        dadosEntrevista.redes_vendas = document.getElementById("redes_vendas_ger").value;
        dadosEntrevista.caracteristicas_vendedor = document.getElementById("caracteristicas_vendedor_ger").value;
        dadosEntrevista.mudanca = document.getElementById("mudanca_ger").value;
        dadosEntrevista.novalar = document.getElementById("novalar_ger").value;
        dadosEntrevista.obs = document.getElementById("obs_ger").value;
    } else if (cargo === 'Crediarista') {
        dadosEntrevista.casa = document.getElementById("casa_cred").value;
        dadosEntrevista.futuro = document.getElementById("planos_cred").value;
        dadosEntrevista.importancia = document.getElementById("importancia_cred").value;
        dadosEntrevista.hobbies = document.getElementById("hobbies_cred").value;
        dadosEntrevista.atualizado = document.getElementById("atualizacao_cred").value;
        dadosEntrevista.residencia = document.getElementById("residencia_cred").value;
        dadosEntrevista.redes_sociais = document.getElementById("redes_sociais_cred").value;
        dadosEntrevista.ponto_forte = document.getElementById("ponto_forte_cred").value;
        dadosEntrevista.realizacao = document.getElementById("realizacao_cred").value;
        dadosEntrevista.desapontamento = document.getElementById("desapontamento_cred").value;
        dadosEntrevista.cursos = document.getElementById("cursos_cred").value;
        dadosEntrevista.horas_extras = document.getElementById("horas_extras_cred").value;
        dadosEntrevista.informatica = document.getElementById("informatica_cred").value;
        dadosEntrevista.tempo_trabalho = document.getElementById("tempo_trabalho_cred").value;
        dadosEntrevista.motivo_trabalho = document.getElementById("motivo_trabalho_cred").value;
        dadosEntrevista.relacionamento_equipe = document.getElementById("relacionamento_equipe_cred").value;
        dadosEntrevista.estrategias = document.getElementById("estrategias_cred").value;
        dadosEntrevista.profissional_administrativo = document.getElementById("profissional_administrativo_cred").value;
        dadosEntrevista.convencer = document.getElementById("convencer_cred").value;
        dadosEntrevista.novalar = document.getElementById("novalar_cred").value;
        dadosEntrevista.obs = document.getElementById("obs_cred").value;
    } else if (cargo === 'Auxiliar Administrativo') {
        dadosEntrevista.moradia = document.getElementById("moradia_auxadm").value;
        dadosEntrevista.futuro = document.getElementById("futuro_auxadm").value;
        dadosEntrevista.importantes = document.getElementById("importantes_auxadm").value;
        dadosEntrevista.hobbies = document.getElementById("hobbies_auxadm").value;
        dadosEntrevista.atualizacao = document.getElementById("atualizacao_auxadm").value;
        dadosEntrevista.residencia = document.getElementById("residencia_auxadm").value;
        dadosEntrevista.redes_sociais = document.getElementById("redes_sociais_auxadm").value;
        dadosEntrevista.ponto_forte = document.getElementById("ponto_forte_auxadm").value;
        dadosEntrevista.cursos = document.getElementById("cursos_auxadm").value;
        dadosEntrevista.horas_extras = document.getElementById("horas_extras_auxadm").value;
        dadosEntrevista.software = document.getElementById("software_auxadm").value;
        dadosEntrevista.office = document.getElementById("office_auxadm").value;
        dadosEntrevista.relacionamento = document.getElementById("relacionamento_auxadm").value;
        dadosEntrevista.habilidades = document.getElementById("habilidades_auxadm").value;
        dadosEntrevista.discricao = document.getElementById("discricao_auxadm").value;
        dadosEntrevista.novalar = document.getElementById("novalar_auxadm").value;
        dadosEntrevista.obs = document.getElementById("obs_auxadm").value;
    } else if (cargo === 'Gerente Administrativo') {
        dadosEntrevista.moradia = document.getElementById("moradia_geradm").value;
        dadosEntrevista.planos_futuro = document.getElementById("planos_futuro_geradm").value;
        dadosEntrevista.coisas_importantes = document.getElementById("coisas_importantes_geradm").value;
        dadosEntrevista.hobbies = document.getElementById("hobbies_geradm").value;
        dadosEntrevista.atualizacao = document.getElementById("atualizacao_geradm").value;
        dadosEntrevista.residencia = document.getElementById("residencia_geradm").value;
        dadosEntrevista.redes_sociais = document.getElementById("redes_sociais_geradm").value;
        dadosEntrevista.ponto_forte = document.getElementById("ponto_forte_geradm").value;
        dadosEntrevista.maior_realizacao = document.getElementById("maior_realizacao_geradm").value;
        dadosEntrevista.desapontamento = document.getElementById("desapontamento_geradm").value;
        dadosEntrevista.cursos = document.getElementById("cursos_geradm").value;
        dadosEntrevista.horas_extras = document.getElementById("horas_extras_geradm").value;
        dadosEntrevista.informacao = document.getElementById("informacao_geradm").value;
        dadosEntrevista.tempo = document.getElementById("tempo_geradm").value;
        dadosEntrevista.motivo_gerente = document.getElementById("motivo_gerente_geradm").value;
        dadosEntrevista.relacionamento = document.getElementById("relacionamento_geradm").value;
        dadosEntrevista.estrategias = document.getElementById("estrategias_geradm").value;
        dadosEntrevista.caracteristicas_administrativo = document.getElementById("caracteristicas_administrativo_geradm").value;
        dadosEntrevista.convencao = document.getElementById("convencao_geradm").value;
        dadosEntrevista.novalar = document.getElementById("novalar_geradm").value;
        dadosEntrevista.obs = document.getElementById("obs_geradm").value;
    } else if (cargo === 'Ajudante de Depósito') {
        dadosEntrevista.residencia = document.getElementById("residencia_auxcd").value;
        dadosEntrevista.planos_futuro = document.getElementById("planos_futuro_auxcd").value;
        dadosEntrevista.coisas_importantes = document.getElementById("coisas_importantes_auxcd").value;
        dadosEntrevista.horas_vagas = document.getElementById("horas_vagas_auxcd").value;
        dadosEntrevista.atualizacao = document.getElementById("atualizacao_auxcd").value;
        dadosEntrevista.residencias_ultimos_5_anos = document.getElementById("residencias_ultimos_5_anos_auxcd").value;
        dadosEntrevista.redes_sociais = document.getElementById("redes_sociais_auxcd").value;
        dadosEntrevista.ponto_forte = document.getElementById("ponto_forte_auxcd").value;
        dadosEntrevista.maior_realizacao = document.getElementById("maior_realizacao_auxcd").value;
        dadosEntrevista.cursos_profissionalizantes = document.getElementById("cursos_profissionalizantes_auxcd").value;
        dadosEntrevista.horas_extras = document.getElementById("horas_extras_auxcd").value;
        dadosEntrevista.caracteristicas_ajudante = document.getElementById("caracteristicas_ajudante_auxcd").value;
        dadosEntrevista.experiencia_deposito = document.getElementById("experiencia_deposito_auxcd").value;
        dadosEntrevista.conhece_novalar = document.getElementById("conhece_novalar_auxcd").value;
        dadosEntrevista.obs = document.getElementById("obs_auxcd").value;
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
    fetch('/insert_entrevista', {
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
