/**
 * 
 */
package com.pedro.service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pedro.modelo.SerieReunion;
import com.pedro.modelo.Usuarios;
import com.pedro.repository.SerieReunionRepository;
import com.pedro.repository.UserRepository;

/**
 * The Class SerieReunionServiceImpl.
 *
 * @author Westermeyer
 */

@Service
public class SerieReunionServiceImpl implements SerieReunionService {

	/** The srRepo. */
	@Autowired
	SerieReunionRepository srRepo;
	
	/** The userR. */
	@Autowired
	UserRepository userR;
	
	/**
	 * Gets the serie reunion by usuario.
	 *
	 * @param codusu the codusu
	 * @return the serie reunion by usuario
	 */
	@Override
	public List<SerieReunion> getSerieReunionByUsuario(int codusu) {
		return srRepo.getSerieReunionByUsuario(codusu);
	}

	/**
	 * Crear serie reunion.
	 *
	 * @param reunion the reunion
	 * @param codusu the codusu
	 */
	@Override
	public void crearSerieReunion(SerieReunion reunion, int[] codusu) {
		
		Set<Usuarios> usuario = new HashSet<>();
		
		for (int i : codusu) {			
			Usuarios user = userR.findOne(i);
			
			usuario.add(user);
		}
		
		SerieReunion reu = new SerieReunion(reunion.getEquipo(),reunion.getNombre(),usuario);
		
		srRepo.save(reu);
		
	}

	/**
	 * Gets the serie reunion by cod reunion.
	 *
	 * @param codsreunion the codsreunion
	 * @return the serie reunion by cod reunion
	 */
	@Override
	public SerieReunion getSerieReunionByCodReunion(int codsreunion) {
		return srRepo.getSerieReunionByCodReunion(codsreunion);
	}

	/**
	 * Modificar serie reunion.
	 *
	 * @param reunion the reunion
	 */
	@Override
	public void modificarSerieReunion(SerieReunion reunion) {
		SerieReunion serieReunion = srRepo.findOne(reunion.getCodSReunion());
		
		if(serieReunion != null) {
			
			serieReunion.setEquipo(reunion.getEquipo());
			serieReunion.setNombre(reunion.getNombre());
			serieReunion.setCerrado(reunion.getCerrado());
			srRepo.save(serieReunion);
			
		}
		
	}

	/**
	 * Modificar serie reunion invitando mas usuarios.
	 *
	 * @param reunion the reunion
	 * @param codusu the codusu
	 */
	@Override
	public void modificarSerieReunionInvitandoMasUsuarios(SerieReunion reunion, int[] codusu) {
		
		SerieReunion serieReunion = srRepo.findOne(reunion.getCodSReunion());
		Set<Usuarios> usuario = reunion.getUsuarios();
		
		if(serieReunion != null) {
			
			for (int i : codusu) {
				Usuarios user = userR.findOne(i);
				
				usuario.add(user);
			}
			
			serieReunion.setEquipo(reunion.getEquipo());
			serieReunion.setNombre(reunion.getNombre());
			serieReunion.setCerrado(reunion.getCerrado());
			serieReunion.setUsuarios(usuario);
			srRepo.save(serieReunion);
			
		}
		
	}

	/**
	 * Eliminar participante.
	 *
	 * @param sr the sr
	 * @param codusu the codusu
	 */
	@Override
	public void eliminarParticipante(SerieReunion sr, int codusu) {
		
		SerieReunion serieReun = srRepo.findOne(sr.getCodSReunion());
		Usuarios us = userR.findOne(codusu);
		
		if(serieReun != null && us != null) {
			
			if(serieReun.getUsuarios().contains(us)) {
				serieReun.getUsuarios().remove(us);
			}
			srRepo.save(serieReun);
		}
	}
	
}
