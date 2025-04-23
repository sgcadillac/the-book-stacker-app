FROM node:23-slim

# 1. Create user and directory first
RUN useradd -m appuser && \
    mkdir -p /usr/src/app && \
    chown -R appuser:appuser /usr/src/app

# 2. Set working directory
WORKDIR /usr/src/app

# 3. Copy package files as root (temporarily)
COPY --chown=appuser:appuser package*.json ./

# 4. Install dependencies as root (required for npm)
RUN npm install --production

# 5. Switch to non-root user
USER appuser

# 6. Copy application files with correct ownership
COPY --chown=appuser:appuser . .

EXPOSE 3000
CMD ["node", "server.js"]