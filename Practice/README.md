Области хранения данных:
- БД (json server)
- BFF
- Redux store

Сущности приложения:
- user: DB(list), BFF (session of current user), redux store(browser rendering)
- user role: DB(role list), BFF(user session w role), redux store(role usage on client)
- article: DB(article list), redux store(browser rendering)
- comments: DB(comment list), redux store(browser rendering)

Таблицы БД:
- user - users: id / login / password / registered_at / role_id
- roles - roles: id / name
- articles - posts: id / title / image_url / content / published_at
- comments - comments: id / author_id(user_id) / post_id / content

Схема состояния на BFF:
- current user session: login / password / role

Схема  для redux store: 
- user: id / login / role_id
- posts: posts array: id / title / imageUrl / publishedAt / commentsCount
- post: id / title / imageUrl / content / publishedAt / comments: comments array: id / author / content / publishedAt
- users: users array: id / login / registeredAt / role
