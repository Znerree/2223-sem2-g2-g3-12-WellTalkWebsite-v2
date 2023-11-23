FROM eclipse-temurin:17-jdk-alpine
VOLUME /tmp
COPY target/*.jar welltalk-0.0.1-SNAPSHOT.jar
ENTRYPOINT ["java","-jar","/welltalk-0.0.1-SNAPSHOT.jar"]
EXPOSE 8080