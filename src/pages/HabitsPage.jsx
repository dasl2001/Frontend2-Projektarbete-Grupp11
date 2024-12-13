import { useEffect, useState } from "react";
import "../css/Habits.css";
import PriorityComponent from "../components/PriorityComponent";
import Habit from "../components/Habits";

const HabitsPage = () => {
  const [title, setTitle] = useState("");
  const [repetition, setRepetition] = useState("");
  const [selectedPriority, setSelectedPriority] = useState("");
  const [habits, setHabits] = useState([]);
  const [filteredPriority, setFilteredPriority] = useState("");

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

  const filteredHabits = filteredPriority
    ? habits.filter((habit) => {
        return habit.selectedPriority === filteredPriority;
      })
    : habits;

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
          type="number"
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
      <select
        onChange={(e) => {
          setFilteredPriority(e.target.value);
        }}
      >
        <option value={""}>Select a priority</option>
        <option value={"low"}>Low</option>
        <option value={"mid"}>Mid</option>
        <option value={"high"}>High</option>
      </select>

      <div className="habit-card-container">
        {filteredHabits.map((habit, i) => {
          return (
            <Habit
              index={i}
              habit={habit}
              updateRepetition={updateRepetition}
              resetRepetition={resetRepetition}
              deleteHabit={deleteHabit}
            />
          );
        })}
      </div>
    </>
  );
};

export default HabitsPage;
