-- Exercise 17: Multi-Session Speakers
SELECT speaker_name, COUNT(session_id) AS session_count
FROM Sessions
GROUP BY speaker_name
HAVING COUNT(session_id) > 1;