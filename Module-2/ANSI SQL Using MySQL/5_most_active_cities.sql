-- Exercise 5: Most Active Cities
SELECT u.city, COUNT(DISTINCT u.user_id) AS user_count
FROM Users u
JOIN Registrations r ON u.user_id = r.user_id
GROUP BY u.city
ORDER BY user_count DESC
LIMIT 5;