import { AppState } from "../AppState.js";
import { Pop } from "../utils/Pop.js";
import { setHTML } from "../utils/Writer.js";
import { notesService } from "../services/NotesService.js";
import { getFormData } from "../utils/FormHandler.js";

function _drawNotes() {
    const notes = AppState.notes
    let content = ""
    notes.forEach(noteFile => content += noteFile.notesTemplate)
    setHTML("notes", content)
    setHTML("noteCount", `${notes.length}`)
}

function _drawActiveNote() {
    const activeNote = AppState.activeNote
    if (AppState.activeNote) {
        let content = ""
        content += activeNote?.activeNoteTemplate
        setHTML('activeNote', content)

    } else {
        setHTML('activeNote', '<p class="fw-bold fs-1">No Active Note</p>')
    }





}

export class NotesController {
    constructor() {
        console.log(AppState.activeNote);
        Pop.success('Notes controller working')
        _drawNotes()
        _drawActiveNote()
        AppState.on('notes', _drawNotes)
        AppState.on('activeNote', _drawActiveNote)
    }

    createNote(event) {
        try {
            event.preventDefault()

            const form = event.target

            const eventData = getFormData(form)

            notesService.createNote(eventData)
            form.reset()



        } catch (error) {
            Pop.error(error.message)
        }
    }

    setActiveNote(noteId) {

        notesService.setActiveNote(noteId)
    }

    saveActiveNote() {
        // @ts-ignore
        const noteContent = document.getElementById('noteContent').value

        notesService.saveActiveNote(noteContent)
    }

    deleteActiveNote() {
        const wantsToDelete = window.confirm("Are you sure you want to delete?")

        if (!wantsToDelete) {
            return
        }


        notesService.deleteActiveNote()

        AppState.activeNote = null

        _drawActiveNote()
        _drawNotes()
        console.log(AppState.activeNote);


    }

}