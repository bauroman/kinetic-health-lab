// lib/rate-limit.ts
// Rate limit en memoria. Suficiente para frenar abuso básico.
//
// OJO: en plataformas serverless (Vercel) cada instancia tiene su propia memoria,
// así que el límite es "por instancia". Para un límite global y estricto,
// reemplazá esto por Upstash Ratelimit (@upstash/ratelimit), que tiene plan gratis.

const intentos = new Map<string, number[]>();

/**
 * Devuelve true si la petición está PERMITIDA, false si superó el límite.
 * @param clave    identificador (ej: IP)
 * @param limite   cantidad máxima de intentos
 * @param ventanaMs  ventana de tiempo en milisegundos
 */
export function rateLimit(clave: string, limite: number, ventanaMs: number): boolean {
  const ahora = Date.now();
  const recientes = (intentos.get(clave) ?? []).filter((t) => ahora - t < ventanaMs);

  if (recientes.length >= limite) {
    intentos.set(clave, recientes);
    return false;
  }

  recientes.push(ahora);
  intentos.set(clave, recientes);

  // Limpieza ocasional para que el Map no crezca indefinidamente
  if (intentos.size > 5000) {
    for (const [k, v] of intentos) {
      if (v.every((t) => ahora - t >= ventanaMs)) intentos.delete(k);
    }
  }

  return true;
}