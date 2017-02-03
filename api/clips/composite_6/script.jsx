﻿var project = new File("SongLyrics.aep");app.open(project);var arrayColor = hexToRgb (hexColor);var textColor = [arrayColor[0]/255, arrayColor[1]/255, arrayColor[2]/255];function hexToRgb(hex) {    var arrayRGB= [];    var bigint = parseInt(hex, 16);    var r = (bigint >> 16) & 255;    arrayRGB.push(r)    var g = (bigint >> 8) & 255;    arrayRGB.push(g)    var b = bigint & 255;    arrayRGB.push(b)    return arrayRGB;}var footageURL = clipPath + clipName;var backgroundImagePath = clipPath + imageName;app.beginUndoGroup("Template 6 Script");var myComp;for (var i = 1; i <= app.project.numItems; i ++) {    if ((app.project.item(i) instanceof CompItem) && (app.project.item(i).name === '6')) {        myComp = app.project.item(i);        break;    }}// Change audio var newFootage = app.project.importFile(new ImportOptions(File(footageURL)))var audioFootage = myComp.layers[17];audioFootage.replaceSource(newFootage, true);var duration = audioFootage.source.duration;audioFootage.outPoint = duration;// Change background imagevar backgroundLayer = myComp.layers[15];var newBackground = app.project.importFile(new ImportOptions(File(backgroundImagePath)));backgroundLayer.replaceSource(newBackground, true);backgroundLayer.outPoint = duration;myComp.workAreaDuration = duration;// fade - remove existing keyframes, and add new ones in last 0.5s of clipsmyComp.layers[1].outPoint = duration; var fadeOpacity = myComp.layers[1].opacity;if (fadeOpacity.numKeys > 0)     fadeOpacity.removeKey(1);if (fadeOpacity.numKeys > 0)     fadeOpacity.removeKey(1);fadeOpacity.addKey(duration - 0.5);fadeOpacity.setValueAtKey(1, 0);fadeOpacity.addKey(duration);fadeOpacity.setValueAtKey(2, 100);// change other durationsmyComp.layers[2].outPoint = duration;  // rednote.commyComp.layers[3].outPoint = duration; // controlmyComp.layers[4].outPoint = duration;  // linemyComp.layers[16].outPoint = duration;myComp.layers[10].remove(); myComp.layers[9].remove(); myComp.layers[8].remove(); myComp.layers[7].remove(); myComp.layers[6].remove(); myComp.layers[5].remove(); //remove anchor point linevar myAnchorPointLine =  myComp.layers[4].property("Anchor Point");var startLine = myComp.layers[4].property("Contents").property("Trim Paths 1").property("Start");while (startLine.numKeys > 0)    {         startLine.removeKey(1);      }    startLine.addKey(duration - 0.5);startLine.setValueAtKey(1, 0);startLine.addKey(duration);startLine.setValueAtKey(2, 100); while (myAnchorPointLine.numKeys > 0)    {         myAnchorPointLine.removeKey(1);      }//myComp.layers[10].enabled = false;//myComp.layers[8].enabled = false;//myComp.layers[6].enabled = false;// Text layersvar lyricLines = lyrics.length;var textDuration = duration / lyricLines;var lastTextLayer;for (var i=0; i<lyricLines; i++) {	var number_layer;	var textLayer;    var maskLayer;    if(lyricLines == 1){        myComp.layers[6].enabled = false;        number_layer = 8;        textLayer= myComp.layers[number_layer];        maskLayer= myComp.layers[number_layer-1];    }else{      if(i%2 == 0){      	number_layer = 8;      }else{      	number_layer = 6;      }                          if(i > 1){            var new_number_layer_position = number_layer+(i-2)*2;             var originalTextLayer= myComp.layers[new_number_layer_position];            textLayer = originalTextLayer.duplicate();            textLayer.moveBefore(myComp.layers[5]);                        var originalMaskLayer= myComp.layers[new_number_layer_position];            maskLayer = originalMaskLayer.duplicate();            maskLayer.moveBefore(myComp.layers[5]);                    }else{            textLayer= myComp.layers[number_layer];            maskLayer= myComp.layers[number_layer-1];         }            }      textLayer.property("Source Text").setValue(lyrics[i]);     // Set font for text layer      var textProp = textLayer.property("Source Text");      var textDocument = textProp.value;      // set type of font for layer            textDocument.font = fontType;      // set color for text      textDocument.fillColor = textColor;     //textDocument.strokeColor = [0, 1, 0];     //textDocument.applyStroke = true;       textDocument.applyFill = true;       textProp.setValue(textDocument);                    if(i > 0){        textLayer.inPoint = textDuration * i ;        textLayer.outPoint = textDuration * (i+1);        maskLayer.inPoint = textDuration *i ;        maskLayer.outPoint = textDuration * (i+1) ;    }else{        textLayer.inPoint = textDuration * i + 0.2;        textLayer.outPoint = textDuration * (i+1) + 0.2;        maskLayer.inPoint = textDuration * i + 0.2;        maskLayer.outPoint = textDuration * (i+1) + 0.2;    }        editTextLayer(myComp, textLayer, textDuration,myAnchorPointLine,number_layer,lyrics[i]);    lastTextLayer = textLayer; }/*var myStartLine =  myComp.layers[4].property("Start");if (myStartLine.numKeys > 0)        myStartLine.removeKey(1);if (myStartLine.numKeys > 0)        myStartLine.removeKey(1);  myStartLine.setValueAtTime(lastTextLayer.outPoint - textDuration*0.1,0); myStartLine.setValueAtTime(lastTextLayer.outPoint, 100); */               function editTextLayer(myComp, layer, textDuration,myAnchorPointLine,number_layer,lyric) {    if(number_layer==8){          // take care of long lyrics line     var inPointOfLayer =  layer.inPoint + textDuration*0.1;    var rect = layer.sourceRectAtTime(inPointOfLayer,false);        var height = rect.height;            var width  = rect.width;                 var tempHeight = rect.height;              var tempFontsize = 80;            var reduceScale = false;                  while (tempHeight > 400)         {                 var textProp = layer.property("Source Text");                var textDocument = textProp.value;                var newFontsize = tempFontsize - 2;                              textDocument.fontSize =newFontsize;              tempFontsize = newFontsize;               textProp.setValue(textDocument);                             var tempRect = layer.sourceRectAtTime(inPointOfLayer,false);              tempHeight = tempRect.height;              reduceScale = true;                       }                             if(height >293){            var layer_position = textLayer.position            layer_position.setValue([52.9676,-15,0.0]);            }         else{           var layer_position = textLayer.position           layer_position.setValue([52.9676,75,0.0]);             }                if (reduceScale)      {             var layer_scale = layer.scale        layer_scale.setValue([85,85,85]);          }      else      {             var layer_scale = layer.scale        layer_scale.setValue([90,90,90]);          }             // Set time for animations        var myMask =  layer.mask(1);    	var myProperty = myMask.maskPath;        if (myProperty.numKeys > 0)        	myProperty.removeKey(1);    	if (myProperty.numKeys > 0)        	myProperty.removeKey(1);                myProperty.addKey(layer.inPoint + textDuration * 0.6);        var myShape = new Shape();        myShape.vertices = [[-540,540],[-540,-540],[540,-540],[540,540]];        myProperty.setValueAtKey(1, myShape);        myProperty.addKey(layer.inPoint + textDuration * 0.9);        var myShape1 = new Shape();        myShape1.vertices = [[400,525],[400,-554],[1384,-554],[1384,525]];        myProperty.setValueAtKey(2, myShape1);	   	myAnchorPointLine.setValueAtTime(textLayer.inPoint,[30,150]);        myAnchorPointLine.setValueAtTime(textLayer.inPoint + textDuration*0.1,[30,150]);     }else if(number_layer==6){        if(lyric.length > 32){            var layer_position = layer.position            layer_position.setValue([63,120,0.0]);        }        var layer_scale = layer.scale         layer_scale.setValue([90,90,90]);        // Set time for animations        var myMask =  layer.mask(1);    	var myProperty = myMask.maskPath;        if (myProperty.numKeys > 0)        	myProperty.removeKey(1);    	if (myProperty.numKeys > 0)        	myProperty.removeKey(1);                    myProperty.addKey(layer.inPoint);        var myShape = new Shape();        myShape.vertices = [[-1363,504],[-1363,-575],[-283,-575],[-283,504]];        myProperty.setValueAtKey(1, myShape);        myProperty.addKey(layer.inPoint + textDuration * 0.6);        var myShape1 = new Shape();        myShape1.vertices = [[-653,528],[-653,-551],[426,-551],[426,528]];        myProperty.setValueAtKey(2, myShape1);   				var animator1Offset = layer.property("Text").property("Animators").property("Animator 1").property("Selectors").property("Range Selector 1").property("Offset")    	if (animator1Offset.numKeys > 0)        	animator1Offset.removeKey(1);    	if (animator1Offset.numKeys > 0)        	animator1Offset.removeKey(1);    	animator1Offset.addKey(layer.inPoint);    	animator1Offset.setValueAtKey(1, 100);    	animator1Offset.addKey(layer.inPoint + textDuration * 0.4);    	animator1Offset.setValueAtKey(2, -100);                if(i==3){            myAnchorPointLine.setValueAtTime(textLayer.inPoint,[30,150]);            myAnchorPointLine.setValueAtTime(textLayer.inPoint + textDuration*0.6,[30,313]);        }else{            myAnchorPointLine.setValueAtTime(textLayer.inPoint,[30,150]);            myAnchorPointLine.setValueAtTime(textLayer.inPoint + textDuration*0.3,[30,313]);        }              }    /*    // Scale text    var bBox = layer.sourceRectAtTime(layer.inPoint, false)    var scale1 = layer.property("Scale").value;    var newScale1 = [85,85] * Math.min(myComp.width/layer.sourceRectAtTime(layer.inPoint, true).width,myComp.height/layer.sourceRectAtTime(layer.inPoint, true).height);    layer.property("Scale").setValue(newScale1);    // Center text    layer.anchorPoint = [bBox.width / 2, -bBox.height / 2];    layer.position = [0,0];    */ }  app.endUndoGroup();app.project.close(CloseOptions.SAVE_CHANGES);app.quit();