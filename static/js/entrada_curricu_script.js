/*document.addEventListener("DOMContentLoaded", function() {
    document.body.style.backgroundImage = "url('img/novalar.png')";
}); */

// Lista de CPFs em blacklist
const blacklistCPFs = [
    '00000000000',
    '12345678900',
    '11111111111',
    '22222222222',
    '33333333333',
    '44444444444',
    '55555555555',
    '66666666666',
    '77777777777',
    '88888888888',
    '99999999999',
    '01234567890',
    '98765432100',
    '12312312312',
    '45645645645',
    '78978978978'
];

function isCpfBlacklisted(cpf) {
    return blacklistCPFs.includes(cpf);
}

let currentTab = 0;
showTab(currentTab);

function showTab(n) {
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach((tab, index) => {
        tab.style.display = index === n ? 'block' : 'none'; // Mostra a aba atual e esconde as outras
    });

     // Atualiza o estado dos ícones
    const icons = document.querySelectorAll('.tab-icon');
    icons.forEach((icon, index) => {
         icon.style.opacity = index <= n ? '1' : '0.5'; // Habilita os ícones até a aba atual
    });

    // Se estiver na última aba, mostra o botão de enviar
    if (n === (tabs.length - 1)) {
        document.querySelector('input[type="submit"]').style.display = 'block';
        document.getElementById('btn-next').style.display = 'none';
    } else {
        document.querySelector('input[type="submit"]').style.display = 'none';
        document.getElementById('btn-next').style.display = 'block';
    }
    // Mostra ou esconde o botão "Voltar"
    document.getElementById('btn-back').style.display = n === 0 ? 'none' : 'block';
}

function validateCurrentTab() {
    const tabs = document.querySelectorAll('.tab');
    const inputs = tabs[currentTab].querySelectorAll('input, select, textarea'); // Seleciona todos os inputs, selects e textareas

    for (const input of inputs) {
        if (!input.checkValidity()) { // Verifica se o campo é válido
            alert(`Por favor, preencha o campo: ${input.previousElementSibling.innerText}`);
            input.focus(); // Foca no campo que precisa ser preenchido
            return false;
        }
    }
    return true;
}

function nextTab() {
    if (validateCurrentTab()) {
        const tabs = document.querySelectorAll('.tab');
        tabs[currentTab].style.display = 'none'; // Esconde a aba atual
        currentTab++; // Avança para a próxima aba
        showTab(currentTab); // Mostra a nova aba
    }
}
function prevTab() {
    if (currentTab > 0) { // Verifica se não está na primeira aba
        const tabs = document.querySelectorAll('.tab');
        tabs[currentTab].style.display = 'none'; // Esconde a aba atual
        currentTab--; // Retrocede para a aba anterior
        showTab(currentTab); // Mostra a nova aba

        // Mostra o botão "Próximo" e esconde o botão "Voltar" se estiver na primeira aba
        document.getElementById('btn-back').style.display = currentTab === 0 ? 'none' : 'block';
    }
}



function mostrarCargos() {
    var cidade = document.getElementById("ondeTrabalhar").value;
    var cargosSelect = document.getElementById("cargo");
    var labelCargo = document.getElementById("labelCargo");
    cargosSelect.innerHTML = ""; // Limpa as opções existentes

    var cargos;

    if (cidade === "JARU") {
        cargos = ["Vendedor", "Auxiliar de Limpeza", "Montador", "Motorista", "Crediarista", "Gerente de Vendas", "Auxiliar Centro de Distribuição", "Contabilidade", "Compras", "Marketing", "Recursos Humanos", "Análise de Crédito", "Cobrança", "Tecnologia da Informação"];
    } else {
        cargos = ["Vendedor", "Auxiliar de Limpeza", "Montador", "Motorista", "Crediarista", "Gerente de Vendas"];
    }

    // Adiciona as opções de cargos ao select
    for (var i = 0; i < cargos.length; i++) {
        var option = document.createElement("option");
        option.value = cargos[i]; // Atribui o valor ao option
        option.text = cargos[i];
        cargosSelect.add(option);
    }

    // Exibe o label e o select de cargos
    if (cargos.length > 0) {
        labelCargo.style.display = "block"; // Mostra o label
        cargosSelect.style.display = "block"; // Mostra o select de cargos
    } else {
        labelCargo.style.display = "none"; // Oculta o label se não houver cargos
        cargosSelect.style.display = "none"; // Oculta o select de cargos
    }
}




function formatarTelefone(e) {
    var valor = e.target.value.replace(/\D/g, ''); // Remove todos os caracteres que não são dígitos
    var regex = /^(\d{2})(\d{4,5})(\d{4})$/;

    if (valor.length <= 2) {
        e.target.value = '(' + valor; // Formata apenas o DDD
    } else if (valor.length <= 7) {
        e.target.value = '(' + valor.substring(0, 2) + ') ' + valor.substring(2); // DDD e parte inicial
    } else if (valor.length <= 11) {
        e.target.value = '(' + valor.substring(0, 2) + ') ' + valor.substring(2, 7) + '-' + valor.substring(7); // Formato final
    }
}



 // Função para formatar o CPF
function formatarCPF(cpf) {
    // Remove qualquer caractere que não seja número
    const cleanedInput = cpf.replace(/\D/g, '');
    
    // Formata o CPF no formato XXX.XXX.XXX-XX
    const formattedInput = cleanedInput.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');

    return formattedInput;
}

