# Getting Started with Development

## Prerequisites

Before you start, you'll need:

1. A GitHub account
2. A Vercel account (free)
3. A Railway.app account (free)
4. Node.js installed on your computer (version 18 or higher)

## Step 1: Set Up Your Development Environment

1. **Install Node.js**

   - Go to [nodejs.org](https://nodejs.org)
   - Download and install the LTS (Long Term Support) version
   - Open your terminal and verify the installation:
     ```bash
     node --version
     npm --version
     ```

2. **Install Git**

   - Go to [git-scm.com](https://git-scm.com)
   - Download and install Git for your operating system
   - Open your terminal and verify the installation:
     ```bash
     git --version
     ```

3. **Install VS Code (Recommended Editor)**
   - Go to [code.visualstudio.com](https://code.visualstudio.com)
   - Download and install VS Code
   - Install these helpful extensions:
     - ESLint
     - Prettier
     - GitLens
     - Error Lens

## Step 2: Set Up Your GitHub Repository

1. **Create a New Repository**

   - Go to [github.com](https://github.com)
   - Click the "+" button and select "New repository"
   - Name it "security-config-platform"
   - Make it Public
   - Don't initialize with any files yet

2. **Clone the Repository**
   - Open your terminal
   - Navigate to where you want to store the project
   - Run:
     ```bash
     git clone https://github.com/robbedell/security-config-platform.git
     cd security-config-platform
     ```

## Step 3: Set Up Vercel (Frontend)

1. **Create Vercel Account**

   - Go to [vercel.com](https://vercel.com)
   - Sign up with your GitHub account
   - It's completely free!

2. **Import Your Repository**

   - Click "New Project"
   - Select your GitHub repository
   - Select the `src/frontend` directory
   - Click "Deploy"
   - Vercel will automatically detect it's a Next.js app

3. **Get Your Deployment URL**
   - After deployment, Vercel will give you a URL
   - It will look like: `https://your-project.vercel.app`
   - Save this URL for later

## Step 4: Set Up Railway (Backend)

1. **Create Railway Account**

   - Go to [railway.app](https://railway.app)
   - Sign up with your GitHub account
   - It's free to start!

2. **Create New Project**

   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Select your repository
   - Select the `src/backend` directory

3. **Add Database**

   - Click "New"
   - Select "Database"
   - Choose "PostgreSQL"
   - Railway will create it automatically

4. **Get Your Backend URL**
   - After deployment, Railway will give you a URL
   - It will look like: `https://your-project.railway.app`
   - Save this URL for later

## Step 5: Configure Environment Variables

1. **In Vercel**

   - Go to your project settings
   - Add this variable:
     ```
     NEXT_PUBLIC_API_URL=https://your-railway-app-url.railway.app
     ```

2. **In Railway**
   - Go to your project settings
   - Add these variables:
     ```
     DATABASE_URL=your-postgresql-url
     REDIS_URL=your-redis-url
     JWT_SECRET=your-secret-key
     NODE_ENV=development
     ```

## Step 6: Start Development

1. **Install Dependencies**

   ```bash
   # Install frontend dependencies
   cd src/frontend
   npm install

   # Install backend dependencies
   cd ../backend
   npm install
   ```

2. **Start Development Servers**

   ```bash
   # Start frontend (in src/frontend directory)
   npm run dev

   # Start backend (in src/backend directory)
   npm run dev
   ```

3. **View Your Application**
   - Frontend: http://localhost:3000
   - Backend: http://localhost:4000

## Development Workflow

1. **Making Changes**

   - Edit files in your code editor
   - Save changes
   - View updates in your browser

2. **Committing Changes**

   ```bash
   git add .
   git commit -m "Your message here"
   git push
   ```

3. **Deployment**
   - Vercel and Railway will automatically deploy your changes
   - Check the deployment status in their dashboards

## Common Development Tasks

### Adding New Features

1. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
2. Make your changes
3. Test locally
4. Commit and push
5. Create a Pull Request on GitHub

### Fixing Bugs

1. Create a new branch:
   ```bash
   git checkout -b fix/your-bug-name
   ```
2. Fix the issue
3. Test the fix
4. Commit and push
5. Create a Pull Request

### Updating Dependencies

1. Check for updates:
   ```bash
   npm outdated
   ```
2. Update packages:
   ```bash
   npm update
   ```
3. Test your application
4. Commit and push changes

## Getting Help

- Check the [Documentation](https://robbedell.github.io/security-config-platform)
- Ask questions in the [GitHub Issues](https://github.com/robbedell/security-config-platform/issues)
- Join the [Community Forum](https://community.security-config-platform.com)

## Next Steps

1. Start building the frontend interface
2. Set up the backend API
3. Create example configurations
4. Add user authentication
5. Implement security features

Remember: Take it one step at a time, and don't hesitate to ask for help!
