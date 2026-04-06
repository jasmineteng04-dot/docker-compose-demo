# api/Dockerfile
 
# ── Stage 1: Dependencies 
FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
 
# ── Stage 2: Final image
FROM node:20-alpine
WORKDIR /app
 
# Copy only what's needed from deps stage
COPY --from=deps /app/node_modules ./node_modules
COPY . .
 
# Non-root user for security
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser
 
EXPOSE 3000
CMD ["node", "index.js"]
