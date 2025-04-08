function TaskItem({ task, onDelete, onToggle, onEdit }) {
  const formattedDate = new Date(task.createdAt).toLocaleDateString();
  
  return (
    <li className={`p-4 rounded-lg transition-all ${
      task.completed 
        ? 'bg-green-500 bg-opacity-10 border border-green-300 border-opacity-30' 
        : 'bg-white bg-opacity-10 border border-white border-opacity-30'
    }`}>
      <div className="flex items-start">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
          className="mt-1 h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
        />
        
        <div className="ml-3 flex-1">
          <div className="flex justify-between">
            <h3 className={`text-lg font-medium ${task.completed ? 'line-through text-gray-300' : 'text-white'}`}>
              {task.title}
            </h3>
            <span className="text-sm text-gray-300">{formattedDate}</span>
          </div>
          
          {task.description && (
            <p className={`mt-1 text-sm ${task.completed ? 'text-gray-400' : 'text-gray-200'}`}>
              {task.description}
            </p>
          )}
          
          <div className="mt-3 flex space-x-2">
            <button
              onClick={() => onEdit(task)}
              className={`px-3 py-1 text-xs rounded-full transition-colors ${
                task.completed 
                  ? 'bg-gray-500 bg-opacity-30 text-gray-300 cursor-not-allowed' 
                  : 'bg-blue-600 bg-opacity-70 text-white hover:bg-opacity-100'
              }`}
              disabled={task.completed}
            >
              Editar
            </button>
            <button
              onClick={() => onDelete(task.id)}
              className="px-3 py-1 text-xs bg-red-600 bg-opacity-70 text-white rounded-full hover:bg-opacity-100 transition-colors"
            >
              Eliminar
            </button>
          </div>
        </div>
      </div>
    </li>
  );
}

export default TaskItem;