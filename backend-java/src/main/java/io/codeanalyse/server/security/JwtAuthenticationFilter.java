// JwtAuthenticationFilter.java
package io.codeanalyse.server.security;

import io.codeanalyse.server.service.JWTService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import org.apache.commons.lang3.StringUtils;

import java.io.IOException;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JWTService jwtService;
    private final CustomUserDetailsService customUserDetailsService;

    public JwtAuthenticationFilter(JWTService jwtService, CustomUserDetailsService customUserDetailsService) {
        this.jwtService = jwtService;
        this.customUserDetailsService = customUserDetailsService;
    }

    // This is the main method of the filter. It's called for every single HTTP request.
    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {

        // 1. Get the "Authorization" header from the request. This is where the JWT is expected to be.
        final String authHeader = request.getHeader("Authorization");

        // 2. Check if the header is missing or doesn't start with "Bearer ".
        // "Bearer " is the standard prefix for JWTs.
        if (StringUtils.isEmpty(authHeader) || !StringUtils.startsWith(authHeader, "Bearer ")) {
            // If the token is missing, we just continue to the next filter in the chain.
            // The request will likely be rejected later if it's for a protected endpoint.
            filterChain.doFilter(request, response);
            return;
        }

        // 3. Extract the actual token string by cutting off the "Bearer " prefix.
        final String jwt = authHeader.substring(7);

        // 4. Extract the username (email) from the token using our JWTService.
        final String userEmail = jwtService.extractUserName(jwt);

        // 5. Check if we have a username AND the user is not already authenticated in the current security context.
        if (StringUtils.isNotEmpty(userEmail) && SecurityContextHolder.getContext().getAuthentication() == null) {
            // If so, load the user's details from the database using our CustomUserDetailsService.
            UserDetails userDetails = this.customUserDetailsService.loadUserByUsername(userEmail);

            // 6. Check if the token is valid for this user.
            if (jwtService.isTokenValid(jwt, userDetails)) {
                // If the token is valid, create an authentication token.
                // This is an object that Spring Security uses to represent the currently logged-in user.
                UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                        userDetails, null, userDetails.getAuthorities());

                // Set some details on the token from the HTTP request.
                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                // 7. Update the SecurityContextHolder with the new authentication token.
                // This is the crucial step that "logs the user in" for this single request.
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
        }

        // 8. Continue to the next filter in the chain.
        filterChain.doFilter(request, response);
    }
}
