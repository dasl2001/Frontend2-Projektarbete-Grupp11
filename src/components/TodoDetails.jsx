/*
Moduler och komponenter importeras.
*/
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../css/todo.css';

/*
tasks är en array som innehåller alla befintliga aktiviteter, skickas in från en föräldrakomponent.
setTasks är en funktion för att uppdatera listan över aktiviteter.
*/
function TodoDetails ({ tasks, setTasks }) {

/*
useParams hämtar ett ID från URL:en. 
useNavigate ger möjlighet att  navigera till en annan sida.
*/
  const { id } = useParams();
  const navigate = useNavigate();

/*
Söker efter en aktivitet i arrayen vars ID matchar ID-parametern från URL:en.
parseInt(id) omvandlar ID från en sträng till ett heltal för att kunna jämföra med aktivitetens ID.
*/
  const task = tasks.find((task) => task.id === parseInt(id));

/*
Om ingen aktivitet hittas med det givna id returneras ett meddelande "Aktiviteten hittades inte".
*/
  if (!task) {
    return <p>Aktiviteten hittades inte</p>;
  }

/*
Skapar en kopia av den aktuella aktiviteten (task) och vänder på  completed-status.
Om task.completed är false ändras det till true. 
tasks.map går igenom alla aktiviteter i listan.
Om en aktvitets ID matchar den aktuella aktivitetens ID, ersätts den med den uppdaterade versionen (updatedTask).
*/
  function toggleCompleted() {
    const updatedTask = { ...task, completed: !task.completed };
    setTasks(tasks.map((t) => (t.id === task.id ? updatedTask : t)));
  }

/*
tasks.filter skapar en ny array som exkluderar den aktuella aktiviteten (den med matchande ID).
setTasks uppdaterar listan med denna nya array.
Efter att aktiviteten tagits bort skickas du tillbaka till huvudlistan (/todo) med navigate.
*/
  function deleteTask() {
    setTasks(tasks.filter((t) => t.id !== task.id));
    navigate('/todo');
  }

/*
Visar all relevant information om aktiviteten:
title, description, date, category, minutes, och completed.
Använder ternära operatorer '?' för att visa status (Klar eller Inte klar).
Interaktiva knappar:
toggleCompleted används för att ändra aktivitetens status (slutförd/inte slutförd).
deleteTask tar bort aktiviteten från listan.
*/
  return (
    <div className="todo-details">
      <h2>Detaljer om aktiviteten</h2>
      <p><strong>Titel:</strong> {task.title}</p>
      <p><strong>Beskrivning:</strong> {task.description}</p>
      <p><strong>Datum:</strong> {task.date}</p>
      <p><strong>Kategori:</strong> {task.category}</p>
      <p><strong>Tidsuppskattning:</strong> {task.minutes} minuter</p>
      <p><strong>Status:</strong> {task.completed ? 'Klar' : 'Inte klar'}</p>
      <button onClick={toggleCompleted}>
        Markera som {task.completed ? 'Inte klar' : 'Klar'}
      </button>
      <button onClick={deleteTask}>Ta bort aktiviteten</button>
    </div>
  );
}

/*
Gör det möjligt att importera och använda TodoDetails i andra filer i applikationen.
*/
export default TodoDetails;






