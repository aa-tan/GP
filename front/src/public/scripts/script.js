var sum = 0;
var username_timestamps = [];
var password_timestamps = [];
var timestamp = null;
var last_mouse_x = null;
var last_mouse_y = null;
var mouseSpeed = [];
var mouseEvents = 0

function keyPressed(ele){
    if(ele == "username"){
        username_timestamps.push(Date.now());
    }
    else if(ele == "password"){
        password_timestamps.push(Date.now());
    }
}

function addListener(){
    document.body.addEventListener("mousemove", (event) => {
        mouseEvents += 1
        if(timestamp == null){
            timestamp = Date.now();
            last_mouse_x = event.screenX;
            last_mouse_y = event.screenY;
            return
        }
        var now = Date.now();
        var dt = now - timestamp;
        var dx = event.screenX - last_mouse_x;
        var dy = event.screenY - last_mouse_y;
        var distance = Math.sqrt(Math.pow(dx, 2)+Math.pow(dy, 2));
        if(mouseSpeed.length == 200){
            mouseSpeed.shift();
        }
        mouseSpeed.push(distance / dt);
        timestamp = now;
        lastMouseX = event.screenX;
        lastMouseY = event.screenY;
    })
}

function formSubmit(){
    document.getElementById("speedUser").value = calculateTypingSpeed("username");
    document.getElementById("speedPass").value = calculateTypingSpeed("password");
    document.getElementById("speedMouse").value = calculateMouseSpeed();
    document.getElementById("mouseMoveEvents").value = mouseEvents
    document.getElementById("login_form").submit();
}

function calculateTypingSpeed(type){ 
    var typingTimestamps;
    if(type == "username"){
        typingTimestamps = username_timestamps;
    }
    else if(type == "password"){
        typingTimestamps = password_timestamps;
    }
    // Last keypress - first keypress / amount of keypresses
    return (typingTimestamps[typingTimestamps.length-1] - typingTimestamps[0]) / typingTimestamps.length
}

function calculateMouseSpeed(){
    if(mouseSpeed == []){
        return 0;
    }
    var mouseSum = 0.0;
    for(var i = 0; i < mouseSpeed.length; i++){
        mouseSum += mouseSpeed[i];
    }
    var avg = mouseSum/mouseSpeed.length
    return avg
}
