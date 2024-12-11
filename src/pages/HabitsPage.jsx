import { useState } from "react";
import "../css/Habits.css";
import PriorityComponent from "../components/PriorityComponent";

const HabitsPage = () => {
  const [title, setTitle] = useState("");
  const [repetition, setRepetition] = useState("");
  const [selectedPriority, setSelectedPriority] = useState("");
  const [habits, setHabits] = useState([]);

  const prioChange = (prio) => {
    setSelectedPriority(prio);
  };

  const addHabit = () => {
    if (title && repetition && selectedPriority) {
      const newHabit = {
        title,
        repetition,
        selectedPriority,
      };

      setHabits([...habits, newHabit]);

      setTitle("");
      setRepetition("");
      setSelectedPriority("");
    } else {
      alert("Please fill everything :)");
    }
  };

  const updateRepetition = (index, update) => {
    setHabits((habits) => {
      return habits.map((habit, i) => {
        return i === index
          ? {
              ...habit,
              repetition: Math.max(0, parseInt(habit.repetition) + update),
            }
          : habit;
      });
    });
  };

  const resetRepetition = (index) => {
    setHabits((habits) =>
      habits.map((habit, i) =>
        i === index ? { ...habit, repetition: 0 } : habit
      )
    );
  };

  const deleteHabit = (index) => {
    setHabits((habits) => habits.filter((_, i) => i !== index));
  };

  return (
    <>
      <h2 className="header">Add a new habit</h2>
      <div className="add-habit-container">
        <input
          className="input-title"
          type="text"
          placeholder="Enter title"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        ></input>
        <input
          className="input-repetition"
          type="text"
          placeholder="Amount of repetitions"
          onChange={(e) => setRepetition(e.target.value)}
          value={repetition}
        ></input>
        <div>
          <PriorityComponent
            selectedPriority={selectedPriority}
            changedPrio={prioChange}
          />
        </div>

        <button className="add-habit-btn" onClick={addHabit}>
          Add
        </button>
      </div>

      <h2 className="header">Your Habits</h2>
      <div className="habit-card-container">
        {habits.map((habit, i) => {
          return (
            <div className="habit-card" key={i}>
              <p className="habit-card-text">
                Title: <span>{habit.title}</span>
              </p>
              <p className="habit-card-text">
                Repetition/s: <span>{habit.repetition}</span>
              </p>
              <div className="btn-container">
                <button
                  className="change-btn"
                  onClick={() => updateRepetition(i, -1)}
                >
                  Minus
                </button>
                <button
                  className="change-btn"
                  onClick={() => updateRepetition(i, 1)}
                >
                  Plus
                </button>
                <button
                  className="change-btn"
                  onClick={() => resetRepetition(i)}
                >
                  Reset
                </button>
              </div>
              <p className="habit-card-text">
                Priority:{" "}
                <span
                  className={`habit-prio habit-prio-${habit.selectedPriority}`}
                >
                  {habit.selectedPriority}
                </span>
              </p>
              <div className="delete-btn-container">
                <button className="delete-btn" onClick={() => deleteHabit(i)}>
                  Delete Habit
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default HabitsPage;
