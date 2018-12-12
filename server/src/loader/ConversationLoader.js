
import DataLoader from 'dataloader';
import type { ConnectionArguments } from 'graphql-relay';
import { connectionFromMongoCursor, mongooseLoader } from '@entria/graphql-mongoose-loader';
import { Conversation as ConversationModel } from '../model';
import type { GraphQLContext, ConnectionPayload } from '../TypeDefinition';
import type { ConversationType } from '../type/ConversationType';

type ConversationConnectionArgs = {
  search: string,
} & ConnectionArguments;

export type ConversationConnection = ConnectionPayload<ConversationType>;

export default class Conversation {
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

  constructor(data: ConversationType, { user }: GraphQLContext) {
    if (user) {
      this.id = data.id;
      this._id = data._id;
      this.owner = data.owner;
      this.otherUser = data.otherUser;
      this.lastMessage = data.lastMessage;
      this.messages = data.messages;
    }
  }
}

export const getLoader = () => new DataLoader(ids => mongooseLoader(ConversationModel, ids));

const viewerCanSee = () => true;

export const load = async (context: GraphQLContext, id: string): Promise<?Conversation> => {
  if (!id) {
    return null;
  }

  let data;
  try {
    data = await context.dataloaders.ConversationLoader.load(id);
  } catch (err) {
    return null;
  }
  return viewerCanSee() ? new Conversation(data, context) : null;
};

export const clearCache = ({ dataloaders }: GraphQLContext, id: string) => dataloaders.ConversationLoader.clear(id.toString());

export const loadConversations = async (context: GraphQLContext, args: ConversationConnectionArgs): Promise<?ConversationConnection> => {
  const { user } = context;
  const Conversations = ConversationModel.find({ owner: user._id }).sort({ createdAt: -1 });

  return connectionFromMongoCursor({
    cursor: Conversations,
    context,
    args,
    loader: load,
  });
};
