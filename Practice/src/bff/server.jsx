import { getUser } from "./get-user";
import { addUser } from "./add-user";
import { sessions } from "./sessions";

export const server = {
    async logout(session) {
        sessions.remove(session)
    },

    async authorize(authLogin, authPassword) {
        const user = await getUser(authLogin);

        if (!user) {
            return {
                error: 'User with this login is not found',
                res: null
            }
        }

        if(authPassword !== user.password) {
            return {
                error: 'Wrong password',
                res: null
            }
        }

        return {
            error: null,
            res: {
                id: user.id,
                login: user.login,
                roleId: user.role_id,
                session: sessions.create(user),
            },
        }
    },

    async register(regLogin, regPassword) {
        const user = await getUser(regLogin);

        if (user) {
            return {
                error: 'This login is already used',
                res: null
            }
        }

        await addUser(regLogin, regPassword)

        return {
            error: null,
            res: {
                id: user.id,
                login: user.login,
                roleId: user.role_id,
                session: sessions.create(user),
            },
        }
    },
};