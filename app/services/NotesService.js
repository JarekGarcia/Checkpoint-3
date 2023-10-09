import { AppState } from "../AppState.js"
import { Note } from "../models/Note.js"
import { saveState } from "../utils/Store.js"

function _save() {
    saveState('notes', AppState.notes)
}

class NotesService {

    createNote(noteData) {
        const newNote = new Note(noteData)
        AppState.notes.push(newNote)
        AppState.emit('notes')
        console.log(AppState.notes);

        _save()
    }

    setActiveNote(noteId) {
        const activeNote = AppState.notes.find(note => note.id == noteId)
        if (activeNote) {
            AppState.activeNote = activeNote

        }

    }


    deleteActiveNote() {
        const activeNote = AppState.activeNote
        const indexOfNote = AppState.notes.findIndex(note => note == activeNote)

        if (indexOfNote == -1) {
            return
        }

        AppState.notes.splice(indexOfNote, 1)


        AppState.emit('activeNote')



        _save()
    }

    saveActiveNote(noteContent) {
        let activeNote = AppState.activeNote
        if (activeNote) { // null check 
            activeNote.noteContent = noteContent
            activeNote.updatedAt = new Date()
            AppState.emit('activeNote')
            _save()
        }

    }
}


export const notesService = new NotesService