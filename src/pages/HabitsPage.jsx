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

  return (
    <>
      <h2>Add a new habit</h2>
      <div className="add-habit-container">
        <input
          type="text"
          placeholder="Enter title"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        ></input>
        <input
          type="text"
          placeholder="Amount of repetitions"
          onChange={(e) => setRepetition(e.target.value)}
          value={repetition}
        ></input>
      </div>
      <PriorityComponent
        selectedPriority={selectedPriority}
        changedPrio={prioChange}
      />

      <button onClick={addHabit}>Add new habit</button>

      <div>
        <h2>Your Habits</h2>

        {habits.map((habit, i) => {
          return (
            <div key={i}>
              <p>Title: {habit.title}</p>
              <p>Repetition/s: {habit.repetition}</p>
              priority: {habit.selectedPriority}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default HabitsPage;
