import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addNote, toggleNote, deleteNote, editNote, setEditNote } from '../../redux/actions/note.actions';
import './style.css';
import DateDetail from './DateDetail';

function Note() {
  const dispatch = useDispatch();
  const notes = useSelector((state) => state.notes.notes);
  const editNoteId = useSelector((state) => state.notes.editNoteId);
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleAddNote = () => {
    if (inputValue.trim() !== '') {
      const newNote = {
        id: `${inputValue}_${Date.now()}`,
        title: inputValue,
        completed: false,
      };
      dispatch(addNote(newNote));
      setInputValue('');
    }
  };

  const handleToggleNote = (id) => {
    dispatch(toggleNote(id));
  };

  const handleDeleteNote = (id) => {
    dispatch(deleteNote(id));
  };

  const handleEditNote = (id) => {
    dispatch(setEditNote(id));

    const noteToEdit = notes.find((note) => note.id === id);
    setInputValue(noteToEdit.title);
  };

  const handleSaveEdit = () => {
    if (inputValue.trim() !== '') {
      dispatch(editNote({ id: editNoteId, title: inputValue }));
      setInputValue('');
    }
  };

  return (
    <>
      <div className='note-wrapper'>
        <div className='note-container'>
          <textarea rows={4} placeholder="Enter a note" value={inputValue} onChange={handleInputChange} />
          {editNoteId !== null ? (
            <button onClick={handleSaveEdit}>Save Edit</button>
          ) : (
            <button onClick={handleAddNote}>Add Note</button>
          )}
        </div>
        <div className='note-bk'>
          <DateDetail />
          {notes && notes.length > 0 ? (
            notes.map((note) => (
              <div className='note-header' key={note.id}>
                <div className={note.completed ? 'note-text' : 'note-textarea'}>
                  <span className='icon' onClick={() => handleToggleNote(note.id)}>
                    {note.completed ? (
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                        <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" strokeWidth="2" d="m5 12l5 5L20 7" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 256 256">
                        <path fill="currentColor" d="M128 28a100 100 0 1 0 100 100A100.11 100.11 0 0 0 128 28Zm0 192a92 92 0 1 1 92-92a92.1 92.1 0 0 1-92 92Z" />
                      </svg>
                    )}
                  </span>
                  <span className='text' style={{ textDecoration: note.completed ? 'line-through' : 'none' }}>
                    {note.title}
                  </span>
                </div>
                <div className={editNoteId !== null ? 'disabled-buttons' : 'button-wrapper'}>
                  <button className='btn btn-edit' disabled={editNoteId !== null} onClick={() => handleEditNote(note.id)}>Edit</button>
                  <button className='btn' disabled={editNoteId !== null} onClick={() => handleDeleteNote(note.id)}>Delete</button>
                </div>
              </div>
            ))
          ) : (
            <div className='empty-content'>No Note Added</div>
          )}
        </div>
      </div>

    </>

  );
}

export default Note;