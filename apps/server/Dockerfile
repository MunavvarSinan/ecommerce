FROM node:lts

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (or pnpm-lock.yaml) separately to take advantage of Docker layer caching
COPY package*.json ./

# Install pnpm globally
RUN npm install -g pnpm

# Install project dependencies using pnpm

# Copy the rest of the application code
COPY . .

RUN rm -rf /app/apps/admin
RUN rm -rf /app/apps/storeFrontend

RUN pnpm install

# Build the project
RUN pnpm run build

# Expose the port the app runs on
EXPOSE 8080

WORKDIR /app/apps/server

# Specify the command to run on container start
CMD ["pnpm", "start"]