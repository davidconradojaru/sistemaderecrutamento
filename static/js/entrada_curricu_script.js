/*document.addEventListener("DOMContentLoaded", function() {
    document.body.style.backgroundImage = "url('img/novalar.png')";
}); */

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
    var valor = e.target.value.replace(/\D/g, '');
    var regex = /^(\d{2})(\d{4,5})(\d{4})$/;

    if (valor.length <= 2) {
        e.target.value = '(' + valor;
    } else if (valor.length <= 7) {
        e.target.value = '(' + valor.substring(0, 2) + ') ' + valor.substring(2);
    } else if (valor.length <= 11) {
        e.target.value = '(' + valor.substring(0, 2) + ') ' + valor.substring(2, 7) + '-' + valor.substring(7);
    } else {
        e.target.value = '(' + valor.substring(0, 2) + ') ' + valor.substring(2, 7) + '-' + valor.substring(7, 11);
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


