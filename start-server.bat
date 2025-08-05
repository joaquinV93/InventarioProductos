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
%PHP_EXE% -S localhost:3000 -t public
pause
