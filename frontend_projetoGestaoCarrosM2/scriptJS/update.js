var urlAtual = window.location.href; //trecho Antonio
var urlClass = new URL(urlAtual);
var carroID = urlClass.searchParams.get("carroID");

$('document').ready(function () {
    getCarInfos(carroID)
    $('.form-container').submit(function(e){
        e.preventDefault();
        updCarro()
    })
})


async function updCarro() {
    const formE1 = document.querySelector(".form-container");
    const formData = new FormData(formE1);
    const carro = Object.fromEntries(formData);

    // aqui a gente tá usando a função que eu cirei para ver se TODOS os campos do formulário estão dentro do formato aceito, se a condição não bater, o formulário não será enviado para o backend
    if (!validarFormulario(carro)) {
        alert("Por favor, corrija os erros no formulário.");
        return;
    }

    console.log(carro);
    const url = "http://localhost:8080/carro/upd";
    const option = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(carro)
    };
    const result = await fetch(url, option);
    if (result.status === 200) {
        alert('Atualizado com sucesso');
        window.location.href = "index.html"; // Antonio colocou, diferente do addCarro
    } else {
        alert('Erro ao atualizar');
    }
}

// Função de validação com Regex
function validarFormulario(carro) {
    const regexValidations = {
        id: /^[0-9]+$/, // Apenas números
        marca: /^[a-zA-Z\s]{2,30}$/, // // Só pode digitar letra e espaço, nada de caracteres especiais ou simbolos
        modelo: /^[a-zA-Z0-9\s]{2,30}$/, // Pode digitar letras, números e espaço, mas nada de caractere especial
        ano: /^(19[0-9]{2}|20[0-9]{2})$/, // pode por qualquer número de 1900 até 2099
        motor: /^[a-zA-Z0-9.\s]{1,20}$/, // Letras, números, pontos e espaços
        placa: /^[A-Z]{3}[0-9][A-Z0-9][0-9]{2}$/, // Só aceita esses dois formatos (AAA0A00 ou AAA0000), nem tente digitar algo que não seja assim
        dono: /^[a-zA-Z]+(\s[a-zA-Z]+)*$/, // Nome completo com várias palavras, separadas por espaços
        cnh: /^[0-9]{11}$/, // Apenas 11 números
        telefone: /^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/, // Telefones brasileiros (xx xxxx-xxxx ou xx xxxxx-xxxx), só digitar 11 números já basta, não pode digitar letras ou caracteres especiais
        endereco: /^.{5,100}$/ // Endereço com 5 a 100 caracteres
    };

    for (const campo in regexValidations) {
        if (!regexValidations[campo].test(carro[campo])) {
            console.error(`Erro no campo ${campo}`);
            return false;
        }
    }
    return true;
}


async function getCarInfos(idcarro){ //trecho Antonio

    //atenção para a crase (`) na linha a seguir  ---- não é aspas simples (')
    const url = `http://localhost:8080/carro/${idcarro}`; //ajustei o endpoint igual ao backend, senão não funciona
    const dados = await fetch(url);
    if(dados.status === 200){
        const carInfo = await dados.json();
        $('#id').val(carInfo['id']);
        $('#marca').val(carInfo['marca']);
        $('#modelo').val(carInfo['modelo']);
        $('#ano').val(carInfo['ano']);
        $('#motor').val(carInfo['motor']);
        $('#placa').val(carInfo['placa']);
        $('#dono').val(carInfo['dono']);
        $('#cnh').val(carInfo['cnh']);
        $('#telefone').val(carInfo['telefone'])
        $('#endereco').val(carInfo['endereco'])
        return carInfo;
    }
    else{
        alert("ID: " + idcarro + " não encontrado");
    }
}

