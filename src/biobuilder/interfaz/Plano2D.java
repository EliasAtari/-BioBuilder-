package biobuilder.interfaz;
import biobuilder.modelo.Molecula;
public class Plano2D {
  private Molecula moleculaActual;
  private double ancho;
  private double alto;
  private Atomo atomoSeleccionado;
public Plano2D(double ancho, double alto) {
  this.ancho = ancho;
  this.alto = alto;
}
  public Molecula getMolecula() {
    return moleculaActual;
  }
  public void setMoleculaActual(Molecula moleculaActual) {
    this.moleculaActual = moleculaActual;
  }
  public double getAncho() {
    return ancho;
  }
  public double getAlto() {
    return alto;
  }
  public Atomo getAtomoSeleccionado() {
    return atomoSeleccionado;
  }
  public void seleccionarAtomo(Atomo atomo) {
    this.atomoSeleccionado = atomo;
  }
  public void moverAtomo(double nuevaX, double nuevaY) {
    if (atomoSeleccionado !=null) {
      atomoSeleccionado.setPosicionX(nuevaX);
      atomoSeleccionado.setPosicionY(nuevaY);
    }
  }
  public void soltarAtomo() {
    atomoSeleccionado = null;
  }
}

