package biobuilder.archivos;

public class InformacionBBM {
  private String fechaCreacion;
  private int cantidadAtomos;
  private int cantidadEnlaces;
  private long bytes;

  public InformacionBBM(String fechaCreacion, int cantidadAtomos, int cantidadEnlaces, long bytes) {
    this.fechaCreacion = fechaCreacion;
    this.cantidasAtomos = cantidadAtomos;
    this.cantidadEnlaces = cantidadEnlaces;
    this.byes = bytes;
  }
  public String getFechaCreacion() {
    return fechaCreacion;
  }
  public int getCantidadAtomos() {
    return cantidadAtomos;
  }
  public int getCantidadEnlaces() {
    return cantidadEnlaces;
  }
  public long getBytes() {
    return bytes;
  }
}
  
  
