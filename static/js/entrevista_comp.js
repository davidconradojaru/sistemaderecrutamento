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
function truncateText(text, maxLength = 5000) {
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
            <h3>Perguntas ao Montador</h3>
            <p><strong>Vive em casa própria ou alugada? Quem mora com você?</strong> ${truncateText(data.montador_dados.moradia)}</p>
            <p><strong>Quais são seus planos para o futuro? Onde e como você se vê em 5 anos?</strong> ${truncateText(data.montador_dados.planos_futuros)}</p>
            <p><strong>Cite três coisas importantes em sua vida</strong> ${truncateText(data.montador_dados.coisas_importantes)}</p>
            <p><strong>O que você faz nas horas vagas? Quais seus hobbies?</strong> ${truncateText(data.montador_dados.hobbies)}</p>
            <p><strong>O que você faz para se manter atualizado?</strong> ${truncateText(data.montador_dados.atualizacao)}</p>
            <p><strong>Onde você residiu nos últimos 05 anos?</strong> ${truncateText(data.montador_dados.residencia)}</p>
            <p><strong> Cite quais redes sociais utiliza (whatsapp, facebook, instagram, tiktok, linkedin) e se utiliza de 
                        aplicativos bet e jogos de apostas como: betano,
                        sportingbet, tigrinho, entre outros.</strong> ${truncateText(data.montador_dados.redes_sociais)}</p>
            <p><strong>Qual é o seu ponto forte, segundo alguém próximo a você?</strong> ${truncateText(data.montador_dados.ponto_forte)}</p>
            <p><strong>O que considera sua maior realização até o momento?</strong> ${truncateText(data.montador_dados.realizacao)}</p>
            <p><strong>Possui cursos profissionalizantes? Se sim, cite os principais.</strong> ${truncateText(data.montador_dados.cursos)}</p>
            <p><strong>Possui disponibilidade para horários excepcionais caso necessário?</strong> ${truncateText(data.montador_dados.horas_extras)}</p>
            <p><strong>Possui Veículo próprio?</strong> ${truncateText(data.montador_dados.veiculo)}</p>
            <p><strong>Para você, quais são as características principais para um montador de móveis?</strong> ${truncateText(data.montador_dados.caracteristicas)}</p>
            <p><strong>Você já trabalhou anteriormente como Montador de Móveis?</strong> ${truncateText(data.montador_dados.experiencia)}</p>
            <p><strong>O que você sabe sobre a Novalar? Porque deseja ser contratado por nós?</strong> ${truncateText(data.montador_dados.novalar)}</p>
            <p><strong>INSIRA AQUI AS OBSERVAÇÕES SOBRE O CANDIDATO A SER ENVIADAS PARA O GERENTE REGIONAL</strong> ${truncateText(data.montador_dados.obs)}</p>
            <p><strong>Entrevista feita:</strong> ${truncateText(data.montador_dados.created_at)}</p>
        `;
    }
    else if (data.cargo === 'Vendedor' && data.vendedor_dados) {
        cargoEspecificoDiv.innerHTML = `
            <h3>Perguntas ao Vendedor</h3>
            <p><strong>Vive em casa própria ou alugada? Quem mora com você?</strong> ${truncateText(data.vendedor_dados.casa)}</p>
            <p><strong>Quais são seus planos para o futuro? Onde e como você se vê em 5 anos?:</strong> ${truncateText(data.vendedor_dados.futuro)}</p>
            <p><strong>Cite três coisas importantes em sua vida.</strong> ${truncateText(data.vendedor_dados.importancia)}</p>
            <p><strong>O que você faz nas horas vagas? Quais seus hobbies?</strong> ${truncateText(data.vendedor_dados.hobbies)}</p>
            <p><strong>O que você faz para se manter atualizado?</strong> ${truncateText(data.vendedor_dados.atualizado)}</p>
            <p><strong>Onde você residiu nos últimos 05 anos?</strong> ${truncateText(data.vendedor_dados.residencia)}</p>
            <p><strong>Cite quais redes sociais utiliza (whatsapp, facebook, instagram, tiktok, linkedin) e se utiliza de 
                        aplicativos bet e jogos de apostas como: betano,
                        sportingbet, tigrinho, entre outros.</strong> ${truncateText(data.vendedor_dados.redes_sociais)}</p>
            <p><strong>Qual é o seu ponto forte, segundo alguém próximo a você?</strong> ${truncateText(data.vendedor_dados.ponto_forte)}</p>
            <p><strong>O que considera sua maior realização até o momento?</strong> ${truncateText(data.vendedor_dados.realizacao)}</p>
            <p><strong>Qual foi, até hoje, o seu maior desapontamento profissional?</strong> ${truncateText(data.vendedor_dados.desapontamento)}</p>
            <p><strong>Quais foram suas experiências profissionais?</strong> ${truncateText(data.vendedor_dados.experiencia)}</p>
            <p><strong>Possui cursos profissionalizantes? Se sim, cite os principais.</strong> ${truncateText(data.vendedor_dados.cursos)}</p>
            <p><strong>Possui disponibilidade para horários excepcionais caso necessário?</strong> ${truncateText(data.vendedor_dados.horas_extras)}</p>
            <p><strong>Como você avalia seus conhecimentos em informática? Já trabalhou com algum software ou programa?</strong> ${truncateText(data.vendedor_dados.informatica)}</p>
            <p><strong>O que fez você querer trabalhar com vendas?</strong> ${truncateText(data.vendedor_dados.vendas)}</p>
            <p><strong>Como você constrói um relacionamento de confiança com um cliente?</strong> ${truncateText(data.vendedor_dados.confianca_cliente)}</p>
            <p><strong>Nas vendas, quais estratégias você utilizaria para atingir um resultado positivo?</strong> ${truncateText(data.vendedor_dados.estrategias_vendas)}</p>
            <p><strong>Descreva uma situação que você precisou convencer alguém a ver as coisas do seu ponto de vista. O que você fez e quais foram os resultados?</strong> ${truncateText(data.vendedor_dados.convencimento)}</p>
            <p><strong>Para você, qual a importância do uso das redes sociais no processo de vendas?</strong> ${truncateText(data.vendedor_dados.redes_sociais2)}</p>
            <p><strong>Para você, como um bom gerente deve conduzir uma equipe de vendas?</strong> ${truncateText(data.vendedor_dados.gerente_vendas)}</p>
            <p><strong>O que você sabe sobre a Novalar? Porque deseja ser contratado por nós?</strong> ${truncateText(data.vendedor_dados.novalar)}</p>
            <p><strong>INSIRA AQUI AS OPINIÕES E OBSERVAÇÕES SOBRE O CANDIDATO A SEREM ENVIADAS.</strong> ${truncateText(data.vendedor_dados.obs)}</p>
            <p><strong>Data de Criação:</strong> ${truncateText(data.vendedor_dados.created_at)}</p>
        `;
    }
    
    else if (data.cargo === 'Crediarista' && data.crediarista_dados) {
        cargoEspecificoDiv.innerHTML = `
            <h3>Perguntas a Crediarista</h3>
            <p><strong>Vive em casa própria ou alugada? Quem mora com você?</strong> ${truncateText(data.crediarista_dados.casa)}</p>
            <p><strong>Quais são seus planos para o futuro? Onde e como você se vê em 5 anos?</strong> ${truncateText(data.crediarista_dados.futuro)}</p>
            <p><strong>Cite três coisas importantes em sua vida.</strong> ${truncateText(data.crediarista_dados.importancia)}</p>
            <p><strong>O que você faz nas horas vagas? Quais seus hobbies?</strong> ${truncateText(data.crediarista_dados.hobbies)}</p>
            <p><strong>O que você faz para se manter atualizado?</strong> ${truncateText(data.crediarista_dados.atualizado)}</p>
            <p><strong>Onde você residiu nos últimos 05 anos?</strong> ${truncateText(data.crediarista_dados.residencia)}</p>
            <p><strong>Cite quais redes sociais utiliza (whatsapp, facebook, instagram, tiktok, linkedin) e se utiliza de aplicativos bet e jogos de apostas como: betano, sportingbet, tigrinho, entre outros.</strong> ${truncateText(data.crediarista_dados.redes_sociais)}</p>
            <p><strong>Qual é o seu ponto forte, segundo alguém próximo a você?</strong> ${truncateText(data.crediarista_dados.ponto_forte)}</p>
            <p><strong>O que considera sua maior realização até o momento?</strong> ${truncateText(data.crediarista_dados.realizacao)}</p>
            <p><strong>Qual foi, até hoje, o seu maior desapontamento profissional?</strong> ${truncateText(data.crediarista_dados.desapontamento)}</p>
            <p><strong>Possui cursos profissionalizantes? Se sim, cite os principais.</strong> ${truncateText(data.crediarista_dados.cursos)}</p>
            <p><strong>Possui disponibilidade para horários excepcionais caso necessário?</strong> ${truncateText(data.crediarista_dados.horas_extras)}</p>
            <p><strong>Como você avalia seus conhecimentos em informática? Já trabalhou com algum software ou programa?</strong> ${truncateText(data.crediarista_dados.informatica)}</p>
            <p><strong>Como você divide seu tempo de trabalho e tempo pessoal?</strong> ${truncateText(data.crediarista_dados.tempo_trabalho)}</p>
            <p><strong>O que fez você querer trabalhar como crediarista na Novalar?</strong> ${truncateText(data.crediarista_dados.motivo_trabalho)}</p>
            <p><strong>Para você, porque é importante criar um relacionamento de confiança a equipe e outros setores?</strong> ${truncateText(data.crediarista_dados.relacionamento_equipe)}</p>
            <p><strong>Durante sua gestão de equipe, quais estratégias você utilizaria para atingir um resultado positivo?</strong> ${truncateText(data.crediarista_dados.estrategias)}</p>
            <p><strong>Para você, quais são as melhores características de um profissional administrativo para estar em sua equipe?</strong> ${truncateText(data.crediarista_dados.profissional_administrativo)}</p>
            <p><strong>Descreva uma situação que você precisou convencer alguém a ver as coisas do seu ponto de vista. O que você fez e quais foram os resultados?</strong> ${truncateText(data.crediarista_dados.convencer)}</p>
            <p><strong>O que você sabe sobre a Novalar? Porque deseja ser contratado por nós?</strong> ${truncateText(data.crediarista_dados.novalar)}</p>
            <p><strong>INSIRA AQUI AS OBSERVAÇÕES SOBRE O CANDIDATO A SER ENVIADAS PARA O GERENTE REGIONAL</strong> ${truncateText(data.crediarista_dados.obs)}</p>
        `;
    }
    
    
    else if (data.cargo === 'Auxiliar Administrativo' && data.aux_administrativo_dados) {
        cargoEspecificoDiv.innerHTML = `
            <h3>Perguntas ao Auxiliar Administrativo</h3>
            <p><strong>Vive em casa própria ou alugada? Quem mora com você?</strong> ${truncateText(data.aux_administrativo_dados.moradia)}</p>
            <p><strong>Quais são seus planos para o futuro? Onde e como você se vê em 5 anos?</strong> ${truncateText(data.aux_administrativo_dados.futuro)}</p>
            <p><strong>Cite três coisas importantes em sua vida:</strong> ${truncateText(data.aux_administrativo_dados.importantes)}</p>
            <p><strong>O que você faz nas horas vagas? Quais seus hobbies?</strong> ${truncateText(data.aux_administrativo_dados.hobbies)}</p>
            <p><strong>O que você faz para se manter atualizado?</strong> ${truncateText(data.aux_administrativo_dados.atualizado)}</p>
            <p><strong>Onde você residiu nos últimos 05 anos?</strong> ${truncateText(data.aux_administrativo_dados.residencia)}</p>
            <p><strong> Cite quais redes sociais utiliza (whatsapp, facebook, instagram, tiktok, linkedin) e se utiliza de 
                        aplicativos bet e jogos de apostas como: betano,
                        sportingbet, tigrinho, entre outros.</strong> ${truncateText(data.aux_administrativo_dados.redes_sociais)}</p>
            <p><strong>Qual é o seu ponto forte, segundo alguém próximo a você?</strong> ${truncateText(data.aux_administrativo_dados.ponto_forte)}</p>
            <p><strong>Possui cursos profissionalizantes? Se sim, cite os principais</strong> ${truncateText(data.aux_administrativo_dados.cursos)}</p>
            <p><strong>Possui disponibilidade para horários excepcionais caso necessário?</strong> ${truncateText(data.aux_administrativo_dados.horas_extras)}</p>
            <p><strong>Você já trabalhou com algum Software ou Programa?</strong> ${truncateText(data.aux_administrativo_dados.software)}</p>
            <p><strong>Como você considera seus conhecimentos com Word, Excel, PowerPoint?</strong> ${truncateText(data.aux_administrativo_dados.office)}</p>
            <p><strong>Você se considera uma pessoa bem relacionada? O que você pode fazer hoje para melhorar ainda mais a sua convivência coletiva?</strong> ${truncateText(data.aux_administrativo_dados.relacionamento)}</p>
            <p><strong>Quais habilidades você acredita serem mais importantes para esse cargo? Por quê?</strong> ${truncateText(data.aux_administrativo_dados.habilidades)}</p>
            <p><strong> Descreva uma situação em que foi necessária discrição em sua função e como você lidou com isso?</strong> ${truncateText(data.aux_administrativo_dados.descricao)}</p>
            <p><strong>O que você sabe sobre a Novalar? Porque deseja ser contratado por nós?</strong> ${truncateText(data.aux_administrativo_dados.novalar)}</p>
            <p><strong>INSIRA AQUI AS OBSERVAÇÕES SOBRE O CANDIDATO A SER ENVIADAS PARA O GERENTE REGIONAL</strong> ${truncateText(data.aux_administrativo_dados.obs)}</p>
        `;
    }
    
    else if (data.cargo === 'Gerente Administrativo' && data.gerente_administrativo_dados) {
        cargoEspecificoDiv.innerHTML = `
            <h3>Perguntas ao Gerente Administrativo</h3>
            <p><strong>Vive em casa própria ou alugada? Quem mora com você?</strong> ${truncateText(data.gerente_administrativo_dados.moradia)}</p>
            <p><strong>Quais são seus planos para o futuro? Onde e como você se vê em 5 anos?</strong> ${truncateText(data.gerente_administrativo_dados.planos_futuro)}</p>
            <p><strong>Cite três coisas importantes em sua vida.</strong> ${truncateText(data.gerente_administrativo_dados.coisas_importantes)}</p>
            <p><strong>O que você faz nas horas vagas? Quais seus hobbies?</strong> ${truncateText(data.gerente_administrativo_dados.hobbies)}</p>
            <p><strong>O que você faz para se manter atualizado?</strong> ${truncateText(data.gerente_administrativo_dados.atualizado)}</p>
            <p><strong>Onde você residiu nos últimos 05 anos?</strong> ${truncateText(data.gerente_administrativo_dados.residencia)}</p>
            <p><strong>Cite quais redes sociais utiliza (whatsapp, facebook, instagram, tiktok, linkedin) e se utiliza de 
                        aplicativos bet e jogos de apostas como: betano,
                        sportingbet, tigrinho, entre outros.</strong> ${truncateText(data.gerente_administrativo_dados.redes_sociais)}</p>
            <p><strong>Qual é o seu ponto forte, segundo alguém próximo a você?</strong> ${truncateText(data.gerente_administrativo_dados.ponto_forte)}</p>
            <p><strong>O que considera sua maior realização até o momento?</strong> ${truncateText(data.gerente_administrativo_dados.maior_realizacao)}</p>
            <p><strong>Qual foi, até hoje, o seu maior desapontamento profissional?</strong> ${truncateText(data.gerente_administrativo_dados.desapontamento)}</p>
            <p><strong>Possui cursos profissionalizantes? Se sim, cite os principais.</strong> ${truncateText(data.gerente_administrativo_dados.cursos)}</p>
            <p><strong>Possui disponibilidade para horários excepcionais caso necessário?</strong> ${truncateText(data.gerente_administrativo_dados.horas_extras)}</p>
            <p><strong>Como você avalia seus conhecimentos em informática? Já trabalhou com algum software ou programa?</strong> ${truncateText(data.gerente_administrativo_dados.informacao)}</p>
            <p><strong>Como você divide seu tempo de trabalho e tempo pessoal?</strong> ${truncateText(data.gerente_administrativo_dados.tempo)}</p>
            <p><strong>O que fez você querer trabalhar como Gerente na Novalar?</strong> ${truncateText(data.gerente_administrativo_dados.motivo_gerente)}</p>
            <p><strong>Para você, porque é importante criar um relacionamento de confiança com a equipe e outros setores?</strong> ${truncateText(data.gerente_administrativo_dados.relacionamento)}</p>
            <p><strong>Durante sua gestão de equipe, quais estratégias você utilizaria para atingir um resultado positivo?</strong> ${truncateText(data.gerente_administrativo_dados.estrategias)}</p>
            <p><strong>Para você, quais são as melhores características de um profissional administrativo para estar em sua equipe?</strong> ${truncateText(data.gerente_administrativo_dados.caracteristicas_administrativo)}</p>
            <p><strong>Descreva uma situação que você precisou convencer alguém a ver as coisas do seu ponto de vista. O que você fez e quais foram os resultados?</strong> ${truncateText(data.gerente_administrativo_dados.convencao)}</p>
            <p><strong>O que você sabe sobre a Novalar? Porque deseja ser contratado por nós?</strong> ${truncateText(data.gerente_administrativo_dados.novalar)}</p>
            <p><strong>INSIRA AQUI AS OBSERVAÇÕES SOBRE O CANDIDATO A SER ENVIADAS PARA O GERENTE REGIONAL</strong> ${truncateText(data.gerente_administrativo_dados.obs)}</p>
        `;
    }
    
    else if (data.cargo === 'Ajudante de Depósito' && data.ajudante_deposito_dados) {
        cargoEspecificoDiv.innerHTML = `
            <h3>Perguntas ao Ajudante de Depósito</h3>
            <p><strong>Vive em casa própria ou alugada? Quem mora com você?</strong> ${truncateText(data.ajudante_deposito_dados.residencia)}</p>
            <p><strong>Quais são seus planos para o futuro? Onde e como você se vê em 5 anos?</strong> ${truncateText(data.ajudante_deposito_dados.planos_futuro)}</p>
            <p><strong>Cite três coisas importantes em sua vida.:</strong> ${truncateText(data.ajudante_deposito_dados.coisas_importantes)}</p>
            <p><strong>O que você faz nas horas vagas? Quais seus hobbies?</strong> ${truncateText(data.ajudante_deposito_dados.horas_vagas)}</p>
            <p><strong>O que você faz para se manter atualizado?</strong> ${truncateText(data.ajudante_deposito_dados.atualizado)}</p>
            <p><strong>Onde você residiu nos últimos 05 anos?</strong> ${truncateText(data.ajudante_deposito_dados.residencias_ultimos_5_anos)}</p>
            <p><strong>Cite quais redes sociais utiliza (whatsapp, facebook, instagram, tiktok, linkedin) e se utiliza de 
                        aplicativos bet e jogos de apostas como: betano,
                        sportingbet, tigrinho, entre outros.</strong> ${truncateText(data.ajudante_deposito_dados.redes_sociais)}</p>
            <p><strong>Qual é o seu ponto forte, segundo alguém próximo a você?</strong> ${truncateText(data.ajudante_deposito_dados.ponto_forte)}</p>
            <p><strong>O que considera sua maior realização até o momento?</strong> ${truncateText(data.ajudante_deposito_dados.maior_realizacao)}</p>
            <p><strong>Possui cursos profissionalizantes? Se sim, cite os principais.</strong> ${truncateText(data.ajudante_deposito_dados.cursos_profissionalizantes)}</p>
            <p><strong>Possui disponibilidade para horas ex caso necessário?</strong> ${truncateText(data.ajudante_deposito_dados.horas_extras)}</p>
            <p><strong>Para você, quais são as características principais para um Ajudante de Depósito?</strong> ${truncateText(data.ajudante_deposito_dados.caracteristicas_ajudante)}</p>
            <p><strong>Você já trabalhou anteriormente com carga e descarga ou em Depósitos?</strong> ${truncateText(data.ajudante_deposito_dados.experiencia_deposito)}</p>
            <p><strong>O que você sabe sobre a Novalar? Porque deseja ser contratado por nós?</strong> ${truncateText(data.ajudante_deposito_dados.conhece_novalar)}</p>
            <p><strong>INSIRA AQUI AS OBSERVAÇÕES SOBRE O CANDIDATO A SER ENVIADAS PARA O GERENTE REGIONAL</strong> ${truncateText(data.ajudante_deposito_dados.obs)}</p>
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

function mudarAprovacao(status) {
    // Pegar o ID da URL (último número após o "/")
    const path = window.location.pathname;
    const candidatoId = path.split('/').pop();  // Pega o último segmento da URL

    fetch(`/entrevista_feita/${candidatoId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ aprovacao: status })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Resultado:', data);

        // Esconder os botões de Aprovar e Recusar
        document.getElementById('aprovar').style.display = 'none';
        document.getElementById('recusar').style.display = 'none';

        // Obter a div de mensagem
        const mensagemDiv = document.getElementById('mensagem');

        // Alterar a mensagem e a classe de acordo com o status
        if (status === 'aprovado') {
            mensagemDiv.innerHTML = 'Você aprovou o candidato com sucesso!';
            mensagemDiv.className = 'aprovado mostrar'; // Adiciona a classe de sucesso
        } else if (status === 'recusado') {
            mensagemDiv.innerHTML = 'Você recusou o candidato com sucesso!';
            mensagemDiv.className = 'recusado mostrar'; // Adiciona a classe de erro
        } else {
            alert('Erro ao alterar status do candidato.');
        }

        // Esperar 2 segundos para exibir a mensagem e então voltar e recarregar
        setTimeout(function() {
            // Voltar para a página anterior
            window.history.back();

            // Opcional: Forçar o recarregamento da página anterior
            // window.location.reload(); // Descomente se preferir recarregar a página anterior
        }, 2000);  // Espera 2 segundos antes de voltar para a página anterior
    })
    .catch(error => {
        console.error('Erro:', error);
        alert('Erro ao tentar atualizar o status do candidato.');
    });
}
