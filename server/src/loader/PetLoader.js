// @flow
import DataLoader from 'dataloader';
import type { ConnectionArguments } from 'graphql-relay';
import { connectionFromMongoCursor, mongooseLoader } from '@entria/graphql-mongoose-loader';
import { Pet as PetModel } from '../model';
import type { GraphQLContext, ConnectionPayload } from '../TypeDefinition';
import type { PetType } from '../type/PetType';

type PetConnectionArgs = {
  search: string,
} & ConnectionArguments;

export type PetConnection = ConnectionPayload<PetType>;

export default class Pet {
  id: string;
  _id: string;
  name: string;
  owner: string;
  castrated: boolean;
  alergic: Array<string>;
  image: string;
  doctor: string;
  race: string;
  type: string;
  active: Boolean;
  gender: string;
  port: string;
  birthDate: string;
  color: string;

  constructor(data: PetType, { user }: GraphQLContext) {
    if (user) {
      this.id = data.id;
      this._id = data._id;
      this.name = data.name;
      this.image = data.image;
      this.port = data.port;
      this.owner = data.owner;
      this.castrated = data.castrated;
      this.alergic = data.alergic;
      this.doctor = data.doctor;
      this.race = data.race;
      this.type = data.type;
      this.active = data.active;
      this.gender = data.gender;
      this.birthDate = data.birthDate;
      this.color = data.color;
    }
  }
}

export const getLoader = () => new DataLoader(ids => mongooseLoader(PetModel, ids));

const viewerCanSee = () => true;

export const load = async (context: GraphQLContext, id: string): Promise<?Pet> => {
  if (!id) {
    return null;
  }

  let data;
  try {
    data = await context.dataloaders.PetLoader.load(id);
  } catch (err) {
    return null;
  }
  return viewerCanSee() ? new Pet(data, context) : null;
};

export const clearCache = ({ dataloaders }: GraphQLContext, id: string) => dataloaders.PetLoader.clear(id.toString());

export const loadPets = async (context: GraphQLContext, args: PetConnectionArgs): Promise<?PetConnection> => {
  const { user } = context;
  const where = args.search
    ? { name: { $regex: new RegExp(`^${args.search}`, 'ig') }, owner: user._id, active: true }
    : { owner: user._id, active: true };
  const pets = PetModel.find(where, { _id: 1 }).sort({ createdAt: -1 });

  console.log(pets);

  return connectionFromMongoCursor({
    cursor: pets,
    context,
    args,
    loader: load,
  });
};
