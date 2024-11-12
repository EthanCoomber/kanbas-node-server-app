export const createUser = (user) =>
  (users = [...users, { ...user, _id: Date.now() }]);
export const findUserByUsername = (username) =>
  users.find((user) => user.username === username);
export const updateUser = (userId, user) =>
  (users = users.map((u) => (u._id === userId ? user : u)));
