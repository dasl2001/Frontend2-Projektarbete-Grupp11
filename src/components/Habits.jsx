import "../css/Habits.css";

const Habit = ({
  index,
  habit,
  updateRepetition,
  resetRepetition,
  deleteHabit,
}) => {
  return (
    <>
      <div className="habit-card" key={index}>
        <p className="habit-card-text">
          Titel: <span>{habit.title}</span>
        </p>
        <p className="habit-card-text">
          Repetition/er: <span>{habit.repetition}</span>
        </p>
        <div className="btn-container">
          <button
            className="change-btn"
            onClick={() => updateRepetition(index, -1)}
          >
            Minus
          </button>
          <button
            className="change-btn"
            onClick={() => updateRepetition(index, 1)}
          >
            Plus
          </button>
          <button className="change-btn" onClick={() => resetRepetition(index)}>
            Nollställ
          </button>
        </div>
        <p className="habit-card-text">
          Prioritet:{" "}
          <span className={`habit-prio habit-prio-${habit.selectedPriority}`}>
            {habit.selectedPriority}
          </span>
        </p>
        <div className="delete-btn-container">
          <button className="delete-btn" onClick={() => deleteHabit(index)}>
            Radera
          </button>
        </div>
      </div>
    </>
  );
};

export default Habit;
