import users from "./users"

const context = async ({ req }) => {
  const token = req.headers.authorization || ""
  // 로그인되어 있지 않거나 로그인 토큰이 없을 때

  if (token.length != 64) return { user: null }

  const user = users[0].find((iter) => iter.token === token)
  console.log("contextUser>>>", user)

  return { user }
}

export default context
