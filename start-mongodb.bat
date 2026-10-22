@echo off
echo Iniciando MongoDB Server...
echo.
echo Si MongoDB esta instalado correctamente, se iniciara el servicio.
echo.

net start MongoDB

if %ERRORLEVEL% EQU 0 (
    echo.
    echo MongoDB iniciado correctamente!
    echo Ahora puedes conectarte desde Compass a: localhost:27017
    echo.
    pause
) else (
    echo.
    echo Error: MongoDB no esta instalado como servicio.
    echo Por favor instala MongoDB Community Server desde:
    echo https://www.mongodb.com/try/download/community
    echo.
    pause
)
