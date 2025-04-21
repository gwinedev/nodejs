const form = document.getElementById("note-form");
const titleInput = document.getElementById("title");
const contentInput = document.getElementById("content");
const notesList = document.getElementById("notes-list");

const API_BASE = "http://localhost:5000";
// Fetch notes from backend and display
function fetchNotes() {
  fetch(`${API_BASE}/notes`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data.length);
      notesList.innerHTML = "";
      data.forEach((note) => {
        const li = document.createElement("li");
        li.innerHTML = `<strong>${note.title}</strong>
        <p>${note.content}</p>
        <button data-id=${note._id}" class="delete-btn">Delete</button>`;
        notesList.appendChild(li);
      });
      // Add event listeners to delete buttons
      const deleteButtons = document.querySelectorAll(".delete-btn");
      deleteButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
          const noteId = btn.getAttribute("data-id");
          deleteNote(noteId);
        });
      });
    })
    .catch((err) => console.error("Error fetching notes:", err));
}

function deleteNote(id) {
  console.log(`id: ${id}`);
  fetch(`${API_BASE}/notes/${id}`, {
    method: "DELETE",
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Failed to delete note");
      }
      return res.json();
    })
    .then(() => {
      fetchNotes();
    })
    .catch((err) => console.error("Error deleting note", err));
}

// Submit form ti add new note
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const title = titleInput.value.trim();
  const content = contentInput.value.trim();

  // Basic validation
  if (!title || !content) {
    alert("Tilte and content must be provided");
    return;
  }
  const note = {
    title,
    content,
  };
  fetch(`http://localhost:5000/notes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(note),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Failed to add note");
      }
      return res.json();
    })
    .then((data) => {
      fetchNotes();
      titleInput.value = "";
      contentInput.value = "";
    })
    .catch((err) => console.error("Error adding note:", err));
});

fetchNotes();
