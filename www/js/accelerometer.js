var watchID = null;

function getcurrAccel() {
    navigator.accelerometer.getCurrentAcceleration(onSuccessCurrAccel, onErrorCurrAccel);
}

// onSuccessCurrAccel: 현재 가속 센서 측정값을 성공적으로 읽은 경우 호출되는 콜백 
function onSuccessCurrAccel(acceleration) {
    var element = document.getElementById('CurrAcceleration');
    
    // 읽어온 가속 센서 측정값으로 화면을 갱신한다.
    element.innerHTML = 'Acceleration X: ' + acceleration.x + '<br />' +
                        'Acceleration Y: ' + acceleration.y + '<br />' +
                        'Acceleration Z: ' + acceleration.z + '<br />' +
                        'Timestamp: '      + acceleration.timestamp + '<br />';
}

// onErrorCurrAccel: 현재 가속 측정값 읽기에 실패했을 경우 호출되는 콜백 
function onErrorCurrAccel() {
    var element = document.getElementById('CurrAcceleration');
    
    // 가속 측정값을 읽을 수 없을 경우 화면에 에러를 표시한다.
    element.innerHTML = '가속 센서 읽기 오류<br />';
}


// startWatchAccel: 주기적인 가속 센서 측정값 읽기를 시작한다. 
function startWatchAccel() {
    // 1초마다 반복적으로 가속 센서를 읽도록 설정한다.
    var options = { frequency: 1000 };

    $("#start_watch_accel_btn").attr("onclick", "stopWatchAccel();");     
    $("#start_watch_accel_btn .ui-btn-text").text("Stop Watch"); 

    watchID = navigator.accelerometer.watchAcceleration(onSuccessWatchAccel, onErrorWatchAccel, options);
}

// stopWatchAccel : 주기적으로 수행하던 가속 센서 측정값 읽기 동작을 정지한다.
function stopWatchAccel() {
    if (watchID) {
        navigator.accelerometer.clearWatch(watchID);
        watchID = null;
    }
    $("#start_watch_accel_btn").attr("onclick", "startWatchAccel();");     
    $("#start_watch_accel_btn .ui-btn-text").text("Start Watch Acceleration");
    
}

// onSuccessWatchAccel: 가속 센서 측정값을 성공적으로 읽은 경우 호출되는 콜백
function onSuccessWatchAccel(acceleration) {
    var element = document.getElementById('WatchAcceleration');
    
    element.innerHTML = 'Acceleration X: ' + acceleration.x + '<br />' +
                        'Acceleration Y: ' + acceleration.y + '<br />' +
                        'Acceleration Z: ' + acceleration.z + '<br />' +
                        'Timestamp: '      + acceleration.timestamp + '<br />';
}
// onErrorWatchAccel: 가속 측정값 읽기에 실패했을 경우 호출되는 콜백
function onErrorWatchAccel() {
    var element = document.getElementById('CurrAcceleration');
    
    // 가속 측정값을 읽을 수 없을 경우 화면에 에러를 표시한다.
    element.innerHTML = '가속 센서 읽기 오류<br />';
}
