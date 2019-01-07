
import DataLoader from 'dataloader';
import type { ConnectionArguments } from 'graphql-relay';
import { connectionFromMongoCursor, mongooseLoader } from '@entria/graphql-mongoose-loader';
import { Message as MessageModel } from '../model';
import type { GraphQLContext, ConnectionPayload } from '../TypeDefinition';
import type { MessageType } from '../type/MessageType';

type MessageConnectionArgs = {
  search: string,
} & ConnectionArguments;

export type MessageConnection = ConnectionPayload<MessageType>;

export default class Message {
  id: string;
  _id: string;
  owner: string;
  text: string;
  conversation: string;

  constructor(data: MessageType, { user }: GraphQLContext) {
    if (user) {
      this.id = data.id;
      this._id = data._id;
      this.owner = data.owner;
      this.text = data.text;
      this.conversation = data.conversation;
    }
  }
}

export const getLoader = () => new DataLoader(ids => mongooseLoader(MessageModel, ids));

const viewerCanSee = () => true;

export const load = async (context: GraphQLContext, id: string): Promise<?Message> => {
  if (!id) {
    return null;
  }

  let data;
  try {
    data = await context.dataloaders.MessageLoader.load(id);
  } catch (err) {
    return null;
  }
  return viewerCanSee() ? new Message(data, context) : null;
};

export const clearCache = ({ dataloaders }: GraphQLContext, id: string) => dataloaders.MessageLoader.clear(id.toString());

export const loadMessages = async (context: GraphQLContext, args: MessageConnectionArgs): Promise<?MessageConnection> => {
  const { conversation } = args;
  const Messages = MessageModel.find({ conversation }).sort({ createdAt: -1 });

  return connectionFromMongoCursor({
    cursor: Messages,
    context,
    args,
    loader: load,
  });
};
