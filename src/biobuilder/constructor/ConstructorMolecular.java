package biobuilder.constructor;
import biobuilder.modelo.Molecula;

public class ConstructorMolecular {
  private Molecula molecula;
  
  public ConstructorMolecular (Molecula molecula) {
    this.molecula = molecula;
  }
  public Molecula getMolecula() {
    return molecula;
  }
  public void setMolecula(Molecula molecula) {
    this.molecula = molecula;
  }
}
    
