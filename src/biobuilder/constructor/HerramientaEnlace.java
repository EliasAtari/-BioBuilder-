package biobuilder.constructor; 

public class HerramientaEnlace {
  public static final int SIMPLE = 1;
  public static final int DOBLE = 2;
  public static final int TRIPLE = 3;
private int tipoEnlace;

public HerramientaEnlace() {
  tipoEnlace = SIMPLE;
}
public getTipoEnlace() {
  return tipoEnlace;
}

public void setTipoEnlace(int tipoEnlace) {
  if (tipoEnlace >= SIMPLE && tipoEnlace =< TRIPLE) {
  this.tipoEnlace = tipoEnlace;
    }
  }
}
