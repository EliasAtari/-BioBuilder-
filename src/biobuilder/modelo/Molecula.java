package biobuilder.modelo;
import java.util.ArrayList;
  public class Molecula {
    private String nombre;
    private ArrayList<Atomo> atomos;
    private ArrayList<Enlace> enlaces;

  public Molecula (String nombre) {
    this.nombre = nombre;
    this.atomos = new ArrayList<>();
    this.enlaces = new ArrayList<>();
  }
    public String getNombre() {
      return nombre;
    }
    public ArrayList<Atomo> getAtomos() {
      return atomos;
    }
    public ArrayList<Enlace> getEnlaces() {
      return enlaces;
    }
    public void agregarAtomo(Atomo atomo) {
      atomos.add(atomo);
    }
    public void agregarEnlace(Enlace enlace) {
      enlaces.add(enlace);
    }
  }
