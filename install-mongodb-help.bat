@echo off
echo ===========================================
echo    Instalacion rapida de MongoDB
echo ===========================================
echo.
echo Opciones:
echo.
echo 1. Descargar MongoDB Community Server
echo    https://www.mongodb.com/try/download/community
echo.
echo 2. Instalar usando Chocolatey (si lo tienes)
echo    choco install mongodb
echo.
echo 3. O usa MongoDB Atlas (Gratis en la nube)
echo    No requiere instalacion local
echo    https://www.mongodb.com/cloud/atlas/register
echo.
echo ===========================================
echo.

set /p opcion="Presiona 1 para abrir la pagina de descarga (Enter para salir): "

if "%opcion%"=="1" (
    start https://www.mongodb.com/try/download/community
    echo.
    echo Despues de instalar:
    echo 1. Reinicia esta terminal
    echo 2. Ejecuta: net start MongoDB
    echo 3. O ejecuta: start-mongodb.bat
    echo.
)

pause
