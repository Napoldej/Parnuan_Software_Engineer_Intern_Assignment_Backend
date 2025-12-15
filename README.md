# Parnuan_Software_Engineer_Intern_Assignment_Backend

## Initialize Database with Docker
```bash

docker run --name mongodb -d -p 27017:27017 mongo:7 --replSet rs0

```

## Install Environment
For Change directory to app
```bash
cd src 
```
Install Packages
```bash
npm install 
```

## Initialize Prisma for Database
Generate Prisma Client
```bash
npx prisma generate
```
Push the schema to database
```bash
npx prisma db push
```

## Open the server
```bash
npm run dev
```

## API Documentation
Go to
```
http://localhost:3000/api-docs/
```

