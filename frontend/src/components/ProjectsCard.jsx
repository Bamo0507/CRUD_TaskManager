import { useState } from "react";
import { useFetch } from "@hooks/useFetch";
import api from "@services/api";
import { Trash2 } from "lucide-react";

export function ProjectsCard() {
    const { data: proyectos, loading, error, refetch } = useFetch("/proyectos");
    const [newName, setNewName] = useState("");
    const [deleteError, setDeleteError] = useState("");

    const handleCreate = async () => {
        try {
            await api.post("/proyectos", {
                nombre: newName,
            });
            refetch();
            setNewName("");
        } catch (err) {
            console.error(err);
        }
    };

    const handleDelete = async (id) => {
        setDeleteError("");
        try {
            await api.delete(`/proyectos/${id}`);
            refetch();
        } catch (err) {
            console.error(err);
            const msg =
              err.response?.status === 409
                ? "No se puede eliminar este proyecto: tiene actividades asociadas."
                : "No se puede eliminar este proyecto: tiene actividades asociadas.";
            setDeleteError(msg);
        }
    };

    if (loading) return <div>Cargando...</div>;
    if (error) return <div>Error cargando: {error.message}</div>;

    return (
      <div>
        <h2 className="text-2xl font-extrabold mb-4">Proyectos</h2>
    
        <div className="bg-white rounded-lg shadow p-6">
          <form onSubmit={handleCreate} className="flex flex-col space-y-2 mb-6">
            <input 
              value={newName}
              onChange={e => setNewName(e.target.value)}
              placeholder="Nombre" required
              className="border p-2 rounded"
            />
            <button type="submit" className="my-2 px-10 self-start bg-blue-500 hover:bg-blue-600 text-white py-2 rounded transition-all ease-in duration-100">
              Crear
            </button>
          </form>
    
          <h3 className="text-lg font-extrabold mb-2">Lista de Proyectos</h3>
          {deleteError && (
            <div className="bg-red-100 text-red-800 p-2 rounded mb-4">
              {deleteError}
            </div>
          )}
          <ul className="space-y-2">
            {proyectos.map(p => (
              <li key={p.id} className="flex justify-between items-center">
                <span>{p.nombre}</span>
                <button onClick={() => handleDelete(p.id)}>
                  <Trash2 size={18} className="text-red-500" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
}