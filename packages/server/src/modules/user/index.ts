import UserType from "./UserType";
import * as Loader from "./UserLoader";
import createConnection from "../utils/createCoonnection";

import {
    GraphQLNonNull,
    GraphQLID,
    GraphQLInt,
    GraphQLString,
    GraphQLInputObjectType
} from "graphql";

export const queries = {
    me: {
        type: UserType,
        resolve: (object, args, ctx) => ctx.me
    },
    users: {
        type: createConnection(UserType, "UserConnection"),
        args: {
            size: {
                type: GraphQLNonNull(GraphQLInt)
            },
            page: {
                type: GraphQLNonNull(GraphQLInt)
            }
        },
        resolve: Loader.Users
    },
    user: {
        type: UserType,
        args: {
            id: {
                type: GraphQLNonNull(GraphQLID)
            }
        },
        resolve: Loader.User
    }
};

export const mutations = {
    addUser: {
        type: UserType,
        args: {
            input: {
                type: new GraphQLInputObjectType({
                    name: "AddUserInput",
                    fields: () => ({
                        name: {
                            type: GraphQLString
                        },
                        email: {
                            type: GraphQLString
                        },
                        password: {
                            type: GraphQLString
                        }
                    })
                })
            }
        },
        resolve: Loader.AddUser
    },
    loginUser: {
        type: UserType,
        args: {
            input: {
                type: new GraphQLInputObjectType({
                    name: "LoginUserInput",
                    fields: () => ({
                        email: {
                            type: GraphQLString
                        },
                        password: {
                            type: GraphQLString
                        }
                    })
                })
            }
        },
        resolve: Loader.LoginUser
    }
};
