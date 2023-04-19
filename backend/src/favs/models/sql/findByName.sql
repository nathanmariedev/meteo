SELECT "favs"."insee" AS "insee", 
"city"."cp" AS "cp", 
"city"."name" AS "name",
"user"."userName",
"user"."mainCity"
FROM "favs"
JOIN "city" ON "favs"."insee" = "city"."insee"
JOIN "user" ON "favs"."userName" = "user"."userName"
WHERE "favs"."userName" = ?;