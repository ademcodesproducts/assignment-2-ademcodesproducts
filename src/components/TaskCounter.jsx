function TaskCounter({ total, completed }) {
  return (
    <div className="task-counter" aria-label={`${total} tasks, ${completed} completed`}>
      <span className="counter-check" aria-hidden="true">✓</span>
      <span>{total} / {completed}</span>
    </div>
  )
}

export default TaskCounter
