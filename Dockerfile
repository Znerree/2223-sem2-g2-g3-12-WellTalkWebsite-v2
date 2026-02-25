# Stage 1: Build React frontend (outputs directly to src/main/resources/static)
FROM node:18 AS frontend-build
WORKDIR /app
COPY welltalkwebapp_frontend/package*.json ./welltalkwebapp_frontend/
RUN cd welltalkwebapp_frontend && npm install
COPY welltalkwebapp_frontend/ ./welltalkwebapp_frontend/
COPY src/ ./src/
RUN cd welltalkwebapp_frontend && npx vite build

# Stage 2: Build Spring Boot backend
FROM eclipse-temurin:17-jdk AS backend-build
WORKDIR /app
COPY . .
COPY --from=frontend-build /app/src/main/resources/static src/main/resources/static/
RUN ./mvnw clean package -DskipTests

# Stage 3: Run the application
FROM eclipse-temurin:17-jre
WORKDIR /app
COPY --from=backend-build /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]