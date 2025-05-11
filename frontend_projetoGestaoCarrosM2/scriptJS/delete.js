async function delCarro(id) {
    if (!confirm(`Tem certeza que deseja deletar o carro com ID ${id}?`)) {
        return;
    }

    const url = `http://localhost:8080/carro/del/${id}`;
    try {
        const result = await fetch(url, { method: 'DELETE' });
        if (result.status === 204) {
            alert("Carro deletado com sucesso.");
            listAllCarros(); // Atualiza a tabela após a exclusão
        } else {
            alert("Erro ao deletar o carro.");
        }
    } catch (error) {
        console.error("Erro ao deletar:", error);
        alert("Erro ao conectar ao servidor.");
    }
}