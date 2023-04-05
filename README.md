# Auth
POST /auth/login (login user)
POST /auth/register (register user)
GET /auth/me (get user info)

# Titles
GET /titles/search?q= (search title)
GET /titles/:id (detail title, un seul titre)
GET /titles/liked (detail[])
POST /lists/:id/titles/:titleId (ajouter un manga à une liste)
DELETE /lists/:id/titles/:titleId (supprimer un manga d'une liste)
GET /titles/recommendations (detail[])
