-- Exercise 9: Organizer Event Summary
SELECT e.organizer_id, u.full_name,
    SUM(e.status = 'upcoming') AS upcoming_events,
    SUM(e.status = 'completed') AS completed_events,
    SUM(e.status = 'cancelled') AS cancelled_events
FROM Events e
JOIN Users u ON e.organizer_id = u.user_id
GROUP BY e.organizer_id, u.full_name;