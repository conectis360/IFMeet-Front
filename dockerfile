# ==========================
# 🔹 Etapa 1: Build do Vue.js
# ==========================
FROM node:18-alpine AS build

# Define o diretório de trabalho
WORKDIR /app

# Copia apenas os arquivos de dependências primeiro (otimiza cache)
COPY package.json package-lock.json ./

# Instala as dependências com cache otimizado
RUN npm ci --force

# Copia todo o código para dentro do container
COPY . .

# Builda o projeto Vue.js
RUN npm run build

# ==========================
# 🔹 Etapa 2: Nginx + SSL
# ==========================
FROM nginx:alpine

# Instala OpenSSL para suporte a HTTPS
RUN apk add --no-cache openssl

# Cria o diretório para armazenar os certificados SSL
RUN mkdir -p /etc/nginx/ssl

# Gera um certificado SSL autoassinado (válido por 1 ano)
RUN openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
    -keyout /etc/nginx/ssl/key.pem \
    -out /etc/nginx/ssl/cert.pem \
    -subj "/C=BR/ST=RS/L=Bage/O=IFMeet/CN=ifmeet.sytes.net"

# Remove configuração padrão do Nginx e adiciona a nova
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copia os arquivos estáticos do Vue.js
COPY --from=build /app/dist /usr/share/nginx/html/IFMeet

# Expõe as portas HTTP (80) e HTTPS (443)
EXPOSE 80 443

# Inicia o Nginx
CMD ["nginx", "-g", "daemon off;"]
