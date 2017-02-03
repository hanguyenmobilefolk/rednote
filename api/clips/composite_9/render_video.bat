@echo off
title Render Video
echo Welcome to batch scripting!
set arg_path=%1
%1\ffmpeg -i %5 -q:v 1 %6 2> %1\audio_out.txt
echo convert audio done
AfterFX.exe -noui -r %arg_path%\new_script.jsx
echo Run script done
aerender -OMtemplate "minimum setting" -RStemplate "minimum setting" -project %1\SongLyrics.aep -comp %4 -output %2 -log %1\log_comp.txt
echo Run render video done
%1\ffmpeg -i %2 -q:v 1 %3 2> %1\project_out.txt
echo Convert successfully