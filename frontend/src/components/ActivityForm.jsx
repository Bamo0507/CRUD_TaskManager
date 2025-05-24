import { useState } from 'react';
import api from '@services/api';
import { useFetch } from '@hooks/useFetch';

export function ActivityForm({ onCreate }) {
  const { data: proyectosRaw } = useFetch('/proyectos');
  const { data: prioridadesRaw } = useFetch('/prioridades');
  const { data: etiquetasRaw } = useFetch('/etiquetas');

  const proyectos = proyectosRaw ?? [];
  const prioridades = prioridadesRaw ?? [];
  const etiquetas = etiquetasRaw ?? [];

  const [form, setForm] = useState({
    nombre: '',
    proyectoId: '',
    prioridadId: '',
    estado: 'PENDIENTE',
    dificultad: 1,
    etiquetaIds: []
  });

  const handleChange = ({ target: { name, value } }) =>
    setForm((prev) => ({ ...prev, [name]: value }));

  const toggleTag = (id) =>
    setForm((prev) => ({
      ...prev,
      etiquetaIds: prev.etiquetaIds.includes(id)
        ? prev.etiquetaIds.filter((t) => t !== id)
        : [...prev.etiquetaIds, id]
    }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/actividades', {
        nombre: form.nombre,
        estado: form.estado,
        dificultad: Number(form.dificultad),
        proyecto: { id: Number(form.proyectoId) },
        prioridad: { id: Number(form.prioridadId) },
        etiquetas: form.etiquetaIds.map((id) => ({ id }))
      });
      onCreate?.(); // refresca el board
      setForm({
        nombre: '',
        proyectoId: '',
        prioridadId: '',
        estado: 'PENDIENTE',
        dificultad: 1,
        etiquetaIds: []
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section>
      <h2 className="text-2xl font-extrabold mb-4">Agregar Actividad</h2>

      <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Nombre</label>
          <input
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
            placeholder="Nombre de la tarea"
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div className="flex flex-wrap gap-3">
          <div className="flex-1 min-w-[140px]">
            <label className="block text-sm font-medium mb-1">Proyecto</label>
            <select
              name="proyectoId"
              value={form.proyectoId}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            >
              <option value="">Selecciona…</option>
              {proyectos.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.nombre}
                </option>
              ))}
            </select>
          </div>

          <div className="flex-1 min-w-[140px]">
            <label className="block text-sm font-medium mb-1">Prioridad</label>
            <select
              name="prioridadId"
              value={form.prioridadId}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            >
              <option value="">Selecciona…</option>
              {prioridades.map((pr) => (
                <option key={pr.id} value={pr.id}>
                  {pr.nivel}
                </option>
              ))}
            </select>
          </div>

          <div className="w-32">
            <label className="block text-sm font-medium mb-1">
              Dificultad (1-100)
            </label>
            <input
              type="number"
              name="dificultad"
              min={1}
              max={100}
              value={form.dificultad}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Etiquetas</label>
          <div className="flex flex-wrap gap-2">
            {etiquetas.map((et) => {
              const selected = form.etiquetaIds.includes(et.id);
              return (
                <button
                  type="button"
                  key={et.id}
                  onClick={() => toggleTag(et.id)}
                  className={`px-2 py-1 rounded text-sm transition
                    ${selected ? 'bg-blue-600 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
                >
                  {et.nombre}
                </button>
              );
            })}
          </div>
        </div>

        <button
          type="submit"
          className="px-10 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded self-end"
        >
          Crear
        </button>
      </form>
    </section>
  );
}
