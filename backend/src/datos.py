from sqlmodel import Session, select
from models.categoria import Categoria
from models.proveedor import Proveedor
from models.articulos import Articulo

def seed_database(engine):
    with Session(engine) as db:
        # si ya existen artículos, no hacemos nada
        if db.exec(select(Articulo)).first() is not None:
            return
        # Crear Categorías
        categorias = [
            Categoria(nombre="Escritura", descripcion="Lápices, biromes, marcadores"),
            Categoria(nombre="Papelería", descripcion="Cuadernos, repuestos y carpetas"),
            Categoria(nombre="Arte y Dibujo", descripcion="Lápices de colores, témperas, reglas, adhesivos"),
            Categoria(nombre="Organización", descripcion="Cartucheras, archivadores y accesorios"),
            Categoria(nombre="Mochilas y Bolsos", descripcion="Mochilas escolares y bolsos deportivos"),
        ]
        db.add_all(categorias)
        db.commit()
        # Guardamos mapa de categorías por nombre
        cat_map = {c.nombre: c.id for c in categorias}
        # Crear Proveedores
        proveedores = [
            Proveedor(nombre="Faber-Castell", telefono="11-4567-8900"),
            Proveedor(nombre="Rivadavia", telefono="11-4321-8765"),
            Proveedor(nombre="Bic", telefono="11-9876-5432"),
            Proveedor(nombre="Maped", telefono="11-5555-4321"),
        ]
        db.add_all(proveedores)
        db.commit()
        # Guardamos mapa de proveedores por nombre
        prov_map = {p.nombre: p.id for p in proveedores}
        # Crear los 16 Artículos Escolares
        articulos = [
            # Escritura
            Articulo(
                nombre="Lápiz de Grafito HB",
                stock=50,
                precio=1200,
                activo=True,
                imagen_url="https://imgs.search.brave.com/HMQlX3w37-xtFYgyYIeN-Gj9w2Xrr4UFj6rAWc0e7Vk/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9saWJy/ZXJpYWlyYmUuY29t/L3dwLWNvbnRlbnQv/dXBsb2Fkcy8yMDI0/LzA1L0xhcGl6LWRl/LUdyYWZpdG8tcGFy/YS1EaWJ1am8tQ2Fz/dGVsbC05MDAwLUZh/YmVyLUNhc3RlbGwt/SEIuanBn",
                categoria_id=cat_map["Escritura"],
                proveedor_id=prov_map["Faber-Castell"],
            ),
            Articulo(
                nombre="Birome Cristal Azul 1.0mm",
                stock=80,
                precio=1800,
                activo=True,
                imagen_url="https://imgs.search.brave.com/il5bIxBQSGdfCHG5sMyWbogpn-PmHOUc4yBEnXQF5Xc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9odHRw/Mi5tbHN0YXRpYy5j/b20vRF9RX05QXzJY/XzkwNTAxMC1NTFU3/NTQzNjQ2NTk0Ml8w/NDIwMjQtRS53ZWJw",
                categoria_id=cat_map["Escritura"],
                proveedor_id=prov_map["Bic"],
            ),
            Articulo(
                nombre="Set Resaltadores Pastel x6",
                stock=35,
                precio=4500,
                activo=True,
                imagen_url="https://imgs.search.brave.com/L_FoZ2tNLa86utCaKNENNadqm4ipte_fVHidf2sxJNA/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWcu/c29sdXppb25kaWdp/dGFsLmNvbS8xMDA0/NjMtbGFyZ2VfZGVm/YXVsdC9tYXBlZC03/NDI1NTgtcmVzYWx0/YWRvci1jbGFzc2lj/LXBhc3RlbC14Ni5q/cGc",
                categoria_id=cat_map["Escritura"],
                proveedor_id=prov_map["Maped"],
            ),
            Articulo(
                nombre="Microfibra Graduada Negra 0.4mm",
                stock=45,
                precio=2100,
                activo=True,
                imagen_url="https://imgs.search.brave.com/lnXLgQLfkxnhMrPGyX_Z04IkUIOmPRb09NfWSOr_bHo/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9kZXRv/ZG9tZHAuY29tLmFy/L3dwLWNvbnRlbnQv/dXBsb2Fkcy8yMDIy/LzAyLzQ3NTlfMjI4/MDJfMjI4MDJfTUlD/Uk9GSUJSQS1ORUdS/QS1NQVBFRC0wNG1t/XzAxLmpwZw",
                categoria_id=cat_map["Escritura"],
                proveedor_id=prov_map["Faber-Castell"],
            ),
            Articulo(
                nombre="Goma de Borrar para Lápiz y Tinta",
                stock=90,
                precio=950,
                activo=True,
                imagen_url="https://imgs.search.brave.com/bhNmpNmRwA2hJ318Nev7FSaCCu2UN47cbS4NSfe41Mo/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9hY2Ru/LXVzLm1pdGllbmRh/bnViZS5jb20vc3Rv/cmVzLzAwNi80NTIv/MzE2L3Byb2R1Y3Rz/L2RfbnFfbnBfOTI1/MTE1LW1sYTQ5MzUy/MDk1ODEyXzAzMjAy/Mi1mLTJjNjQwNDI2/NzcwMTI2M2VhMzE3/NTk4MDIyMDk3Nzcw/LTQ4MC0wLndlYnA",
                categoria_id=cat_map["Escritura"],
                proveedor_id=prov_map["Faber-Castell"],
            ),
            Articulo(
                nombre="Sacapuntas Metálico con Depósito",
                stock=45,
                precio=1650,
                activo=True,
                imagen_url="https://imgs.search.brave.com/HYITSjsNnmLJ1ENm5iHrZHu2BQPSzA6DUljwrdDAYso/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5jYXJ0YWJvbi5j/b20vcHJvZHVjdC9z/YWNhcHVudGFzLW1l/dGFsaWNvLWNvbi1k/ZXBvc2l0by0xLXVz/b19Od2ZsYlRjLmpw/Zz93aWR0aD01MjA",
                categoria_id=cat_map["Escritura"],
                proveedor_id=prov_map["Maped"],
            ),
            # Papelería
            Articulo(
                nombre="Cuaderno Tapa Dura Rayado 48 Hojas",
                stock=60,
                precio=3400,
                activo=True,
                imagen_url="https://imgs.search.brave.com/8tlaycwtc4_ERKKnYl2diFOb5VrGPiUzXG_tvW-Zqg8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9hY2Ru/LXVzLm1pdGllbmRh/bnViZS5jb20vc3Rv/cmVzLzAwMS8xOTYv/ODI1L3Byb2R1Y3Rz/LzUxNDY0LTQ1NTUy/YTYxODc1OWM3MTQx/MjE3MTIzNTE0ODUw/NTkzLTQ4MC0wLndl/YnA",
                categoria_id=cat_map["Papelería"],
                proveedor_id=prov_map["Rivadavia"],
            ),
            Articulo(
                nombre="Cuaderno Tapa Blanda Cuadriculado 48 Hojas",
                stock=55,
                precio=2500,
                activo=True,
                imagen_url="https://imgs.search.brave.com/9VmJVyqPrNMc8t0QqcwR-G73qcMYojoTuFp_hyR4SxY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9odHRw/Mi5tbHN0YXRpYy5j/b20vRF9RX05QXzJY/Xzg2NzIzOS1NTEE4/MDMwMTgzMDgzNV8x/MDIwMjQtRS53ZWJw",
                categoria_id=cat_map["Papelería"],
                proveedor_id=prov_map["Rivadavia"],
            ),
            Articulo(
                nombre="Repuesto de Hojas N°3 Rayado x480",
                stock=25,
                precio=8900,
                activo=True,
                imagen_url="https://imgs.search.brave.com/F8oAJiqGyeDtmFZjk2sQDYb81MKItH9q1PptkHWuVo4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9kZGtq/eDVrZXpvZGZ4LmNs/b3VkZnJvbnQubmV0/L1dleW9wL0xpYnJl/cmlhJTIwU2FuJTIw/UGFibG8vU3RvcmUv/UHJvZHVjdG9zL0JM/T0NLUyUyMFklMjBS/RVBVRVNUT1MvMTU4/MTYyNDI3M19Va1ZR/TGxKSlZrRkVRVlpK/UVNCRFFWSlVRU0Ew/T0RCSVV5NVNRVmt1/UlZoVVVrRWdRa3hC/VGtOUC5qcGc",
                categoria_id=cat_map["Papelería"],
                proveedor_id=prov_map["Rivadavia"],
            ),
            Articulo(
                nombre="Carpeta Escolar 3 Anillos Fibra Negra",
                stock=30,
                precio=4200,
                activo=True,
                imagen_url="https://imgs.search.brave.com/OBKpgjntZxl630aXj8OVTg7FvwcWve46j_5Y3TmWO1k/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9odHRw/Mi5tbHN0YXRpYy5j/b20vRF9OUV9OUF84/NTI0OTgtTUxBNzY1/MTEyOTg3NzBfMDUy/MDI0LU8ud2VicA",
                categoria_id=cat_map["Papelería"],
                proveedor_id=prov_map["Rivadavia"],
            ),
            # Arte y Dibujo
            Articulo(
                nombre="Lápices de Colores Ecolápices x12",
                stock=40,
                precio=5600,
                activo=True,
                imagen_url="https://imgs.search.brave.com/tbzwC-vn7z97akUzs-TYakhlWofFbYMzhwgEsjWqFbY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9kZGtq/eDVrZXpvZGZ4LmNs/b3VkZnJvbnQubmV0/L1dleW9wL0xpYnJl/cmlhJTIwU2FuJTIw/UGFibG8vU3RvcmUv/UHJvZHVjdG9zL0xB/UElDRVMvMTU3MDcy/MjAyNl9URUZRU1Zv/Z1JrRkNSVklnUTBG/VFZFVk1UQ0JZSURF/eUlFd2dRMEZLUVNC/U1QwcEJJQ3NnTXlC/SFVrRkdTVlJQVXk1/cWNHYz0uanBn",
                categoria_id=cat_map["Arte y Dibujo"],
                proveedor_id=prov_map["Faber-Castell"],
            ),
            Articulo(
                nombre="Set Témperas Lavables x12 colores",
                stock=30,
                precio=3800,
                activo=True,
                imagen_url="https://imgs.search.brave.com/-yzo6JZegqfIdVuXp_TX3a5Ze7l01AEYmBGxLOLDDww/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9hY2Ru/LXVzLm1pdGllbmRh/bnViZS5jb20vc3Rv/cmVzLzAwMS8xNTEv/NjY1L3Byb2R1Y3Rz/L2Rpc2Vuby1zaW4t/dGl0dWxvLTIwMjIt/MTAtMzF0MTQzMjU4/LTkzODEtODE4OGQ1/N2UwN2JmNzRmOGQ5/MTY2NzIzNzcyMTQ4/MDctNDgwLTAud2Vi/cA",
                categoria_id=cat_map["Arte y Dibujo"],
                proveedor_id=prov_map["Maped"],
            ),
            Articulo(
                nombre="Regla Cristal Flexible 20cm",
                stock=70,
                precio=1100,
                activo=True,
                imagen_url="https://imgs.search.brave.com/dNMMbOj8rOE4RkagswvDXI6wrdjKis9D0S52qWfEJAI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9hY2Ru/LXVzLm1pdGllbmRh/bnViZS5jb20vc3Rv/cmVzLzAwMS8wMzkv/Mjg5L3Byb2R1Y3Rz/LzAyMzAyMDQxLTFj/YWIyMGEzYjc2MGQ3/NDRiODE1NzkyNzk0/NDQzMjU1LTQ4MC0w/LmpwZw",
                categoria_id=cat_map["Arte y Dibujo"],
                proveedor_id=prov_map["Maped"],
            ),
            Articulo(
                nombre="Tijera Escolar Punta Roma 13cm",
                stock=50,
                precio=2200,
                activo=True,
                imagen_url="https://imgs.search.brave.com/HY3PLI3FwLkBMazFdRMG8ZFKNihVyuNmH2zcHOGoPPo/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9odHRw/Mi5tbHN0YXRpYy5j/b20vRF9RX05QXzJY/XzYxMDMyOC1NTEEz/MTEyNTA3NzY2MV8w/NjIwMTktRS53ZWJw",
                categoria_id=cat_map["Arte y Dibujo"],
                proveedor_id=prov_map["Maped"],
            ),
            Articulo(
                nombre="Adhesivo Sintético Transparente 50ml",
                stock=65,
                precio=1300,
                activo=True,
                imagen_url="https://imgs.search.brave.com/bU4m6TIBS-KQQvoXYwNoTzns5S2X-XPcoXxeI_rElfA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9odHRw/Mi5tbHN0YXRpYy5j/b20vRF9RX05QXzJY/Xzk5MDY1MC1NTFU3/NDk5NDkzNDQ1MF8w/MzIwMjQtRS53ZWJw",
                categoria_id=cat_map["Arte y Dibujo"],
                proveedor_id=prov_map["Bic"],
            ),
            # Organización
            Articulo(
                nombre="Cartuchera Canopla Doble Cierre",
                stock=20,
                precio=7500,
                activo=True,
                imagen_url="https://imgs.search.brave.com/u1mUSE9U67qtrFFVIsxuF-ChXa4UErW8mR7BKKhYH1I/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9odHRw/Mi5tbHN0YXRpYy5j/b20vRF9OUV9OUF82/ODAyNzYtTUxBNzEz/OTA5MTIzNDVfMDgy/MDIzLU8ud2VicA",
                categoria_id=cat_map["Organización"],
                proveedor_id=prov_map["Faber-Castell"],
            ),
            # "Mochilas y Bolsos" se deja vacía para el Empty State
        ]
        db.add_all(articulos)
        db.commit()
