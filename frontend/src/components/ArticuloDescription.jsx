import { useContext } from "react"
import { useOutletContext } from "react-router-dom"
import { ThemeContext } from "../context/ThemeContext"

const descripciones = {
  1: "Lápiz de grafito dureza HB, ideal para escritura y dibujo técnico. Punta resistente, trazo preciso y mina de larga duración. Apto para uso escolar y profesional.",
  2: "Birome de punta media con tinta azul de secado rápido. Escritura fluida y sin manchas, cuerpo transparente para controlar la cantidad de tinta. Clásico de escritorio.",
  3: "Set de 6 resaltadores en colores pastel suaves. Punta biselada para subrayado de distintos anchos. Tinta al agua, no daña el papel y no traspasa hojas.",
  4: "Marcador de tinta negra con punta fina. Ideal para rotular, escribir sobre papel y cartón o hacer trazos precisos en trabajos escolares y presentaciones.",
  5: "Cuaderno de tapa dura con hojas rayadas. Encuadernación cosida para mayor resistencia, ideal para anotaciones diarias. Tamaño A4, 100 hojas.",
  6: "Cuaderno de tapa blanda con hojas cuadriculadas. Formato compacto y liviano, perfecto para matemática, física o diseño básico. 80 hojas tamaño A4.",
  7: "Repuesto de hojas cuadriculadas para carpeta de 3 anillos. Pack de 480 hojas resistentes, compatibles con anillos estándar. Hoja blanca de 75 g.",
  8: "Carpeta de 3 anillos con tapa rígida plastificada. Capacidad para hasta 300 hojas, apta para hojas A4. Incluye bolsillo interior de documento.",
  9: "Set de 12 lápices de colores con mina gruesa y suave. Colores vivos e intensos, madera certificada. Ideales para colorear, dibujar y manualidades.",
  10: "Set de 12 témperas en colores básicos y primarios. Fórmula lavable a base de agua, fácil de mezclar. Aptas para cartón, papel y madera. Uso escolar.",
  11: "Regla flexible de 30 cm en plástico transparente. Escala en centímetros y milímetros, resistente a la rotura. Indispensable en el estuche escolar.",
  12: "Tijera de punta roma con hojas de acero inoxidable. Mango ergonómico de colores, segura para uso escolar. Corte limpio y preciso en papel y cartón.",
  13: "Cartuchera con compartimento principal amplio. Cierre de cremallera resistente, material lavable. Capacidad para lápices, birome, regla y accesorios.",
  14: "Adhesivo sintético en frasco con pinceleta integrada. Fórmula no tóxica, secado rápido y transparente. Apto para papel, cartón, foamy y tela.",
  15: "Goma de borrar blanca para lápiz grafito. Borrado limpio sin dañar el papel, residuos fáciles de quitar. Presentación rectangular de tamaño estándar.",
  16: "Sacapuntas metálico con depósito incorporado. Orificio calibrado para lápices estándar, cuchilla de acero inoxidable para un afilado perfecto.",
}

export default function ArticuloDescription() {
  const { articulo } = useOutletContext()
  const { darkMode } = useContext(ThemeContext)

  const descripcion =
    descripciones[articulo.id] ||
    "Artículo escolar de alta calidad para estudiantes y docentes. Producto verificado para el inventario oficial de Librería Kuky."

  return (
    <div
      className={`p-6 rounded-xl border mt-4 space-y-4 transition-colors ${
        darkMode
          ? "bg-zinc-850 border-zinc-700/60"
          : "bg-white border-zinc-200 shadow-sm"
      }`}
    >
      <h3 className="text-xl font-bold text-teal-500">Descripción y Especificaciones</h3>
      <p className={`leading-relaxed ${darkMode ? "text-zinc-300" : "text-zinc-700"}`}>
        {descripcion}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
        <div
          className={`p-4 rounded-lg border transition-colors ${
            darkMode
              ? "bg-zinc-800/80 border-zinc-700/40"
              : "bg-zinc-50 border-zinc-200"
          }`}
        >
          <p className={`text-xs font-semibold uppercase tracking-wider ${darkMode ? "text-zinc-400" : "text-zinc-500"}`}>
            Categoría
          </p>
          <p className={`text-lg font-bold mt-1 ${darkMode ? "text-zinc-100" : "text-zinc-900"}`}>
            {articulo.categoria?.nombre || "General"}
          </p>
          {articulo.categoria?.descripcion && (
            <p className={`text-xs mt-1 ${darkMode ? "text-zinc-400" : "text-zinc-600"}`}>
              {articulo.categoria.descripcion}
            </p>
          )}
        </div>

        <div
          className={`p-4 rounded-lg border transition-colors ${
            darkMode
              ? "bg-zinc-800/80 border-zinc-700/40"
              : "bg-zinc-50 border-zinc-200"
          }`}
        >
          <p className={`text-xs font-semibold uppercase tracking-wider ${darkMode ? "text-zinc-400" : "text-zinc-500"}`}>
            Proveedor / Marca
          </p>
          <p className={`text-lg font-bold mt-1 ${darkMode ? "text-zinc-100" : "text-zinc-900"}`}>
            {articulo.proveedor?.nombre || "Distribuidor Oficial"}
          </p>
          {articulo.proveedor?.telefono && (
            <p className={`text-xs mt-1 ${darkMode ? "text-zinc-400" : "text-zinc-600"}`}>
              Teléfono: {articulo.proveedor.telefono}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
