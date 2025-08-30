# This Dockerfile uses `serve` npm package to serve the static files with node process.
# You can find the Dockerfile for nginx in the following link:
# https://github.com/refinedev/dockerfiles/blob/main/vite/Dockerfile.nginx


#docker images   # find SOURCE_IMAGE:TAG
# docker tag SOURCE_IMAGE:TAG YOURUSER/myrepo:newtag
# docker push YOURUSER/myrepo:newtag
#above is how you push a new image to dockerhub
#
FROM refinedev/node:18 AS base

FROM base as deps

COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* .npmrc* ./

RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then yarn global add pnpm && pnpm i --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi

FROM base as builder

ENV NODE_ENV production

COPY --from=deps /app/refine/node_modules ./node_modules

COPY . .

RUN npm run build

FROM base as runner

ENV NODE_ENV production


ENV PORT=5173

RUN npm install -g serve

COPY --from=builder /app/refine/dist ./

USER refine

CMD ["sh", "-c", "serve -s . -l ${PORT}"]
EXPOSE ${PORT}

