import TaskItem from '../TaskItem/TaskItem';

function TaskList({ tasks, onDelete, onToggle, onEdit }) {
  if (tasks.length === 0) {
    return (
      <div className="py-8 text-center text-blue-200">
        No hay tareas que mostrar en este momento.
      </div>
    );
  }

  return (
    <div className="mt-4">
      <ul className="space-y-3">
        {tasks.map(task => (
          <TaskItem
            key={task.id}
            task={task}
            onDelete={onDelete}
            onToggle={onToggle}
            onEdit={onEdit}
          />
        ))}
      </ul>
    </div>
  );
}

export default TaskList;