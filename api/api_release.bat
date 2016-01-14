::PATH
SET RELEASE_DIR=D:\Homepage\betterwaysystems.github.io\FaceAPI\api\

::TRUNCATE DREGS
rd "%RELEASE_DIR%" /S /Q

:: ----------------------------------------------------------------
::    TYPE_SCRIPT
:: ----------------------------------------------------------------
SET NPM_DIR=C:\Users\samch\AppData\Roaming\npm\
SET TS_SRC_DIR=..\ts\

::DOCUMENTATE
"%NPM_DIR%typedoc" --target ES5 --out "%RELEASE_DIR%ts" "%TS_SRC_DIR%hiswill" "%TS_SRC_DIR%samchon.ts" "%TS_SRC_DIR%samchon" "%TS_SRC_DIR%Scripts" --mode file