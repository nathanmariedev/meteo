SELECT "favs"."insee" AS "insee", 
"city"."cp" AS "cp", 
"city"."name" AS "name",
"user"."userId",
"user"."userName",
"user"."mainCity"
FROM "favs"
JOIN "city" ON "favs"."insee" = "city"."insee"
JOIN "user" ON "favs"."userId" = "user"."userId"
WHERE "favs"."userId" = ?;