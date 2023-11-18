#
# Build stage
#
FROM maven:3.8.7-jdk-17 AS build

COPY . .
RUN mvn clean package -DskipTests

#
# Package stage
#
FROM openjdk:17-jdk-slim
VOLUME /tmp
COPY target/*.jar welltalk-0.0.1-SNAPSHOT.jar
ENTRYPOINT ["java","-jar","/welltalk-0.0.1-SNAPSHOT.jar"]
# ENV PORT 8080
EXPOSE 8080