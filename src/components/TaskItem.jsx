function TaskItem({ task, onToggleTask, onDeleteTask }) {
  return (
    <li className={task.completed ? 'task-item completed' : 'task-item'}>
      <label className="task-label">
        <input type="checkbox" checked={task.completed} onChange={() => onToggleTask(task.id)} />
        <span>{task.text}</span>
      </label>
      <button className="delete-button" type="button" aria-label={`Delete ${task.text}`} onClick={() => onDeleteTask(task.id)}>×</button>
    </li>
  )
}

export default TaskItem
