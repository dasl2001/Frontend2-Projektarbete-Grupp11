import { useEffect, useState } from "react";
import "../css/Habits.css";
import PriorityComponent from "../components/PriorityComponent";
import Habit from "../components/Habits";

const HabitsPage = () => {
  const [title, setTitle] = useState("");
  const [repetition, setRepetition] = useState("");
  const [selectedPriority, setSelectedPriority] = useState("");
  const [habits, setHabits] = useState(
    JSON.parse(localStorage.getItem("Habits")) || []
  );
  const [filteredPriority, setFilteredPriority] = useState("");

  useEffect(() => {
    localStorage.setItem("Habits", JSON.stringify(habits));
  }, [habits]);

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

  const sortHabits = (sort) => {
    const sorted = [...filteredHabits].sort((a, b) => {
      return sort === "someBs"
        ? a.repetition - b.repetition
        : b.repetition - a.repetition;
    });
    setHabits(sorted);
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
      <div className="filter-drop-container">
        <h3>Filter by priority</h3>
        <select
          className="filter-drop  "
          onChange={(e) => {
            setFilteredPriority(e.target.value);
          }}
        >
          <option value={""}>All</option>
          <option value={"low"}>Low</option>
          <option value={"mid"}>Mid</option>
          <option value={"high"}>High</option>
        </select>
      </div>

      <div className="sort-container">
        <h3>Sort by repetitions</h3>
        <button className="sort-btn" onClick={() => sortHabits("someBs")}>
          Low to High
        </button>
        <button className="sort-btn" onClick={() => sortHabits("otherBs")}>
          High to low
        </button>
      </div>
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
