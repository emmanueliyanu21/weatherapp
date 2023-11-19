import * as types from '../types/note.types';

const initialState = {
  notes: [],
  editNoteId: null,
};

const noteReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.ADD_NOTE:
      return { ...state, notes: [...state.notes, action.payload] };

    case types.TOGGLE_NOTE:
      return {
        ...state,
        notes: state.notes.map((note) =>
          note.id === action.payload ? { ...note, completed: !note.completed } : note
        ),
      };

    case types.DELETE_NOTE:
      return { ...state, notes: state.notes.filter((note) => note.id !== action.payload) };

    case types.EDIT_NOTE:
      const { id, title } = action.payload;
      return {
        ...state,
        notes: state.notes.map((note) => (note.id === id ? { ...note, title } : note)),
        editNoteId: null,
      };

    case types.SET_EDIT_NOTE:
      return { ...state, editNoteId: action.payload };

    default:
      return state;
  }
};

export default noteReducer;
