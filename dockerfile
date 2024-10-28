# Usa una imagen base de Node.js
FROM node:18

# Establece el directorio de trabajo
WORKDIR /app

# Copia package.json y package-lock.json
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto de la aplicación
COPY . .

# Expone el puerto que utiliza Next.js
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["npm", "run", "dev"]
