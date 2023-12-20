import { createAction, createActionGroup, props } from '@ngrx/store';
import { INewCard } from "../shared/types/newCard";

export const newCardActions = createActionGroup({
  source: 'Card',
  events: {
    'Add Card': props<{ cardID: string }>(),
    'Remove Card': props<{ cardID: string }>(),
  },
});

export const getNewCardActions = createActionGroup({
  source: 'New Cards List',
  events: {
    'Retrieved New Cards List': props<{ cards: ReadonlyArray<INewCard> }>(),
  },
});

export const addNewCard = createAction(
  "[New Card] Add New Card",
  props<{ card: INewCard }>()
);