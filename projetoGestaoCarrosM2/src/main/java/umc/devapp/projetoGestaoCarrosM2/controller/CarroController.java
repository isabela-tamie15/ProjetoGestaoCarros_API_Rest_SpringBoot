package umc.devapp.projetoGestaoCarrosM2.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import umc.devapp.projetoGestaoCarrosM2.entity.Carro;
import umc.devapp.projetoGestaoCarrosM2.service.CarroService;

import java.util.List;
import java.util.Optional;

//código começa aqui
@RequestMapping("/carro")
@RestController
public class CarroController {

    @Autowired
    private CarroService carroService;

    //retorna uma lista de produtos (CONSULTAR TODOS - Get no Postman)
    @GetMapping("/all")
    public ResponseEntity<List<Carro>> getAllCarro() {
        List<Carro> carros = carroService.getAllCarroService(); //antes do if e else, o return era na mesma identação do List
        return ResponseEntity.ok(carros);
    }

    //retorna os dados de um produto de id fornecido (CONSULTAR POR ID - Get no Postman)
    @GetMapping("/{id}")
    public ResponseEntity<Optional<Carro>> getCarroService(@PathVariable Integer id) {
        Optional<Carro> carro = carroService.getCarroService(id);
        //acrescentei esse trecho if, e o return antigo eu coloquei dentro do else
        if(carro.isEmpty()) {
            return ResponseEntity.notFound().build(); //.notFound() mostra o status http 404
        }
        else {
            return ResponseEntity.ok(carro); //mostra o status http 200 tradicional quando encontra o produto
        }
    }

    //insere um produto no banco de dados (CADASTRAR - Post no Postman)
    @PostMapping("/add")
    public ResponseEntity<Carro> addCarro(@RequestBody Carro carro) {
        Carro newCarro = carroService.insertCarroService(carro);
        return new ResponseEntity<>(newCarro, HttpStatus.CREATED);
    }

    //atualiza um produto no banco de dados (ATUALIZAR - Put no Postman)
    @PutMapping("/upd")
    public ResponseEntity<Carro> updateCarro(@RequestBody Carro carro) {
        Carro updatedCarro = carroService.updateCarroService(carro);
        return ResponseEntity.ok(updatedCarro);
    }

    //deleta um produto de id fornecido (DELETAR - Delete no Postman)
    @DeleteMapping("/del/{id}")
    public ResponseEntity<Void> deleteCarro(@PathVariable Integer id) {
        carroService.deleteCarroByIdService(id);
        return ResponseEntity.noContent().build();
    }

}