# Complete Setup Guide: Retail Solution Development on MacBook

## Part 1: Initial Setup

### Step 1: Install Development Tools

1. **Install Homebrew**
   ```bash
   # Open Terminal (Press Cmd + Space, type "Terminal", hit Enter)
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
   ```

2. **Install Git**
   ```bash
   brew install git
   ```

3. **Install Visual Studio Code**
   - Visit: https://code.visualstudio.com/download
   - Download macOS version
   - Move to Applications folder
   - Open VS Code

4. **Install Python**
   ```bash
   brew install python@3.11
   ```

5. **Install Node.js and npm**
   ```bash
   brew install node
   ```

### Step 2: Setup Development Environment

1. **Create Project Directory**
   ```bash
   # In Terminal
   mkdir retail-solution
   cd retail-solution
   ```

2. **Initialize Git Repository**
   ```bash
   git init
   ```

3. **Create Virtual Environment for Python**
   ```bash
   python3 -m venv venv
   source venv/bin/activate
   ```

4. **Install VS Code Extensions**
   - Open VS Code
   - Install extensions (Cmd + Shift + X):
     - Python
     - React
     - ESLint
     - Prettier
     - GitLens

## Part 2: Backend Setup

### Step 1: Setup Backend Structure

1. **Create Backend Directory**
   ```bash
   mkdir backend
   cd backend
   ```

2. **Install Python Dependencies**
   ```bash
   pip install fastapi uvicorn sqlalchemy pydantic python-jose[cryptography] passlib[bcrypt] python-multipart qrcode
   ```

3. **Create Requirements File**
   ```bash
   pip freeze > requirements.txt
   ```

4. **Create Basic Directory Structure**
   ```bash
   mkdir app
   mkdir app/api
   mkdir app/core
   mkdir app/models
   mkdir app/schemas
   ```

### Step 2: Setup Frontend Structure

1. **Create React Application**
   ```bash
   # Go back to project root
   cd ..
   npx create-react-app frontend
   cd frontend
   ```

2. **Install Frontend Dependencies**
   ```bash
   npm install @mui/material @emotion/react @emotion/styled axios react-router-dom recharts
   ```

## Part 3: Database Setup

### Step 1: Install PostgreSQL

1. **Install Database**
   ```bash
   brew install postgresql@14
   ```

2. **Start PostgreSQL Service**
   ```bash
   brew services start postgresql@14
   ```

3. **Create Database**
   ```bash
   createdb retail_solution
   ```

## Part 4: Project Configuration

### Step 1: Backend Configuration

1. **Create Environment File**
   ```bash
   # In backend directory
   touch .env
   ```

2. **Add Environment Variables**
   ```env
   DATABASE_URL=postgresql://localhost/retail_solution
   SECRET_KEY=your-secret-key
   ALGORITHM=HS256
   ```

### Step 2: Frontend Configuration

1. **Create Environment File**
   ```bash
   # In frontend directory
   touch .env
   ```

2. **Add Environment Variables**
   ```env
   REACT_APP_API_URL=http://localhost:8000
   ```

## Part 5: Running the Application

### Step 1: Start Backend Server

1. **Activate Virtual Environment**
   ```bash
   # In backend directory
   source venv/bin/activate
   ```

2. **Run Server**
   ```bash
   uvicorn app.main:app --reload
   ```

### Step 2: Start Frontend Development Server

1. **Open New Terminal**
   ```bash
   # In frontend directory
   npm start
   ```

## Part 6: Development Workflow

### Step 1: Basic Git Workflow

1. **Create New Branch**
   ```bash
   git checkout -b feature/new-feature
   ```

2. **Make Changes**
   - Edit files in VS Code

3. **Commit Changes**
   ```bash
   git add .
   git commit -m "Add new feature"
   ```

### Step 2: Testing

1. **Backend Testing**
   ```bash
   # In backend directory
   pytest
   ```

2. **Frontend Testing**
   ```bash
   # In frontend directory
   npm test
   ```

## Part 7: Deployment Preparation

### Step 1: Backend Preparation

1. **Update Requirements**
   ```bash
   pip freeze > requirements.txt
   ```

2. **Create Dockerfile**
   ```bash
   # In backend directory
   touch Dockerfile
   ```

### Step 2: Frontend Preparation

1. **Build Production Version**
   ```bash
   # In frontend directory
   npm run build
   ```

## Common Commands Reference

### Backend Commands
```bash
# Activate virtual environment
source venv/bin/activate

# Deactivate virtual environment
deactivate

# Install new package
pip install package-name

# Run server
uvicorn app.main:app --reload

# Run tests
pytest
```

### Frontend Commands
```bash
# Start development server
npm start

# Install new package
npm install package-name

# Build for production
npm run build

# Run tests
npm test
```

### Database Commands
```bash
# Start PostgreSQL
brew services start postgresql@14

# Stop PostgreSQL
brew services stop postgresql@14

# Access PostgreSQL
psql retail_solution
```

### Git Commands
```bash
# Check status
git status

# Create new branch
git checkout -b branch-name

# Switch branch
git checkout branch-name

# Add files
git add .

# Commit changes
git commit -m "message"

# Push changes
git push origin branch-name
```

## Troubleshooting Guide

### Common Issues and Solutions

1. **Port Already in Use**
   ```bash
   # Kill process using port
   lsof -i :8000
   kill -9 PID
   ```

2. **Virtual Environment Issues**
   ```bash
   # Recreate virtual environment
   rm -rf venv
   python3 -m venv venv
   source venv/bin/activate
   pip install -r requirements.txt
   ```

3. **Node Modules Issues**
   ```bash
   # Reinstall node modules
   rm -rf node_modules
   npm install
   ```

4. **Database Connection Issues**
   ```bash
   # Restart PostgreSQL
   brew services restart postgresql@14
   ```

### Getting Help

1. **Documentation Resources**
   - FastAPI: https://fastapi.tiangolo.com/
   - React: https://react.dev/
   - PostgreSQL: https://www.postgresql.org/docs/

2. **Community Support**
   - Stack Overflow
   - GitHub Issues
   - Reddit (r/programming, r/reactjs, r/FastAPI)

## Next Steps

1. Start with the backend implementation
2. Move to frontend development
3. Integrate both parts
4. Add testing
5. Prepare for deployment

Remember to:
- Commit changes frequently
- Test thoroughly
- Keep dependencies updated
- Document your code
- Follow security best practices
