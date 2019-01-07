/* @flow */
import type Dataloader from 'dataloader';
import { UserType } from './loader/UserLoader';

type Key = string;

export type Dataloaders<T> = {
  UserLoader: Dataloader<Key, T>,
  PetLoader: Dataloader<Key, T>,
  ContactLoader: Dataloader<Key, T>,
  ExamLoader: Dataloader<Key, T>,
  MedicineLoader: Dataloader<Key, T>,
  AppointmentLoader: Dataloader<Key, T>,
  VermifugeLoader: Dataloader<Key, T>,
};

export interface GraphQLContext {
  user?: UserType;
  dataloaders: Dataloaders<any>;
}

export type ConnectionArguments = {
  first: number,
  after: string,
  before: string,
  search: string,
};

export type ConnectionPayload<T> = {
  pageInfo: {
    hasNextPage: Boolean,
    hasPreviousPage: Boolean,
    startCursor: string,
    endcursor: string,
  },
  count: number,
  edges: Array<T>,
};
