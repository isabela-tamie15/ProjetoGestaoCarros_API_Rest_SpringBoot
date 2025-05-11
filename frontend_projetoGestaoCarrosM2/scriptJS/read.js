$('document').ready(function () {
    listAllCarros()
    $('.searchButton').click(function(){
        var search = $('#searchInput').val()
        if(search == 0) {
            listAllCarros()
        }else if(search > 0){
            getCarroById(search)
        }else if(search < 0 ){ alert('Valor digitado Inválido') }
    })
})

async function listAllCarros(){
    const url = "http://localhost:8080/carro/all";
    const dados = await fetch(url, {method: "GET"});
    if(dados.status === 200){
        var carros = await dados.json();
        $('.rows').remove()
        for(let carro of carros){
            $('.tableBody').append('<tr class="rows"><td>'+carro.id+'</td><td>'+carro.marca+'</td> <td>'+carro.modelo+'</td> <td>'+carro.ano+'</td> <td>'+carro.motor+'</td> <td>'+carro.placa+'</td> <td>'+carro.dono+'</td> <td>'+carro.cnh+'</td> <td>'+carro.telefone+'</td> <td>'+carro.endereco+'</td> <td><a href="update.html?carroID='+carro.id+'"><img src="imagens/edit02.jpg" width="20" ></a></td> <td><a href="#" onclick="delCarro('+carro.id+');"> <img src="imagens/trash01.png" width="20" > </a></td></tr>')
        }
    }
}

async function getCarroById(idcarro){
    //atenção para a crase (`) na linha a seguir  ---- não é aspas simples (')
    const url = `http://localhost:8080/carro/${idcarro}`; //ajustei o endpoint igual ao backend, senão não funciona
    const dados = await fetch(url);
    // alert(dados.status)
    if(dados.status === 200){
        var carro = await dados.json();
        $('.rows').remove()
        $('.tableBody').append('<tr class="rows"><td>'+carro.id+'</td><td>'+carro.marca+'</td> <td>'+carro.modelo+'</td> <td>'+carro.ano+'</td> <td>'+carro.motor+'</td> <td>'+carro.placa+'</td> <td>'+carro.dono+'</td> <td>'+carro.cnh+'</td> <td>'+carro.telefone+'</td> <td>'+carro.endereco+'</td> <td><a href="update.html?carroID='+carro.id+'"><img src="imagens/edit02.jpg" width="20" ></a></td> <td><a href="#" onclick="delCarro('+carro.id+');"> <img src="imagens/trash01.png" width="20" > </a></td></tr>')
    }
    else{
        alert("ID: " + idcarro + " não encontrado");
    }
}
