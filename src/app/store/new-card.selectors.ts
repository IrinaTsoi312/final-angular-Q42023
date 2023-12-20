import { createSelector, createFeatureSelector } from '@ngrx/store';
import { INewCard } from '../shared/types/newCard';

export const selectCard = createFeatureSelector<ReadonlyArray<INewCard>>('cards');

export const selectCollectionState = createFeatureSelector<
  ReadonlyArray<string>
>('collection');

export const selectCardsCollection = createSelector(
  selectCard,
  selectCollectionState,
  (cards, collection) => {
    return collection.map((id) => cards.find((card) => card.id === id)!);
  }
);