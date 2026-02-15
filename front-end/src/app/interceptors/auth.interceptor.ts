import { HttpInterceptorFn } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

/**
 * HTTP Interceptor que agrega automáticamente el token JWT a todas las peticiones.
 * 
 * Funcionamiento:
 * 1. Intercepta CADA petición HTTP antes de que salga
 * 2. Lee el token del localStorage (solo en el navegador, no en SSR)
 * 3. Si hay token, lo agrega al header "Authorization: Bearer <token>"
 * 4. Deja pasar la petición modificada
 */
export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const platformId = inject(PLATFORM_ID);

    // Solo acceder a localStorage si estamos en el navegador (no en SSR)
    if (isPlatformBrowser(platformId)) {
        const token = localStorage.getItem('token');

        if (token) {
            const clonedRequest = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`
                }
            });
            return next(clonedRequest);
        }
    }

    // Si no hay token o estamos en SSR, dejar pasar la petición sin modificar
    return next(req);
};

