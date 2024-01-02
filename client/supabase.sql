-- Drop Existing Database
DROP SCHEMA PUBLIC CASCADE;
CREATE SCHEMA PUBLIC;

-- Create Enums
CREATE TYPE privilege_type AS ENUM ('admin', 'organizer', 'user');

-- Create Tables
CREATE TABLE public.users (
    id UUID PRIMARY KEY,
    email TEXT NOT NULL,
    username TEXT NOT NULL,
    firstname TEXT NOT NULL,
    lastname TEXT NOT NULL,
    address TEXT NOT NULL,
    birthday TIMESTAMPTZ DEFAULT NOW(),
    info TEXT NOT NULL,
    privilege privilege_type DEFAULT 'user' NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE TABLE public.events (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    organizer_id UUID NOT NULL,
    title TEXT NOT NULL,
    info TEXT NOT NULL,
    location TEXT NOT NULL,
    date TIMESTAMPTZ NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    is_cancelled BOOLEAN DEFAULT FALSE
);

CREATE TABLE public.event_members (
    user_id UUID NOT NULL,
    event_id UUID NOT NULL,
    acceptor_id UUID,
    joined_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.comments (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    event_id UUID NOT NULL,
    comment_id UUID,
    user_id UUID NOT NULL,
    comment TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.join_event_requests (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID NOT NULL,
    event_id UUID NOT NULL,
    message TEXT,
    requested_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.join_organizer_requests (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID NOT NULL,
    message TEXT,
    requested_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.votes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(), 
    user_id UUID NOT NULL,
    event_id UUID NOT NULL,
    comment_id UUID,
    is_like BOOLEAN NOT NULL,
    voted_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(), 
    user_id UUID NOT NULL,
    event_id UUID,
    title TEXT,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.bookmarks (
    user_id UUID NOT NULL,
    event_id UUID,
    created_at TIMESTAMPTZ DEFAULT NOW()
)

-- Add Foreign Keys
ALTER TABLE public.users
    ADD CONSTRAINT fk_auth_users
    FOREIGN KEY (id) REFERENCES auth.users (id)
    ON DELETE CASCADE;

ALTER TABLE public.comments
    ADD CONSTRAINT fk_comments_event_id
    FOREIGN KEY (event_id)
    REFERENCES public.events (id)
    ON DELETE CASCADE;

ALTER TABLE public.comments
    ADD CONSTRAINT fk_comments_comment_id
    FOREIGN KEY (comment_id)
    REFERENCES public.comments (id)
    ON DELETE CASCADE;

ALTER TABLE public.comments
    ADD CONSTRAINT fk_comments_user_id
    FOREIGN KEY (user_id)
    REFERENCES public.users (id)
    ON DELETE CASCADE;

ALTER TABLE public.event_members
    ADD CONSTRAINT fk_event_members_user_id
    FOREIGN KEY (user_id)
    REFERENCES public.users (id);
    ON DELETE CASCADE;

ALTER TABLE public.event_members
    ADD CONSTRAINT fk_event_members_event_id
    FOREIGN KEY (event_id)
    REFERENCES public.events (id)
    ON DELETE CASCADE;

ALTER TABLE public.event_members
    ADD CONSTRAINT fk_event_members_acceptor_id
    FOREIGN KEY (acceptor_id)
    REFERENCES public.users (id)
    ON DELETE CASCADE;

ALTER TABLE public.events
    ADD CONSTRAINT fk_events_organizer_id
    FOREIGN KEY (organizer_id)
    REFERENCES public.users (id)
    ON DELETE CASCADE;

ALTER TABLE public.join_event_requests
    ADD CONSTRAINT fk_join_event_requests_user_id
    FOREIGN KEY (user_id)
    REFERENCES public.users (id)
    ON DELETE CASCADE;

ALTER TABLE public.join_event_requests
    ADD CONSTRAINT fk_join_event_requests_event_id
    FOREIGN KEY (event_id)
    REFERENCES public.events (id)
    ON DELETE CASCADE;

ALTER TABLE public.join_organizer_requests
    ADD CONSTRAINT fk_join_organizer_requests_user_id
    FOREIGN KEY (user_id)
    REFERENCES public.users (id)
    ON DELETE CASCADE;

ALTER TABLE public.votes
    ADD CONSTRAINT fk_votes_user_id
    FOREIGN KEY (user_id)
    REFERENCES public.users (id)
    ON DELETE CASCADE;

ALTER TABLE public.votes
    ADD CONSTRAINT fk_votes_comment_id
    FOREIGN KEY (comment_id)
    REFERENCES public.comments (id)
    ON DELETE CASCADE;

ALTER TABLE public.votes
    ADD CONSTRAINT fk_votes_event_id
    FOREIGN KEY (event_id)
    REFERENCES public.events (id)
    ON DELETE CASCADE;

ALTER TABLE public.notifications
    ADD CONSTRAINT fk_notifications_user_id
    FOREIGN KEY (user_id)
    REFERENCES public.users (id)
    ON DELETE CASCADE;

ALTER TABLE public.notifications
    ADD CONSTRAINT fk_notifications_event_id
    FOREIGN KEY (event_id)
    REFERENCES public.events (id)
    ON DELETE CASCADE;

ALTER TABLE public.bookmarks
    ADD CONSTRAINT fk_bookmarks_user_id
    FOREIGN KEY (user_id)
    REFERENCES public.users (id)
    ON DELETE CASCADE;

ALTER TABLE public.bookmarks
    ADD CONSTRAINT fk_bookmarks_event_id
    FOREIGN KEY (event_id)
    REFERENCES public.events (id)
    ON DELETE CASCADE;

ALTER TABLE public.bookmarks
    ADD CONSTRAINT uq_bookmarks UNIQUE (user_id, event_id);

ALTER TABLE public.join_event_requests
    ADD CONSTRAINT uq_join_event_requests UNIQUE (user_id, event_id);
    
ALTER TABLE public.join_organizer_requests
    ADD CONSTRAINT uq_join_organizer_requests UNIQUE (user_id);

-- Permission
GRANT usage ON schema "public" TO anon;
GRANT usage ON schema "public" TO authenticated;

GRANT SELECT, INSERT, UPDATE ON ALL TABLES IN SCHEMA "public" TO authenticated;
GRANT SELECT, INSERT, UPDATE ON ALL TABLES IN SCHEMA "public" TO anon;








INSERT INTO storage.buckets
  (id, name, public)
VALUES 
  ('avatars', 'avatars', true);


INSERT INTO storage.buckets
  (id, name, public)
VALUES 
  ('cover_photos', 'cover_photos', true);


INSERT INTO storage.buckets
  (id, name, public)
VALUES 
  ('event_photos', 'event_photos', true);


INSERT INTO storage.buckets
  (id, name, public)
VALUES 
  ('comment_photos', 'comment_photos', true);


CREATE POLICY "Public Access Event"
ON storage.objects FOR SELECT
USING ( bucket_id = 'event_photos' );

CREATE POLICY "Public Access Comment"
ON storage.objects FOR SELECT
USING ( bucket_id = 'comment_photos' );

CREATE POLICY "Public Access Avatar"
ON storage.objects FOR INSERT WITH CHECK (true);
CREATE POLICY "Public Access Avatar"
ON storage.objects FOR UPDATE WITH CHECK (true);

CREATE POLICY "Public Access Cover Photos"
ON storage.objects FOR INSERT WITH CHECK (true);

create policy "Public Insert"
ON storage.buckets
for insert with check (true);

create policy "Public Update"
ON storage.buckets
for update with check (true);

create policy "Public Insert Objects"
ON storage.objects
for insert with check (true);

create policy "Public Update Objects"
ON storage.objects
for update with check (true);

CREATE POLICY "Enable All Authenticated Users" ON storage.buckets AS PERMISSIVE FOR ALL TO authenticated WITH CHECK (true);
CREATE POLICY "Enable All Anon Users" ON storage.buckets AS PERMISSIVE FOR ALL TO anon WITH CHECK (true);

CREATE POLICY "Enable All Authenticated Users" ON storage.objects AS PERMISSIVE FOR ALL TO authenticated WITH CHECK (true);
CREATE POLICY "Enable All Anon Users" ON storage.objects AS PERMISSIVE FOR ALL TO anon WITH CHECK (true);

-- Permission
GRANT usage ON schema "storage" TO anon;
GRANT usage ON schema "storage" TO authenticated;

GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA "storage" TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA "storage" TO anon;








-- User Trigger and Create User
DROP FUNCTION IF EXISTS public.create_user();
CREATE 
OR REPLACE FUNCTION public.create_user() RETURNS TRIGGER AS $$
  BEGIN
    INSERT INTO 
    public.users (
      id, 
      email,
      firstname, 
      lastname, 
      username, 
      birthday, 
      address, 
      info
    ) VALUES (
      new.id, 
      new.email,
      new.raw_user_meta_data->>'firstname', 
      new.raw_user_meta_data->>'lastname', 
      new.raw_user_meta_data->>'username', 
      CAST(new.raw_user_meta_data->>'birthday' AS TIMESTAMPTZ), 
      new.raw_user_meta_data->>'address', 
      new.raw_user_meta_data->>'info'
    );
    RETURN new;
  END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
DROP TRIGGER IF EXISTS create_user_trigger ON auth.users;
CREATE TRIGGER create_user_trigger AFTER INSERT ON auth.users FOR EACH ROW EXECUTE PROCEDURE public.create_user();

-- Get User By Id
DROP FUNCTION IF EXISTS get_user(UUID);
CREATE OR REPLACE FUNCTION get_user(user_id_input uuid) RETURNS public.users AS $$
  DECLARE
    result RECORD;
  BEGIN
    SELECT * INTO result FROM public.users WHERE public.users.id = user_id_input LIMIT 1;
    return result;
  END;
$$ LANGUAGE plpgsql SECURITY DEFINER; 
SELECT * FROM get_user('f1ec30f4-e7b6-401e-a9c2-1913c9a41a30');


-- Delete User By Id
DROP FUNCTION IF EXISTS delete_user();
CREATE OR REPLACE FUNCTION delete_user(user_id_input uuid) RETURNS void AS $$
  BEGIN
    DELETE FROM public.users WHERE public.users.id = user_id_input;
  END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


-- Request To Be Organizer
DROP FUNCTION IF EXISTS request_to_be_organizer();
CREATE OR REPLACE FUNCTION request_to_be_organizer(user_id_input UUID, message TEXT) RETURNS void AS $$
  DECLARE
    admin_record RECORD;
    requester_username TEXT;
  BEGIN

    IF user_id_input NOT IN (SELECT user_id FROM public.join_organizer_requests) THEN
      SELECT username INTO requester_username FROM public.users WHERE id = user_id_input;
      INSERT INTO public.join_organizer_requests (user_id, message) VALUES (user_id_input, message);

      FOR admin_record IN SELECT * FROM public.users WHERE public.users.privilege = 'admin'
      LOOP
        INSERT INTO public.notifications (user_id, title, message) VALUES (admin_record.id, 'Organizer Request', 'User' || requester_username || ' has requester to be an organizer');
      END LOOP;
    END IF;
  END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


-- Accept To Be Organizer Request
DROP FUNCTION IF EXISTS accept_request_to_be_organizer(UUID);
CREATE OR REPLACE FUNCTION accept_request_to_be_organizer(user_id_input UUID) RETURNS void AS $$
  BEGIN
    DELETE FROM public.join_organizer_requests WHERE public.join_organizer_requests.user_id = user_id_input;
    UPDATE public.users SET privilege = 'organizer' WHERE id = user_id_input;
    INSERT INTO public.notifications (user_id, title, message) VALUES (user_id_input, 'Request Accepted', 'An admin has accepted your organizer request!');
  END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


-- Delete To Be Organizer Request
DROP FUNCTION IF EXISTS deny_request_to_be_organizer(UUID);
CREATE OR REPLACE FUNCTION deny_request_to_be_organizer(user_id_input UUID) RETURNS void AS $$
  BEGIN
    DELETE FROM public.join_organizer_requests WHERE public.join_organizer_requests.user_id = user_id_input;
    INSERT INTO public.notifications (user_id, title, message) VALUES (user_id_input, 'Request Denied', 'An admin has denied your organizer request...');
  END;
$$ LANGUAGE plpgsql SECURITY DEFINER;




-- Create type
DROP TYPE IF EXISTS event_members_type CASCADE;
CREATE TYPE event_members_type AS (
  id uuid, 
  username TEXT,
  privilege privilege_type, 
  joined_at TIMESTAMPTZ
);

DROP TYPE IF EXISTS simple_user_type CASCADE;
CREATE TYPE simple_user_type AS (
  id UUID,
  username TEXT,
  privilege privilege_type,
  email TEXT
);

DROP TYPE IF EXISTS follow_status_type CASCADE;
CREATE TYPE follow_status_type AS ENUM ('followed', 'unfollowed', 'pending');

DROP TYPE IF EXISTS fetch_events_filter CASCADE;
CREATE TYPE fetch_events_filter AS ENUM ('all', 'followed', 'bookmarked', 'commented', 'liked', 'disliked', 'organized');

DROP TYPE IF EXISTS status_type CASCADE;
CREATE TYPE status_type AS (
  event_id UUID,
  comment_id UUID,
  upvotes BIGINT,
  downvotes BIGINT,
  is_voted INT,
  comments_count BIGINT,
  is_bookmarked BOOL,
  follow_status follow_status_type
);


DROP TYPE IF EXISTS event_type CASCADE;
CREATE TYPE event_type AS (
  id UUID,
  organizer_id UUID,
  title TEXT,
  info TEXT,
  location TEXT,
  date TIMESTAMPTZ,
  created_at TIMESTAMPTZ,
  is_cancelled BOOL,
  organizer simple_user_type,
  status status_type
);


DROP TYPE IF EXISTS comments_type CASCADE;
CREATE TYPE comments_type AS (
  id UUID,
  event_id UUID,
  comment_id UUID,
  user_id UUID,
  comment TEXT,
  created_at TIMESTAMPTZ,
  commenter simple_user_type,
  status status_type
);


-- Get Status On Event
DROP FUNCTION IF EXISTS get_event_status(UUID, UUID);
CREATE OR REPLACE FUNCTION get_event_status(event_id_input UUID, user_id_input UUID DEFAULT NULL) RETURNS status_type AS $$
  DECLARE
    result status_type;
  BEGIN
    SELECT
      e.id,
      v.comment_id,
      COALESCE(SUM(CASE WHEN v.is_like = TRUE THEN 1 ELSE 0 END), 0) AS upvotes,
      COALESCE(SUM(CASE WHEN v.is_like = FALSE THEN 1 ELSE 0 END), 0) AS downvotes,
      COALESCE((SELECT (CASE WHEN q.is_like = TRUE THEN 1 ELSE -1 END) FROM (SELECT vo.is_like FROM public.votes AS vo WHERE vo.user_id = user_id_input AND vo.event_id = event_id_input AND vo.comment_id IS NULL) AS q), 0) AS is_voted,
      COALESCE((SELECT COUNT(*) FROM public.comments AS c WHERE c.event_id = e.id), 0) AS comments_count,
      (user_id_input IN (SELECT user_id FROM public.bookmarks AS b WHERE b.event_id = e.id)) AS is_bookmarked,
      (CASE 
        WHEN user_id_input IN (SELECT user_id FROM public.event_members AS em WHERE em.event_id = event_id_input) THEN 'followed'
        WHEN user_id_input IN (SELECT user_id FROM public.join_event_requests AS jer WHERE jer.event_id = event_id_input) THEN 'pending'
        ELSE 'unfollowed' END
      ) AS follow_status
    INTO result
    FROM public.events AS e
    LEFT JOIN public.votes AS v ON e.id = v.event_id AND v.comment_id IS NULL
    WHERE e.id = event_id_input
    GROUP BY e.id, v.comment_id
    LIMIT 1;

    RETURN result;
  END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
SELECT * FROM get_event_status('957d4ef7-fdc8-4f89-8bf5-16eeb98dba4d', 'f1ec30f4-e7b6-401e-a9c2-1913c9a41a30');


-- Get Status On Comment
DROP FUNCTION IF EXISTS get_comment_status(UUID, UUID);
CREATE OR REPLACE FUNCTION get_comment_status(comment_id_input UUID, user_id_input UUID DEFAULT NULL) RETURNS status_type AS $$
  DECLARE
    result status_type;
  BEGIN
    SELECT
      c.event_id,
      c.comment_id,
      COALESCE(SUM(CASE WHEN v.is_like = TRUE THEN 1 ELSE 0 END), 0) AS upvotes,
      COALESCE(SUM(CASE WHEN v.is_like = FALSE THEN 1 ELSE 0 END), 0) AS downvotes,
      COALESCE((SELECT (CASE WHEN q.is_like = TRUE THEN 1 ELSE -1 END) FROM (SELECT vo.is_like FROM public.votes AS vo WHERE vo.user_id = user_id_input AND vo.comment_id = comment_id_input) AS q), 0) AS is_voted,
      COALESCE((SELECT COUNT(*) FROM public.comments AS cc WHERE cc.comment_id = c.id), 0) AS comments_count,
      FALSE AS is_bookmarked,
      'unfollowed' AS is_followed
    INTO result
    FROM public.comments AS c
    LEFT JOIN public.votes AS v ON c.id = v.comment_id
    WHERE c.id = comment_id_input
    GROUP BY c.id, v.comment_id
    LIMIT 1;

    RETURN result;
  END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
SELECT * FROM get_comment_status('6123b32e-494e-4818-a391-3b99d3ad90e6', 'f1ec30f4-e7b6-401e-a9c2-1913c9a41a30');


-- Get Event Organizer
DROP FUNCTION IF EXISTS get_event_organizer(UUID);
CREATE OR REPLACE FUNCTION get_event_organizer(event_id_input UUID) RETURNS simple_user_type AS $$
  DECLARE
    result simple_user_type;
  BEGIN
    SELECT u.id, u.username, u.privilege, u.email
    INTO result
    FROM public.events AS e 
    LEFT JOIN public.users AS u ON u.id = e.organizer_id
    WHERE e.id = event_id_input
    LIMIT 1;

    RETURN result;
  END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
SELECT * FROM get_event_organizer('957d4ef7-fdc8-4f89-8bf5-16eeb98dba4d');


-- Get Comment Creator
DROP FUNCTION IF EXISTS get_comment_creator(UUID);
CREATE OR REPLACE FUNCTION get_comment_creator(comment_id_input UUID) RETURNS simple_user_type AS $$
  DECLARE
    result simple_user_type;
  BEGIN
    SELECT u.id, u.username, u.privilege, u.email
    INTO result
    FROM public.comments AS c
    LEFT JOIN public.users AS u ON u.id = c.user_id
    WHERE c.id = comment_id_input
    LIMIT 1;

    RETURN result;
  END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
SELECT * FROM get_comment_creator('04551a90-1a29-4ca6-a170-2704fb1525f9');


-- Get Simple User
DROP FUNCTION IF EXISTS get_simple_user(UUID);
CREATE OR REPLACE FUNCTION get_simple_user(user_id_input UUID) RETURNS simple_user_type AS $$
  DECLARE
    result simple_user_type;
  BEGIN
    SELECT u.id, u.username, u.privilege, u.email
    INTO result
    FROM public.users AS u
    WHERE u.id = user_id_input
    LIMIT 1;

    RETURN result;
  END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
SELECT * FROM get_simple_user('f1ec30f4-e7b6-401e-a9c2-1913c9a41a30');


-- Get Event Members  
DROP FUNCTION IF EXISTS get_event_members(UUID);
CREATE OR REPLACE FUNCTION get_event_members(event_id_input UUID) RETURNS SETOF event_members_type AS $$
  BEGIN
    RETURN QUERY 
    SELECT u.id, u.username, u.privilege, e_members.joined_at
    FROM public.event_members AS e_members JOIN public.users AS u ON e_members.user_id = u.id WHERE e_members.event_id = event_id_input;
  END;
$$ LANGUAGE plpgsql; 
SELECT * FROM get_event_members('957d4ef7-fdc8-4f89-8bf5-16eeb98dba4d');


-- Get Event by Id
DROP FUNCTION IF EXISTS get_event(UUID, UUID);
CREATE OR REPLACE FUNCTION get_event(event_id_input UUID, user_id_input UUID DEFAULT NULL) RETURNS event_type AS $$
  DECLARE
    result event_type;
  BEGIN
    SELECT
      e.id, e.organizer_id, e.title, e.info, e.location, e.date, e.created_at, e.is_cancelled,
      (get_event_organizer(e.id))::simple_user_type AS organizer,
      (get_event_status(e.id, user_id_input))::status_type AS status
    INTO result
    FROM public.events AS e 
    WHERE e.id = event_id_input;

    RETURN result;
  END;
$$ LANGUAGE plpgsql SECURITY DEFINER; 
SELECT * FROM get_event('957d4ef7-fdc8-4f89-8bf5-16eeb98dba4d');


-- Get Events
DROP FUNCTION IF EXISTS get_events(UUID, fetch_events_filter);
CREATE OR REPLACE FUNCTION get_events(user_id_input UUID DEFAULT NULL, filter fetch_events_filter DEFAULT 'all') RETURNS SETOF event_type AS $$
  BEGIN
    RETURN QUERY 
    SELECT 
      e.id, e.organizer_id, e.title, e.info, e.location, e.date, e.created_at, e.is_cancelled,
      (get_event_organizer(e.id))::simple_user_type AS organizer,
      (get_event_status(e.id, user_id_input))::status_type AS status
    FROM public.events AS e 
    WHERE 
      (filter = 'all') OR
      (filter = 'followed' AND user_id_input IN (SELECT user_id FROM public.event_members AS em WHERE em.event_id = e.id)) OR 
      (filter = 'bookmarked' AND user_id_input IN (SELECT user_id FROM public.bookmarks AS bb WHERE bb.event_id = e.id)) OR 
      (filter = 'commented' AND user_id_input IN (SELECT user_id FROM public.comments AS cc WHERE cc.event_id = e.id)) OR
      (filter = 'liked' AND user_id_input IN (SELECT user_id FROM public.votes AS vv WHERE vv.event_id = e.id AND vv.is_like = TRUE)) OR
      (filter = 'disliked' AND user_id_input IN (SELECT user_id FROM public.votes AS vv WHERE vv.event_id = e.id AND vv.is_like = FALSE)) OR
      (filter = 'organized' AND user_id_input = e.organizer_id)
    ORDER BY e.created_at;
  END;
$$ LANGUAGE plpgsql SECURITY DEFINER; 
SELECT * FROM get_events('f1ec30f4-e7b6-401e-a9c2-1913c9a41a30');


-- Get Event Comments
DROP FUNCTION IF EXISTS get_event_comments(UUID);
CREATE OR REPLACE FUNCTION get_event_comments(event_id_input UUID, user_id_input UUID DEFAULT NULL) RETURNS SETOF comments_type AS $$
  BEGIN
    RETURN QUERY
    SELECT
      c.id, c.event_id, c.comment_id, c.user_id, c.comment, c.created_at,
      (get_comment_creator(c.id))::simple_user_type AS creator,
      (get_comment_status(c.id, user_id_input))::status_type AS status
    FROM public.comments AS c
    WHERE c.event_id = event_id_input;
  END;
$$ LANGUAGE plpgsql SECURITY DEFINER; 
SELECT * FROM get_event_comments('957d4ef7-fdc8-4f89-8bf5-16eeb98dba4d', 'f1ec30f4-e7b6-401e-a9c2-1913c9a41a30');


-- Get Comment Comments
DROP FUNCTION IF EXISTS get_comment_comments(UUID);
CREATE OR REPLACE FUNCTION get_comment_comments(comment_id_input UUID, user_id_input UUID DEFAULT NULL) RETURNS SETOF comments_type AS $$
  BEGIN
    RETURN QUERY
    SELECT
      c.id, c.event_id, c.comment_id, c.user_id, c.comment, c.created_at,
      (get_comment_creator(c.id))::simple_user_type AS creator,
      (get_comment_status(c.id, user_id_input))::status_type AS status
    FROM public.comments AS c
    WHERE c.id = comment_id_input;
  END;
$$ LANGUAGE plpgsql SECURITY DEFINER; 
SELECT * FROM get_comment_comments('f529162a-5d57-4847-8a81-95c601f95d56');


-- Get Notifications
DROP FUNCTION IF EXISTS get_notifications(UUID);
CREATE OR REPLACE FUNCTION get_notifications(user_id_input UUID) RETURNS SETOF public.notifications AS $$
  BEGIN
    RETURN QUERY
    SELECT * FROM public.notifications WHERE user_id = user_id_input;
  END;
$$ LANGUAGE plpgsql SECURITY DEFINER; 
SELECT * FROM get_notifications('f1ec30f4-e7b6-401e-a9c2-1913c9a41a30');



-- Get All Organizer Requests 
DROP FUNCTION IF EXISTS get_all_join_organizer_requests();
CREATE OR REPLACE FUNCTION get_all_join_organizer_requests() RETURNS TABLE (
  id UUID, user_id UUID, message TEXT, requested_at TIMESTAMPTZ, requester simple_user_type
)  AS $$
  BEGIN
    RETURN QUERY
    SELECT j.id, j.user_id, j.message, j.requested_at, (get_simple_user(j.user_id))::simple_user_type AS requester FROM public.join_organizer_requests AS j;
  END;
$$ LANGUAGE plpgsql SECURITY DEFINER; 
SELECT * FROM get_all_join_organizer_requests();



DROP TYPE IF EXISTS join_event_requests_type CASCADE;
CREATE TYPE join_event_requests_type AS (
  id UUID, user_id UUID, event_id UUID, message TEXT, requested_at TIMESTAMPTZ, requester simple_user_type
);


-- Get All Event Join Event Requests
DROP FUNCTION IF EXISTS get_all_join_event_requests(UUID);
CREATE OR REPLACE FUNCTION get_all_join_event_requests(event_id_input UUID) RETURNS SETOF join_event_requests_type  AS $$
  BEGIN
    RETURN QUERY
    SELECT j.id, j.user_id, j.event_id, j.message, j.requested_at, (get_simple_user(j.user_id))::simple_user_type AS requester FROM public.join_event_requests AS j WHERE j.event_id = event_id_input;
  END;
$$ LANGUAGE plpgsql SECURITY DEFINER; 
SELECT * FROM get_all_join_event_requests('957d4ef7-fdc8-4f89-8bf5-16eeb98dba4d');


-- Get All Organizer Join Event Requests
DROP FUNCTION IF EXISTS get_all_organizer_join_event_requests(UUID);
CREATE OR REPLACE FUNCTION get_all_organizer_join_event_requests(user_id_input UUID) RETURNS SETOF join_event_requests_type  AS $$
  BEGIN
    RETURN QUERY
    SELECT j.id, j.user_id, j.event_id, j.message, j.requested_at, (get_simple_user(j.user_id))::simple_user_type AS requester 
    FROM public.join_event_requests AS j WHERE (SELECT id FROM get_event_organizer(j.event_id)) = user_id_input;
  END;
$$ LANGUAGE plpgsql SECURITY DEFINER; 
SELECT * FROM get_all_organizer_join_event_requests('f1ec30f4-e7b6-401e-a9c2-1913c9a41a30');


-- Search 
-- DROP FUNCTION IF EXISTS search(TEXT);
-- CREATE OR REPLACE FUNCTION search(keyword TEXT) RETURNS TABLE (
--   users public.users,
--   events public.events,
--   comments public.comments
-- ) AS $$
--   BEGIN
--     RETURN QUERY
--     SELECT 
--       (SELECT * FROM users WHERE to_tsvector(firstname || ' ' || ))
--   END;
-- $$ LANGUAGE plpgsql SECURITY DEFINER; 






-- Comment On Event 
DROP FUNCTION IF EXISTS comment_on_event(UUID, UUID, TEXT);
CREATE OR REPLACE FUNCTION comment_on_event(event_id_input UUID, user_id_input UUID, comment TEXT) RETURNS void AS $$
  DECLARE
    username_var TEXT;
    organizer_id_var UUID;
  BEGIN
    INSERT INTO public.comments (event_id, user_id, comment) VALUES (event_id_input, user_id_input, comment);
    SELECT username INTO username_var FROM public.users WHERE id = user_id_input;
    SELECT organizer_id INTO organizer_id_var FROM get_event_organizer(event_id_input);

    IF user_id_input <> organizer_id_var THEN
      INSERT INTO public.notifications (user_id, event_id, title, message) VALUES (organizer_id_var, event_id_input, 'New Comment', username_var || ' has commented "' || comment || '" on your event post!');
    END IF;
  END;
$$ LANGUAGE plpgsql SECURITY DEFINER; 


-- Comment On Comment
DROP FUNCTION IF EXISTS comment_on_comment(UUID, UUID, UUID, TEXT);
CREATE OR REPLACE FUNCTION comment_on_comment(event_id_input UUID, user_id_input UUID, comment_id_input UUID, comment TEXT) RETURNS void AS $$
  DECLARE
    username_var TEXT;
    creator_id_var UUID;
  BEGIN
    INSERT INTO public.comments (event_id, user_id, comment_id, comment) VALUES (event_id_input, user_id_input, comment_id_input, comment);
    SELECT username INTO username_var FROM public.users WHERE id = user_id_input;
    SELECT organizer_id INTO creator_id_var FROM get_comment_creator(comment_id_input);

    IF user_id_input <> organizer_id_var THEN
      INSERT INTO public.notifications (user_id, event_id, title, message) VALUES (creator_id_var, event_id_input, 'New Comment', username_var || ' has commented "' || comment || '" on your comment!');
    END IF;
  END;
$$ LANGUAGE plpgsql SECURITY DEFINER; 


-- Create Event
DROP FUNCTION IF EXISTS create_event(TEXT, TIMESTAMPTZ, TEXT, TEXT, UUID);
CREATE OR REPLACE FUNCTION create_event(title TEXT, date TIMESTAMPTZ, location TEXT, info TEXT, organizer_id UUID) RETURNS public.events AS $$
  DECLARE
    new_event RECORD;
  BEGIN
    INSERT INTO public.events (title, date, location, info, organizer_id) VALUES (title, date, location, info, organizer_id) RETURNING * INTO new_event;
    INSERT INTO public.event_members (user_id, event_id, joined_at) VALUES (organizer_id, new_event.id, new_event.created_at);
    RETURN new_event;
  END;
$$ LANGUAGE plpgsql; 


-- Request To Join Event
DROP FUNCTION IF EXISTS request_to_join_event(UUID, UUID, TEXT);
CREATE OR REPLACE FUNCTION request_to_join_event(user_id_input UUID, event_id_input UUID, message TEXT) RETURNS void AS $$
  DECLARE
    username_var TEXT;
    organizer_id_var UUID;
  BEGIN
    IF user_id_input NOT IN (SELECT user_id FROM public.event_members AS em WHERE em.event_id = event_id_input) THEN
      IF user_id_input = (SELECT organizer_id FROM public.events AS em WHERE em.id = event_id_input) THEN 
        INSERT INTO public.event_members (user_id, event_id) VALUES (user_id_input, event_id_input);
      ELSE
        INSERT INTO public.join_event_requests(user_id, event_id, message) VALUES (user_id_input, event_id_input, message);
        SELECT username INTO username_var FROM public.users WHERE id = user_id_input;
        SELECT organizer_id INTO organizer_id_var FROM get_event_organizer(event_id_input);
        INSERT INTO public.notifications (user_id, event_id, title, message) VALUES (organizer_id_var, event_id_input, 'Join Request', username_var || ' has requested to join your event!');
      END IF;
    END IF;
  END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


-- Accept Request To Join Event
DROP FUNCTION IF EXISTS accept_request_to_join_event(UUID, UUID, UUID);
CREATE OR REPLACE FUNCTION accept_request_to_join_event(user_id_input UUID, event_id_input UUID, acceptor_id_input UUID DEFAULT NULL) RETURNS void AS $$
  DECLARE
    username_var TEXT;
  BEGIN
    DELETE FROM public.join_event_requests WHERE public.join_event_requests.user_id = user_id_input AND public.join_event_requests.event_id = event_id_input;
    INSERT INTO public.event_members (user_id, event_id, acceptor_id) VALUES (user_id_input, event_id_input, acceptor_id_input);

    SELECT username INTO username_var FROM public.users WHERE id = acceptor_id_input;
    INSERT INTO public.notifications (user_id, event_id, title,  message) VALUES (user_id_input, event_id_input, 'Request Accepted', username_var || ' has accepted your request to join his event!');
  END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


-- Delete Event By Id
DROP FUNCTION IF EXISTS delete_event(UUID);
CREATE OR REPLACE FUNCTION delete_event(event_id UUID) RETURNS void AS $$
  BEGIN
    DELETE FROM public.events WHERE public.events.event_id = event_id;
  END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


-- Cancel Event By Id
DROP FUNCTION IF EXISTS cancel_event(UUID);
CREATE OR REPLACE FUNCTION cancel_event(event_id_input UUID) RETURNS void AS $$
  DECLARE
    user_record RECORD;
    event_var RECORD;
    organizer_var RECORD;
  BEGIN
    UPDATE public.events SET is_cancelled = TRUE WHERE public.events.id = event_id_input;
    SELECT * INTO event_var FROM public.events WHERE id = event_id_input;
    SELECT * INTO organizer_var FROM get_event_organizer(event_id_input);
    FOR user_record IN SELECT * FROM get_event_members(event_id_input)
    LOOP
      INSERT INTO public.notifications (user_id, event_id, title, message) VALUES (user_record.id, event_id_input, 'Event Cancelled', 'Unfortunately, ' || organizer_var.username || '''s' || event_var.title || ' was cancelled.');
    END LOOP;
  END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


-- Unfollow Event By Id
DROP FUNCTION IF EXISTS unfollow_event(UUID, UUID);
CREATE OR REPLACE FUNCTION unfollow_event(user_id_input UUID, event_id_input UUID) RETURNS void AS $$
  BEGIN
    DELETE FROM public.event_members WHERE public.event_members.user_id = user_id_input AND public.event_members.event_id = event_id_input;
  END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


-- Vote Post
DROP FUNCTION IF EXISTS vote_post(UUID, UUID, BOOL, UUID);
CREATE OR REPLACE FUNCTION vote_post(user_id_input UUID, event_id_input UUID, is_like_input BOOL DEFAULT TRUE, comment_id_input UUID DEFAULT NULL) RETURNS void AS $$
  DECLARE
    votes_record RECORD;
  BEGIN
    SELECT * INTO votes_record FROM public.votes 
    WHERE user_id = user_id_input AND event_id = event_id_input AND ((comment_id_input IS NULL AND comment_id IS NULL) OR (comment_id_input IS NOT NULL AND comment_id = comment_id_input)) LIMIT 1;

    IF EXISTS (
      SELECT 1 FROM public.votes 
      WHERE user_id = user_id_input AND event_id = event_id_input AND ((comment_id_input IS NULL AND comment_id IS NULL) OR (comment_id_input IS NOT NULL AND comment_id = comment_id_input))
    ) THEN
      IF votes_record.is_like != is_like_input THEN
        UPDATE public.votes SET is_like = NOT is_like 
        WHERE user_id = user_id_input AND event_id = event_id_input AND ((comment_id_input IS NULL AND comment_id IS NULL) OR (comment_id_input IS NOT NULL AND comment_id = comment_id_input));
      ELSE
        DELETE FROM public.votes WHERE user_id = user_id_input AND event_id = event_id_input AND ((comment_id_input IS NULL AND comment_id IS NULL) OR (comment_id_input IS NOT NULL AND comment_id = comment_id_input)) AND is_like = is_like_input;
      END IF;
    ELSE
      INSERT INTO public.votes (user_id, event_id, comment_id, is_like) VALUES (user_id_input, event_id_input, comment_id_input, is_like_input);
    END IF;

  END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


-- Bookmark Event
DROP FUNCTION IF EXISTS bookmark_event(UUID, UUID);
CREATE OR REPLACE FUNCTION bookmark_event(user_id_input UUID, event_id_input UUID) RETURNS void AS $$
  BEGIN
    INSERT INTO public.bookmarks (user_id, event_id) VALUES (user_id_input, event_id_input);
  END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


-- Unbookmark Event
DROP FUNCTION IF EXISTS unbookmark_event(UUID, UUID);
CREATE OR REPLACE FUNCTION unbookmark_event(user_id_input UUID, event_id_input UUID) RETURNS void AS $$
  BEGIN
    DELETE FROM public.bookmarks WHERE user_id = user_id_input AND event_id = event_id_input;
  END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


-- Mark Notification 
DROP FUNCTION IF EXISTS mark_notification(UUID, BOOLEAN);
CREATE OR REPLACE FUNCTION mark_notification(notification_id_input UUID, is_read_input BOOLEAN DEFAULT TRUE) RETURNS void AS $$
  BEGIN
    UPDATE public.notifications SET is_read = is_read_input WHERE id = notification_id_input;
  END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


-- Mark All Notifications
DROP FUNCTION IF EXISTS mark_all_notification(UUID, BOOLEAN);
CREATE OR REPLACE FUNCTION mark_all_notification(user_id_input UUID, is_read_input BOOLEAN DEFAULT TRUE) RETURNS void AS $$
  BEGIN
    UPDATE public.notifications SET is_read = is_read_input WHERE user_id = user_id_input;
  END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
