package biobuilder.datos;

import java.util.ArrayList;
import biobuilder.modelo.Elemento;

public class BaseElementos {

    private ArrayList<Elemento> elementos;

    public BaseElementos() {
        elementos = new ArrayList<>();
    }

    public void agregarElemento(Elemento elemento) {
        elementos.add(elemento);
    }

    public ArrayList<Elemento> getElementos() {
        return elementos;
    }

    public Elemento obtenerPorSimbolo(String simbolo) {
        for (Elemento elemento : elementos) {
            if (elemento.getSimbolo().equals(simbolo)) {
                return elemento;
            }
        }
        return null;
    }

    public Elemento obtenerPorNumeroAtomico(int numeroAtomico) {
        for (Elemento elemento : elementos) {
            if (elemento.getNumeroAtomico() == numeroAtomico) {
                return elemento;
            }
        }
        return null;
    }
}
