package biobuilder.interfaz;
import biobuilder.modelo.Molecula;
public class Plano2D {
  private Molecula moleculaActual;
  private double ancho;
  private double alto;
public Plano2D(double ancho, double alto) {
  this.ancho = ancho;
  this.alto = alto;
}
  public Molecula getMolecula() {
    return moleculaActual;
  }
  public double getAncho() {
    return ancho;
  }
  public double getAlto() {
    return alto;
  }
}
