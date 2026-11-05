import { useState } from "react"
import { useOutletContext } from "react-router-dom"

export default function ArticuloReviews() {
  const { articulo } = useOutletContext()

  const [reviews, setReviews] = useState([
    { id: 1, usuario: "Prof. Laura", comentario: "Excelente calidad, muy recomendado para los chicos.", rating: 5 },
    { id: 2, usuario: "Martín G.", comentario: "Buen precio y durabilidad. Cumple con lo esperado.", rating: 4 },
  ])

  const [nuevoComentario, setNuevoComentario] = useState("")
  const [nuevoNombre, setNuevoNombre] = useState("")

  const handleAgregar = (e) => {
    e.preventDefault()
    if (!nuevoNombre.trim() || !nuevoComentario.trim()) return

    setReviews([
      ...reviews,
      {
        id: Date.now(),
        usuario: nuevoNombre,
        comentario: nuevoComentario,
        rating: 5,
      },
    ])
    setNuevoNombre("")
    setNuevoComentario("")
  }

  return (
    <div className="bg-zinc-850 p-6 rounded-xl border border-zinc-700/60 mt-4 space-y-6">
      <h3 className="text-xl font-bold text-teal-400">
        Reseñas de la Comunidad ({reviews.length})
      </h3>

      <div className="space-y-3">
        {reviews.map((r) => (
          <div key={r.id} className="bg-zinc-800/80 p-3.5 rounded-lg border border-zinc-700/40">
            <div className="flex justify-between items-center">
              <span className="font-semibold text-zinc-100">{r.usuario}</span>
              <span className="text-yellow-400">{"★".repeat(r.rating)}</span>
            </div>
            <p className="text-sm text-zinc-300 mt-1">{r.comentario}</p>
          </div>
        ))}
      </div>

      <form onSubmit={handleAgregar} className="border-t border-zinc-700/60 pt-4 space-y-3">
        <h4 className="font-semibold text-sm text-zinc-200">Dejar una reseña sobre {articulo.nombre}</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <input
            type="text"
            placeholder="Tu nombre"
            value={nuevoNombre}
            onChange={(e) => setNuevoNombre(e.target.value)}
            className="px-3 py-2 bg-zinc-900 border border-zinc-700 rounded text-sm text-zinc-100 focus:outline-none focus:border-teal-500"
          />
          <input
            type="text"
            placeholder="Tu opinión"
            value={nuevoComentario}
            onChange={(e) => setNuevoComentario(e.target.value)}
            className="px-3 py-2 bg-zinc-900 border border-zinc-700 rounded text-sm text-zinc-100 focus:outline-none focus:border-teal-500"
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-teal-600 hover:bg-teal-500 rounded text-sm font-semibold transition-colors"
        >
          Publicar Reseña
        </button>
      </form>
    </div>
  )
}
