/*
Moduler och komponenter importeras
*/
import React from "react";
import { Link } from "react-router-dom";
import "../css/Habits.css";
import "../css/start.css";

function Start({ tasks, habits }) {
  const recentIncompleteTasks = (tasks || [])
    .filter((task) => !task.completed)
    .slice(-3)
    .reverse();

  const startHabits = [...habits]
    .sort((a, b) => b.repetition - a.repetition)
    .slice(0, 3);

  return (
    <div className="start-container">
      <h2 className="start-title">Pågående aktiviteter</h2>
      {recentIncompleteTasks.length === 0 ? (
        <p className="start-no-tasks">
          Inga pågående aktiviteter finns, bra jobbat!
        </p>
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

      <Link to="/todo" className="start-link">
        Se alla aktiviteter
      </Link>

      <h2>Topp 3 vanor</h2>
      {startHabits.length === 0 ? (
        <p>Inga vanor</p>
      ) : (
        <div className="habit-card-container">
          {startHabits.map((habit, i) => {
            return (
              <div className="habit-card" key={i}>
                <p className="habit-card-text">
                  Titel: <span>{habit.title}</span>
                </p>
                <p className="habit-card-text">
                  Repetition/er: <span>{habit.repetition}</span>
                </p>
                <p className="habit-card-text">
                  Prioritet:{""}
                  <span
                    className={`habit-prio habit-prio-${habit.selectedPriority}`}
                  >
                    {habit.selectedPriority}
                  </span>
                </p>
              </div>
            );
          })}
        </div>
      )}

      <Link to="/Habits">Se alla vanor</Link>
    </div>
  );
}

export default Start;
