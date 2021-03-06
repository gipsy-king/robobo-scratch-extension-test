
//Constructor of the remote control object
function Remote(ip,port){
  this.ip = ip;
  this.port = port;
  this.ws = undefined;
  this.commandid = 0;
//END OF REMOTE OBJECT
};

Remote.prototype = {


  connect :function(ip,port) {
    Remote.prototype.ws = new WebSocket("ws://"+this.ip+":"+this.port);

    Remote.prototype.ws.onopen = function() {
      console.log("Connection Stablished");

    }

    Remote.prototype.ws.onmessage = function(evt) {
      var received_msg = evt.data;
      Remote.prototype.handleMessage(received_msg)

    }

    Remote.prototype.ws.onclose = function() {
      console.log("Connection Closed");
    }

    //END OF CONNECT FUNCTION
  },

  sendMessage: function(message) {
    this.commandid = this.commandid +1;
    Remote.prototype.ws.send(message);

    //END OF SENDMESSAGE FUNCTION
  },

  handleMessage: function(message) {

    var jsonmsg = JSON.parse(message)
    console.log(typeof(jsonmsg.name) == 'string');
    if (typeof(jsonmsg.name) == 'string'){
      this.manageStatus(jsonmsg);
    }else if (typeof(jsonmsg.commandid) != "undefined") {
      this.manageResponse(jsonmsg);
    }

    //END OF HANDLEMESSAGE FUNCTION
  },


  //MOVEMENT

  moveWheelsByDegree: function(wheel,degrees,speed) {
    var message = JSON.stringify({
        "name": "MOVEBYDEGREES",
        "parameters": {
            wheel: wheel,
            degrees: degrees,
            speed:speed
        },
        "id": this.commandid
    });

    //END OF MOVEWHEELS FUNCTION
  },

  movePan: function(pos, vel) {
    var message = JSON.stringify({
        "name": "MOVEPAN",
        "parameters": {
            pos: pos,
            speed:vel
        },
        "id": this.commandid
    });
    this.sendMessage(message)
    //END OF MOVEPAN FUNCTION
  },

  moveTilt: function (pos, vel) {
    var message = JSON.stringify({
        "name": "MOVETILT",
        "parameters": {
            pos: pos,
            speed:vel
        },
        "id": this.commandid
    });
    this.sendMessage(message)
    //END OF MOVETILT FUNCTION
  },

  //ENDMOVEMENT

  //HRI
  talk : function (speech) {
    var message = JSON.stringify({
        "name": "TALK",
        "parameters": {
            text: speech
        },
        "id": this.commandid
    });
    this.sendMessage(message)
    //END OF TALK FUNCTION
  },

  changeEmotion : function (emotion) {
    var message = JSON.stringify({
        "name": "CHANGEEMOTION",
        "parameters": {
            emotion: emotion
        },
        "id": this.commandid
    });
    this.sendMessage(message)
    //END OF CHANGEEMOTION FUNCTION
  },

  setLedColor: function (r,g,b) {
    var message = JSON.stringify({
        "name": "LEDCOLOR",
        "parameters": {
            rchan: r,
            gchan: g,
            bchan: b
        },
        "id": this.commandid
    });
    this.sendMessage(message)
    //END OF CHANGECOLOR FUNCTION
  },

  //ENDHRI

  //SENSING
  getLightBrightness: function () {
    var message = JSON.stringify({
        "name": "GETBRIGHTNESS",
        "parameters": {},
        "id": this.commandid
    });
    this.sendMessage(message)
    //END OF GETLIGHTBRIGHTNESS FUNCTION
  },

  brightnessChanged: function (callback) {
    callback();

    //END OF BRIGHTNESSCHANGED FUNCTION
  },

  //ENDSENSING

  //VISION

  colorDetected : function (callback) {
    callback();
  },

  //ENDVISION


  manageStatus : function (msg) {


    console.log(msg.name);

    if (msg.name == "TapNumber"){
      console.log(msg.value);
    }
    //END MANAGESTATUS FUNCTION
  },

  manageResponse : function (msg) {
      console.log(JSON.stringify(msg));

    //END MANAGERESPONSE FUNCTION
  }

}
