import React from 'react';
import { Link } from 'react-router-dom';

function Start({ tasks }) {
  const recentIncompleteTasks = tasks
    .filter((task) => !task.completed)
    .slice(-3)
    .reverse();

  return (
    <div>
      <h2>Pågående aktiviteter</h2>
      {recentIncompleteTasks.length === 0 ? (
        <p>Inga pågående aktiviteter finns, bra jobbat!</p>
      ) : (
        <ul>
          {recentIncompleteTasks.map((task) => (
            <li key={task.id}>
              <h3>{task.title}</h3>
              <p>{task.description}</p>
              <p>Deadline: {task.date}</p>
            </li>
          ))}
        </ul>
      )}

      <Link to="/todo">Se alla ärenden</Link>
    </div>
  );
}

export default Start;
