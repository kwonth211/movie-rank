import users from "./../database/user"

const resolvers = {
  Query: {
    users: () => users,
  },
  Mutation: {
    addUser: (_, { ID, password }) => {
      // 사용자 아이디 중복 검사
      // if (users.find(user => user.ID === ID)) return null;

      // 데이터베이스에 추가
      const newUser = {
        id: users.length + 1,
        ID,
        password,
      }
      // users.push(newUser);
      return newUser
    },
  },
}
