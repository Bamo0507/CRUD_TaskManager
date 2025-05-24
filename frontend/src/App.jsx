import { useState } from 'react'
import { ProjectsCard }    from '@components/ProjectsCard';
import { ActivitiesBoard } from '@components/ActivitiesBoard';

import '@styles/global.css'

function App() {
    return (
    <>
      <div className="min-h-screen bg-gray-50">
        <header className="bg-blue-400 shadow p-4">
          <h1 className="text-center text-3xl font-extrabold">Task Manager</h1>
        </header>

        <main className="p-4 space-y-8">
          <ProjectsCard />
          <ActivitiesBoard />
        </main>
      </div>
    </>
  )
}

export default App
