package biobuilder.modelo;

public class Elemento {

    private String id;
    private int numeroAtomico;
    private String simbolo;
    private String nombre;
    private double masaAtomica;
    private int protones;
    private int neutrones;
    private int electrones;
    private int enlacesMaximos;

    public Elemento(String id, int numeroAtomico, String simbolo, String nombre,double masaAtomica, int protones, int neutrones, int electrones, int enlacesMaximos) {

        this.id = id
        this.numeroAtomico = numeroAtomico;
        this.simbolo = simbolo;
        this.nombre = nombre;
        this.masaAtomica = masaAtomica;
        this.protones = protones;
        this.neutrones = neutrones;
        this.electrones = electrones;
        this.enlacesMaximos = enlacesMaximos;
    }
    public String getId() {
        return id;
    }
    public int getNumeroAtomico() {
        return numeroAtomico;
    }

    public String getSimbolo() {
        return simbolo;
    }

    public String getNombre() {
        return nombre;
    }

    public double getMasaAtomica() {
        return masaAtomica;
    }

    public int getProtones() {
        return protones;
    }

    public int getNeutrones() {
        return neutrones;
    }

    public int getElectrones() {
        return electrones;
    }

    public int getEnlacesMaximos() {
        return enlacesMaximos;
    }
}
