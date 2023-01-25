$(> db/comments.sqlite)
cat db/migrate.sql | sqlite3 db/comments.sqlite
