import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../css/todo.css';

function TodoDetails ({ tasks, setTasks }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const task = tasks.find((task) => task.id === parseInt(id));

  if (!task) {
    return <p>Aktiviteten hittades inte</p>;
  }

  function toggleCompleted() {
    const updatedTask = { ...task, completed: !task.completed };
    setTasks(tasks.map((t) => (t.id === task.id ? updatedTask : t)));
  }

  function deleteTask() {
    setTasks(tasks.filter((t) => t.id !== task.id));
    navigate('/todo');
  }

  return (
    <div className="todo-details">
      <h2>Detaljer om aktiviteten</h2>
      <p><strong>Titel:</strong> {task.title}</p>
      <p><strong>Beskrivning:</strong> {task.description}</p>
      <p><strong>Datum:</strong> {task.date}</p>
      <p><strong>Kategori:</strong> {task.category}</p>
      <p><strong>Tidsuppskattning:</strong> {task.minutes} minuter</p>
      <p><strong>Status:</strong> {task.completed ? 'Klar' : 'Inte klar'}</p>
      <button onClick={toggleCompleted}>
        Markera som {task.completed ? 'Inte klar' : 'Klar'}
      </button>
      <button onClick={deleteTask}>Ta bort aktiviteten</button>
    </div>
  );
}

export default TodoDetails;






