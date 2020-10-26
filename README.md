# Puck.js-volume-control

This uses the amazing Puck.js (v2) to control media playback and volume via BLE media control.

It translates physical rotation of the Puck into a change in device volume.

## What this does:
* Short press: play/pause
* Long press: CW rotation --> increase volume, CCW rotation --> decrease volume

## Demo
[![demo](https://img.youtube.com/vi/3Md_5bTZ-r0/0.jpg)](https://www.youtube.com/watch?v=3Md_5bTZ-r0)

## Based on :
Espruino YT channel - [DIY Hands-free music control with Puck.js](https://www.youtube.com/watch?v=3iZ9j_ga6zs) This is how I initially found out about the Puck.js. The corresponding code for the video can be found [here](https://github.com/espruino/EspruinoDocs/blob/master/tutorials/BLE%20Music%20Control.md).

Aaron McBride YT channel - [Puck.js Volume Knob](https://www.youtube.com/watch?v=bQfYFnm8tQc)
Sadly, there was no documentation given on how this was achieved.

## How it works:
The magnetometer of the Puck.js is read out at a predefined interval, an "azimuthal" heading is calculated and then compared to the previous heading. The difference is used to differentiate between CW and CCW rotation, resulting in a command for increasing/decreasing the volume.

The code might be a bit rough, but this was my first project with this device.

## How to use it:
Just transfer the code in `code.js` via [Espruinos Web IDE](https://www.espruino.com/ide/) and web BLE in Chrome to your [Puck.js](https://www.espruino.com/Puck.js) and pair with a phone/computer.
