function TaskFilter({ filter, setFilter }) {
  const filters = [
    { value: 'all', label: 'Todas' },
    { value: 'active', label: 'Activas' },
    { value: 'completed', label: 'Completadas' }
  ];
  
  return (
    <div className="flex justify-center mb-6">
      <div className="inline-flex rounded-lg shadow-sm overflow-hidden" role="group">
        {filters.map(({ value, label }) => (
          <button
            key={value}
            type="button"
            onClick={() => setFilter(value)}
            className={`
              px-4 py-2 text-sm font-medium transition-colors
              ${filter === value 
                ? 'bg-blue-600 text-white' 
                : 'bg-white bg-opacity-10 text-white hover:bg-opacity-20'
              }
              ${value === 'all' ? 'rounded-l-lg' : ''}
              ${value === 'completed' ? 'rounded-r-lg' : ''}
              border border-white border-opacity-30
            `}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default TaskFilter;