# Base image
FROM eclipse-temurin:21-jdk-alpine

# Set working directory
WORKDIR /app

# Copy jar
ARG JAR_FILE=target/*.jar
COPY ${JAR_FILE} app.jar

# Expose port (override via compose)
EXPOSE 8080

# Run the app
ENTRYPOINT ["java", "-jar", "app.jar"]
