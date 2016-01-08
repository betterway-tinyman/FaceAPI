::PATH
SET RELEASE_DIR=D:\Homepage\betterwaysystems.github.io\FaceAPI\api\

:: ----------------------------------------------------------------
::    TYPE_SCRIPT
:: ----------------------------------------------------------------
SET NPM_DIR=C:\Users\samch\AppData\Roaming\npm\
SET TS_SRC_DIR=../ts/

::DOCUMENTATE
"%NPM_DIR%typedoc" --target ES6 --out "%RELEASE_DIR%ts" "%TS_SRC_DIR%"