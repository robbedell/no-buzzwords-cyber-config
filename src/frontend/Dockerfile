FROM node:18

WORKDIR /app

# Copy package files first for better caching
COPY package*.json ./

# Copy configuration files
COPY postcss.config.js tailwind.config.js ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Create necessary directories
RUN mkdir -p src/styles

EXPOSE 3000

CMD ["npm", "run", "dev"]
