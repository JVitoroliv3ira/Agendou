#!/bin/bash

CONTAINER_NAME="agendou-database"
DB_NAME="agendou"
DDL_USER="agendou"
DML_USER="dagendou"
DDL_PASSWORD="@myStrongPassword"
DML_PASSWORD="@myStrongPassword"
POSTGRES_PASSWORD="@myStrongPassword"

check_error() {
  if [ $? -ne 0 ]; then
    echo "Erro encontrado. Saindo..."
    exit 1
  fi
}

# Verifica se o container já existe
if [ "$(docker ps -a -q -f name=$CONTAINER_NAME)" ]; then
    if [ "$(docker ps -q -f name=$CONTAINER_NAME -f status=running)" ]; then
        echo "O container '$CONTAINER_NAME' já está rodando. Nenhuma ação necessária."
        exit 0
    else
        echo "O container '$CONTAINER_NAME' existe, mas está parado. Iniciando o container..."
        docker start $CONTAINER_NAME
        check_error
        exit 0
    fi
else
    echo "O container '$CONTAINER_NAME' não existe. Criando e iniciando o container..."
    docker run -e POSTGRES_PASSWORD=$POSTGRES_PASSWORD \
        -p 5432:5432 --name $CONTAINER_NAME -h $CONTAINER_NAME \
        -d postgres:latest
    check_error
fi

# Aguarda o PostgreSQL iniciar
RETRIES=30
until docker exec -it $CONTAINER_NAME pg_isready -U postgres > /dev/null 2>&1; do
  if [ $RETRIES -eq 0 ]; then
    echo "Falha ao conectar ao PostgreSQL após várias tentativas."
    exit 1
  fi
  echo "Esperando o PostgreSQL iniciar... ($RETRIES tentativas restantes)"
  RETRIES=$((RETRIES-1))
  sleep 5
done

echo "PostgreSQL está pronto para conexões."

# Cria o banco de dados se ele não existir
docker exec -i $CONTAINER_NAME psql -U postgres -tc "SELECT 1 FROM pg_database WHERE datname = '$DB_NAME'" | grep -q 1 || \
docker exec -i $CONTAINER_NAME psql -U postgres -c "CREATE DATABASE $DB_NAME;"
check_error

# Cria os usuários e concede as permissões necessárias
docker exec -i $CONTAINER_NAME psql -U postgres -d $DB_NAME -c "
DO
\$do\$
BEGIN
    -- Cria o usuário agendou como superusuário se não existir
    IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = '$DDL_USER') THEN
        CREATE USER $DDL_USER WITH PASSWORD '$DDL_PASSWORD' SUPERUSER;
    END IF;

    -- Cria o usuário dagendou como usuário normal se não existir
    IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = '$DML_USER') THEN
        CREATE USER $DML_USER WITH PASSWORD '$DML_PASSWORD';
    END IF;

    -- Concede permissões ao usuário dagendou no schema public
    GRANT CONNECT ON DATABASE $DB_NAME TO $DML_USER;
    GRANT USAGE ON SCHEMA public TO $DML_USER;
    GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO $DML_USER;
    GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO $DML_USER;
    ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO $DML_USER;
    ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO $DML_USER;
END
\$do\$;
"
check_error

echo "Configuração concluída. Banco de dados '$DB_NAME' com o usuário superusuário '$DDL_USER' e o usuário regular '$DML_USER' está pronto."