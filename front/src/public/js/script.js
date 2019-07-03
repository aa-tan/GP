var sum = 0;
var username_timestamps = [];
var password_timestamps = [];
var timestamp = null;
var last_mouse_x = null;
var last_mouse_y = null;
var mouseSpeed = [];
var mouseEvents = 0
var userAgent = {}
var keypresses = 0

function keyPressed(ele){
    if(ele == "username"){
        username_timestamps.push(Date.now());
    }
    else if(ele == "password"){
        password_timestamps.push(Date.now());
    }
}

function bodyLoaded(){
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
    formatUserAgent()
}

// Gets all data from the user owo
function formSubmit(){
    // Typing speedz for username and password fields
    document.getElementById("speedUser").value = calculateTypingSpeed("username");
    document.getElementById("speedPass").value = calculateTypingSpeed("password");
    document.getElementById("deltaUser").value = calculateTypingDelta("username");
    document.getElementById("deltaPass").value = calculateTypingDelta("password");
    document.getElementById("keypresses").value = keypresses
    // Avg mouse movement speeds and overall move events
    document.getElementById("speedMouse").value = calculateMouseSpeed();
    document.getElementById("mouseMoveEvents").value = mouseEvents
    // Steal their user agent info! browser, OS, etc
    document.getElementById("browser").value = userAgent["Browser"]
    document.getElementById("os").value = userAgent["OS"]
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
    else{
        var mouseSum = 0.0;
        for(var i = 0; i < mouseSpeed.length; i++){
            mouseSum += mouseSpeed[i];
        }
        var avg = mouseSum/mouseSpeed.length
        return avg
    }
}

function formatUserAgent(){
    const agentstring = window.navigator.userAgent
    console.log(agentstring)
    formatBrowser(agentstring)
    formatOS(agentstring)
}

function formatBrowser(agentstring){
    // Fix agent string catching safari
    if(agentstring.includes("Chrome")){
        userAgent["Browser"] = "Chrome"
    } 
    else if(agentstring.includes("Firefox")){
        userAgent["Browser"] = "Firefox"
    }
    else if(agentstring.includes("Safari")){
        userAgent["Browser"] = "Safari"
    }
}

function formatOS(agentstring){
    if(agentstring.includes("Macintosh")){
        userAgent["OS"] = "Macintosh"
    }
    else{
        userAgent["OS"] = "Other"
    }
}

function calculateTypingDelta(element){
    var typingTimestamps;
    var timeDeltas = []
    if(element == "username"){
        typingTimestamps = username_timestamps;
    }
    else if(element == "password"){
        typingTimestamps = password_timestamps;
    }
    else{
        return ""
    }

    for(var i = 1; i < typingTimestamps.length; i++){
       timeDeltas.push(typingTimestamps[i]-typingTimestamps[i-1]) 
    }
    return timeDeltas.toString();
}

document.addEventListener('keydown', function(){
    keypresses += 1
})
