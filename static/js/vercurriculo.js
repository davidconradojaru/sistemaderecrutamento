function voltarParaPaginaAnterior() {
    window.history.back();
}

function entrevista_pendente(candidatoId) {
    // Verifica o status de chama_entrevista
    fetch(`http://127.0.0.1:5000/curriculo/${candidatoId}/status_entrevista`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao consultar estado da entrevista: ' + response.status);
            }
            return response.json();
        })
        .then(data => {
            if (data.chama_entrevista === 'sim') {
                alert('Candidato já foi chamado para entrevista!');
                return Promise.reject(); // Força a saída da cadeia
            } else {
                // Se não foi chamado, tenta encaminhar a entrevista
                return fetch(`http://127.0.0.1:5000/curriculo/${candidatoId}/chama_entrevista`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
            }
        })
        .then(response => {
            if (response && response.ok) {
                return response.json();
            }
            throw new Error('Erro ao chamar para entrevista: ' + response.status);
        })
        .then(data => {
            alert('Entrevista encaminhada com sucesso!');
            voltarParaPaginaAnterior();
            setTimeout(() => {
                location.reload(); // Recarrega a página após um pequeno atraso
            }, 500); // Ajuste o tempo conforme necessário
        })
        .catch(error => {
            alert(error.message);
        });
}

