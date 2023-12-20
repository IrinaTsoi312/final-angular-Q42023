import { INewCard } from '../shared/types/newCard';
import * as NewCardActions from './new-card.actions';
import { createReducer, on } from '@ngrx/store';

export const initialState: ReadonlyArray<INewCard> = [];

export const cardsReducer = createReducer(
  // initialState,
  // on(NewCardActions.getNewCardActions.retrievedNewCardsList, (_state, { cards }) => cards)
  initialState,
  on(NewCardActions.addNewCard, (state, { card }) => [...state, card])
);

export const cardsCreateReducer = createReducer(
  initialState,
  on(NewCardActions.addNewCard, (state, { card }) => [...state, card])
);
