package umc.devapp.projetoGestaoCarrosM2.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

//código começa aqui
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name="carro")
public class Carro {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column (name="marca")
    private String marca;
    @Column (name="modelo")
    private String modelo; //Varchar no SQL é String no Java
    @Column (name="ano")
    private Integer ano;
    @Column (name="motor")
    private String motor;
    @Column (name="placa")
    private String placa;
    @Column (name="dono")
    private String dono;
    @Column (name="cnh")
    private String cnh;
    @Column (name="telefone")
    private String telefone;
    @Column (name="endereco")
    private String endereco;

}