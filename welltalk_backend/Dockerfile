#FROM eclipse-temurin:17-jdk-alpine
#VOLUME /tmp
#COPY target/*.jar welltalk-0.0.1-SNAPSHOT.jar
#ENTRYPOINT ["java","-jar","/#welltalk-0.0.1-SNAPSHOT.jar"]
#EXPOSE 8080

#
# Build stage
#
FROM eclipse-temurin:17-jdk-alpine
VOLUME /tmp
RUN ./mvnw clean install

#
# Package stage
#
FROM eclipse-temurin:17-jre-jammy 
ARG JAR_FILE=/usr/app/target/*.jar
COPY target/*.jar welltalk-0.0.1-SNAPSHOT.jar
ENTRYPOINT ["java","-jar","/welltalk-0.0.1-SNAPSHOT.jar"]
EXPOSE 8080