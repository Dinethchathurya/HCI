# iFurniture 3D Room Visualizer

## Overview

Welcome to the iFurniture 3D Room Visualizer! This web application empowers users to design and visualize their ideal room layouts using iFurniture's extensive catalog. Whether you're a customer planning your next home makeover or an in-store designer assisting clients, our tool provides an intuitive and interactive platform to bring your interior design ideas to life in a realistic 3D environment.

Leveraging the power of Three.js, users can configure room dimensions, select furniture, experiment with colors and scaling, and view their creations from any angle.

## Features

*   **Room Configuration:**
    *   Define custom room dimensions (length, width, height).
    *   Select various room shapes (e.g., rectangular, L-shaped).
    *   Choose from predefined color schemes or customize wall/floor colors.
*   **Furniture Catalog & Placement:**
    *   Browse an extensive catalog of iFurniture products (chairs, tables, sofas, beds, storage, decor, etc.).
    *   Easily select and drag-and-drop furniture items into your 3D room.
    *   Manipulate furniture: move, rotate, and precisely position items.
*   **Interactive 3D Visualization:**
    *   View your complete room design in a dynamic 3D environment.
    *   Intuitive camera controls: pan, zoom, and orbit to explore every detail.
*   **Customization:**
    *   **Scaling:** Adjust the size of individual furniture items or the overall scene view.
    *   **Color Customization:** Change the color and materials of selected furniture.
    *   **Lighting & Shading:** Adjust ambient and directional lighting, and toggle shading effects for enhanced realism.
*   **Design Management:**
    *   Save your designs to revisit and edit later.
    *   Load previously saved designs.
    *   Edit and delete existing designs.
*   **Designer Accounts (for In-Store Professionals):**
    *   Secure login for in-store designers.
    *   Manage multiple client designs and projects.
    *   Access to potentially advanced features tailored for professional use.

## Technologies Used

**Frontend:**

* React: A JavaScript library for building user interfaces [from package.json].
* TypeScript: A typed superset of JavaScript that compiles to plain JavaScript [from package.json].
* Three.js: A JavaScript 3D library [from package.json].
* React Three Fiber: A React renderer for Three.js [from package.json].
* @react-three/drei: Useful helpers for R3F [from package.json].
* Tailwind CSS: A utility-first CSS framework for styling [from package.json, postcss.config.js, tailwind.config.js].
* Lucide React: A library of icons [from package.json].
* Zustand: A small, fast and scalable bearbones state-management solution [from package.json].
* React Router DOM: For routing in the React application [from package.json].
* Vite: A build tool that aims to provide a faster and leaner development experience for modern web projects [from package.json, vite.config.ts].
* State Management:
  Zustand: Used for managing application state [from src/store/StateProvider.tsx].
* Styling:
  Tailwind CSS: Used for styling components [from tailwind.config.js].
* Bundling:
  Vite: Used as the bundler and development server [from vite.config.ts].
*   **Version Control:**
    *   Git & GitHub

## Setup and Installation (Hypothetical Local Development)

To run this project locally (assuming a standard web development setup):

1.  **Clone the repository:**
    ```bash
    git clone [URL_OF_YOUR_REPOSITORY]
    cd ifurniture-3d-visualizer
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run the application:**
    *   If you have a development server (e.g., with React/Vue/Node):
        ```bash
        npm start\
        ```  
    *   The application should then be accessible at `http://localhost:[PORT_NUMBER]`.

*(Please replace bracketed placeholders with actual information if this were a real, deployed project.)*

## Usage

1.  **Navigate to the application URL.**
2.  **Configure Your Room:** Start by defining your room's dimensions, shape, and initial color scheme.
3.  **Browse & Add Furniture:** Explore the furniture catalog and drag items into your 3D room.
4.  **Arrange & Customize:** Move, rotate, scale, and change the colors of your furniture.
5.  **Visualize:** Use the camera controls to view your design from all angles. Adjust lighting for different moods.
6.  **Save Your Work:** If you're happy with your design, save it. Designers can log in to manage multiple projects.
7.  **Iterate:** Load saved designs to continue working on them or make changes.


Thank you for using the iFurniture 3D Room Visualizer! We hope it helps you create beautiful spaces.
