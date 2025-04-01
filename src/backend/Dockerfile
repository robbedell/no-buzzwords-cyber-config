FROM node:18-alpine

WORKDIR /app

# Copy npm configuration first
COPY .npmrc ./

# Copy package files
COPY package*.json ./

# Install dependencies with more permissive settings
RUN npm install --no-optional --unsafe-perm

COPY . .

EXPOSE 3001

CMD ["npm", "run", "dev"]
