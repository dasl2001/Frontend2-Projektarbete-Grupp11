/*
Moduler och komponenter importeras.
*/
import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import '../css/todo.css';

/*
tasks är en lista med alla uppgifter som skickas in som en prop.
setTasks är en funktion som uppdaterar listan med aktiviteter. 
*/
function TodoDetails({ tasks, setTasks }) {

/*
Hämtar id-parametern från URL:en.  
Används för att identifiera vilken aktivitet som ska visas.
*/
  const { id } = useParams();

/*
Är en funktion för att man ska kunna navigera till en annan sida.
*/
  const navigate = useNavigate();

/*
Söker efter en aktivitet i listan som matchar ID från URL. 
Number(ID) konverterar strängen från URL till ett nummer värde
*/
  const task = tasks.find((task) => task.id === Number(id));

/*
Om task är undefined returnerar komponenten ett meddelande om att aktiviteten inte kunde hittas.
*/
  if (!task) {
    return <p>Aktiviteten hittades inte</p>;
  }

/*
Skapar en ny kopia av den aktuella uppgiften med ett omvänt completed-värde.
Använder setTasks för att ersätta den gamla uppgiftslistan med en ny lista där den aktuella uppgiften är uppdaterad.
*/
  function toggleCompleted() {
    const updatedTask = { ...task, completed: !task.completed };
    setTasks(tasks.map((t) => (t.id === task.id ? updatedTask : t)));
  }

/*
Filtrerar bort den aktuella uppgiften från listan.
Skickar tillbaka till  /todo efter att uppgiften har tagits bort.
*/
  function deleteTask() {
    setTasks(tasks.filter((t) => t.id !== task.id));
    navigate('/todo');
  }

/*
(<div className="todo-details">) innehåller alla detaljer.
Visar egenskaperna för aktiviteten som titel, beskrivning, datum, kategori, tidsuppskattning och status.
En knapp för att växla status (Markera som Klar/Inte klar) med en onClick-händelse som anropar toggleCompleted.
En knapp för att ta bort uppgiften med en onClick-händelse som anropar deleteTask.
En länk som leder tillbaka till /todo.
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
      <button onClick={deleteTask}>Ta bort</button>
      <div style={{ marginTop: '20px' }}>
        <Link to="/todo" style={{ textDecoration: 'none', color: 'blue' }}>
          Tillbaka till Todos & Activities
        </Link>
      </div>
    </div>
  );
}

/*
Gör det tillgänglig för import i andra filer.
*/
export default TodoDetails;







