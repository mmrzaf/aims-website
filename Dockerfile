ARG NODE_IMAGE=node:22-bookworm-slim
ARG NGINX_IMAGE=nginx:1.27-alpine

FROM ${NODE_IMAGE} AS build

ARG NPM_REGISTRY
ARG PUBLIC_SITE_URL
ARG PUBLIC_COMPANY_NAME_EN=AIMS
ARG PUBLIC_COMPANY_NAME_FA=آیمز
ARG PUBLIC_CONTACT_FORM_ENDPOINT
ARG PUBLIC_CONTACT_EMAIL
ARG PUBLIC_CONTACT_PHONE
ARG PUBLIC_CONTACT_WHATSAPP
ARG PUBLIC_CONTACT_TELEGRAM

ENV PUBLIC_SITE_URL=$PUBLIC_SITE_URL \
    PUBLIC_COMPANY_NAME_EN=$PUBLIC_COMPANY_NAME_EN \
    PUBLIC_COMPANY_NAME_FA=$PUBLIC_COMPANY_NAME_FA \
    PUBLIC_CONTACT_FORM_ENDPOINT=$PUBLIC_CONTACT_FORM_ENDPOINT \
    PUBLIC_CONTACT_EMAIL=$PUBLIC_CONTACT_EMAIL \
    PUBLIC_CONTACT_PHONE=$PUBLIC_CONTACT_PHONE \
    PUBLIC_CONTACT_WHATSAPP=$PUBLIC_CONTACT_WHATSAPP \
    PUBLIC_CONTACT_TELEGRAM=$PUBLIC_CONTACT_TELEGRAM

WORKDIR /app

COPY package.json package-lock.json .npmrc ./

RUN --mount=type=cache,id=aims-website-npm,target=/root/.npm,sharing=locked \
    set -eu; \
    test -n "$NPM_REGISTRY"; \
    npm ci \
      --registry="$NPM_REGISTRY" \
      --cache=/root/.npm \
      --no-audit \
      --fund=false

COPY . ./

RUN npm run build

FROM ${NGINX_IMAGE} AS runtime

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/ /usr/share/nginx/html/

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s \
  CMD wget -q -O /dev/null http://127.0.0.1/ || exit 1
