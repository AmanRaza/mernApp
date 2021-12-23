import React from 'react';

const TaskList = ({ tasks, updateTasks }) => {
  const clickDeleteTask = (event, task) => {
    event.preventDefault();

    fetch(`/api/tasks/delete/${task._id}`, {
      method: 'delete',
    })
      .then(res => res.json())
      .then(() => updateTasks());
  };

  const toggleDone = task => {
    fetch(`/api/tasks/update/${task._id}`, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ done: !task.done }),
    }).then(() => updateTasks());
  };

  return (
    <ul className="tasks">
      {tasks.map(task => (
        <li key={task._id}>
          <label className={task.done ? 'done' : ''}>
            <input
              type="checkbox"
              checked={task.done}
              onChange={() => toggleDone(task)}
            />{' '}
            {task.title}
          </label>
          <button className='delete-button' onClick={event => clickDeleteTask(event, task)}>x</button>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
