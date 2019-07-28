INSERT INTO users (user_name,password) VALUES ('Marcus', 'Marcus'), ('John', 'John'),('Kenny','Kenny');
INSERT INTO userevents (user_id,event_id) VALUES (1, 1), (2, 2),(1,3);
INSERT INTO eventinfo (event_name,event_details) VALUES ('Honeywood','Ride it out!'),('99 Bend','Watch out for your knee!');
INSERT INTO signups (user_id, event_id) VALUES (1,1),(2,1),(3,2),(1,2);
INSERT INTO userarticles (user_id, article_id) VALUES (1,1),(1,2),(3,3);
INSERT INTO articles (title,content) VALUES ('A day at the beach', 'Blah blah blah content'),('A day at the park', 'New Blah blah blah content');
INSERT INTO userarticles (user_id, article_id) VALUES (1,1),(3,2);
