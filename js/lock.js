/* =========================================================
   Passwortabfrage vor Spielbeginn.
   Gespeichert ist nur die SHA-256-Prüfsumme des Passworts.
   ========================================================= */
(function () {
  'use strict';
  const HASH = '318c91038efbe55d71a6ce2f4bd6a47d489748c6e567965a76275b397f36fa9d';
  const KEY = 'kufenkoenigin-unlocked';

  // kompakte SHA-256-Implementierung (funktioniert auch ohne crypto.subtle, z. B. bei file://)
  function sha256(str) {
    const K = [];
    let n = 2, c = 0;
    const frac = (x) => ((x - Math.floor(x)) * 4294967296) >>> 0;
    const H = [];
    while (c < 64) {
      let prime = true;
      for (let d = 2; d * d <= n; d++) if (n % d === 0) { prime = false; break; }
      if (prime) { if (c < 8) H[c] = frac(Math.pow(n, 1 / 2)); K[c] = frac(Math.pow(n, 1 / 3)); c++; }
      n++;
    }
    const bytes = Array.from(new TextEncoder().encode(str));
    const bitLen = bytes.length * 8;
    bytes.push(0x80);
    while (bytes.length % 64 !== 56) bytes.push(0);
    for (let i = 7; i >= 0; i--) bytes.push(i > 3 ? 0 : (bitLen >>> (i * 8)) & 255);
    const rotr = (x, k) => (x >>> k) | (x << (32 - k));
    for (let i = 0; i < bytes.length; i += 64) {
      const w = [];
      for (let j = 0; j < 16; j++) w[j] = (bytes[i + j * 4] << 24) | (bytes[i + j * 4 + 1] << 16) | (bytes[i + j * 4 + 2] << 8) | bytes[i + j * 4 + 3];
      for (let j = 16; j < 64; j++) {
        const s0 = rotr(w[j - 15], 7) ^ rotr(w[j - 15], 18) ^ (w[j - 15] >>> 3);
        const s1 = rotr(w[j - 2], 17) ^ rotr(w[j - 2], 19) ^ (w[j - 2] >>> 10);
        w[j] = (w[j - 16] + s0 + w[j - 7] + s1) | 0;
      }
      let [a, b, cc, d, e, f, g, h] = H;
      for (let j = 0; j < 64; j++) {
        const S1 = rotr(e, 6) ^ rotr(e, 11) ^ rotr(e, 25);
        const ch = (e & f) ^ (~e & g);
        const t1 = (h + S1 + ch + K[j] + w[j]) | 0;
        const S0 = rotr(a, 2) ^ rotr(a, 13) ^ rotr(a, 22);
        const maj = (a & b) ^ (a & cc) ^ (b & cc);
        const t2 = (S0 + maj) | 0;
        h = g; g = f; f = e; e = (d + t1) | 0; d = cc; cc = b; b = a; a = (t1 + t2) | 0;
      }
      H[0] = (H[0] + a) | 0; H[1] = (H[1] + b) | 0; H[2] = (H[2] + cc) | 0; H[3] = (H[3] + d) | 0;
      H[4] = (H[4] + e) | 0; H[5] = (H[5] + f) | 0; H[6] = (H[6] + g) | 0; H[7] = (H[7] + h) | 0;
    }
    return H.map((x) => (x >>> 0).toString(16).padStart(8, '0')).join('');
  }

  window.Lock = {
    unlocked() { try { return localStorage.getItem(KEY) === HASH; } catch (e) { return false; } },
    /** prüft das Passwort; bei Erfolg wird die Freischaltung gespeichert */
    unlock(pw) {
      if (sha256(String(pw).trim()) !== HASH) return false;
      try { localStorage.setItem(KEY, HASH); } catch (e) { /* egal */ }
      return true;
    },
  };
})();
