document.addEventListener("DOMContentLoaded", function () {
    // Pegue o ID da entrevista da URL
    const entrevista_id = getEntrevistaIdFromUrl();

    // Função para pegar o ID da entrevista da URL
    function getEntrevistaIdFromUrl() {
        const pathParts = window.location.pathname.split('/');  // Divide a URL em partes
        const entrevistaId = pathParts[pathParts.length - 1];  // O ID será a última parte da URL
        console.log('ID da entrevista:', entrevistaId);  // Verifique o ID
        return entrevistaId; // Retorna o ID
    }

    // Chama a API para pegar os dados da entrevista
    fetch(`/get_entrevista_feita/${entrevista_id}`)
    .then(response => {
        if (!response.ok) {
            throw new Error(`Erro ao acessar o servidor: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log('Dados recebidos:', data);  // Verifique os dados
        if (data.error) {
            alert(`Erro: ${data.error}`);
            return;
        }

        // Exibe os dados gerais da entrevista
        displayDadosGerais(data);

        // Exibe os dados específicos do cargo
        displayResults(data);
    })
    .catch(error => {
        console.error('Erro ao carregar os dados da entrevista:', error);
        alert('Erro ao carregar os dados da entrevista!');
    });
});


// Função para exibir os dados gerais da entrevista
function displayDadosGerais(data) {
    // Preencher os campos com os dados
    document.getElementById('nome').textContent = data.nome_candidato || 'Não informado';  // Nome do candidato
    document.getElementById('id').textContent = data.id || 'Não informado';  // ID da entrevista
    document.getElementById('cargoSpan').textContent = data.cargo || 'Não informado';  // Cargo
    document.getElementById('filialSpan').textContent = data.filial || 'Não informado';  // Filial (se houver)
    document.getElementById('dataNascimentoSpan').textContent = formatDate(data.data_nascimento) || 'Não informado';  // Data de nascimento
    document.getElementById('cpfSpan').textContent = data.cpf || 'Não informado';  // CPF
    document.getElementById('telefoneSpan').textContent = data.telefone || 'Não informado';  // Telefone (se houver)
    document.getElementById('emailSpan').textContent = data.email || 'Não informado';  // Email
    document.getElementById('dataEntrevistaSpan').textContent = formatDate(data.data_entrevista) || 'Não informado';  // Data da entrevista
}

// Função para formatar a data no formato 'DD/MM/YYYY'
function formatDate(dateString) {
    if (!dateString) return null;
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');  // Meses começam de 0
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}

// Função para truncar texto longo
function truncateText(text, maxLength = 200) {
    if (text && text.length > maxLength) {
        return text.substring(0, maxLength) + '...'; // Truncando e adicionando "..."
    }
    return text ?? 'Não informado'; // Retorna "Não informado" caso o texto seja nulo ou indefinido
}

// Função para exibir os resultados no HTML com base no cargo
function displayResults(data) {
    const cargoEspecificoDiv = document.getElementById('cargoEspecifico');
    cargoEspecificoDiv.innerHTML = ''; // Limpa resultados anteriores

    if (data.cargo === 'Montador' && data.montador_dados) {
        cargoEspecificoDiv.innerHTML = `
            <h3>Dados do Montador</h3>
            <p><strong>Moradia:</strong> ${truncateText(data.montador_dados.moradia)}</p>
            <p><strong>Planos Futuros:</strong> ${truncateText(data.montador_dados.planos_futuros)}</p>
            <p><strong>Coisas Importantes:</strong> ${truncateText(data.montador_dados.coisas_importantes)}</p>
            <p><strong>Hobbies:</strong> ${truncateText(data.montador_dados.hobbies)}</p>
            <p><strong>Atualização:</strong> ${truncateText(data.montador_dados.atualizacao)}</p>
            <p><strong>Residência:</strong> ${truncateText(data.montador_dados.residencia)}</p>
            <p><strong>Redes Sociais:</strong> ${truncateText(data.montador_dados.redes_sociais)}</p>
            <p><strong>Ponto Forte:</strong> ${truncateText(data.montador_dados.ponto_forte)}</p>
            <p><strong>Realização:</strong> ${truncateText(data.montador_dados.realizacao)}</p>
            <p><strong>Cursos:</strong> ${truncateText(data.montador_dados.cursos)}</p>
            <p><strong>Horas Extras:</strong> ${truncateText(data.montador_dados.horas_extras)}</p>
            <p><strong>Veículo:</strong> ${truncateText(data.montador_dados.veiculo)}</p>
            <p><strong>Características:</strong> ${truncateText(data.montador_dados.caracteristicas)}</p>
            <p><strong>Experiência:</strong> ${truncateText(data.montador_dados.experiencia)}</p>
            <p><strong>Novalar:</strong> ${truncateText(data.montador_dados.novalar)}</p>
            <p><strong>Observações:</strong> ${truncateText(data.montador_dados.obs)}</p>
            <p><strong>Data de Criação:</strong> ${truncateText(data.montador_dados.created_at)}</p>
        `;
    }
    else if (data.cargo === 'Vendedor' && data.vendedor_dados) {
        cargoEspecificoDiv.innerHTML = `
            <h3>Dados do Vendedor</h3>
            <p><strong>Casa:</strong> ${truncateText(data.vendedor_dados.casa)}</p>
            <p><strong>Futuro:</strong> ${truncateText(data.vendedor_dados.futuro)}</p>
            <p><strong>Importância:</strong> ${truncateText(data.vendedor_dados.importancia)}</p>
            <p><strong>Hobbies:</strong> ${truncateText(data.vendedor_dados.hobbies)}</p>
            <p><strong>Atualizado:</strong> ${truncateText(data.vendedor_dados.atualizado)}</p>
            <p><strong>Residência:</strong> ${truncateText(data.vendedor_dados.residencia)}</p>
            <p><strong>Redes Sociais:</strong> ${truncateText(data.vendedor_dados.redes_sociais)}</p>
            <p><strong>Ponto Forte:</strong> ${truncateText(data.vendedor_dados.ponto_forte)}</p>
            <p><strong>Realização:</strong> ${truncateText(data.vendedor_dados.realizacao)}</p>
            <p><strong>Desapontamento:</strong> ${truncateText(data.vendedor_dados.desapontamento)}</p>
            <p><strong>Experiência:</strong> ${truncateText(data.vendedor_dados.experiencia)}</p>
            <p><strong>Cursos:</strong> ${truncateText(data.vendedor_dados.cursos)}</p>
            <p><strong>Horas Extras:</strong> ${truncateText(data.vendedor_dados.horas_extras)}</p>
            <p><strong>Informática:</strong> ${truncateText(data.vendedor_dados.informatica)}</p>
            <p><strong>Vendas:</strong> ${truncateText(data.vendedor_dados.vendas)}</p>
            <p><strong>Confiança Cliente:</strong> ${truncateText(data.vendedor_dados.confianca_cliente)}</p>
            <p><strong>Estratégias de Vendas:</strong> ${truncateText(data.vendedor_dados.estrategias_vendas)}</p>
            <p><strong>Convencimento:</strong> ${truncateText(data.vendedor_dados.convencimento)}</p>
            <p><strong>Redes Sociais 2:</strong> ${truncateText(data.vendedor_dados.redes_sociais2)}</p>
            <p><strong>Gerente de Vendas:</strong> ${truncateText(data.vendedor_dados.gerente_vendas)}</p>
            <p><strong>Novalar:</strong> ${truncateText(data.vendedor_dados.novalar)}</p>
            <p><strong>Observações:</strong> ${truncateText(data.vendedor_dados.obs)}</p>
            <p><strong>Data de Criação:</strong> ${truncateText(data.vendedor_dados.created_at)}</p>
        `;
    }
    
    else if (data.cargo === 'Crediarista' && data.crediarista_dados) {
        cargoEspecificoDiv.innerHTML = `
            <h3>Dados do Crediarista</h3>
            <p><strong>Casa:</strong> ${truncateText(data.crediarista_dados.casa)}</p>
            <p><strong>Futuro:</strong> ${truncateText(data.crediarista_dados.futuro)}</p>
            <p><strong>Importância:</strong> ${truncateText(data.crediarista_dados.importancia)}</p>
            <p><strong>Hobbies:</strong> ${truncateText(data.crediarista_dados.hobbies)}</p>
            <p><strong>Atualizado:</strong> ${truncateText(data.crediarista_dados.atualizado)}</p>
            <p><strong>Residência:</strong> ${truncateText(data.crediarista_dados.residencia)}</p>
            <p><strong>Redes Sociais:</strong> ${truncateText(data.crediarista_dados.redes_sociais)}</p>
            <p><strong>Ponto Forte:</strong> ${truncateText(data.crediarista_dados.ponto_forte)}</p>
            <p><strong>Realização:</strong> ${truncateText(data.crediarista_dados.realizacao)}</p>
            <p><strong>Desapontamento:</strong> ${truncateText(data.crediarista_dados.desapontamento)}</p>
            <p><strong>Experiência:</strong> ${truncateText(data.crediarista_dados.experiencia)}</p>
            <p><strong>Cursos:</strong> ${truncateText(data.crediarista_dados.cursos)}</p>
            <p><strong>Horas Extras:</strong> ${truncateText(data.crediarista_dados.horas_extras)}</p>
            <p><strong>Informática:</strong> ${truncateText(data.crediarista_dados.informatica)}</p>
            <p><strong>Tempo de Trabalho:</strong> ${truncateText(data.crediarista_dados.tempo_trabalho)}</p>
            <p><strong>Motivo de Trabalho:</strong> ${truncateText(data.crediarista_dados.motivo_trabalho)}</p>
            <p><strong>Relacionamento com a Equipe:</strong> ${truncateText(data.crediarista_dados.relacionamento_equipe)}</p>
            <p><strong>Estratégias:</strong> ${truncateText(data.crediarista_dados.estrategias)}</p>
            <p><strong>Profissional Administrativo:</strong> ${truncateText(data.crediarista_dados.profissional_administrativo)}</p>
            <p><strong>Convencer:</strong> ${truncateText(data.crediarista_dados.convencer)}</p>
            <p><strong>Novalar:</strong> ${truncateText(data.crediarista_dados.novalar)}</p>
            <p><strong>Observações:</strong> ${truncateText(data.crediarista_dados.obs)}</p>
        `;
    }
    
    else if (data.cargo === 'Auxiliar Administrativo' && data.aux_administrativo_dados) {
        cargoEspecificoDiv.innerHTML = `
            <h3>Dados do Auxiliar Administrativo</h3>
            <p><strong>Moradia:</strong> ${truncateText(data.aux_administrativo_dados.moradia)}</p>
            <p><strong>Futuro:</strong> ${truncateText(data.aux_administrativo_dados.futuro)}</p>
            <p><strong>Importantes:</strong> ${truncateText(data.aux_administrativo_dados.importantes)}</p>
            <p><strong>Hobbies:</strong> ${truncateText(data.aux_administrativo_dados.hobbies)}</p>
            <p><strong>Atualizado:</strong> ${truncateText(data.aux_administrativo_dados.atualizado)}</p>
            <p><strong>Residência:</strong> ${truncateText(data.aux_administrativo_dados.residencia)}</p>
            <p><strong>Redes Sociais:</strong> ${truncateText(data.aux_administrativo_dados.redes_sociais)}</p>
            <p><strong>Ponto Forte:</strong> ${truncateText(data.aux_administrativo_dados.ponto_forte)}</p>
            <p><strong>Cursos:</strong> ${truncateText(data.aux_administrativo_dados.cursos)}</p>
            <p><strong>Horas Extras:</strong> ${truncateText(data.aux_administrativo_dados.horas_extras)}</p>
            <p><strong>Software:</strong> ${truncateText(data.aux_administrativo_dados.software)}</p>
            <p><strong>Office:</strong> ${truncateText(data.aux_administrativo_dados.office)}</p>
            <p><strong>Relacionamento:</strong> ${truncateText(data.aux_administrativo_dados.relacionamento)}</p>
            <p><strong>Habilidades:</strong> ${truncateText(data.aux_administrativo_dados.habilidades)}</p>
            <p><strong>Descrição:</strong> ${truncateText(data.aux_administrativo_dados.descricao)}</p>
            <p><strong>Novalar:</strong> ${truncateText(data.aux_administrativo_dados.novalar)}</p>
            <p><strong>Observações:</strong> ${truncateText(data.aux_administrativo_dados.obs)}</p>
        `;
    }
    
    else if (data.cargo === 'Gerente Administrativo' && data.gerente_administrativo_dados) {
        cargoEspecificoDiv.innerHTML = `
            <h3>Dados do Gerente Administrativo</h3>
            <p><strong>Moradia:</strong> ${truncateText(data.gerente_administrativo_dados.moradia)}</p>
            <p><strong>Planos Futuros:</strong> ${truncateText(data.gerente_administrativo_dados.planos_futuro)}</p>
            <p><strong>Coisas Importantes:</strong> ${truncateText(data.gerente_administrativo_dados.coisas_importantes)}</p>
            <p><strong>Hobbies:</strong> ${truncateText(data.gerente_administrativo_dados.hobbies)}</p>
            <p><strong>Atualizado:</strong> ${truncateText(data.gerente_administrativo_dados.atualizado)}</p>
            <p><strong>Residência:</strong> ${truncateText(data.gerente_administrativo_dados.residencia)}</p>
            <p><strong>Redes Sociais:</strong> ${truncateText(data.gerente_administrativo_dados.redes_sociais)}</p>
            <p><strong>Ponto Forte:</strong> ${truncateText(data.gerente_administrativo_dados.ponto_forte)}</p>
            <p><strong>Maior Realização:</strong> ${truncateText(data.gerente_administrativo_dados.maior_realizacao)}</p>
            <p><strong>Desapontamento:</strong> ${truncateText(data.gerente_administrativo_dados.desapontamento)}</p>
            <p><strong>Cursos:</strong> ${truncateText(data.gerente_administrativo_dados.cursos)}</p>
            <p><strong>Horas Extras:</strong> ${truncateText(data.gerente_administrativo_dados.horas_extras)}</p>
            <p><strong>Informações:</strong> ${truncateText(data.gerente_administrativo_dados.informacao)}</p>
            <p><strong>Tempo:</strong> ${truncateText(data.gerente_administrativo_dados.tempo)}</p>
            <p><strong>Motivo Gerente:</strong> ${truncateText(data.gerente_administrativo_dados.motivo_gerente)}</p>
            <p><strong>Relacionamento:</strong> ${truncateText(data.gerente_administrativo_dados.relacionamento)}</p>
            <p><strong>Estratégias:</strong> ${truncateText(data.gerente_administrativo_dados.estrategias)}</p>
            <p><strong>Características Administrativas:</strong> ${truncateText(data.gerente_administrativo_dados.caracteristicas_administrativo)}</p>
            <p><strong>Convencão:</strong> ${truncateText(data.gerente_administrativo_dados.convencao)}</p>
            <p><strong>Novalar:</strong> ${truncateText(data.gerente_administrativo_dados.novalar)}</p>
            <p><strong>Observações:</strong> ${truncateText(data.gerente_administrativo_dados.obs)}</p>
        `;
    }
    
    else if (data.cargo === 'Ajudante de Depósito' && data.ajudante_deposito_dados) {
        cargoEspecificoDiv.innerHTML = `
            <h3>Dados do Ajudante de Depósito</h3>
            <p><strong>Residência:</strong> ${truncateText(data.ajudante_deposito_dados.residencia)}</p>
            <p><strong>Planos Futuros:</strong> ${truncateText(data.ajudante_deposito_dados.planos_futuro)}</p>
            <p><strong>Coisas Importantes:</strong> ${truncateText(data.ajudante_deposito_dados.coisas_importantes)}</p>
            <p><strong>Horas Vagas:</strong> ${truncateText(data.ajudante_deposito_dados.horas_vagas)}</p>
            <p><strong>Atualizado:</strong> ${truncateText(data.ajudante_deposito_dados.atualizado)}</p>
            <p><strong>Residências dos Últimos 5 Anos:</strong> ${truncateText(data.ajudante_deposito_dados.residencias_ultimos_5_anos)}</p>
            <p><strong>Redes Sociais:</strong> ${truncateText(data.ajudante_deposito_dados.redes_sociais)}</p>
            <p><strong>Ponto Forte:</strong> ${truncateText(data.ajudante_deposito_dados.ponto_forte)}</p>
            <p><strong>Maior Realização:</strong> ${truncateText(data.ajudante_deposito_dados.maior_realizacao)}</p>
            <p><strong>Cursos Profissionalizantes:</strong> ${truncateText(data.ajudante_deposito_dados.cursos_profissionalizantes)}</p>
            <p><strong>Horas Extras:</strong> ${truncateText(data.ajudante_deposito_dados.horas_extras)}</p>
            <p><strong>Características Ajudante:</strong> ${truncateText(data.ajudante_deposito_dados.caracteristicas_ajudante)}</p>
            <p><strong>Experiência no Depósito:</strong> ${truncateText(data.ajudante_deposito_dados.experiencia_deposito)}</p>
            <p><strong>Conhece Novalar:</strong> ${truncateText(data.ajudante_deposito_dados.conhece_novalar)}</p>
            <p><strong>Observações:</strong> ${truncateText(data.ajudante_deposito_dados.obs)}</p>
        `;
    }
    
    else {
        cargoEspecificoDiv.innerHTML = `<p><strong>Cargo não identificado.</strong></p>`;
    }
}

// Funções para botões de ação
function voltarParaPaginaAnterior() {
    window.history.back();
}
