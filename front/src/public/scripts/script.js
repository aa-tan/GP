var sum = 0;
var username_timestamps = [];
var password_timestamps = [];
var timestamp = null;
var last_mouse_x = null;
var last_mouse_y = null;
var typingSpeed = 0;

function keyPressed(ele){
    if(ele == "username"){
        username_timestamps.push(Date.now());
    }
    else if(ele == "password"){
        password_timestamps.push(Date.now());
    }
}

function focusForm(){
    document.getElementById("username").focus();
}

function formSubmit(){
    document.getElementById("speedUser").value = calculateTypingSpeed("username");
    document.getElementById("speedPass").value = calculateTypingSpeed("password");
    document.getElementById("speedMouse").value = calculateMouseSpeed();
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
    var mouseSum = 0;
    for(var i = 0; i < speed.length; i++){
        mouseSum += speed[i]; 
    }
    return mouseSum/speed.length
}

document.body.addEventListener("mousemove", (event) => {
    if(timestamp == null){
        timestamp = Date.now();
        last_mouse_x = event.screenX;
        last_mouse_y = event.screenY;
    } 

    var now = Date.now();
    var dt = now - timestamp;
    var dx = event.screenX - last_mouse_x;
    var dy = event.screenY - last_mouse_y;
    var distance = Math.sqrt(Math.pow(dx)+Math.pow(dy));
    typingSpeed = distance / dt;
    timestamp = now;
    lastMouseX = event.screenX;
    lastMouseY = event.screenY;
})
