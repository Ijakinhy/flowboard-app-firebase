# Flowboard - Kanban Board App

A modern, responsive Kanban board application built with React, Vite, Firebase, and Redux. Manage your projects efficiently with drag-and-drop functionality, real-time collaboration, and cloud-based data storage.

## Features

- **Firebase Authentication**: Secure user authentication and authorization
- **Firestore Integration**: Real-time database for boards, tasks, and user data
- **Redux State Management**: Predictable state management with Redux Toolkit
- **Drag-and-Drop Interface**: Intuitive task management with react-beautiful-dnd
- **Material UI Design**: Modern, responsive UI components
- **Real-time Updates**: Live synchronization across multiple users
- **Private Routes**: Protected routes for authenticated users only

## Tech Stack

- **Frontend**: React 18, Vite
- **State Management**: Redux Toolkit
- **UI Library**: Material-UI (MUI)
- **Backend**: Firebase (Firestore, Authentication)
- **Drag-and-Drop**: react-beautiful-dnd
- **Routing**: React Router DOM
- **Code Quality**: ESLint

## Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd flowboard-app-firebase
   ```

2. **Install dependencies**

   ```bash
   npm install
   npm install -g firebase-tools
   ```

3. **Set up Firebase**

   - Create your own Firebase project at [Firebase Console](https://console.firebase.google.com/)
   - Enable Firestore and Authentication in your Firebase project
   - Create a `.env` file in the project root with the following variables, replacing the values with your Firebase project credentials:

     ```
     VITE_FIREBASE_API_KEY=your_api_key
     VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
     VITE_FIREBASE_PROJECT_ID=your_project_id
     VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
     VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
     VITE_FIREBASE_APP_ID=your_app_id
     ```

   - The Firebase configuration in `src/firebase.js` reads these environment variables to initialize the app

4. **Start Firebase Emulators** (for local development)

   - Make sure you have installed the Firebase CLI globally (`npm install -g firebase-tools`)
   - Run the emulators with:

   ```bash
   npm run fb-emulators
   ```

   - This will start Firestore, Authentication, and Functions emulators locally
   - Emulator data is imported/exported automatically from the `fb-emulator` directory
   - Access the Emulator UI at `http://localhost:4000` to view and manage emulated services

5. **Start the development server**

```bash
npm run dev
```

## Usage

1. Open your browser and navigate to `http://localhost:5173`
2. Sign up or log in with your Firebase account
3. Create a new board or select an existing one
4. Add tasks to columns and drag them between stages
5. Collaborate with team members in real-time

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the app for production
- `npm run preview` - Preview the production build
- `npm run lint` - Run ESLint for code quality checks
- `npm run fb-emulators` - Start Firebase emulators with data import/export

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── layout/         # Layout components (headers, modals, etc.)
│   └── utils/          # Utility components
├── screens/            # Page/screen components
│   ├── AuthScreen/     # Authentication pages
│   ├── BoardScreen/    # Individual board view
│   └── BoardsScreens/  # Boards list view
├── slices/             # Redux state slices
├── assets/             # Static assets
└── firebase.js         # Firebase configuration
```
