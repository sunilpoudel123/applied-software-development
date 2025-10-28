FROM mysql:8.0

# Copy initialization scripts
COPY ./init-scripts/*.sql /docker-entrypoint-initdb.d/

# Set environment variables
ENV MYSQL_ROOT_PASSWORD=root
ENV MYSQL_USER=walletuser
ENV MYSQL_PASSWORD=walletpass

EXPOSE 3306