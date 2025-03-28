export const getUsers = () =>
    fetch(`http://localhost:2077/users`).then((loadedUsers) => loadedUsers.json());
