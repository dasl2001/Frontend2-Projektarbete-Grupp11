/*
Moduler och komponenter importeras.
*/
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import TodoDetails from '../components/TodoDetails'
import '../css/todo.css';

/*
Todo komponenten tar 2 parametrar som skickas in av en föräldrakomponent:
1. En array med befintliga aktiviteter (task).
2. En funktion för att uppdatera listan över aktiviteter (setTasks).
Dessa gör att Todo kan interagera med den delade datan i applikationen.
*/
function Todo({ tasks, setTasks }) {

/*
Använder flera useState-hooks för att hantera dess interna tillstånd. 
title, description, date, category, minutes håller data för att skapa en ny aktivitet (inmatningsfält).
showCompleted är en boolean som styr om slutförda aktiviteter ska visas.
filterCategories är en array som innehåller kategorier valda för filtrering.
sortBy är en sträng som anger vilket sorteringskriterium som ska användas.
*/
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [category, setCategory] = useState('');
  const [minutes, setMinutes] = useState('');
  const [showCompleted, setShowCompleted] = useState(true);
  const [filterCategories, setFilterCategories] = useState([]);
  const [sortBy, setSortBy] = useState('');

/*
Kontrollerar att alla fält är ifyllda.
Om alla fält är ifyllda skapas ett nytt objekt newTask med:
Ett unikt ID baserat på tidsstämpel (Date.now()).
title, description, date, category, minutes är inmatning.
completed sätts till false eftersom ativiteten är ännu inte slutförd.
Lägger till aktiviteten i listan och uppdaterar tasks genom att kopiera befintliga aktiviteter och lägger till nya aktiviteten.
Återställer formuläret, rensar alla fält efter att aktiviten har lagts till.
*/
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

/*
Hanterar filtrering efter kategori.
Om kategorin redan är vald tas den bort från filterCategories.
Annars läggs den till.
*/
  function toggleCategoryFilter(selectedCategory) {
    if (filterCategories.includes(selectedCategory)) {
      setFilterCategories(filterCategories.filter((cat) => cat !== selectedCategory));
    } else {
      setFilterCategories([...filterCategories, selectedCategory]);
    }
  }

/*
Filtrerar aktiviteter baserat på showCompleted och filterCategories.
Om showCompleted är false filtreras slutförda aktiviten bort.
Om inga kategorier är valda (filterCategories.length === 0) visas alla aktiviteter. 
Annars visas bara aktiviteten vars kategori finns i filterCategories.
*/
  const filteredTasks = tasks
    .filter((task) => (showCompleted ? true : !task.completed))
    .filter((task) =>
      filterCategories.length === 0 ? true : filterCategories.includes(task.category)
    );

/*
Skapar en kopia av filteredTasks för att sortera utan att ändra originalet.
date sortera efter datum (stigande).
minutes sortera efter tidsuppskattning (stigande).
status ofullständiga aktiviteter visas före slutförda.
om inget kriterium är valt (sortBy === '') returneras listan oförändrad.
*/
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

/*
<div className="todo-container">:
Skapar ett formulär för att mata in nya aktiviteter.
När man klickar på "Lägg till" anropas addTask.
<div> innehåller checkbox för slutförda aktiviteter som styr showCompleted.
Sorteringsdropdown som låter oss välja sorteringskriterium (date, minutes, status).
Om inga aktiviteter matchar, visas meddelandet "Inga aktiviteter matchar valda filter.".
Om aktiviteter finns iterera över sortedTasks och rendera en lista med aktivitetens detaljer.
*/
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

/*
Gör det möjligt att importera och använda komponenten i andra filer.
*/
export default Todo;








