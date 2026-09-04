package biobuilder.constructor;

public class HerramientaMover {
  private boolean moviendo;
  public HerramientaMover() {
    moviendo = false;
  }

public boolean estaMoviendo() {
  return moviendo;
}
  public void iniciarMovimiento() {
    moviendo = true;
  }
  public void terminarMovimiento() {
    moviendo = false;
  }
}

  
