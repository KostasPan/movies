# Movies

This project was generated with **Angular CLI** version 19.2.7.

This is a modern, single-page application for searching, organizing, and discovering movies. It leverages lazy loading for efficient loading of feature modules and component-based routing to create a seamless user experience.

---

## Features

- **Dynamic Movie Search**: A real-time search feature that allows users to find movies by title.
- **Personalized Movie Collections**: Users can create custom collections to organize their favorite films, complete with titles and descriptions.
- **Interactive Movie Details**: A modal view provides in-depth information about each movie, including its overview, ratings, budget, and revenue, without leaving the current page.
- **Movie Ratings**: An interactive rating system allows users to submit their own ratings for movies.

---

## Technical Highlights

- **Lazy Loading**: Feature modules such as **Search**, **Collections**, and **Movie Details** are lazy-loaded to improve initial load times and overall performance.
- **Component-Based Routing**: The application uses Angular's robust router to manage navigation between different views and to display movie details in a modal overlay with unique, shareable URLs.
- **Reactive UI**: Built with RxJS, the application features a reactive search bar that provides a smooth and responsive user experience.

---

## Technologies Used

| Technology           | Version |
| -------------------- | ------- |
| **Angular**          | 19.2.0  |
| **Angular Material** | 19.2.19 |

---

## Project Structure

The project is organized into the following main directories and files:

```
/src
|-- /app
|   |-- /core
|   |   |-- /models       # TypeScript interfaces for data structures
|   |   `-- /services     # Core services (e.g., TMDB API, Collections)
|   |-- /features
|   |   |-- /collections  # Components for creating and viewing collections
|   |   |-- /movie-details # Component for the movie details modal
|   |   `-- /search       # Components for the main search functionality
|   |-- /shared
|   |   `-- /directives   # Shared custom directives
|   |-- app.component.* # Main application component
|   |-- app.config.ts     # Application configuration
|   `-- app.routes.ts     # Main application routing
|-- /assets               # Static assets (images, etc.)
|-- /environments         # Environment-specific configuration
|-- index.html            # Main HTML file
|-- main.ts               # Main entry point of the application
`-- styles.css            # Global styles
```

---

## Getting Started

To get the application up and running on your local machine, follow these simple steps.

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) and the [Angular CLI](https://angular.io/cli) installed.

### Installation

1.  Navigate to the project directory:
    ```bash
    cd movies
    ```
2.  Install the dependencies:
    ```bash
    npm install
    ```

---

## Development Server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.
