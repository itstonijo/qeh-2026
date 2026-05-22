# Production Dockerfile for the SSR build (Astro + Node adapter).
# Build:  docker build -t covert .
# Run:    docker run -p 4321:4321 -e HOST=0.0.0.0 covert

FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=4321
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
RUN npm ci --omit=dev && npm cache clean --force
RUN mkdir -p /app/.data
VOLUME /app/.data
EXPOSE 4321
CMD ["node", "./dist/server/entry.mjs"]
