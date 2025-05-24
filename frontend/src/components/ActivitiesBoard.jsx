import { useFetch } from "../hooks/useFetch";
import { ActivityForm } from "./ActivityForm";
import { ActivityCard } from "./ActivityCard";

export function ActivitiesBoard() {
    const { data: items, loading, error, refetch } = useFetch('/actividades');
  
    if (loading) return <div>Cargando actividades…</div>;
    if (error)   return <div>Error: {error.message}</div>;
  
    const statuses = ['PENDIENTE','PROGRESO','COMPLETADO'];
  
    return (
      <div className="space-y-6">
        <ActivityForm onCreate={refetch} />
  
        <div className="grid grid-cols-3 gap-4">
          {statuses.map(status => (
            <div key={status}>
              <h3 className="text-xl mb-2 font-bold text-center">{status}</h3>
              <div className="space-y-2">
                {items
                  .filter(a => a.estado === status)
                  .map(a => (
                    <ActivityCard
                      key={a.id}
                      actividad={a}
                      onUpdate={refetch}
                      onDelete={refetch}
                    />
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
}