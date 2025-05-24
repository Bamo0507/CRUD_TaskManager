import { Edit2, ArrowRight, Trash2 } from 'lucide-react';
import api from '@services/api';
import { useState } from 'react';

export function ActivityCard({ actividad, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(actividad.nombre_actividad);

  const handleDelete = async () => {
    await api.delete(`/actividades/${actividad.id}`);
    onDelete();
  };

  const moveNext = async () => {
    const nextEstado =
      actividad.estado === 'PENDIENTE' ? 'PROGRESO' :
      actividad.estado === 'PROGRESO'  ? 'COMPLETADO' :
      null;
    if (!nextEstado) return;
    const body = { estado: nextEstado };
    if (nextEstado === 'PROGRESO') {
      body.tiemposInprogressat = new Date().toISOString();
    } else if (nextEstado === 'COMPLETADO') {
      body.tiemposCompletedat = new Date().toISOString();
    }
    await api.put(`/actividades/${actividad.id}`, body);
    onUpdate();
  };

  const saveEdit = async () => {
    try {
      await api.put(`/actividades/${actividad.id}`, {
        nombre: editName.trim()
      });
      setIsEditing(false);
      onUpdate();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow flex flex-col space-y-2">
      <div className="flex justify-between items-start">
        {isEditing
          ? (
            <input
              className="border p-1 rounded"
              value={editName}
              onChange={e => setEditName(e.target.value)}
            />
          )
          : <h4 className="font-semibold">{actividad.nombre_actividad}</h4>
        }
        <div className="flex space-x-2">
          {isEditing
            ? (
              <>
                <button onClick={saveEdit} className="text-blue-500 mx-2">Guardar</button>
              </>
            )
            : <Edit2 size={16} className="text-blue-500" onClick={() => setIsEditing(true)} />
          }
          <Trash2 size={16} className="text-red-500" onClick={handleDelete} />
        </div>
      </div>

      <div className="flex flex-wrap gap-1 my-2">
        {actividad.etiquetas.map(tag => (
          <span key={tag} className="bg-gray-200 px-2 py-1 rounded flex items-center">
            {tag}
          </span>
        ))}
      </div>

      <div className="text-base">
        Proyecto: <strong>{actividad.proyecto}</strong>
      </div>
      <div className="text-base">
        Prioridad: <strong>{actividad.prioridad}</strong>
      </div>

      <div className="text-xs text-gray-500 space-y-1">
        <div>Creado en: { actividad.tiemposCreatedat ? new Date(actividad.tiemposCreatedat).toLocaleString() : '—' }</div>
        {['PROGRESO', 'COMPLETADO'].includes(actividad.estado) && actividad.tiemposInprogressat && (
          <div>En progreso en: { new Date(actividad.tiemposInprogressat).toLocaleString() }</div>
        )}
        {actividad.estado === 'COMPLETADO' && actividad.tiemposCompletedat && (
          <div>Completado en: { new Date(actividad.tiemposCompletedat).toLocaleString() }</div>
        )}
      </div>

      <div className="flex justify-between items-center my-2">
        {actividad.estado !== 'COMPLETADO' && (
          <button onClick={moveNext}>
            <ArrowRight size={22} className="text-green-500"/>
          </button>
        )}
        <span className="text-sm text-black font-semibold">Dificultad: {actividad.dificultad ?? '—'}</span>
      </div>
    </div>
  );
}