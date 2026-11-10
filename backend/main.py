import sys
from pathlib import Path

# Agregar directorio src al sys.path para que los imports de routers y models resuelvan
src_path = Path(__file__).resolve().parent / "src"
if str(src_path) not in sys.path:
    sys.path.insert(0, str(src_path))

from main import app  # noqa: F401
