FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app
# Copy React build files into wwwroot
COPY weaponcontrolsystem.moi.client/dist/ /app/wwwroot/


# Copy the solution and all projects
COPY *.sln ./
COPY WeaponControlSystem.MOI.Server/*.csproj ./WeaponControlSystem.MOI.Server/
COPY WeaponControlSystem.MOI.Core/*.csproj ./WeaponControlSystem.MOI.Core/
COPY WeaponControlSystem.MOI.Infrastructure/*.csproj ./WeaponControlSystem.MOI.Infrastructure/

RUN dotnet restore

# Copy everything else
COPY . ./

RUN dotnet publish WeaponControlSystem.MOI.Server/WeaponControlSystem.MOI.Server.csproj -c Release -o out

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app
COPY --from=build /app/out ./
EXPOSE 80
ENTRYPOINT ["dotnet", "WeaponControlSystem.MOI.Server.dll"]
