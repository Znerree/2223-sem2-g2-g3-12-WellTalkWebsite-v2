FROM eclipse-temurin:17-jdk-alpine
VOLUME /tmp
COPY target/*.jar welltalk.jar
ENTRYPOINT ["java","-jar","/welltalk.jar"]
EXPOSE 8080