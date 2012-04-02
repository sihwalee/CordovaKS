var watchID = null;
var watchFilterID = null;

// getcurrHeading : 현재 기기의 방향 정보를 읽는다.
function getcurrHeading() {
    navigator.compass.getCurrentHeading(onSuccessCurrHeading, onErrorCurrHeading);
}

//onSuccessCurrHeading: getcurrHeading 함수에서 현재 기기의 방향 정보를 읽는데 성공했을때 호출하는 콜백 함수
function onSuccessCurrHeading(heading) {
    
    var element = document.getElementById('CurrHeading');
    
    element.innerHTML = 'Magnetic Heading : ' + heading.magneticHeading + '<br />'+
                        'true Heading : ' + heading.trueHeading + '<br />'+
                        'Heading Accurracy: ' + heading.headingAccuracy + '<br />' +
                        'Timestamp: '          + new Date(heading.timestamp)          + '<br />';
}

// onErrorCurrHeading: getcurrHeading 함수에서 현재 기기의 방향 정보를 읽어오는데 실패했을때 호출하는 콜백 함수
function onErrorCurrHeading(error) {
    alert('Curr Heading Error : '+error.code);
}

// startWatchHeading: 주기적으로 기기의 방향 정보를 읽음 
function startWatchHeading() {

    var options = { frequency: 3000 };

    $("#start_watch_heading_btn").attr("onclick", "stopWatchHeading();");     
    $("#start_watch_heading_btn .ui-btn-text").text("Stop Watch"); 

    watchID = navigator.compass.watchHeading(onSuccessWatchHeading, onErrorWatchHeading, options);
}

// stopWatchHeading: 주기적인 기기 방향 정보 읽기를 중단한다.
function stopWatchHeading() {
    if (watchID) {
        $("#start_watch_heading_btn").attr("onclick", "startWatchHeading();");     
        $("#start_watch_heading_btn .ui-btn-text").text("Start Watch Heading");
        
        navigator.compass.clearWatch(watchID);
        watchID = null;
    }
}

//onSuccessWatchHeading: startWatchHeading 함수에서 현재 기기의 방향 정보를 읽는데 성공했을때 호출하는 콜백 함수
function onSuccessWatchHeading(heading) {
    
    var element = document.getElementById('WatchHeading');
    
    element.innerHTML = 'Magnetic Heading : ' + heading.magneticHeading + '<br />'+
                        'true Heading : ' + heading.trueHeading + '<br />'+
                        'Heading Accurracy: ' + heading.headingAccuracy + '<br />' +
                        'Timestamp: '          + new Date(heading.timestamp)          + '<br />';


}

//onErrorWatchHeading: startWatchHeading 함수에서 현재 기기의 방향 정보를 읽어오는데 실패했을때 호출하는 콜백 함수
function onErrorWatchHeading(error) {
    alert('Watch Heading Error : '+error.code);
}

//startWatchHeadingFilter: 기기의 방향이 지정된 각도 이 바뀌었을때 기기의 방향 정보를 읽음 
function startWatchHeadingFilter() {

  var options = { filter: 10 };

  $("#start_watch_filter_btn").attr("onclick", "stopWatchHeadingFilter();");     
  $("#start_watch_filter_btn .ui-btn-text").text("Stop Watch Filter"); 

  watchFilterID = navigator.compass.watchHeadingFilter(onSuccessWatchHeadingFilter, onErrorWatchHeadingFilter, options);
}

//stopWatchHeadingFilter: startWatchHeadingFilter가 시작한 기기 방향 정보 읽기를 중단한다.
function stopWatchHeadingFilter() {
if (watchFilterID) {
  $("#start_watch_filter_btn").attr("onclick", "startWatchHeadingFilter();");     
  $("#start_watch_filter_btn .ui-btn-text").text("Start Watch Heading Filter");
  
  navigator.compass.clearWatchFilter(watchID);
  watchFilterID = null;
}
}

//onSuccessWatchHeadingFilter: startWatchHeadingFilter 함수에서 현재 기기의 방향 정보를 읽는데 성공했을때 호출하는 콜백 함수
function onSuccessWatchHeadingFilter(heading) {

var element = document.getElementById('WatchHeadingFilter');

element.innerHTML = 'Magnetic Heading : ' + heading.magneticHeading + '<br />'+
                  'true Heading : ' + heading.trueHeading + '<br />'+
                  'Heading Accurracy: ' + heading.headingAccuracy + '<br />' +
                  'Timestamp: '          + new Date(heading.timestamp)          + '<br />';

}                        

//onErrorWatchHeadingFilter: startWatchHeadingFilter 함수에서 현재 기기의 방향 정보를 읽어오는데 실패했을때 호출하는 콜백 함수
function onErrorWatchHeadingFilter(error) {
alert('Watch Heading Filter Error : '+error.code);
}


