SELECT * 
FROM "user"
JOIN "city" on "mainCity"="insee" 
WHERE "userId" = ?;