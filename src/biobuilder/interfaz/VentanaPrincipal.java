package biobuilder.interfaz;

public class VentanaPrincipal {
  private BarraHerramientas barraHerramientas;
  private BarraInferior barraInferior;
  private Plano2D plano2D

public VentanaPrincipal() {
  barraHerramientas = new BarraHerramientas();
  barraInferior = new BarraInferior();
  plano2D = new Plano2D();
}

public BarraHerramientas getBarraHerramientas() {
  return barraHerramientas;
}

public BarraInferior getBarraInferior() {
  return barraInferior;
}

public Plano2D getPlano2D() {
  return plano2D;
   }
}
