# Blink: *Ultrasonic Sensed Drawing*
***[This post is a work in progress]***

For this project, I created an interactive canvas that can only be drawn on and viewed when the user is near the canvas. I used an LED matrix for the canvas, a joystick to move and draw, an ultrasonic distance sensor to get the user's distance, and a white LED to signal when the user is close enough to the canvas to draw.

The canvas has two separate states, drawing and wiping, Drawing is when the user is within 60cm of the canvas (signaled by the white LED turning on). When drawing, the user can use the joystick to move the blinking cursor on the matrix and can press the joystick in to draw where the cursor is. Wiping is when the user is outside the 60cm range of the canvas (and the white LED is off). Here the player can't move and the cursor is gone. After one second of being in this state, the canvas starts to wipe. Every 1/10th of a second after wiping, one random column in the matrix will shift its pixel's states down by one. This creates an animation of the canvas being wiped away.

**[WIP Narative/UX Paragraph]**

My original goal for this project was to recreate an [Etch A Sketch](https://en.wikipedia.org/wiki/Etch_A_Sketch). The main difference was the user could tilt the whole circuit to wipe the board clean. I ended up changing this plan since the tilt sensor didn't work how I was imagining (I thought it would act like a gyroscope).

My biggest issues in this project all involved the external LED matrix. First, the LED matrices arrived late and didn't realize they came unsoldered. I didn't have time to solder them, so I spent a while finding a way to have a decent connection. Second, the [tutorial][matrix-tutorial] I was using didn't show that a 10kΩ resistor was required for the type of board I was using. This damaged several matrices. Last, the libraries mentioned in the same tutorial did not work with for some reason. So I found a [different library][matrix-library] that worked and was easier to program with.

## Video
**[WIP]**

## Diagrams
### Circuit
**[WIP]**

### Schematic
**[WIP]**

## Code
``` arduino
#include <LedControl.h>

// ----- VARIABLES -----
// pins consts
const int PIN_LED_WHITE = 7;
const int PIN_TRIG = 5, PIN_ECHO = 6;
const int PIN_STICK_X = A1, PIN_STICK_Y = A2, PIN_STICK_BTN = A3;
const int PIN_DIN = 11, PIN_CLK = 13, PIN_CS = 10;

// other consts
const float MAX_DRAW_DIST = 60;
const int STICK_DEADZONE = 200;
const int MAX_X = 8;
const int MAX_Y = 8;
const float PLAYER_BLINK_INRVL = 0.25f;
const float SCREEN_WIPE_CTDWN = 1.0f; // wipe starts after 2 seconds
const float SCREEN_WIPE_INRVL = 0.1f; // interval between wipes

// output device states
int whiteValue;
LedControl matrix = LedControl(PIN_DIN, PIN_CLK, PIN_CS, 1);
bool frame[MAX_Y][MAX_X] = {
  { false, false, false, false, false, false, false, false },
  { false, false, false, false, false, false, false, false },
  { false, false, false, false, false, false, false, false },
  { false, false, false, false, false, false, false, false },
  { false, false, false, false, false, false, false, false },
  { false, false, false, false, false, false, false, false },
  { false, false, false, false, false, false, false, false },
  { false, false, false, false, false, false, false, false },
};
bool playerBlinkState;

// input device states
float duration, distance;
int stickValueY, stickValueX, stickValueBtn;

// other states
int currentState;  // 0 = wiping, 1 = drawing
int playerPosX;
int playerPosY;
bool playerCanMove;
bool canScreenWipe;
unsigned long lastTimeStep;
float playerBlinkTimeStep;
float screenWipeTimeStep;

// ----- SETUP -----
void setup() {
  matrix.shutdown(0, false);
  matrix.setIntensity(0, 8);
  matrix.clearDisplay(0);

  pinMode(PIN_LED_WHITE, OUTPUT);

  pinMode(PIN_TRIG, OUTPUT);
  pinMode(PIN_ECHO, INPUT);

  pinMode(PIN_STICK_X, INPUT);
  pinMode(PIN_STICK_Y, INPUT);
  pinMode(PIN_STICK_BTN, INPUT_PULLUP);

  whiteValue = LOW;
  playerPosX = MAX_X - 1;
  playerPosY = 0;
  playerCanMove = true;
  canScreenWipe = false;
  playerBlinkState = true;
  lastTimeStep = millis();
  playerBlinkTimeStep = 0;
  screenWipeTimeStep = 0;
}

//----- MAIN LOOP -----
void loop() {
  // ----- INPUTS -----
  // distance
  digitalWrite(PIN_TRIG, LOW);
  delayMicroseconds(2);
  digitalWrite(PIN_TRIG, HIGH);
  delayMicroseconds(10);
  digitalWrite(PIN_TRIG, LOW);
  duration = pulseIn(PIN_ECHO, HIGH);
  distance = (duration * .0343) / 2;
  // stick
  stickValueY = map(analogRead(PIN_STICK_Y), 0, 1023, -512, 511);
  stickValueX = map(analogRead(PIN_STICK_X), 0, 1023, -512, 511);
  stickValueBtn = 1 - digitalRead(PIN_STICK_BTN);

  // ----- UPDATE -----
  unsigned long timeStep = millis();
  float deltaTime = (timeStep - lastTimeStep) / 1000.0f;
  if (distance > MAX_DRAW_DIST) {
    wipingUpdate(deltaTime);
  } else {
    drawingUpdate(deltaTime);
  }

  // ---- DRAW -----
  // white LED
  digitalWrite(PIN_LED_WHITE, whiteValue);
  // matrix
  for (int x = 0; x < MAX_X; x++) {
    for (int y = 0; y < MAX_Y; y++) {
      // player position
      if (x == playerPosX && y == playerPosY) {
        matrix.setLed(0, x, y, playerBlinkState);
        continue;
      }
      matrix.setLed(0, x, y, frame[y][x]);
    }
  }

  lastTimeStep = timeStep;
  delay(10);
}

// ----- OUT DIST UPDATE -----
void wipingUpdate(float deltaTime) {
  // ----- State Change -----
  if (currentState != 0) {
    whiteValue = LOW;
    playerBlinkState = false;
    canScreenWipe = false;
    screenWipeTimeStep = 0;
    currentState = 0;
  }

  screenWipeTimeStep += deltaTime;
  // ----- BEFORE WIPES -----
  if(!canScreenWipe && screenWipeTimeStep > SCREEN_WIPE_CTDWN){
    canScreenWipe = true;
    screenWipeTimeStep -= SCREEN_WIPE_CTDWN;
  }
  // ----- BETWEEN WIPES -----
  else if (canScreenWipe && screenWipeTimeStep > SCREEN_WIPE_INRVL) {
    // shift random column down
    int randX = random(0, MAX_Y);
    for (int y = MAX_Y - 1; y > 0; y--) {
      frame[y][randX] = frame[y - 1][randX];
    }
    frame[0][randX] = false;

    screenWipeTimeStep -= SCREEN_WIPE_INRVL;
  }
}

// ----- IN DIST UPDATE -----
void drawingUpdate(float deltaTime) {
  // ----- State Change -----
  if (currentState != 1) {
    whiteValue = HIGH;
    playerBlinkState = true;
    playerBlinkTimeStep = 0;
    currentState = 1;
  }

  // ----- PLAYER BLINK -----
  playerBlinkTimeStep += deltaTime;
  if (playerBlinkTimeStep > PLAYER_BLINK_INRVL) {
    playerBlinkState = !playerBlinkState;
    playerBlinkTimeStep -= PLAYER_BLINK_INRVL;
  }

  // ----- Move Player -----
  int deltaPosX = 0;
  int deltaPosY = 0;
  // right
  if (stickValueX > STICK_DEADZONE) {
    if (playerCanMove) {
      deltaPosX--;
      playerCanMove = false;
    }
  }
  // left
  else if (stickValueX < -STICK_DEADZONE) {
    if (playerCanMove) {
      deltaPosX++;
      playerCanMove = false;
    }
  }
  // down
  else if (stickValueY > STICK_DEADZONE) {
    if (playerCanMove) {
      deltaPosY++;
      playerCanMove = false;
    }
  }
  // up
  else if (stickValueY < -STICK_DEADZONE) {
    if (playerCanMove) {
      deltaPosY--;
      playerCanMove = false;
    }
  } else {
    playerCanMove = true;
  }
  transPlayerPos(deltaPosX, deltaPosY);

  // ----- Draw Pixel -----
  // button
  if (stickValueBtn == HIGH) {
    frame[playerPosY][playerPosX] = true;
  }
}

// ----- MOVES PLAYER POS -----
void transPlayerPos(int x, int y) {
  playerPosX = constrain(playerPosX + x, 0, MAX_X - 1);
  playerPosY = constrain(playerPosY + y, 0, MAX_Y - 1);
}
```

## Sources
- [distance sensor tutorial][distance-tutorial]
- [joystick tutorial][joystick-tutorial]
- [matrix tutorial][matrix-tutorial]
- [matrix library][matrix-library]

[distance-tutorial]: https://projecthub.arduino.cc/Isaac100/getting-started-with-the-hc-sr04-ultrasonic-sensor-7cabe1
[joystick-tutorial]: https://projecthub.arduino.cc/hibit/using-joystick-module-with-arduino-0ffdd4
[matrix-tutorial]: https://www.circuitbasics.com/how-to-setup-an-led-matrix-on-the-arduino/
[matrix-library]: https://docs.arduino.cc/libraries/ledcontrol/