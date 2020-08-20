const $noteTitle = $(".note-title");
const $noteText = $(".note-text");
const $saveNoteBtn = $(".save-note");
const $newNoteBtn = $(".new-note");
const $noteList = $(".list-container .list-group");

let currentNote = {};

//AJAX CALLS TO API
function getNotes() {
    return $.ajax({
        url: "/api/notes",
        method: "GET"
    });
};

function saveNote(note) {
    return $.ajax({
        url: "/api/notes",
        data: note,
        method: "POST"
    });
};

function deleteNote(id) {
    return $.ajax({
        url: "/api/notes/" + id,
        method: "DELETE"
    })
}

function renderCurrentNote() {
    $saveNoteBtn.hide();

    if(currentNote.id) {
        $noteTitle.val(currentNote.title);
        $noteText.val(currentNote.text);
    }
}

function handleNoteSave() {
    let newNote = {
        title: $noteTitle.val(),
        text: $noteText.val()
    }
    saveNote(newNote).then(rerender)
}


function handleNoteDelete(event) {
    event.stopPropagation();

    const note = $(this).parent(".list-group-item").data();

    if(currentNote.id === note.id) {
        currentNote = {};
    }

    deleteNote(note.id).then(rerender);
}

function handleNoteView() {
    currentNote = $(this).data();
    renderActiveNote();
}

function handleNewNoteView() {
    currentNote = {};
    renderActiveNote();
}

function handleRenderSaveBtn() {
    if(!$noteTitle.val().trim() || !$noteText.val().trim()) {
        $saveNoteBtn.hide();
    } else {
        $saveNoteBtn.show();
    }
}

function renderNoteList(notes) {
    $noteList.empty();
    const noteListItems = [];

    if(notes.length === 0) {
        noteListItems.push(create$li("No Saved Notes", false));
    }

    notes.forEach(note => {
        noteListItems.push(create$li(note.title).data(none));
    });

    $noteList.append(noteListItems);

    function create$li(text, withDeleteButton = true){
        let $li = $("<li>").addClass("list-group-item");
        let $span = $("<span>").text(text);
        $li.append($span);

        if(withDeleteButton){
            let $delBtn = $("<i>");
            $delBtn.addClass("fas fa-trash-alt float-right text-danger delete-note");
            $li.append($delBtn);
        }
        return $li
    }
}

function getAndRenderNotes() {
    return getNotes().then(renderNoteList);
}

function rerender() {
    getAndRenderNotes();
    renderActiveNote();
}

$saveNoteBtn.on("click", handleNoteSave);
$noteList.on("click", ".list-group-item", handleNoteView);
$newNoteBtn.on("click", handleNewNoteView);
$noteList.on("click", ".delete-note", handleNoteDelete);
$noteTitle.on("keyup", handleRenderSaveBtn);
$noteText.on("keyup", handleRenderSaveBtn);

getAndRenderNotes();