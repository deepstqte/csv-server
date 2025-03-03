# CSV Server

CSV Server is a CLI tool that serves CSV files as a REST API. It allows you to read data from a CSV file and access it via HTTP endpoints.

## Features

- Serve CSV files as a REST API
- Read data from CSV files
- Access data via HTTP GET requests

## Installation

To install the package globally, run:

```bash
npm install -g csv-server
```

## Usage

To start the server, run:

```bash
csv-server <path-to-csv-file>
```

## API Endpoints

The server provides the following endpoints:

- `GET /data`: Returns all data from the CSV file
- `GET /data/:id`: Returns a single row from the CSV file by ID
