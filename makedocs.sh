#!/bin/bash

find . -name *.fls -exec rm {} \;
find . -name *.log -exec rm {} \;
find . -name *.aux -exec rm {} \;
find . -name *.toc -exec rm {} \;
find . -name *.out -exec rm {} \;
find . -name *.maf -exec rm {} \;
find . -name *.mtc* -exec rm {} \;
find . -name *.stc* -exec rm {} \;
find . -name *.gl* -exec rm {} \;
find . -name *.ist -exec rm {} \;
find . -name *.xwm -exec rm {} \;
find . -name *.fdb_latexmk -exec rm {} \;
find . -name *.synctex.gz -exec rm {} \;
find . -name *.BridgeLabelsAndRatings -exec rm {} \;
