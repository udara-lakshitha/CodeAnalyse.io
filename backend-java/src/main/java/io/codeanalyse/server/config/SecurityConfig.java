package io.codeanalyse.server.config;

import io.codeanalyse.server.security.CustomUserDetailsService;
import io.codeanalyse.server.security.JwtAuthenticationFilter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;
    private final CustomUserDetailsService customUserDetailsService;

    public SecurityConfig(JwtAuthenticationFilter jwtAuthenticationFilter, CustomUserDetailsService customUserDetailsService) {
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
        this.customUserDetailsService = customUserDetailsService;
    }

    // This defines our main "Security Filter Chain" bean, which is the rulebook.
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http, CorsConfigurationSource corsConfigurationSource) throws Exception {
        http
                // 1. Disable CSRF (Cross-Site Request Forgery) protection. This is common for stateless REST APIs.
                .csrf(AbstractHttpConfigurer::disable)

                .cors(cors -> cors.configurationSource(corsConfigurationSource(corsConfigurationSource.toString())))

                // 2. Define authorization rules.
                .authorizeHttpRequests(request -> request
                        // Allow anyone (even unauthenticated users) to access endpoints starting with "/api/auth/**"
                        .requestMatchers("/api/auth/**").permitAll()
                        // Any other request must be authenticated.
                        .anyRequest().authenticated())

                // 3. Configure session management to be STATELESS.
                // The server will not create or use any HTTP sessions. Every request must be re-authenticated.
                .sessionManagement(manager -> manager.sessionCreationPolicy(SessionCreationPolicy.STATELESS))

                // 4. Specify our custom AuthenticationProvider.
                .authenticationProvider(authenticationProvider())

                // 5. Add our custom JWT filter BEFORE the standard UsernamePasswordAuthenticationFilter.
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource(@Value("${cors.allowed-origin}") String allowedOrigin) {
        CorsConfiguration configuration = new CorsConfiguration();

        // This is our "approved visitors" list. We allow our React app's origin.
        configuration.setAllowedOrigins(List.of(allowedOrigin));

        // We can specify which HTTP methods are allowed (e.g., GET, POST, PUT, DELETE).
        // Using "*" allows all standard methods.
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));

        // We can specify which headers are allowed to be sent with the request.
        configuration.setAllowedHeaders(List.of("Authorization", "Content-Type"));

        // This is important for some authentication mechanisms.
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        // We apply this CORS configuration to all paths in our application ("/**").
        source.registerCorsConfiguration("/**", configuration);

        return source;
    }

    // This bean defines the password encoder we will use. BCrypt is the industry standard.
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // This bean is the Authentication Provider that uses our CustomUserDetailsService and PasswordEncoder.
    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(customUserDetailsService);
        authProvider.setPasswordEncoder(passwordEncoder());
        return authProvider;
    }

    // This bean exposes the AuthenticationManager, which we will use in our login endpoint.
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }
}
