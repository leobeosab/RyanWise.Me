echo off
cls
set PATH_TO_RUBY=C:\Ruby23-x64\bin
set RUBY=%PATH_TO_RUBY%\ruby.exe
set SASS=%PATH_TO_RUBY%\scss

%RUBY% %SASS% --watch style.scss:style.css
pause