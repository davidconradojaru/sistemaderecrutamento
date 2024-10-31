

// Função para mostrar/ocultar formulários com base na seleção
function mostrarFormulario() {
    const cargo = document.getElementById("cargo").value; // Pega o valor do cargo selecionado
    const formularios = document.querySelectorAll(".cargo-form"); // Seleciona todos os formulários

    // Esconde todos os formulários inicialmente
    formularios.forEach(formulario => {
        formulario.style.display = "none";
    });

    // Mostra o formulário específico do cargo selecionado
    const formId = `form-${cargo}`;
    const formulario = document.getElementById(formId);

    if (formulario) {
        formulario.style.display = "block";
    }
}




document.addEventListener('DOMContentLoaded', () => {
    // Adiciona um ouvinte de evento para detectar mudança no cargo
    document.getElementById("cargo").addEventListener("change", mostrarFormulario);

    // Função para validar apenas os campos visíveis
    function validateForm(form) {
        const fieldsToValidate = Array.from(form.elements).filter(element => {
            return element.offsetParent !== null && element.name && element.hasAttribute('required');
        });

        let isValid = true;
        fieldsToValidate.forEach(field => {
            if (!field.checkValidity()) {
                isValid = false;
                field.reportValidity(); // Mostra mensagem de erro do campo
            }
        });

        return isValid;
    }

    // Adiciona um ouvinte de evento ao envio do formulário
    document.getElementById('form-entrevista').addEventListener('submit', function(event) {
        if (!validateForm(this)) {
            event.preventDefault(); // Impede o envio se a validação falhar
            return;
        }

        event.preventDefault(); // Impede o comportamento padrão do formulário

        // Captura os campos visíveis do formulário
        const visibleFields = Array.from(event.target.elements).filter(element => {
            return element.offsetParent !== null && element.name;
        });

        // Cria um novo FormData com os campos visíveis
        const formData = new FormData();
        visibleFields.forEach(field => {
            formData.append(field.name, field.value);
        });

        // Mostrar a barra de carregamento
        const loadingBar = document.getElementById('loadingBar');
        if (loadingBar) {
            loadingBar.style.display = 'block';
        }

        // Envia os dados via AJAX usando fetch
        fetch('enviaentrevista.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json()) // Espera resposta em JSON
        .then(data => {
            // Seleciona o elemento 'mensagemRetorno'
            const mensagemRetorno = document.getElementById('mensagemRetorno');

            if (data.sucesso) {
                // Atualiza o conteúdo e estilo do elemento para mostrar a mensagem de sucesso
                if (mensagemRetorno) {
                    mensagemRetorno.innerText = 'Entrevista enviada com sucesso!';
                    mensagemRetorno.style.color = 'green';
                    mensagemRetorno.style.display = 'block'; // Torna o elemento visível
                }
                this.reset(); // Resetar o formulário após o sucesso do envio
            } else {
                // Atualiza o conteúdo e estilo do elemento para mostrar a mensagem de erro
                if (mensagemRetorno) {
                    mensagemRetorno.innerText = 'Erro ao enviar a Entrevista: ' + data.mensagem;
                    mensagemRetorno.style.color = 'red';
                    mensagemRetorno.style.display = 'block'; // Torna o elemento visível
                }
            }
        })
        .catch(error => {
            // Atualiza o conteúdo e estilo do elemento para mostrar a mensagem de erro
            const mensagemRetorno = document.getElementById('mensagemRetorno');
            if (mensagemRetorno) {
                mensagemRetorno.innerText = 'Erro na requisição: ' + error.message;
                mensagemRetorno.style.color = 'red';
                mensagemRetorno.style.display = 'block'; // Torna o elemento visível
            }
        })
        .finally(() => {
            // Oculta a barra de carregamento
            if (loadingBar) {
                loadingBar.style.display = 'none';
            }
        });
    });
});