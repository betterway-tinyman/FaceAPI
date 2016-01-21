dir *.ts /b /s > ts_file_list.txt
"%APPDATA%\npm\tsc.cmd" --out "bin/FaceAPI.js" @ts_file_list.txt