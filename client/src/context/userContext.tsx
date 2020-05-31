import { createContext } from "react";

const UserContext = createContext<any>({ user: {}, setUser: () => {} });

export default UserContext;
