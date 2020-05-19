import users from "../database/user"

const context = ({ req }) => {
  // const token = req.headers.authorization || ""
  // // 로그인되어 있지 않거나 로그인 토큰이 없을 때
  // if (token.length != 64) return { user: null }
  // const user = users.find((user) => user.token === token)
  // return { user }
}

export default context
