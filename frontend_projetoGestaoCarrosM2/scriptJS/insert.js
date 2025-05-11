$('document').ready(function () { //diferente do Pedro
    $('.form-container').submit(function(e){
        e.preventDefault();
        addCarro()
    })
})

function clearTextFields(){ //diferente do Pedro
    document.getElementById("marca").value = "";
    document.getElementById("modelo").value = "";
    document.getElementById("ano").value = "";
    document.getElementById("motor").value = "";
    document.getElementById("placa").value = "";
    document.getElementById("dono").value = "";
    document.getElementById("cnh").value = "";
    document.getElementById("telefone").value = "";
    document.getElementById("endereco").value = "";
}

async function addCarro() { //igual o do Pedro aqui
    const formE1 = document.querySelector(".form-container");
    const formData = new FormData(formE1);
    const carro = Object.fromEntries(formData);

    // Sanitização dos campos
    if (!validarFormulario(carro)) {
        alert("Por favor, corrija os erros no formulário.");
        return;
    }

    console.log(carro); //mais simples que o do Pedro
    const url = "http://localhost:8080/carro/add";
    const option = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(carro)
    };
    const result = await fetch(url, option);
    if (result.status === 201) {
        clearTextFields(); //apaga os campos, conforme programado na 1a função
        alert('Cadastrado com sucesso');
        window.location.href = "index.html"; //essa linha redireciona para a index
    } else {
        alert('Erro ao cadastrar');
    }
}

// Função de validação com Regex
function validarFormulario(carro) {
    const regexValidations = {
        marca: /^[a-zA-Z\s]{2,30}$/, // Só pode digitar letra e espaço, nada de caracteres especiais ou simbolos
        modelo: /^[a-zA-Z0-9\s]{2,30}$/, // Pode digitar letras, números e espaço, mas nada de caractere especial
        ano: /^(19[0-9]{2}|20[0-9]{2})$/, // pode por qualquer número de 1900 até 2099
        motor: /^[a-zA-Z0-9.\s]{1,20}$/, // Letras, números, pontos, e espaços
        placa: /^[A-Z]{3}[0-9][A-Z0-9][0-9]{2}$/, // Só aceita esses dois formatos (AAA0A00 ou AAA0000), nem tente digitar algo que não seja assim
        dono: /^[a-zA-Z]+(\s[a-zA-Z]+)*$/, // Nome completo com várias palavras, separadas por espaços //era assim /^[a-zA-Z\s]{3,50}$/,  Só um nome com pelo menos 3 letras
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

