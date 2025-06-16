# --- Build Stage ---
# Use a base image with Maven and Java to build our application
FROM maven:3.8.5-openjdk-17 AS build

# Set the working directory
WORKDIR /app

# Copy the pom.xml file to download dependencies
COPY pom.xml .

# Copy the maven wrapper
COPY .mvn/ .mvn
COPY mvnw .
COPY pom.xml .

# Download all dependencies
RUN mvn dependency:go-offline

# Copy the rest of the source code
COPY src ./src

# Build the application, creating the .jar file
RUN mvn -Dmaven.test.skip=true clean install

# --- Run Stage ---
# Use a much smaller base image with only the Java Runtime Environment
FROM openjdk:17-jdk-slim

# Set the working directory
WORKDIR /app

# Copy the executable .jar file from the build stage
COPY --from=build /app/target/server-0.0.1-SNAPSHOT.jar app.jar

# Expose the port the application runs on
EXPOSE 8080

# The command to run the application
ENTRYPOINT ["java","-jar","app.jar"]