# Game Hub Web Application

A full-stack web application designed as a simple game hub. This project demonstrates end-to-end application development, containerization with Docker, and automated CI/CD deployment to an AWS EC2 instance.

## Application Description

The Game Hub allows users to browse a curated list of games, view specific game details, and request new games to be added to the platform. 

As part of the core requirements, the landing page is configured to dynamically fetch and display the developer's student details (Sumit Hulke, Reg No: 2023BCD0026) directly from the backend API. The application is highly interactive; when a user submits a request for a new game via the frontend form, a `POST` request is sent to the backend, which processes the data and instantly updates the homepage catalog.

## Tech Stack

* **Frontend:** HTML, CSS, JavaScript (Vanilla)
* **Backend:** Python (Flask), Flask-CORS
* **Containerization:** Docker, Docker Compose
* **Deployment:** AWS EC2
* **CI/CD:** Automated pipeline for building, pushing to Docker Hub, and deploying to the server.

## Features

* **Dynamic Identity Panel:** Fetches and displays student name and registration number from a backend REST API endpoint (`/student-details`).
* **Game Catalog:** Displays a responsive grid of available games pulled from the backend (`/api/games`).
* **Interactive UI:** Clicking on a game card reveals a detailed panel with descriptions and download options.
* **Live Updates:** A built-in submission form allows users to request new games, which are instantly appended to the catalog without requiring a page reload.

## How to Run Locally

Make sure you have [Docker](https://www.docker.com/) and Docker Compose installed on your machine.
