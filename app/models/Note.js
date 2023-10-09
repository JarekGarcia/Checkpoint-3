import { AppState } from "../AppState.js";
import { notesService } from "../services/NotesService.js";
import { generateId } from "../utils/GenerateId.js";




export class Note {

  constructor(data) {
    this.id = generateId()
    this.title = data.title
    this.color = data.color
    this.noteContent = data.noteContent || ''
    this.createdAt = data.createdAt ? new Date(data.createdAt) : new Date()
    this.updatedAt = data.updatedAt ? new Date(data.updatedAt) : new Date()
  }

  get notesTemplate() {
    return `
        <div class="row">
            <div class="col-12">
            <div class="d-flex">
              <p class="${this.color}" onclick="app.NotesController.setActiveNote('${this.id}')" role="button">${this.title}</p>
              <p id="color"></p>
            </div>
            </div>
          </div>
        `
  }

  get activeNoteTemplate() {
    return `
        <form onsubmit="app.NotesController.saveActiveNote()">
            <div class="fw-bold justify-content-around">
              <p class="" id="title">Note: ${this.title} <input type="color" value="${this.color}"></p> </p>
              <p>Created At: ${this.createdAt.toLocaleString()}</p>
              <p>Updated At: ${this.updatedAt.toLocaleString()}</p>
            </div>
            <textarea onblur="app.NotesController.saveActiveNote()" name="noteContent" id="noteContent" class="w-100" cols="30" rows="10"
            placeholder="Type notes..."  style="border: 4px dashed ${this.color} " >${this.noteContent}</textarea>
            <button class="btn btn-success rounded-pill">Save</button>
            <button onclick="app.NotesController.deleteActiveNote()" class="btn btn-danger rounded-pill">Delete</button>
          </form>
        `
  }
}

