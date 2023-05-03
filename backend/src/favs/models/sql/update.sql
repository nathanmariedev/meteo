UPDATE "user"
SET "mainCity" = ?
WHERE "userName" = ?
RETURNING *;