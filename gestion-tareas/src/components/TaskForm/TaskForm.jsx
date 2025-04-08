import { useState, useEffect } from 'react';

function TaskForm({ addTask, editingTask, updateTask, cancelEditing }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  // Cuando editingTask cambia, actualiza los campos del formulario
  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDescription(editingTask.description);
    } else {
      setTitle('');
      setDescription('');
    }
  }, [editingTask]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validación
    if (!title.trim()) {
      setError('El título es obligatorio');
      return;
    }
    
    // Limpiar error si pasa la validación
    setError('');
    
    if (editingTask) {
      updateTask(editingTask.id, title, description);
    } else {
      addTask(title, description);
    }
    
    // Limpiar el formulario
    setTitle('');
    setDescription('');
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-white">
        {editingTask ? 'Editar Tarea' : 'Añadir Nueva Tarea'}
      </h2>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-white mb-1">
            Título
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 bg-white bg-opacity-20 text-white placeholder-gray-300 border border-white border-opacity-30 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
            placeholder="Ingresa el título de la tarea"
          />
          {error && <p className="text-red-300 text-sm mt-1">{error}</p>}
        </div>
        
        <div className="mb-6">
          <label htmlFor="description" className="block text-sm font-medium text-white mb-1">
            Descripción
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 bg-white bg-opacity-20 text-white placeholder-gray-300 border border-white border-opacity-30 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
            rows="3"
            placeholder="Ingresa la descripción (opcional)"
          ></textarea>
        </div>
        
        <div className="flex justify-end">
          {editingTask && (
            <button
              type="button"
              onClick={cancelEditing}
              className="mr-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Cancelar
            </button>
          )}
          <button
            type="submit"
            className="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {editingTask ? 'Actualizar' : 'Añadir'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default TaskForm;