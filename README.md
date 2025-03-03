# tuesday

Simple task manager powered by GraphQL

## Database setup

- `docker compose up`
- `mysql -h127.0.0.1 -P3306 -uroot`

```
mysql> CREATE USER 'taras'@'%' IDENTIFIED BY '0000';
mysql> GRANT CREATE, ALTER, DROP, INSERT, UPDATE, DELETE, SELECT, REFERENCES, RELOAD on *.* TO 'taras'@'%' WITH GRANT OPTION;
mysql> FLUSH PRIVILEGES;
```

`bin/rake db:prepare`

## Run the app

- `bin/rails s`
- `cd app/javascript/react-app && pnpm install && pnpm dev`
