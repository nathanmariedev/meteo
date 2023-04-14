SELECT *
FROM "user"
WHERE "user_id" = :param1
ORDER BY "updated_at" DESC
LIMIT 300 OFFSET 0;
