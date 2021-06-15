# https://hub.docker.com/_/microsoft-dotnet
FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build
WORKDIR /source

# copy csproj and restore as distinct layers
COPY *.sln .
COPY CreditExpert.Api/*.csproj ./CreditExpert.Api/
COPY CreditExpert.Dtos/*.csproj ./CreditExpert.Dtos/

RUN dotnet restore

# copy everything else and build app
COPY CreditExpert.Api/. ./CreditExpert.Api/
COPY CreditExpert.Dtos/. ./CreditExpert.Dtos/

WORKDIR /source/CreditExpert.Api

# RUN dotnet publish -c release -o /app --no-restore
RUN dotnet publish -c release -o /app

# final stage/image
FROM mcr.microsoft.com/dotnet/aspnet:3.1
WORKDIR /app
COPY --from=build /app ./
ENTRYPOINT ["dotnet", "CreditExpert.Api.dll"]

# docker build -t simulationapi .
# docker run -it --rm -p 5000:80 --name shapessimulationapi simulationapi