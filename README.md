# Auth
POST /auth/login (login user)
POST /auth/register (register user)
GET /auth/me (get user info)

# Titles
GET /titles/search?q= (search title)
GET /titles/:id (detail title, un seul titre)
GET /titles/liked (detail[])
POST /titles/:id/liked (ajouter aux favoris)
DELETE /titles/:id/liked (supprimer des favoris)
GET /titles/recommendations (detail[])
