import UserModel from './UserModel';

export const Users = async (object, args, ctx) => {
  const { id, size, page } = args;
  const where = { id }
  const offset = page * size;

  const totalCount = await UserModel.count(where)
  const hasNextPage = (Number(totalCount) > (offset + size));

  const edges = await UserModel
    .find(where)
    .limit(size)
    .skip(offset)

  return {
    edges,
    hasNextPage,
    totalCount
  }
}

export const User = (object, args, ctx) => UserModel.findOne({ id: args.id })

export const AddUser = async (object, args, ctx) => {
  console.log('args', args);
  const user = new UserModel({ ...args.input })
  await user.save();
  return user;
}
