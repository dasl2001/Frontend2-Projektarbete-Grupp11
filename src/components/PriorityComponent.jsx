import "../css/Habits.css";

const PriorityComponent = ({ changedPrio, selectedPriority }) => {
  return (
    <>
      <label htmlFor="prioLow" className="priority-box-low">
        <input
          type="radio"
          id="prioLow"
          name="prio"
          className="hide-prio"
          value="low"
          checked={selectedPriority === "low"}
          onChange={() => changedPrio("low")}
        ></input>
        Låg
      </label>
      <label htmlFor="prioMid" className="priority-box-mid">
        <input
          type="radio"
          id="prioMid"
          name="prio"
          className="hide-prio"
          value="mid"
          checked={selectedPriority === "mid"}
          onChange={() => changedPrio("mid")}
        ></input>
        Mellan
      </label>
      <label htmlFor="prioHigh" className="priority-box-high">
        <input
          type="radio"
          id="prioHigh"
          name="prio"
          className="hide-prio"
          value="high"
          checked={selectedPriority === "high"}
          onChange={() => changedPrio("high")}
        ></input>
        Hög
      </label>
    </>
  );
};

export default PriorityComponent;
