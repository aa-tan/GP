var sum = 0;
var username_timestamps = [];
var password_timestamps = [];

function keyPressed(ele){
    if(ele == "username"){
        username_timestamps.push(Date.now());
    }
    else if(ele == "password"){
        password_timestamps.push(Date.now());
    }
}

function focusForm(){
    document.getElementById("username").focus()
}

function formSubmit(){
    document.getElementById("speedUser").value = calculateSpeed("username")
    document.getElementById("speedPass").value = calculateSpeed("password")
    document.getElementById("login_form").submit()
}

function calculateSpeed(type){ 
    var timestamps;
    if(type == "username"){
        timestamps = username_timestamps
    }
    else if(type == "password"){
        timestamps = password_timestamps
    }
    // Last keypress - first keypress / amount of keypresses
    return (timestamps[timestamps.length-1] - timestamps[0]) / timestamps.length
}
