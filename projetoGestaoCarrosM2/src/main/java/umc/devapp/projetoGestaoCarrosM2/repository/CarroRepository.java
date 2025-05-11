package umc.devapp.projetoGestaoCarrosM2.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import umc.devapp.projetoGestaoCarrosM2.entity.Carro;

//código começa aqui
public interface CarroRepository extends JpaRepository<Carro, Integer> {
}
