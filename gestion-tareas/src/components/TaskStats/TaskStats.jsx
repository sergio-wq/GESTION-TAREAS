function TaskStats({ tasksCount, pendingTasksCount }) {
    return (
      <div className="flex justify-between items-center mb-6 pb-4 border-b border-white border-opacity-20">
        <div>
          <p className="text-sm text-gray-200">
            <span className="font-medium text-white">{pendingTasksCount}</span> tareas pendientes
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-200">
            Total: <span className="font-medium text-white">{tasksCount}</span> tareas
          </p>
        </div>
      </div>
    );
  }
  
  export default TaskStats;