// Seleciona o elemento de input do CPF
const cpfInput = document.getElementById('cpf');

// Adiciona um event listener para o evento de input
cpfInput.addEventListener('input', function(event) {
    // Obtém o valor atual do campo de input
    const inputCPF = cpfInput.value;

    // Formata o CPF e atualiza o valor do campo de input
    cpfInput.value = formatarCPF(inputCPF);
});

document.addEventListener("DOMContentLoaded", function() {
    var inputCEP = document.getElementById('cep');
    inputCEP.addEventListener('input', function(e) {
        var valor = e.target.value.replace(/\D/g, '');
        var regex = /^(\d{5})(\d{3})$/;

        if (valor.length > 5) {
            e.target.value = valor.replace(regex, '$1-$2');
        } else {
            e.target.value = valor;
        }
    });
});


/*  FUNÇÃO QUE FUNCIONA PARA ENVIAR OS DADOS DE ENTRADA PARA O BD
document.getElementById('curriculoForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Previne o envio padrão do formulário

    // Coletando os dados do formulário
    const formData = {
        nome: document.getElementById('nome').value,
        data_nascimento: document.getElementById('nascimento').value,
        cpf: document.getElementById('cpf').value,
        telefone: document.getElementById('telefone').value,
        email: document.getElementById('email').value,
        estado_civil: document.getElementById('estadoCivil').value,
        genero: document.getElementById('genero').value,
        nacionalidade: document.getElementById('nacionalidade').value,
        endereco: document.getElementById('endereco').value,
        numero: document.getElementById('numero').value,
        bairro: document.getElementById('bairro').value,
        cep: document.getElementById('cep').value,
        cidade: document.getElementById('cidade').value,
        nome_referencia: document.getElementById('nomeReferencia').value,
        telefone_referencia: document.getElementById('telefoneReferencia').value,
        descricao_referencia: document.getElementById('descricaoReferencia').value,
        descricao_locais: document.getElementById('descricaoLocais').value,
        descricao_experiencia: document.getElementById('descricaoExperiencia').value,
        formacao_academica: document.getElementById('formacaoAcademica').value,
        formacao: document.getElementById('formacao').value,
        falesobrevoce: document.getElementById('falesobrevoce').value,
        onde_trabalhar: document.getElementById('ondeTrabalhar').value,
        cargo: document.getElementById('cargo').value
    };

    // Enviando os dados para o servidor
    fetch('/entradadados_curriculo', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro na requisição: ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        alert(data.message || 'Dados enviados com sucesso!');
        // Limpar o formulário após o envio, se desejado
        document.getElementById('curriculoForm').reset();
    })
    .catch(error => {
        alert('Ocorreu um erro: ' + error.message);
    });
}); 
*/

//AINDA NÃO FUNCIONOU BEM VERIFICAR AQUI PARA BAIXO// A FUNÇÃO DE CIMA FUNCIONOU

document.getElementById('curriculoForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Previne o envio padrão do formulário

     // Verificando se o CPF está na blacklist
    if (isCpfBlacklisted(cpf)) {
        alert('O CPF informado está na blacklist. Por favor, verifique e insira um CPF válido.');
        return; // Impede o envio do formulário
    }
    // Coletando os dados do formulário
    const formData = {
        nome: document.getElementById('nome').value,
        data_nascimento: document.getElementById('nascimento').value,
        cpf: document.getElementById('cpf').value,
        telefone: document.getElementById('telefone').value,
        email: document.getElementById('email').value,
        estado_civil: document.getElementById('estadoCivil').value,
        genero: document.getElementById('genero').value,
        nacionalidade: document.getElementById('nacionalidade').value,
        endereco: document.getElementById('endereco').value,
        numero: document.getElementById('numero').value,
        bairro: document.getElementById('bairro').value,
        cep: document.getElementById('cep').value,
        cidade: document.getElementById('cidade').value,
        nome_referencia: document.getElementById('nomeReferencia').value,
        telefone_referencia: document.getElementById('telefoneReferencia').value,
        descricao_referencia: document.getElementById('descricaoReferencia').value,
        descricao_locais: document.getElementById('descricaoLocais').value,
        descricao_experiencia: document.getElementById('descricaoExperiencia').value,
        formacao_academica: document.getElementById('formacaoAcademica').value,
        formacao: document.getElementById('formacao').value,
        falesobrevoce: document.getElementById('falesobrevoce').value,
        onde_trabalhar: document.getElementById('ondeTrabalhar').value,
        cargo: document.getElementById('cargo').value
    };

    // Enviando os dados para o servidor
    fetch('/entradadados_curriculo', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro na requisição: ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        // Oculta o formulário
        document.querySelector('.curriculoForm').style.display = 'none';

        // Exibir mensagem de sucesso na página
        const successMessage = document.getElementById('successMessage');
        successMessage.style.display = 'block'; // Exibe a mensagem
        successMessage.innerHTML = `<h2>${data.message || 'Você enviou o seu currículo com sucesso!'}</h2><p>Aguarde que nossa equipe irá analisar o seu currículo!</p>`;
    })
    .catch(error => {
        alert('Ocorreu um erro: ' + error.message);
    });
});