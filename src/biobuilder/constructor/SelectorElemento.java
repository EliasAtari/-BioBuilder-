package biobuilder.constructor;
import biobuilder.modelo.Elemento

public class SelectorElemento {
    private Elemento elementoSeleccionado;
    public Elemento getElementoSeleccionado() {
      return elementoSeleccionado;
    }
  public void seleccionarElemento(Elemento elemento) {
    this.elementoSeleccionado = elemento;
  }
}
    
