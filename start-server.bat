@echo off
title InventarioProductos - Vue3

echo ----------------------------------------------------
echo     Levantando InventarioProductos 
echo ----------------------------------------------------

cd /d "%~dp0"
set PHP_EXE=php\php.exe

if not exist %PHP_EXE% (
    echo ERROR: No se encontró PHP en la carpeta php\
    pause
    exit /b
)

echo Iniciando servidor en http://localhost:3000 ...
echo ----------------------------------------------------
echo     Corriendo InventarioProductos 
echo ----------------------------------------------------

:: Iniciar el servidor PHP en una nueva ventana
start "Servidor PHP" cmd /c "%PHP_EXE% -S localhost:3000 -t public"

:: Esperar 1 segundo antes de abrir el navegador (opcional)
timeout /t 1 > nul

:: Abrir la página de inicio en el navegador predeterminado
start http://localhost:3000

exit
