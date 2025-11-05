FROM eclipse-temurin:17-jdk
WORKDIR /app

# Copy the built Spring Boot JAR into the image
COPY target/springboot-tasks-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
