package biobuilder.modelo;

public class Enlace {
  private Atomo atomo1;
  private Atomo atomo2;
  private int tipo;

public Enlace(Atomo atomo1, Atomo atomo2, int tipo) {
  this.atomo1 = atomo1;
  this.atomo2 = atomo2;
  this.tipo = tipo;
}
  public Atomo getAtomo1() {
    return atomo1;
  }
  public Atomo getAtomo2() {
    return atomo2;
  }
  public int getTipo() {
    return tipo;
  }
  public void setTipo(intTipo) {
    this.tipo = tipo;
  }
}
