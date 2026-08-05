"""
auth_utils.py
-------------
Antes las contraseñas se guardaban y comparaban en texto plano
(`user[2].strip() == password.strip()`). Esto es inseguro: cualquiera con
acceso a la base de datos ve las contraseñas de todos los usuarios.

Este módulo:
- Genera hashes seguros (Werkzeug/PBKDF2) para contraseñas nuevas.
- Sigue reconociendo contraseñas viejas guardadas en texto plano, para no
  romper el login de las cuentas que ya existen en Supabase.
- Expone `needs_rehash` para que, la primera vez que un usuario con
  contraseña vieja inicia sesión correctamente, la re-guardemos ya hasheada.
"""

from werkzeug.security import check_password_hash, generate_password_hash

# Los hashes de Werkzeug siempre tienen el formato "metodo:parametros$hash",
# por ejemplo "pbkdf2:sha256:600000$....". Un password en texto plano casi
# nunca contendrá ":" seguido de ese patrón, así que lo usamos para
# distinguir entre "ya está hasheado" y "todavía es texto plano".
_HASH_PREFIXES = ("pbkdf2:", "scrypt:")


def hash_password(plain_password: str) -> str:
    return generate_password_hash(plain_password)


def is_hashed(stored_password: str) -> bool:
    return isinstance(stored_password, str) and stored_password.startswith(_HASH_PREFIXES)


def verify_password(plain_password: str, stored_password: str) -> bool:
    """Verifica una contraseña sin importar si en la BD está hasheada o en texto plano."""
    if stored_password is None or plain_password is None:
        return False

    if is_hashed(stored_password):
        return check_password_hash(stored_password, plain_password)

    # Cuenta antigua: contraseña en texto plano.
    return stored_password.strip() == plain_password.strip()


def needs_rehash(stored_password: str) -> bool:
    """True si la contraseña guardada todavía está en texto plano y debería actualizarse."""
    return not is_hashed(stored_password)
