
ALTER TABLE public.contact_messages
  ADD CONSTRAINT contact_messages_lengths CHECK (
    char_length(full_name) BETWEEN 1 AND 100 AND
    char_length(email) BETWEEN 3 AND 255 AND
    (phone IS NULL OR char_length(phone) <= 30) AND
    (subject IS NULL OR char_length(subject) <= 200) AND
    char_length(message) BETWEEN 1 AND 2000
  );
