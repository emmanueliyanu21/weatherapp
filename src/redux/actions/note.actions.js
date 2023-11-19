import * as types from '../types/note.types';

export const addNote = (payload) => ({
  type: types.ADD_NOTE,
  payload,
});

export const toggleNote = (payload) => ({
  type: types.TOGGLE_NOTE,
  payload,
});

export const deleteNote = (payload) => ({
  type: types.DELETE_NOTE,
  payload,
});

export const editNote = (payload) => ({
  type: types.EDIT_NOTE,
  payload,
});

export const setEditNote = (payload) => ({
  type: types.SET_EDIT_NOTE,
  payload,
});
