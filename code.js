var controls = require("ble_hid_controls");
NRF.setServices(undefined, { hid : controls.report });

//number of colume measurements
var measurements = 30;
//interval between rotation measurements
var interval = 200;
//global variable that needs to be created once
var counts = 0;

setWatch(function(e) {
  //change to a fast NRF connection interval
  NRF.setConnectionInterval(30);
  var len = e.time - e.lastTime;
  if (len < 0.33) {
    //playpause
    digitalPulse(LED2,1,10);
    //low battery warning
    if (Puck.getBatteryPercentage() < 95) { digitalPulse(LED,1,250); }
    controls.playpause();
    //print("playpause");
  } else {
    //start volume control loop
    //reset counter
    counts = 0;
    prev = 0;
    for (var start = 0; start < measurements ; start++) {
      setTimeout(() => {
      digitalPulse(LED3,1,Math.round(interval/4));
      counts = counts+1;
      reading = Puck.mag();
      y = reading.y;
      x = reading.x;
      az = Math.atan2(x, y)*360/Math.PI + 100;
      //print("cnt",counts,("   " + Math.round(az-prev)).slice(-3));
      if (az-prev > 10 && az-prev < 100) { controls.volumeDown();
                                         //print("down"); 
                                         }
      else if (az-prev < -10 && az-prev > -100) { controls.volumeUp();
                                                //print("up"); 
                                                }
      else if (az-prev > -9 && az-prev < 9 ) { //print("no change"); 
                                              }
      else {}
      //save az as previous reading
      prev = az;
      Puck.magOff();
      }, start*interval);
    }
  }
  //revert to slow (power saving) interval
  setTimeout(() => { NRF.setConnectionInterval(200); }, measurements*interval);
}, BTN, {edge:"falling",repeat:true,debounce:50});
