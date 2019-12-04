BEGIN;

INSERT INTO noteful_notes
    (id, note_name, modified, folder_id, content)

VALUES
    ('1', 'Episode One', '2019-01-03T00:00:00.000Z', '1', 'Corporis accusamus placeat quas non voluptas.'),
    ('2', 'Episode Two', '2019-03-05T00:00:00.000Z', '2', 'Eos laudantium quia ab blanditiis temporibus necessitatibus.'),
    ('3', 'Episode Three', '2019-08-30T00:00:00.000Z', '3', 'Occaecati dignissimos quam qui facere deserunt quia.'),
    ('5', 'Episode Five', '2019-07-11T00:00:00.000Z', '1', 'Distinctio dolor nihil ad iure quo tempore id ipsum.'),
    ('6', 'Episode Six', '2019-10-03T00:00:00.000Z', '3', 'Aliquid magnam ut quis quas impedit molestiae laudantium adipisci et.'),
    ('7', 'Episode Seven', '2019-02-09T00:00:00.000Z', '1', 'Eaque aliquid sit. Ducimus consequatur nam.'),
    ('8', 'Episode Eight', '2019-04-11T00:00:00.000Z', '2', 'Expedita mollitia et.'),
    ('9', 'Episode Nine', '2019-06-12T00:00:00.000Z', '1', 'Rem enim voluptatem autem fuga possimus.'),
    ('10', 'Episode Ten', '2019-09-13T00:00:00.000Z', '2', 'Occaecati qui magni blanditiis. Et animi quas.');

COMMIT;