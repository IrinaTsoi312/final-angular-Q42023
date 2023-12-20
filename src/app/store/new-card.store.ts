import { createReducer, on } from '@ngrx/store';
import { newCardActions } from './new-card.actions';

export const initialState: ReadonlyArray<string> = [];

export const collectionReducer = createReducer(
  initialState,
  on(newCardActions.removeCard, (state, { cardID }) =>
    state.filter((id) => id !== cardID)
  ),
  on(newCardActions.addCard, (state, { cardID }) => {
    if (state.indexOf(cardID) > -1) return state;

    return [...state, cardID];
  })
);