# Project Installation Guide

## Server (Node.js)

### 1. Node.js Installation:

- Install node

### 2. Clone repo:
```bash
    git clone <server-repository-url>
    cd server
```

### 3. Install dependencies:
```bash
    npm install
```

### 4. Environment variables & DB Setup:

- Create a .env file, copy env variables from env.example to .env file
- In .env, configure mongo uri for DB Connection.

### 5. Run the server:
```bash
    npm run dev
```

Once, server is started & DB connected, we are good to go. I have also added Postman collection, you can import & make API calls.

## Client (React.js)

### 1. Node.js Installation:

- Install node

### 2. Clone repo:
```bash
    git clone <client-repository-url>
    cd client
```

### 3. Install dependencies:
```bash
    npm install
```

### 4. Run the development server:
```bash
    npm start
```
