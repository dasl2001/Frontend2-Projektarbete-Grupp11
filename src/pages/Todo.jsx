import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/todo.css';

function Todo({ tasks, setTasks }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [category, setCategory] = useState('');
  const [minutes, setMinutes] = useState('');

  const [showCompleted, setShowCompleted] = useState(true);
  const [filterCategories, setFilterCategories] = useState([]);
  const [sortBy, setSortBy] = useState('');

  function addTask() {
    if (title && description && date && category && minutes) {
      const newTask = {
        id: Date.now(),
        title,
        description,
        date,
        category,
        minutes,
        completed: false,
      };

      setTasks([...tasks, newTask]);
      setTitle('');
      setDescription('');
      setDate('');
      setCategory('');
      setMinutes('');
    }
  }

  function toggleCategoryFilter(selectedCategory) {
    if (filterCategories.includes(selectedCategory)) {
      setFilterCategories(filterCategories.filter((cat) => cat !== selectedCategory));
    } else {
      setFilterCategories([...filterCategories, selectedCategory]);
    }
  }

  const filteredTasks = tasks
    .filter((task) => (showCompleted ? true : !task.completed))
    .filter((task) =>
      filterCategories.length === 0 ? true : filterCategories.includes(task.category)
    );

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sortBy === 'date') {
      return new Date(a.date) - new Date(b.date);
    } else if (sortBy === 'minutes') {
      return a.minutes - b.minutes;
    } else if (sortBy === 'status') {
      return a.completed === b.completed ? 0 : a.completed ? 1 : -1;
    } else {
      return 0;
    }
  });

  return (
    <div className="todo-container">
      <h2>Lägg till aktivitet</h2>
      <div className="task-form">
        <input
          type="text"
          placeholder="Titel"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Beskrivning"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">Välj kategori</option>
          <option value="Hälsa">Hälsa</option>
          <option value="Arbete">Arbete</option>
          <option value="Hushåll">Hushåll</option>
          <option value="Övrigt">Övrigt</option>
        </select>
        <input
          type="number"
          placeholder="Tidsuppskattning (minuter)"
          value={minutes}
          onChange={(e) => setMinutes(e.target.value)}
        />
        <button onClick={addTask}>Lägg till</button>
      </div>

      

      <h2>Filtrera och sortera</h2>
      <div>
        <label>
          <input
            type="checkbox"
            checked={showCompleted}
            onChange={(e) => setShowCompleted(e.target.checked)}
          />
          Visa slutförda aktiviteter
        </label>
        <div>
          <h4>Kategorier</h4>
          {['Hälsa', 'Arbete', 'Hushåll', 'Övrigt'].map((cat) => (
            <label key={cat}>
              <input
                type="checkbox"
                checked={filterCategories.includes(cat)}
                onChange={() => toggleCategoryFilter(cat)}
              />
              {cat}
            </label>
          ))}
        </div>
        <div>
          <h4>Sortera efter</h4>
          <select onChange={(e) => setSortBy(e.target.value)}>
            <option value="">Ingen sortering</option>
            <option value="date">Deadline</option>
            <option value="minutes">Tidsuppskattning</option>
            <option value="status">Status</option>
          </select>
        </div>
      </div>

      <h2>Dina aktiviteter</h2>
      <div className="task-list">
        {sortedTasks.length === 0 ? (
          <p>Inga aktiviteter  matchar  valda filter.</p>
        ) : (
          sortedTasks.map((task) => (
            <div key={task.id} className="task-item">
              <h3>
                <Link to={`/todo/${task.id}`}>{task.title}</Link>
              </h3>
              <p>{task.description}</p>
              <p>Datum: {task.date}</p>
              <p>Kategori: {task.category}</p>
              <p>Tidsuppskattning: {task.minutes} minuter</p>
              <p>Status: {task.completed ? 'Klar' : 'Inte klar'}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Todo;








