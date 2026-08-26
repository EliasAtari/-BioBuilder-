public class Atomo {
  private Elemento elemento;
  private double posicionX;
  private double posicionY;
public Atomo(Elemento elemento,
double posicionX, double posicionY) {
  this.elemento = elemento;
  this.posicionX = posicionX;
  this.posicionY = posicionY;
}
  public Elemento getElemento() {
    return elemento;
}

public double getPosicionX() {
    return posicionX;
}

public double getPosicionY() {
    return posicionY;
}
  public void setPosicionX(double posicionX) {
    this.posicionX = posicionX;
}

public void setPosicionY(double posicionY) {
    this.posicionY = posicionY;
}
