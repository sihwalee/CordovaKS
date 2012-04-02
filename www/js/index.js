function onLoad() {
    document.addEventListener("deviceready", onDeviceReady, false);
}

function onDeviceReady() {
    document.addEventListener("pause", onPause, false);
    document.addEventListener("resume", onResume, false);
    document.addEventListener("online", onOnline, false);
    document.addEventListener("offline", onOffline, false);
    document.addEventListener("backbutton", onBackButton, false);
    window.addEventListener("batterycritical", onBatteryCritical, false);
    window.addEventListener("batterylow", onBatteryLow, false);
    window.addEventListener("batterystatus", onBatteryStatus, false);
    document.addEventListener("menubutton", onMenuButton, false);
    document.addEventListener("searchbutton", onSearchButton, false);
    document.addEventListener("startcallbutton", onStartCallButton, false);
    document.addEventListener("endcallbutton", onEndCallButton, false);
    document.addEventListener("volumedownbutton", onVolumeDownButton, false);
    document.addEventListener("volumeupbutton", onVolumeUpButton, false);
}

function onPause() {
    alert("pause event");
}

function onResume() {
    alert("resume event");
}

function onOnline() {
    alert("online event");
}

function onOffline() {
    alert("offline event");
}

function onBackButton() {
    alert("backbutton event");
}

function onBatteryCritical(info) {
    var msg = "BatteryCritical\nBatttery Level : "+info.level;
    if(info.isPlugged==true) {
        msg += "\n충전중";
    }
    alert(msg);
}

function onBatteryLow(info) {
    var msg = "BatteryLow\nBatttery Level : "+info.level;
    if(info.isPlugged==true) {
        msg += "\n충전중";
    }
    alert(msg);
}

function onBatteryStatus(info) {
    var msg = "BatteryStatus\nBattery Level : "+info.level;
    if(info.isPlugged==true) {
        msg += "\n충전중";
    }
    alert(msg);
}

function onMenuButton() {
    alert("menubutton event");    
}

function onSearchButton() {
    alert("searchbutton event");    
}

function onStartCallButton() {
    alert("startcallbutton event");    
}

function onEndCallButton() {
    alert("endcallbutton event");    
}

function onVolumeDownButton() {
    alert("volumedownbutton event");    
}

function onVolumeUpButton() {
    alert("volumeupbutton event");    
}


$(document).bind("mobileinit", function() {
        
    $('#PhoneGap_Device').live('pageshow',function(event){
        phonegapDevice();
    });
    
    $('#PhoneGap_Connection').live('pageshow',function(event){
        phonegapConnection();
    });

})


