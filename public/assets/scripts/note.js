const $noteTitle = $(".note-title");
const $noteText = $(".note-textarea");
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
    console.log("render current Note")
    $saveNoteBtn.hide();

    if (currentNote.id) {
        // $noteTitle.attr("readonly", true);
        // $noteText.attr("readonly", true);
        $noteTitle.val(currentNote.title);
        $noteText.val(currentNote.text);
    } else {
        // $noteTitle.attr("readonly", false);
        // $noteText.attr("readonly", false);
        $noteTitle.val("");
        $noteText.val("");
    }
}

function handleNoteSave() {
    let newNote = {
        title: $noteTitle.val(),
        text: $noteText.val(),
        id: currentNote.id
    }
    saveNote(newNote).then(() => {
        getAndRenderNotes();
        renderCurrentNote();
    });
}


function handleNoteDelete(event) {
    event.stopPropagation();

    const note = $(this).parent(".list-group-item").data();

    if (currentNote.id === note.id) {
        currentNote = {};
    }

    deleteNote(note.id).then(() => {
        getAndRenderNotes();
        renderCurrentNote();
    });
}

function handleNoteView() {
    console.log("view note");
    currentNote = $(this).data();
    console.log(currentNote);
    renderCurrentNote();
}

function handleNewNoteView() {
    console.log("new note");
    currentNote = {};
    renderCurrentNote();
}

function handleRenderSaveBtn() {
    if (!$noteTitle.val().trim() || !$noteText.val().trim()) {
        $saveNoteBtn.hide();
    } else {
        $saveNoteBtn.show();
    }
}

function renderNoteList(notes) {
    // console.log("RENDER NOTE LIST");
    $noteList.empty();
    const noteListItems = [];

    if (notes.length === 0) {
        noteListItems.push(create$li("No Saved Notes", false));
    }

    notes.forEach(note => {
        noteListItems.push(create$li(note.title).data(note));
    });

    $noteList.append(noteListItems);

    function create$li(text, withDeleteButton = true) {
        let $li = $("<li>").addClass("list-group-item");
        let $span = $("<span>").text(text);
        $li.append($span);

        if (withDeleteButton) {
            let $delBtn = $("<i>");
            $delBtn.addClass("far fa-trash-alt float-right text-danger delete-note");
            $li.append($delBtn);
        }
        return $li
    }
}

function getAndRenderNotes() {
    // console.log("RENDERING NOTES");
    return getNotes().then((res) => {
        // console.log(res);
        renderNoteList(res);
    });
}

$saveNoteBtn.on("click", handleNoteSave);
$noteList.on("click", ".list-group-item", handleNoteView);
$newNoteBtn.on("click", handleNewNoteView);
$noteList.on("click", ".delete-note", handleNoteDelete);
$noteTitle.on("keyup", handleRenderSaveBtn);
$noteText.on("keyup", handleRenderSaveBtn);

getAndRenderNotes();