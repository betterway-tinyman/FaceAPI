::PATH
SET TS_SRC_DIR=..\
SET RELEASE_DIR=D:\Homepage\betterwaysystems.github.io\FaceAPI\api\

SET NPM_DIR=C:\Users\samch\AppData\Roaming\npm\
SET TS_SRC_DIR=../ts/

::DOCUMENTATE
"%NPM_DIR%typedoc" --target ES5 --out "%RELEASE_DIR%ts" "%TS_SRC_DIR%"