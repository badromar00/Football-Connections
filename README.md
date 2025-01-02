# Football Connections

🎮 [Play Football Connections](https://football-connections.onrender.com/)

Football Connections is a word puzzle game inspired by the New York Times' Connections game, but focused entirely on football/soccer themes. Players must find groups of 4 related football terms, players, or concepts within a 4x4 grid.

## Game Rules 🎮

1. Find groups of 4 related football items
2. Select exactly 4 items and submit them together
3. You have 4 attempts to find all groups
4. Each successful group will be color-coded and removed from play
5. Find all 4 groups to win!

## Technologies Used 🚀

### Frontend
- **React** - UI framework
- **Vite** - Build tool and development environment
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Icon library
- **React DOM** - React rendering for web

### Backend
- **Node.js** - Runtime environment
- **Express** - Web application framework

### Development Tools
- **ESLint** - Code linting
- **Git** - Version control

### Deployment
- **Render** - Cloud hosting platform
  - Static site hosting for frontend
  - Node.js service for backend

## Project Structure 🛠️

```
Football-Connections/
├── frontend/            # React frontend application
│   ├── src/
│   │   ├── components/ # React components
│   │   ├── constants/  # Game constants and styles
│   │   ├── hooks/     # Custom React hooks
│   │   └── utils/     # Utility functions
│   └── public/        # Static assets
├── backend/           # Node.js backend server
└── docs/             # Documentation
```

## Getting Started 🚀

1. Clone the repository:
```bash
git clone https://github.com/badromar00/football-connections.git
```

2. Install dependencies:
```bash
npm run install:all
```

3. Start development servers:
```bash
# Start frontend development server
npm run dev:frontend

# Start backend development server
npm run dev:backend
```

4. Build for production:
```bash
npm run build
```

## Deployment 🌐

The application is configured for deployment on Render with the following setup:
- Frontend static site hosting
- Backend Node.js service
- Environment variables management
- Automatic deployments from main branch
