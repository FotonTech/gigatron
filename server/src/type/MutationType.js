

import { GraphQLObjectType } from 'graphql';

import LoginEmail from '../mutation/LoginEmailMutation';
import RegisterEmail from '../mutation/RegisterEmailMutation';
import ChangePassword from '../mutation/ChangePasswordMutation';
import PetAdd from '../mutation/PetAddMutation';
import StartConversation from '../mutation/StartConversationMutation';
import PetDelete from '../mutation/PetDeleteMutation';

export default new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    // auth
    LoginEmail,
    RegisterEmail,
    ChangePassword,

    // conversation
    StartConversation,

    // pet
    PetAdd,
    PetDelete,
  }),
});
