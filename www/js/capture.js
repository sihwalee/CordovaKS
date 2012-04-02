// captureAudioSuccess: 음성 녹음이 정상적으로 완료되었을 때 호출되는 콜백 함수 
function captureAudioSuccess(mediaFiles) {
    var i, len;
    for (i = 0, len = mediaFiles.length; i < len; i += 1) {
        alert(mediaFiles[i].name+":"+mediaFiles[i].fullPath);
    }       
}

// captureAudioError: 음성 녹음에 실패했을 때 호출되는 콜백 함수 
function captureAudioError(error) {
    var msg = 'An error occurred during capture: ' + error.code;
    navigator.notification.alert(msg, null, 'Uh oh!');
}

// captureAudio: "Capture Audio" 버튼을 눌렀을 때 호출되는 함수 
function captureAudio() {
    // 기본 음성 녹음 앱을 시작하고 두 개의 녹음을 받을 수 있도록 설정한다. 
    navigator.device.capture.captureAudio(
        captureAudioSuccess, 
        captureAudioError, 
        {limit: 2}
    );
}

// captureImageSuccess: 사진 촬영이 정상적으로 완료되었을 때 호출되는 콜백 함수 
function captureImageSuccess(mediaFiles) {
    var i, len;
    for (i = 0, len = mediaFiles.length; i < len; i += 1) {
        alert(mediaFiles[i].name+":"+mediaFiles[i].fullPath);
    }       
}

// captureImageError: 사진 촬영에 실패했을 때 호출되는 콜백 함수 
function captureImageError(error) {
    var msg = 'An error occurred during capture: ' + error.code;
        navigator.notification.alert(msg, null, 'Uh oh!');
}

// captureImage: "Capture Image" 버튼을 눌렀을 때 호출되는 함수 
function captureImage() {
    // 기본 카메라 앱을 시작하고 두 개의 촬영 결과를 받을 수 있도록 설정한다. 
    navigator.device.capture.captureImage(
        captureImageSuccess, 
        captureImageError, 
        {limit: 2}
    );
}
    
// captureVideoSuccess: 동영상 촬영이 정상적으로 완료되었을 때 호출되는 콜백 함수 
function captureVideoSuccess(mediaFiles) {
    var i, len;
    for (i = 0, len = mediaFiles.length; i < len; i += 1) {
        alert(mediaFiles[i].name+":"+mediaFiles[i].fullPath);
    }       
}

// captureVideoError: 동영상 촬영에 실패했을 때 호출되는 콜백 함수
function captureVideoError(error) {
    var msg = 'An error occurred during capture: ' + error.code;
    navigator.notification.alert(msg, null, 'Uh oh!');
}

// captureVideo: "Capture Video" 버튼을 눌렀을 때 호출되는 함수 
function captureVideo() {
    // 기본 카메라 앱을 시작하고 두 개의 동영상 촬영 결과를 받을 수 있도록 설정한다. 
    navigator.device.capture.captureVideo(
        captureVideoSuccess, 
        captureVideoError, 
        {limit: 2}
    );
}