# Use Java 17 image
FROM eclipse-temurin:17-jdk

# Create app directory
WORKDIR /app

# Copy Maven wrapper and pom first (better caching)
COPY .mvn .mvn
COPY mvnw mvnw
COPY pom.xml pom.xml

# Make mvnw executable
RUN chmod +x mvnw

# Download dependencies
RUN ./mvnw -q -DskipTests dependency:go-offline

# Copy source code
COPY src src

# Build the application
RUN ./mvnw -q -DskipTests package

# Expose the port Spring Boot runs on
EXPOSE 8080

# Environment variables (values will come from Render)
ENV MONGO_URI=""
ENV MONGO_DATABASE="movie-api-db"
ENV JWT_SECRET=""

# Run the jar (make sure the name matches your built jar!)
CMD ["java", "-jar", "target/movieist-0.0.1-SNAPSHOT.jar"]
