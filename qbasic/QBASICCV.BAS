CLS
SCREEN 12

PRINT " Press any key to start"
DO
LOOP UNTIL INKEY$ <> ""
CLS

REM set variables
LET speed% = 100

firstdraw:
LET x1% = 24
LET y1% = 80
LET x2% = 200
LET y2% = 350
LET code% = 1

GOTO drawArectangle

seconddraw:
LET x1% = 320
LET y1% = 130
LET x2% = 200
LET y2% = 300
LET code% = 2

GOTO drawArectangle

finish:

LOCATE 28, 3, 0
PRINT " Press any key to quit"
DO
LOOP UNTIL INKEY$ <> ""
END


drawArectangle:

REM draw a line 1
FOR i% = x1% + 1 TO x1% + x2% STEP 1
LINE (x1%, y1%)-(i%, y1%), 14
REM fake sleep
FOR j = 0 TO speed%: NEXT j
NEXT

REM draw a line 2
FOR i% = y1% + 1 TO y1% + y2% STEP 1
LINE (x1% + x2%, y1%)-(x1% + x2%, i%), 14
REM fake sleep
FOR j = 0 TO speed%: NEXT j
NEXT

REM draw a line 3
FOR i% = (x1% + x2%) - 1 TO x1% STEP -1
LINE (x1% + x2%, y1% + y2%)-(i%, y1% + y2%), 14
REM fake sleep
FOR j = 0 TO speed%: NEXT j
NEXT

REM draw a line 4
FOR i% = (y1% + y2%) - 1 TO y1% STEP -1
LINE (x1%, y1% + y2%)-(x1%, i%), 14
REM fake sleep
FOR j = 0 TO speed%: NEXT j
NEXT

REM fill a 1/3 rectangle
FOR i% = x1% TO x1% + x2% STEP 1
LINE (x1%, y1%)-(i%, y1% + (y2% / 3)), 14, BF
REM fake sleep
FOR j = 0 TO speed%: NEXT j
NEXT

REM fill a 2/3 rectangle
FOR i% = x1% + x2% TO x1% STEP -1
LINE (x1% + x2%, (y1% + (y2% / 3)) + 1)-(i%, (y1% + (y2% / 3) * 2) + 1), 14, BF
REM fake sleep
FOR j = 0 TO speed%: NEXT j
NEXT

REM fill a 3/3 rectangle
FOR i% = x1% TO x1% + x2% STEP 1
LINE (x1%, (y1% + (y2% / 3) * 2) + 1)-(i%, (y1% + ((y2% / 3)) * 2) + (y2% / 3)), 14, BF
REM fake sleep
FOR j = 0 TO speed%: NEXT j
NEXT

REM windows

LET spacex% = x2% * .1
LET spacey% = y2% * .08
LET windowx% = x2% * .2
LET windowy% = y2% * .15
LET doorx% = x2% * .25
LET doory% = y2% * .2


REM draw a windows 1
FOR i% = y1% + spacey% TO y1% + spacey% + windowy% STEP 1
  FOR q% = x1% + spacex% TO x1% + (2 * windowx%) + (3 * spacex%) STEP spacex% + windowx%
    LINE (q%, spacey% + y1%)-(q% + windowx%, w% + i%), 9, BF
NEXT
REM fake sleep
FOR j = 0 TO speed%: NEXT j
NEXT

REM draw a windows 2
FOR i% = (2 * spacey%) + windowy% + y1% TO (2 * spacey%) + (2 * windowy%) + y1% STEP 1
  FOR q% = x1% + spacex% TO x1% + (2 * windowx%) + (3 * spacex%) STEP spacex% + windowx%
    LINE (q%, (2 * spacey%) + windowy% + y1%)-(q% + windowx%, w% + i%), 9, BF
NEXT
REM fake sleep
FOR j = 0 TO speed%: NEXT j
NEXT

REM draw a windows 3
FOR i% = (3 * spacey%) + (2 * windowy%) + y1% TO (3 * spacey%) + (3 * windowy%) + y1% STEP 1
  FOR q% = x1% + spacex% TO x1% + (2 * windowx%) + (3 * spacex%) STEP spacex% + windowx%
    LINE (q%, (3 * spacey%) + (2 * windowy%) + y1%)-(q% + windowx%, w% + i%), 9, BF
  NEXT
REM fake sleep
FOR j = 0 TO speed%: NEXT j
NEXT


REM door
FOR i% = y1% + y2% TO y2% + y1% - doory% STEP -1
LINE ((x2% / 2) - (doorx% / 2) + x1%, y1% + y2%)-((x2% / 2) + (doorx% / 2) + x1%, i%), 6, BF
REM fake sleep
FOR j = 0 TO speed%: NEXT j
NEXT

REM continue in code
IF code% = 1 THEN GOTO seconddraw
IF code% = 2 THEN GOTO finish:


