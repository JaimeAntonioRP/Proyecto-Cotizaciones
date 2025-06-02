package com.geredu.cotizaciones.cotizaciones_backend.filter;

import com.geredu.cotizaciones.cotizaciones_backend.service.JwtService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import org.springframework.stereotype.Component;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final UserDetailsService userDetailsService;

    public JwtAuthenticationFilter(JwtService jwtService, UserDetailsService userDetailsService) {
        this.jwtService = jwtService;
        this.userDetailsService = userDetailsService;
    }

    /**
     * Evita que se filtre el endpoint /auth/login porque ahí se genera el token
     */
    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) {
        return request.getServletPath().equals("/auth/login");
    }

    /**
     * Método principal del filtro que valida el JWT
     */
    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {

        final String authHeader = request.getHeader("Authorization");
        System.out.println("[JwtAuthenticationFilter] Authorization header: " + authHeader);

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            System.out.println("[JwtAuthenticationFilter] No Bearer token found, skipping filter.");
            filterChain.doFilter(request, response);
            return;
        }

        final String jwt = authHeader.substring(7);
        String username = null;

        try {
            username = jwtService.extractUsername(jwt);
            System.out.println("[JwtAuthenticationFilter] Extracted username: " + username);
        } catch (Exception e) {
            System.out.println("[JwtAuthenticationFilter] Failed to extract username from token: " + e.getMessage());
            filterChain.doFilter(request, response);
            return;
        }

        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            try {
                UserDetails userDetails = this.userDetailsService.loadUserByUsername(username);
                System.out.println("[JwtAuthenticationFilter] Loaded userDetails for user: " + username);

                // 🔽 IMPRIMIR AUTHORITIES DEL USUARIO
                System.out.println("[JwtAuthenticationFilter] Authorities: " + userDetails.getAuthorities());

                if (jwtService.isTokenValid(jwt, userDetails)) {
                    System.out.println("[JwtAuthenticationFilter] Token is valid, setting authentication.");

                    UsernamePasswordAuthenticationToken authToken =
                            new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());

                    authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    SecurityContextHolder.getContext().setAuthentication(authToken);
                } else {
                    System.out.println("[JwtAuthenticationFilter] Token is NOT valid.");
                }
            } catch (Exception e) {
                System.out.println("[JwtAuthenticationFilter] UserDetailsService failed to load user: " + e.getMessage());
            }
        } else {
            System.out.println("[JwtAuthenticationFilter] Username is null or context already has authentication.");
        }

        filterChain.doFilter(request, response);
    }
}
