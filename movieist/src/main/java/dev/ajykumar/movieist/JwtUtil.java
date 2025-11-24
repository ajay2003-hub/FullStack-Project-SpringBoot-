package dev.ajykumar.movieist;


import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.WeakKeyException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Date;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import jakarta.annotation.PostConstruct;

@Component
public class JwtUtil {
    private static final Logger logger = LoggerFactory.getLogger(JwtUtil.class);

    @Value("${jwt.secret:change_this_secret}")
    private String secret;

    @Value("${jwt.expiration:3600000}")
    private long expirationMs;

    // create signing key from configured secret. If configured secret decodes to fewer than 32 bytes
    // (256 bits) we deterministically derive a 32-byte key by SHA-256(secret). This keeps tokens valid across restarts
    // while ensuring algorithm requirements are met.
    private Key deriveSigningKey(String secret) {
        byte[] keyBytes = null;
        // try standard Base64
        try {
            keyBytes = Decoders.BASE64.decode(secret);
        } catch (Exception e1) {
            try {
                // try Base64 URL-safe
                keyBytes = Decoders.BASE64URL.decode(secret);
            } catch (Exception e2) {
                // fallback: raw UTF-8 bytes of the secret string
                keyBytes = secret.getBytes(StandardCharsets.UTF_8);
            }
        }

        if (keyBytes == null) {
            keyBytes = secret.getBytes(StandardCharsets.UTF_8);
        }

        if (keyBytes.length < 32) {
            // Not secure enough for HS256; derive a stable 32-byte key using SHA-256
            logger.warn("Configured JWT secret is too short ({} bytes). Deriving 32-byte key using SHA-256; set a stronger secret in configuration to avoid this.", keyBytes.length);
            try {
                MessageDigest sha256 = MessageDigest.getInstance("SHA-256");
                keyBytes = sha256.digest(secret.getBytes(StandardCharsets.UTF_8));
            } catch (NoSuchAlgorithmException ex) {
                // highly unlikely, but if SHA-256 is unavailable, fall back to generating a secure key via Keys.secretKeyFor
                logger.error("SHA-256 MessageDigest not available; generating a random secure key instead. Tokens will not be stable across restarts.", ex);
                return Keys.secretKeyFor(SignatureAlgorithm.HS256);
            }
        }

        try {
            return Keys.hmacShaKeyFor(keyBytes);
        } catch (WeakKeyException wke) {
            // As a last resort, generate a secure random key (tokens won't be stable across restarts)
            logger.error("Derived key is considered weak by JJWT: {}. Generating a random secure key as fallback. To fix, provide a >=32-byte secret (base64 or raw).", wke.getMessage());
            return Keys.secretKeyFor(SignatureAlgorithm.HS256);
        }
    }

    // getSigningKey kept for backwards compatibility
    private Key getSigningKey() {
        return deriveSigningKey(this.secret);
    }

    @PostConstruct
    private void validateSecretOnStartup() {
        byte[] keyBytes = null;
        try {
            keyBytes = Decoders.BASE64.decode(this.secret);
        } catch (Exception e1) {
            try {
                keyBytes = Decoders.BASE64URL.decode(this.secret);
            } catch (Exception e2) {
                keyBytes = this.secret.getBytes(StandardCharsets.UTF_8);
            }
        }
        if (keyBytes.length < 32) {
            logger.warn("JWT signing key is short ({} bytes). A SHA-256 based key will be used instead. Provide a >=32 byte secret to avoid this warning.", keyBytes.length);
        } else {
            logger.info("JWT signing key length: {} bytes", keyBytes.length);
        }
    }

    public String generateToken(UserDetails userDetails) {
        Key key = deriveSigningKey(this.secret);

        return Jwts.builder()
                .setSubject(userDetails.getUsername())
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + expirationMs))
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    public String extractUsername(String token) {
        Key key = getSigningKey();
        return Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token).getBody().getSubject();
    }

    public boolean validateToken(String token, UserDetails userDetails) {
        try {
            String username = extractUsername(token);
            return username.equals(userDetails.getUsername()) && !isTokenExpired(token);
        } catch (JwtException | IllegalArgumentException e) {
            return false;
        }
    }

    private boolean isTokenExpired(String token) {
        Key key = getSigningKey();
        Date exp = Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token).getBody().getExpiration();
        return exp.before(new Date());
    }
}
