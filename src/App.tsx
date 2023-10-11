import React, { FormEvent, useState, useEffect } from 'react';

interface myTask {
  name: string;
  done: boolean;
}

function App(): JSX.Element {
  const [newState, setNewState] = useState<string>('');
  const [newTask, setNewTask] = useState<myTask[]>([]);

  // Cargar las tareas desde el localStorage al cargar la página
  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      setNewTask(JSON.parse(savedTasks));
    }
  }, []);

  // Función para guardar las tareas en el localStorage
  const saveTasksToLocalStorage = (tasks: myTask[]) => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    addTask(newState, false);
    console.log(newTask);
  }

  const addTask = (name: string, done: boolean) => {
    const updatedTask: myTask[] = [...newTask, { name, done: false }]
    setNewTask(updatedTask);
    setNewState('');

    // Guardar las tareas en el localStorage
    saveTasksToLocalStorage(updatedTask);
  }

  const deleteTask = (index: number) => {
    const updatedTask: myTask[] = [...newTask];
    updatedTask.splice(index, 1);
    setNewTask(updatedTask);

    // Guardar las tareas actualizadas en el localStorage
    saveTasksToLocalStorage(updatedTask);
  }

  const done = (index: number) => {
    const updatedTask: myTask[] = [...newTask];
    updatedTask[index].done = !updatedTask[index].done;
    setNewTask(updatedTask);

    // Guardar las tareas actualizadas en el localStorage
    saveTasksToLocalStorage(updatedTask);
  }

  return (
    <div className='container p-4 text-center'>
      <h1>Task Manager</h1>
      <div className='row'>
        <div className='col-md-6 offset-md-3'>
          <div className='card'>
            <div className='card-body'>
              <form onSubmit={handleSubmit}>
                <input type='text' onChange={e => setNewState(e.target.value)} value={newState} className='form-control' autoFocus />
                <button className='btn btn-success btn-block mt-2'>Save</button>
              </form>
            </div>
          </div>
          {
            newTask.map((item: myTask, index: number) => (
              <div className='card card-body mt-2' key={index}>
                <h2 style={{ textDecoration: item.done ? 'line-through' : '' }}>{item.name}</h2>
                <div>
                  <button className='btn btn-secondary' onClick={() => done(index)}>Done</button>
                  <button className='btn btn-danger ml-2' onClick={() => deleteTask(index)}>Delete</button>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
}

export default App;
