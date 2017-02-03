﻿var project = new File("SongLyrics.aep");app.open(project);var arrayColor = hexToRgb (hexColor);var textColor = [arrayColor[0]/255, arrayColor[1]/255, arrayColor[2]/255];function hexToRgb(hex) {    var arrayRGB= [];    var bigint = parseInt(hex, 16);    var r = (bigint >> 16) & 255;    arrayRGB.push(r)    var g = (bigint >> 8) & 255;    arrayRGB.push(g)    var b = bigint & 255;    arrayRGB.push(b)    return arrayRGB;}var backgroundImagePath = clipPath + imageName;var footageURL = clipPath + clipName;app.beginUndoGroup("Template 4 Script");var myComp;// this loop to help get right paterm to apply script, in example here is Typography Scenes 4 for (var i = 1; i <= app.project.numItems; i ++) {    if ((app.project.item(i) instanceof CompItem) && (app.project.item(i).name === '4')) {        myComp = app.project.item(i);        break;    }}var newFootage = app.project.importFile(new ImportOptions(File(footageURL)));var audioFootage = myComp.layers[8];audioFootage.replaceSource(newFootage, true);var duration = audioFootage.source.duration;myComp.workAreaDuration = duration;// fade - remove existing keyframes, and add new ones in last 0.5s of clipsmyComp.layers[1].outPoint = duration; // Fade layer var fadeOpacity = myComp.layers[1].opacity;if (fadeOpacity.numKeys > 0)     fadeOpacity.removeKey(1);if (fadeOpacity.numKeys > 0)     fadeOpacity.removeKey(1);fadeOpacity.addKey(duration - 0.5);fadeOpacity.setValueAtKey(1, 0);fadeOpacity.addKey(duration);fadeOpacity.setValueAtKey(2, 100);// change other durationsmyComp.layers[2].outPoint = duration;  // rednote.commyComp.layers[3].outPoint = duration; // controlmyComp.layers[7].outPoint = duration;  // bg imagemyComp.layers[6].outPoint = duration;  // main_bgmyComp.layers[8].outPoint = duration;  // audio// Change background imagevar backgroundLayer = myComp.layers[7];var newBackground = app.project.importFile(new ImportOptions(File(backgroundImagePath)));backgroundLayer.replaceSource(newBackground, true);// Set new text layer:var textLayer1 = myComp.layers[5];var textLayer2 = myComp.layers[4];var lyricLines = lyrics.length;var textDuration = duration / Math.round(lyricLines/2);var averageDuration = duration / lyricLines;var coupleDuration = averageDuration * 2;var lineCutoff = 21;var smallFont = 45;var largeFont = 70;// Hide text layer doesn't exist:if (lyricLines == 1){    textLayer2.enabled = false; }else{    textLayer2.enabled = true; }for (var i=0; i<lyricLines; i++) {   var textLayer;            if ((i % 2) == 0)         {         if (i==0)        textLayer = textLayer1;        else        textLayer = textLayer1.duplicate();            if (lyrics[i].length > lineCutoff)  {       var lyricString = lyrics[i];           var indexNextLine = lyricString.indexOf (" ",lineCutoff-5);           if (indexNextLine > 0)           {                 var b = "\r";            var newStringLyric = [lyricString.slice(0, indexNextLine), b, lyricString.slice(indexNextLine)].join('');                        textLayer.property("Source Text").setValue(newStringLyric);                }           else           {                           textLayer.property("Source Text").setValue(lyrics[i]);                }               }  else  {       textLayer.property("Source Text").setValue(lyrics[i]);       }            var textProp = textLayer.property("Source Text");       var textDocument = textProp.value;              if (lyrics[i].length > lineCutoff)        {           textDocument.fontSize = smallFont;             }      else       {                  textDocument.fontSize = largeFont;       }         // set type of font for layer            textDocument.font = fontType;            // set color for text      textDocument.fillColor = textColor;     //textDocument.strokeColor = [0, 1, 0];     //textDocument.applyStroke = true;       textDocument.applyFill = true;                textProp.setValue(textDocument);                textLayer.inPoint = coupleDuration * Math.floor(i/2);                  var end = coupleDuration * (Math.floor(i/2)+1);                  if (end > duration)         {                      textLayer.outPoint = duration;                        }         else         {                      textLayer.outPoint = end;                      }                var timeStart = averageDuration * i;       var timeEnd = averageDuration*(i+1);              // Adjust font size for fit screen       var inPointOfLayer =  coupleDuration * Math.floor(i/2);    var rect = textLayer.sourceRectAtTime(inPointOfLayer,false);    var width  = rect.width;    var height = rect.height;               var tempWidth = rect.width;              var tempFontsize = 150;                      while (tempWidth > 400)         {                 var textProp = textLayer.property("Source Text");                var textDocument = textProp.value;                var newFontsize = tempFontsize - 2;                            textDocument.fontSize =newFontsize;              tempFontsize = newFontsize;               textProp.setValue(textDocument);                                            var tempRect = textLayer.sourceRectAtTime(inPointOfLayer,false);                            tempWidth = tempRect.width;                       }                         editTextLayer1(myComp, textLayer, textDuration,timeStart,timeEnd);       }      else      {           if (i==1)        textLayer = textLayer2;        else        textLayer = textLayer2.duplicate();         if (lyrics[i].length > lineCutoff)  {       var lyricString = lyrics[i];           var indexNextLine = lyricString.indexOf (" ",lineCutoff-5);           if (indexNextLine > 0)           {                 var b = "\r";            var newStringLyric = [lyricString.slice(0, indexNextLine), b, lyricString.slice(indexNextLine)].join('');            textLayer.property("Source Text").setValue(newStringLyric);                }           else             {                    textLayer.property("Source Text").setValue(lyricString);                }      }  else  {        textLayer.property("Source Text").setValue(lyrics[i]);       }         var textProp = textLayer.property("Source Text");       var textDocument = textProp.value;       if (lyrics[i].length > lineCutoff)        {           textDocument.fontSize = smallFont;       }      else       {                  textDocument.fontSize = largeFont;                   textLayer.property("Source Text").setValue(lyrics[i]);       }         // set type of font for layer            textDocument.font = fontType;            // set color for text      textDocument.fillColor = textColor;     //textDocument.strokeColor = [0, 1, 0];     //textDocument.applyStroke = true;       textDocument.applyFill = true;         textProp.setValue(textDocument);                  textLayer.inPoint = coupleDuration * Math.floor(i/2);        textLayer.outPoint = coupleDuration * (Math.floor(i/2)+1);        var timeStart = averageDuration * i;        var timeEnd = averageDuration*(i+1);                  // Adjust font size for fit screen     var rect = textLayer.sourceRectAtTime(timeStart,false);    var width  = rect.width;    var height = rect.height;               var tempWidth = rect.width;              var tempFontsize = 150;                      while (tempWidth > 400)         {                 var textProp = textLayer.property("Source Text");              var textDocument = textProp.value;                                var newFontsize = tempFontsize - 2;                            textDocument.fontSize =newFontsize;              tempFontsize = newFontsize;               textProp.setValue(textDocument);                                            var tempRect = textLayer.sourceRectAtTime(inPointOfLayer,false);                            tempWidth = tempRect.width;                       }                      editTextLayer2 (myComp, textLayer, textDuration,timeStart,timeEnd);       }  }function editTextLayer1(myComp, layer, textDuration,startTime,endTime){    var animator1Start = layer.property("Text").property("Animators").property("Animator 1").property("Selectors").property("Range Selector 1").property("Start")    if (animator1Start.numKeys > 0)        animator1Start.removeKey(1);    if (animator1Start.numKeys > 0)        animator1Start.removeKey(1);  animator1Start.addKey(startTime + averageDuration*0.1);    animator1Start.setValueAtKey(1, 0);    animator1Start.addKey(endTime - averageDuration*0.3);    animator1Start.setValueAtKey(2, 100);var transformAnchorPoint = layer.property("Transform").property("Anchor Point")    if (transformAnchorPoint.numKeys > 0)        transformAnchorPoint.removeKey(1);    if (transformAnchorPoint.numKeys > 0)        transformAnchorPoint.removeKey(1); transformAnchorPoint.addKey(layer.outPoint - textDuration*0.07); transformAnchorPoint.setValueAtKey(1,[52, -73.4046,0]);  transformAnchorPoint.addKey(layer.outPoint - textDuration*0.02); transformAnchorPoint.setValueAtKey(2,[970.5709, -73.4046,0]);        }function editTextLayer2(myComp, layer, textDuration,startTime,endTime){        var animator1Start = layer.property("Text").property("Animators").property("Animator 1").property("Selectors").property("Range Selector 1").property("Start")    if (animator1Start.numKeys > 0)        animator1Start.removeKey(1);    if (animator1Start.numKeys > 0)        animator1Start.removeKey(1);  animator1Start.addKey(startTime + averageDuration*0.1);    animator1Start.setValueAtKey(1, 0);    animator1Start.addKey(endTime - averageDuration*0.3);    animator1Start.setValueAtKey(2, 100);var transformAnchorPoint = layer.property("Transform").property("Anchor Point")    if (transformAnchorPoint.numKeys > 0)        transformAnchorPoint.removeKey(1);    if (transformAnchorPoint.numKeys > 0)        transformAnchorPoint.removeKey(1); transformAnchorPoint.addKey(layer.outPoint - textDuration*0.07); transformAnchorPoint.setValueAtKey(1,[-48.4291, -73.4046, 0]);  transformAnchorPoint.addKey(layer.outPoint - textDuration*0.02); transformAnchorPoint.setValueAtKey(2, [-972.4291, -73.4046, 0]);        }app.project.close(CloseOptions.SAVE_CHANGES);app.quit();