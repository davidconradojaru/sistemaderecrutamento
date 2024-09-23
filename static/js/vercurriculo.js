function voltarParaPaginaAnterior() {
    window.history.back();
}


function entrevista_pendente(candidatoId) {
    fetch(`http://127.0.0.1:5000/curriculo/${candidatoId}/chama_entrevista`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao chamar para entrevista: ' + response.status);
        }
        return response.json();
    })
    .then(data => {
        alert('Entrevista encaminhada com sucesso!');
    })
    .catch(error => {
        alert(error.message);
    });
}




