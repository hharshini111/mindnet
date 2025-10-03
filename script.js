function typeWriter(text, elementId, speed = 50) {
  let i = 0;
  const el = document.getElementById(elementId);
  el.innerHTML = ""; // clear old text
  function typing() {
    if (i < text.length) {
      el.innerHTML += text.charAt(i);
      i++;
      setTimeout(typing, speed);
    }
  }
  typing();
}

// Trigger typing when user clicks
function showText(type) {
  if (type === "site") {
    typeWriter("MindNet is a calm space to write, reflect, gain valuable feedback, and connect with an AI assistant that listens.", "siteText");
  } else if (type === "creator") {
    typeWriter("Hi, I'm Harshini, the creator of MindNet. This site was built to help people process thoughts and emotions safely in this overwhelming world.", "creatorText");
  }
}

// Fade/appear on scroll (run only once)
let scrollTextPlayed = false;

document.addEventListener("scroll", () => {
  if (scrollTextPlayed) return; // stop if already played

  const scrollText = document.getElementById("scrollText");
  const triggerPoint = window.innerHeight / 1.3;
  const sectionTop = scrollText.getBoundingClientRect().top;

  if (sectionTop < triggerPoint) {
    typeWriter(
      "Try out the journal and gain valuable feedback based on entries to improve your daily life! Talk to mindbot to unload some of the stress you're holding or just for fun!",
      "scrollText"
    );
    scrollTextPlayed = true; // lock it so it doesn’t glitch
  }
});

// Fade in page content on load
window.addEventListener('DOMContentLoaded', () => {
  const content = document.querySelector('.page-content');
  if (content) content.classList.add('show');
});

// Fade out content before navigating to another page
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const href = link.getAttribute('href');
    const content = document.querySelector('.page-content');
    if (content) content.style.opacity = 0; // fade out
    setTimeout(() => {
      window.location = href;
    }, 400); 
  });
});
document.addEventListener("DOMContentLoaded", function () {
    const notesContainer = document.getElementById("notesContainer");
    const addNoteBtn = document.getElementById("addNoteBtn");
    const addNoteModal = document.getElementById("addNoteModal");
    const closeModalBtn = document.getElementById("closeModalBtn");
    const noteForm = document.getElementById("noteForm");
    const searchInput = document.getElementById("searchInput");
    const filterSelect = document.getElementById("filterSelect");
    const emptyState = document.getElementById("emptyState");
    const confirmModal = document.getElementById("confirmModal");
    const cancelDeleteBtn = document.getElementById("cancelDeleteBtn");
    const confirmDeleteBtn = document.getElementById("confirmDeleteBtn");

    let notes = JSON.parse(localStorage.getItem("notes")) || [];
    let noteToDeleteId = null;

    renderNotes();
    updateEmptyState();

    addNoteBtn.addEventListener("click", openAddNoteModal);
    closeModalBtn.addEventListener("click", closeAddNoteModal);
    noteForm.addEventListener("submit", handleNoteSubmit);
    searchInput.addEventListener("input", filterNotes);
    filterSelect.addEventListener("change", filterNotes);
    cancelDeleteBtn.addEventListener("click", closeConfirmModal);
    confirmDeleteBtn.addEventListener("click", confirmDeleteNote);

    function renderNotes(notesToRender = notes) {
        notesContainer.innerHTML = "";

        notesToRender.forEach((note, index) => {
            const noteElement = document.createElement("div");
            noteElement.className = "note-card fade-in";
            noteElement.innerHTML = `
            <div class="note-content">
                <div class="note-header">
                    <h3 class="note-title">${note.title}</h3>
                    <div class="note-actions">
                        <button class="delete-btn" data-id="${index}">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
                <p class="note-text">${note.content}</p>
                <div class="note-footer">
                    <span class="note-tag ${getTagClass(note.tag)}">
                        ${getTagIcon(note.tag)} ${getTagName(note.tag)}
                    </span>
                    <span class="note-date">${formatDate(note.date)}</span>
                </div>
            </div>`;
            notesContainer.appendChild(noteElement);
        });

        document.querySelectorAll(".delete-btn").forEach((btn) => {
            btn.addEventListener("click", function () {
                noteToDeleteId = parseInt(this.getAttribute("data-id"));
                openConfirmModal();
            });
        });
    }

    function getTagClass(tag) {
        const classes = {
            work: "tag-work",
            personal: "tag-personal",
            ideas: "tag-ideas",
            reminders: "tag-reminders",
        };
        return classes[tag] || "";
    }

    function getTagIcon(tag) {
        const icons = {
            work: '<i class="fas fa-briefcase"></i>',
            personal: '<i class="fas fa-user"></i>',
            ideas: '<i class="fas fa-lightbulb"></i>',
            reminders: '<i class="fas fa-bell"></i>',
        };
        return icons[tag] || "";
    }

    function getTagName(tag) {
        const names = {
            work: "Work",
            personal: "Personal",
            ideas: "Ideas",
            reminders: "Reminders",
        };
        return names[tag] || tag;
    }

    function formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    }

    function openAddNoteModal() {
        addNoteModal.classList.add("active");
        document.body.style.overflow = "hidden";
    }

    function closeAddNoteModal() {
        addNoteModal.classList.remove("active");
        document.body.style.overflow = "auto";
        noteForm.reset();
    }

    function openConfirmModal() {
        confirmModal.classList.add("active");
        document.body.style.overflow = "hidden";
    }

    function closeConfirmModal() {
        confirmModal.classList.remove("active");
        document.body.style.overflow = "auto";
        noteToDeleteId = null;
    }

    function handleNoteSubmit(e) {
        e.preventDefault();

        const title = document.getElementById("noteTitle").value;
        const content = document.getElementById("noteContent").value;
        const tag = document.querySelector(
            'input[name="noteTag"]:checked'
        ).value;

        const newNote = {
            title,
            content,
            tag,
            date: new Date().toISOString(),
        };

        notes.unshift(newNote);
        saveNotes();
        renderNotes();
        closeAddNoteModal();
        updateEmptyState();
        filterNotes();
    }

    function confirmDeleteNote() {
        if (noteToDeleteId !== null) {
            notes.splice(noteToDeleteId, 1);
            saveNotes();
            renderNotes();
            updateEmptyState();
            filterNotes();
            closeConfirmModal();
        }
    }

    function saveNotes() {
        localStorage.setItem("notes", JSON.stringify(notes));
    }

    function filterNotes() {
        const searchTerm = searchInput.value.toLowerCase();
        const filterValue = filterSelect.value;

        let filteredNotes = notes;

        if (searchTerm) {
            filteredNotes = filteredNotes.filter(
                (note) =>
                    note.title.toLowerCase().includes(searchTerm) ||
                    note.content.toLowerCase().includes(searchTerm)
            );
        }

        if (filterValue !== "all") {
            filteredNotes = filteredNotes.filter(
                (note) => note.tag === filterValue
            );
        }

        renderNotes(filteredNotes);
        updateEmptyState(filteredNotes);
    }

    function updateEmptyState(notesToCheck = notes) {
        if (notesToCheck.length === 0) {
            emptyState.style.display = "block";
        } else {
            emptyState.style.display = "none";
        }
    }
});