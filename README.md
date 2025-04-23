# CleanMemory

CleanMemory is a sleek, minimalist web calendar application that organizes local image files by their metadata date. Built with Next.js, TypeScript, and Yarn, it leverages modern browser APIs to let users select a folder from their local machine, then displays images in a lucid-themed calendar view and a complementary list view with image strips. Designed with a clean UX in mind, images remain hidden until hovered over, and users can delete images with a single key press (with confirmation) — all while keeping their data private and local.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Future Enhancements](#future-enhancements)
- [License](#license)

## Features

- **Local Folder Access:**  
  Use the File System Access API to open and read images from a user-selected folder.

- **Calendar View:**  
  Display images in a full calendar layout where each month is showcased, with dates showing thumbnails from images taken on that day (revealed on hover).

- **List View:**  
  A supplementary strip view that indicates how many images are in each month, functioning as a quick navigation tool.

- **Clean UI/UX:**  
  A minimal and lucid design that emphasizes clarity and ease of use.

- **Hover-to-Reveal:**  
  Image thumbnails remain hidden until the user hovers over them, keeping the interface neat.

- **Deletion with Confirmation:**  
  Delete images by hovering, pressing the 'd' key, and confirming the deletion through a modal dialog. The dialog includes a "Don't show again" option to remember user preferences.

## Tech Stack

- **Next.js:** Framework for building the web application.
- **TypeScript:** Enhanced JavaScript with strong typing for improved code quality.
- **Yarn:** Dependency management and script running.
- **File System Access API:** To interact with the local file system (folder selection, file reading, and deletion).
- **Tailwind CSS:** For styling and ensuring a responsive, modern look.

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/cleanmemory.git
   cd cleanmemory
   ```

2. **Install dependencies with Yarn:**

   ```bash
   yarn install
   ```

3. **Run the development server:**

   ```bash
   yarn dev
   ```

4. **Open your browser:**  
   Navigate to [http://localhost:3000](http://localhost:3000) to view the application.

## Usage

1. **Open Folder:**  
   Click on the designated button to open your local folder using the File System Access API.

2. **View Calendar:**  
   Once a folder is selected, the application extracts image metadata (EXIF data or last modified dates) and organizes the images into a calendar view by month and day. Hover over a date cell to reveal image thumbnails.

3. **List View Navigation:**  
   Use the scrollable list view to see a quick summary of image counts per month. Clicking on a strip navigates you to the respective month in the calendar view.

4. **Delete Images:**  
   Hover over an image thumbnail and press the "d" key to trigger a confirmation dialog. Confirm deletion by following the modal instructions and optionally check "Don't show again" to disable future prompts.

## Future Enhancements

- **Enhanced Metadata Extraction:**  
  Integrate more robust EXIF parsing libraries to enrich the calendar with additional data (e.g., location).

- **Advanced Filtering & Sorting:**  
  Allow users to filter images by specific metadata criteria (e.g., tags or ratings).

- **Responsive Design Enhancements:**  
  Improve the UI/UX further for mobile and tablet devices.

- **Accessibility Improvements:**  
  Further refine keyboard navigation and screen reader support.

- **Offline Capabilities:**  
  Use service workers to allow basic interactions even when offline.

## License

This project is provided for non-commercial use only. The source code is proprietary and may not be redistributed or modified without explicit permission from the author.
```