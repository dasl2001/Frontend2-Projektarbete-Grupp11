import { useEffect, useState } from "react";
import "../css/Habits.css";
import PriorityComponent from "../components/PriorityComponent";
import Habit from "../components/Habits";

const HabitsPage = ({ loggedInUser, setLoggedInUser, setUserList }) => {
  const [title, setTitle] = useState("");
  const [repetition, setRepetition] = useState("");
  const [selectedPriority, setSelectedPriority] = useState("");
  const [habits, setHabits] = useState(loggedInUser?.habits || []);
  const [filteredPriority, setFilteredPriority] = useState("");

  useEffect(() => {
    if (loggedInUser) {
      const updatedUser = {
        ...loggedInUser,
        habits,
      };
      setLoggedInUser(updatedUser);
      setUserList((prevList) =>
        prevList.map((user) =>
          user.username === updatedUser.username ? updatedUser : user
        )
      );
    }
  }, [habits, loggedInUser, setLoggedInUser, setUserList]);

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
      return sort === "asc"
        ? a.repetition - b.repetition
        : b.repetition - a.repetition;
    });
    setHabits(sorted);
  };

  return (
    <>
      <h2 className="header">Lägg till en vana</h2>
      <div className="add-habit-container">
        <input
          className="input-title"
          type="text"
          placeholder="Ange titel"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        ></input>
        <input
          className="input-repetition"
          type="number"
          placeholder="Ange repetition/er"
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
          Lägg till
        </button>
      </div>

      <h2 className="header">Dina Vanor</h2>
      <div className="filter-drop-container">
        <h3>Filtrera prioritet</h3>
        <select
          className="filter-drop  "
          onChange={(e) => {
            setFilteredPriority(e.target.value);
          }}
        >
          <option value={""}>Alla</option>
          <option value={"low"}>Låg</option>
          <option value={"mid"}>Medel</option>
          <option value={"high"}>Hög</option>
        </select>
      </div>

      <div className="sort-container">
        <h3>Sortera repetitioner</h3>
        <button className="sort-btn" onClick={() => sortHabits("asc")}>
          Låg till Hög
        </button>
        <button className="sort-btn" onClick={() => sortHabits("desc")}>
          Hög till Låg
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
