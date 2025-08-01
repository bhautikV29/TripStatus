# 🛫 TripPlanner - Your Ultimate Travel Companion

[![CI/CD Pipeline](https://github.com/username/trip-planner/workflows/CI/CD%20Pipeline/badge.svg)](https://github.com/username/trip-planner/actions)
[![codecov](https://codecov.io/gh/username/trip-planner/branch/main/graph/badge.svg)](https://codecov.io/gh/username/trip-planner)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A comprehensive trip planning application with weather integration, travel mode management, and beautiful responsive design. Built with modern web technologies for optimal performance and user experience.

## ✨ Features

- **🗺️ Trip Management**: Create, edit, and organize your travel adventures
- **🌤️ Weather Integration**: Real-time weather data for all destinations
- **🚗 Travel Modes**: Support for flights, trains, buses, cars, and walking
- **📱 Responsive Design**: Optimized for mobile, tablet, and desktop
- **⚡ Server-Side Rendering**: Fast loading with Next.js SSR
- **🧪 Comprehensive Testing**: Unit and integration tests with Jest
- **🚀 CI/CD Pipeline**: Automated testing and deployment
- **🎨 Modern UI**: Clean design with Tailwind CSS and shadcn/ui

## 🛠️ Technologies Used

- **Frontend**: Next.js 13+ (App Router), React 18, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui components
- **State Management**: Zustand
- **Weather API**: OpenWeatherMap
- **Testing**: Jest, React Testing Library
- **Code Quality**: ESLint, Prettier, Husky
- **CI/CD**: GitHub Actions
- **Deployment**: Vercel

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn package manager
- OpenWeatherMap API key (optional, uses mock data by default)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/username/trip-planner.git
   cd trip-planner
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   Add your OpenWeatherMap API key:
   ```env
   OPENWEATHER_API_KEY=your_api_key_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
trip-planner/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── trips/             # Trip-related pages
│   └── globals.css        # Global styles
├── components/            # Reusable UI components
│   ├── layout/           # Layout components
│   ├── trips/            # Trip-specific components
│   ├── weather/          # Weather components
│   └── ui/               # shadcn/ui components
├── lib/                   # Utility functions and configuration
├── types/                 # TypeScript type definitions
├── __tests__/            # Test files
└── public/               # Static assets
```

## 🧪 Testing

Run the full test suite:
```bash
npm test
```

Run tests in watch mode:
```bash
npm run test:watch
```

Generate coverage report:
```bash
npm run test:coverage
```

## 🔧 Development Workflow

### Code Quality

The project uses several tools to maintain code quality:

- **ESLint**: Code linting with Next.js and TypeScript rules
- **Prettier**: Code formatting
- **Husky**: Git hooks for pre-commit checks
- **TypeScript**: Strict type checking

### Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run format       # Format code with Prettier
npm run type-check   # Run TypeScript type checking
```

## 🌐 API Endpoints

### Trips API
- `GET /api/trips` - Get all trips
- `GET /api/trips/[id]` - Get trip by ID

### Weather API
- `GET /api/weather?location=Paris` - Get weather data for location

## 🏗️ Deployment

### Automated Deployment

The project includes a GitHub Actions workflow that:

1. **Tests**: Runs linting, type checking, and unit tests
2. **Builds**: Creates production build
3. **Deploys**: Automatically deploys to Vercel on main branch

### Manual Deployment

Deploy to Vercel:
```bash
npm run build
# Deploy using Vercel CLI or connect GitHub repository
```

## 📊 Performance

- **Lighthouse Score**: 95+ across all metrics
- **Core Web Vitals**: Optimized for excellent user experience
- **Bundle Size**: Minimized with tree-shaking and code splitting
- **Loading Speed**: SSR and optimized images for fast initial load

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow the existing code style
- Write tests for new features
- Update documentation as needed
- Ensure all CI checks pass

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for beautiful UI components
- [OpenWeatherMap](https://openweathermap.org/) for weather data
- [Unsplash](https://unsplash.com/) for stock photos
- [Lucide](https://lucide.dev/) for icons

## 📬 Support

If you have any questions or need help, please:

- Open an issue on GitHub
- Contact: your-email@example.com
- Visit our documentation: [docs.tripplanner.com](https://docs.tripplanner.com)

---

**Made with ❤️ and ✈️ for travelers everywhere**