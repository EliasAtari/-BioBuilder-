package biobuilder.archivos;
import java.util.ArrayList;
import biobuilder.modelo.Molecula;
 public class ArchivoBBM {
   private String formato;
   private String version;
   private String nombreProyecto;
   private ArrayList<molecula> moleculas;

public ArchivoBBM() {
  formato = "BBM";
  version = "1.0";
  nombreProyecto = "Nuevo Proyecto";

moleculas = new ArrayList<>();
}
   public String getFormato() {
     return formato;
   }
   public String getVersion() {
     return version;
   }
   public String getNombreProyecto() {
     return nombreProyecto;
   }
   public void setNombreProyecto(String nombreProyecto) {
     this.nombreProyecto = nombreProyecto;
   }
   public ArrayList<molecula> getMolecula() {
     return moleculas;
   }
   public void agregarMolecula(Molecula molecula) {
        moleculas.add(molecula);
   }
 }
