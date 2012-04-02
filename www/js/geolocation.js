var watchID = null;

// getcurrPosition: 현재 위치 정보를 읽는다.
function getcurrPosition() {
    navigator.geolocation.getCurrentPosition(onSuccessCurrPosition, onErrorCurrPosition);
}

// onSuccessCurrPosition: getcurrPosition 함수에서 현재 위치 정보를 읽어오는데 성공했을때 호출하는 콜백 함수
function onSuccessCurrPosition(position) {
    
    var element = document.getElementById('CurrPosition');
    
    element.innerHTML = 'Latitude: '           + position.coords.latitude              + '<br />' +
                        'Longitude: '          + position.coords.longitude             + '<br />' +
                        'Altitude: '           + position.coords.altitude              + '<br />' +
                        'Accuracy: '           + position.coords.accuracy              + '<br />' +
                        'Altitude Accuracy: '  + position.coords.altitudeAccuracy      + '<br />' +
                        'Heading: '            + position.coords.heading               + '<br />' +
                        'Speed: '              + position.coords.speed                 + '<br />' +
                        'Timestamp: '          + new Date(position.timestamp)          + '<br />';
}

// onErrorCurrPosition: getcurrPosition 함수에서 현재 위치 정보를 읽어오는데 실패했을때 호출하는 콜백 함수
function onErrorCurrPosition(error) {
    alert('code: '    + error.code    + '\n' +
          'message: ' + error.message + '\n');
}


// startWatchPosition: 현재 위치 정보가 변경 되면 반복적으로 위치 정보를 읽는다.
function startWatchPosition() {

    var options = { frequency: 1000 };

    $("#start_watch_position_btn").attr("onclick", "stopWatchPosition();");     
    $("#start_watch_position_btn .ui-btn-text").text("Stop Watch"); 

    watchID = navigator.geolocation.watchPosition(onSuccessWatchPosition, onErrorWatchPosition, options);
}

// stopWatchPosition: 반복적인 위치 정보 읽기를 중단한다.
function stopWatchPosition() {
    if (watchID) {
        $("#start_watch_position_btn").attr("onclick", "startWatchPosition();");     
        $("#start_watch_position_btn .ui-btn-text").text("Start Watch Position");
        
        navigator.geolocation.clearWatch(watchID);
        watchID = null;
    }
}

//onSuccessWatchPosition: startWatchPosition 함수에서 현재 위치 정보를 읽어오는데 성공했을때 호출하는 콜백 함수
function onSuccessWatchPosition(position) {
    
    var element = document.getElementById('WatchPosition');
    
    element.innerHTML = 'Latitude: '  + position.coords.latitude      + '<br />' +
                        'Longitude: ' + position.coords.longitude     + '<br />' +
                        '<hr />'      + element.innerHTML;
}

//onErrorWatchPosition: startWatchPosition 함수에서 현재 위치 정보를 읽어오는데 실패했을때 호출하는 콜백 함수
function onErrorWatchPosition(error) {
    alert('code: '    + error.code    + '\n' +
          'message: ' + error.message + '\n');
}
