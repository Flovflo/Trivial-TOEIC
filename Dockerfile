FROM node:16-alpine

WORKDIR /app

# Installer uniquement les dépendances
COPY package*.json ./
RUN npm install

# Exposer le port pour le serveur de développement
EXPOSE 3000

# Commande par défaut (sera remplacée dans docker-compose.yml)
CMD ["npm", "start"]