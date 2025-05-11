package umc.devapp.projetoGestaoCarrosM2.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import umc.devapp.projetoGestaoCarrosM2.entity.Carro;
import umc.devapp.projetoGestaoCarrosM2.repository.CarroRepository;

import java.util.List;
import java.util.Optional;

//código começa aqui
@Service
public class CarroService {

    @Autowired
    CarroRepository carroRepository;

    public List<Carro> getAllCarroService() {
        List<Carro> carro = carroRepository.findAll();
        return carro;
    } //CONSULTAR TODOS

    public Optional<Carro> getCarroService(Integer id) {
        return carroRepository.findById(id);
    } //CONSULTAR POR ID

    public Carro insertCarroService(Carro carro) {
        return carroRepository.save(carro);
    } //CADASTRAR

    public Carro updateCarroService(Carro carro) {
        Carro updatedCarro = carroRepository.findById(carro.getId()).get();
        updatedCarro = carro;
        return carroRepository.save(updatedCarro);
    } //ATUALIZAR com id

    public void deleteCarroByIdService(Integer id) {
        carroRepository.deleteById(id);
    } //DELETAR com id
}
