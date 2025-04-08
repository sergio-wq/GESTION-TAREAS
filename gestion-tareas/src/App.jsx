import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import TaskForm from './components/TaskForm/TaskForm';
import TaskList from './components/TaskList/TaskList';
import TaskFilter from './components/TaskFilter/TaskFilter';
import TaskStats from './components/TaskStats/TaskStats';

function App() {
  // Modelo de datos para cada tarea
  const initialTasks = [
    {
      id: uuidv4(),
      title: "Aprender React",
      description: "Estudiar los fundamentos de React",
      completed: false,
      createdAt: new Date()
    }
  ];

  // Estados principales
  const [tasks, setTasks] = useState(() => {
    // Intenta cargar tareas desde localStorage
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : initialTasks;
  });
  const [filter, setFilter] = useState('all'); // 'all', 'active', 'completed'
  const [editingTask, setEditingTask] = useState(null);

  // Guardar tareas en localStorage cuando cambien
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Funciones para manipular tareas
  const addTask = (title, description) => {
    const newTask = {
      id: uuidv4(),
      title,
      description,
      completed: false,
      createdAt: new Date()
    };
    setTasks([...tasks, newTask]);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
    if (editingTask && editingTask.id === id) {
      setEditingTask(null);
    }
  };

  const toggleTaskCompletion = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const startEditingTask = (task) => {
    setEditingTask(task);
  };

  const updateTask = (id, title, description) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, title, description } : task
    ));
    setEditingTask(null);
  };

  const cancelEditing = () => {
    setEditingTask(null);
  };

  // Filtrar tareas según el estado seleccionado
  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  // Contar tareas pendientes
  const pendingTasksCount = tasks.filter(task => !task.completed).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-blue-700 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-white mb-8 drop-shadow-lg">
          Gestión de Tareas
        </h1>
        
        <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl shadow-xl p-6 mb-6 border border-white border-opacity-20">
          <TaskForm 
            addTask={addTask} 
            editingTask={editingTask}
            updateTask={updateTask}
            cancelEditing={cancelEditing}
          />
        </div>
        
        <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl shadow-xl p-6 border border-white border-opacity-20">
          <TaskStats tasksCount={tasks.length} pendingTasksCount={pendingTasksCount} />
          <TaskFilter filter={filter} setFilter={setFilter} />
          <TaskList 
            tasks={filteredTasks} 
            onDelete={deleteTask} 
            onToggle={toggleTaskCompletion} 
            onEdit={startEditingTask}
          />
        </div>
      </div>
       <footer className="mt-8 text-center text-sm text-white">&copy;{new Date().getFullYear()} Gestion de Tareas. Todos los derechos reservados a Sergio Ruiz.
    </footer>
    </div>
  );
}

export default App;