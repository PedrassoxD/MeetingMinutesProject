/**
 * 
 */
package com.pedro.service;

import java.util.List;

import com.pedro.modelo.Temas;

/**
 * @author Westermeyer
 *
 */
public interface TemasService {
	
	List<Temas> getTemasByCodReunion(int codreunion);
	List<Temas> getAllTemasByCodSReunion(int codsreunion);
	void crearTemas(Temas tema, int codreunion, int codsreunion);
	void añadirInfoTema(Temas tema, int codTema);
	void añadirDecisionTema(Temas tema, int codTema);
	void cerrarTemas(Temas tema);
	List<Temas> getTemasByCodReunionAndNoCerrado(int codreunion);
	List<Temas> getTemasByCodReunionAntiguaAndNoCerrado(int codreunion);
	
}
