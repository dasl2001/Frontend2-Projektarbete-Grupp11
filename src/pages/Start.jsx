import React from 'react';
import { Link } from 'react-router-dom';
import '../css/start.css';

function Start({ tasks }) {
  const recentIncompleteTasks = (tasks || [])
    .filter((task) => !task.completed)
    .slice(-3)
    .reverse();

  return (
    <div className="start-container">
      <h2 className="start-title">Pågående aktiviteter</h2>
      {recentIncompleteTasks.length === 0 ? (
        <p className="start-no-tasks">Inga pågående aktiviteter finns, bra jobbat!</p>
      ) : (
        <ul className="start-task-list">
          {recentIncompleteTasks.map((task) => (
            <li className="start-task-item" key={task.id}>
              <h3>{task.title}</h3>
              <p>{task.description}</p>
              <p>Deadline: {task.date}</p>
            </li>
          ))}
        </ul>
      )}
      <Link to="/todo" className="start-link">Se alla aktiviteter</Link>
    </div>
  );
}

export default Start;

