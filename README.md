# HODLINFO
HODLINFO is a trading application that fetches and displays real-time cryptocurrency ticker data. It uses a Node.js backend with Express, PostgreSQL for data storage, and vanilla JavaScript for dynamic frontend updates. This application is designed to provide updated information on the top 10 cryptocurrency tickers.

## Features
- Fetches ticker data from WazirX API.
- Stores and updates ticker data in a PostgreSQL database.
- Displays data in a styled HTML table.
- Auto-refreshes ticker data every minute.
- Responsive design with a countdown timer.

## Installation
### Prerequisites
- Node.js
- Docker (for PostgreSQL and Adminer)

```bash
git clone https://github.com/your-username/hodlinfo.git
cd hodlinfo
```
Install Dependencies

```bash
npm install
```

Set Up Environment Variables

Create a docker-compose.yml file in the root directory and add the following environment variables:

```bash

DB_NAME=trading_db
DB_USER=root
DB_PASSWORD=pass
DB_HOST=localhost
```
Run the Application
Start the PostgreSQL Database and Adminer using Docker:

```bash
docker-compose up
```
Start the Node.js Server:

```bash
npm start
```
The server will be running on http://localhost:3000.

# Usage
- Navigate to http://localhost:3000 to view the application.
- The web interface will display the top 10 cryptocurrency tickers and their details.
- The ticker data is refreshed every minute.
# API Endpoints
- GET /api/tickers: Retrieves the stored ticker data from the database.
# Project Structure
- src/: Contains the server code, including API routes and database models.
- public/: Contains static files such as HTML, CSS, and JavaScript for the frontend.
- docker-compose.yml: Docker configuration for PostgreSQL and Adminer.
- package.json: Project metadata and dependencies.
