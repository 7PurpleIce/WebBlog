import { generateDate } from "./generate-date"

export const addUser = (login, password) => 
     fetch('http://localhost:2077/users', {
    method: 'POST',
    headers: {
        'Content-type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({
        login,
        password,
        registered_at: generateDate(),
        role_id: 2,
    }),
})