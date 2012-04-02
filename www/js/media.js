var my_media = null;
var mediaRec = null;
var mediaTimer = null;
var rec_src = "myrecording.wav"; 

// playAudio : "Play" 버튼을 눌렀을때 호출하는 함수
// 지정된 URL을 이용해 Media 객체를 생성한다. 생성된 미디어를 재생하고 1초 타이머를 생성하여 1초마다
// setAudioPosition 함수를 호출하여 미디어의 현재 위치를 표시한다.
function playAudio() {
//    var audioURL = 'http://audio.ibeat.org/content/p1rj1s/p1rj1s_-_rockGuitar.mp3';
    if(device.platform=="iPhone" || device.platform=="iPhone Simulator") {
        var audioURL = './rockGuitar.mp3';
    } else if(device.platform=="Android") {
        var audioURL = '/android_asset/www/rockGuitar.mp3';
    }
		
    my_media = new Media(audioURL, onSuccess, onError);

    my_media.play();

    if (mediaTimer == null) {
        mediaTimer = setInterval(function() {
            my_media.getCurrentPosition(
                // success callback
                function(position) {
                    if (position > -1) {
                        setAudioPosition((position) + " sec");
                    }
                },
                // error callback
                function(e) {
                    console.log("Error getting pos=" + e);
                    setAudioPosition("Error: " + e);
                }
            );
        }, 1000);
    }	
}

//onSuccess : playAudio() 함수에서 Media 객체 생성에 성공했을 때 호출하는 콜백 함수
function onSuccess() {
    console.log("playAudio():Audio Success");
}

// onError : playAudio() 함수에서 Media 객체 생성에 실패했을 때 호출하는 콜백 함수
function onError(error) {
    console.log('code: '    + error.code    + '\n' + 
                'message: ' + error.message + '\n');
}

// setAudioPosition : audio_position 요소를 찾아 미디어 파일에서 현재 위치를 표시한다.
function setAudioPosition(position) {
    document.getElementById('audio_position').innerHTML = position;
}



// pauseAudio : "Pause" 버튼을 눌렀을때 호출하는 함수
// 현재 재생중인 미디어를 일시 중지한다.
function pauseAudio() {
    if (my_media) {
        my_media.pause();
    }
}

// stopAudio : "Stop" 버튼을 눌렀을때 호출하는 함수
// 현재 재생중인 미디어를 중지하고 타이머를 종료시킨다.
function stopAudio() {
    if (my_media) {
        my_media.stop();
    }
    clearInterval(mediaTimer);
    mediaTimer = null;
}

// recordAudio : "Recording audio..." 버튼을 눌렀을 때 호출하는 함수
// 음성 녹응을 시작하여 지정된 파일에 저장한다.
// 아이폰은 파일을 미리 생성하기 위해 createRecordFile() 함수를 호출하는데 이 함수에서 파일이 생성되면 녹음을 시작한다.
// 안드로이드는 이런 과정이 필요없고 바로 startRecord()를 호출하여 녹음을 시작한다.
function recordAudio() {

    if(device.platform=="iPhone" || device.platform=="iPhone Simulator") {
    	createRecordFile(rec_src);
    } else if(device.platform=="Android") {
        startRecord(rec_src);
    }
}

// startRecordPlay : "Start playing..." 버튼을 눌렀을 때 호출하는 함수
// 저장된 음성 녹음 파일을 재생한다. 이때 버튼의 텍스트를 "Stop playing..." 으로 바꾸고 이 버튼이 눌리면 
// stopRecordPlay() 함수를 호출하도록 지정한다.
function startRecordPlay() {
	if(mediaRec) {
	    $("#recording_btn").attr("onclick", "stopRecordPlay();");     
	    $("#recording_btn .ui-btn-text").text("Stop playing..."); 
	    mediaRec.play();
	}
}

//startRecordPlay : "Stop playing..." 버튼을 눌렀을 때 호출하는 함수
//저장된 음성 녹음 파일을 재생한다. 이때 버튼의 텍스트를 "Recording audio..." 로 바꾸고 이 버튼이 눌리면 
//recordAudio() 함수를 호출하도록 지정한다.
function stopRecordPlay() {
    if(mediaRec) {
    	mediaRec.stop();
        $("#recording_btn").attr("onclick", "recordAudio();");     
        $("#recording_btn .ui-btn-text").text("Recording audio..."); 
    }
}

// startRecord : 음성 녹음을 시작한다.
// 지정된 파일로 Media 객체를 생성하고 startRecord() 메서드를 호출하여 음성 녹음을 시작한다.
// 10초 타이머를 설정하고 타이머가 종료되면 stopRecord() 메서드를 호출하여 음성 녹음을 중지하고 버튼의 텍스트를 "Start playing..."으로 변경한다.
// 이 버튼을 누르면 startRecordingPlay() 함수를 호출하여 녹음된 음성 파일을 재생한다.
function startRecord(src) {
    mediaRec = new Media(src,
            // success callback
            function() {
                console.log("recordAudio():Audio Success");
            },

            // error callback
            function(err) {
                console.log("recordAudio():Audio Error: "+ err.code+"\n"+err.message);
            });

        // Record audio
        mediaRec.startRecord();

        // Stop recording after 10 seconds
        setTimeout(function() {
            mediaRec.stopRecord();
            $("#recording_btn").attr("onclick", "startRecordPlay();");     
            $("#recording_btn .ui-btn-text").text("Start playing..."); 
        }, 10000);
}


// createRecordFile : filename 으로 전달된 이름의 파일을 루트 디렉토리에 생성한다. 
// 파일을 정상적으로 생성하였다면 startRecord() 함수를 호출하여 음성 녹음을 시작한다.
// 이때 전달되는 매개 변수는 생성된 파일의 전체 경로명인 fileEntry.fullPath가 전달되어야 한다. 
function createRecordFile(filename) {
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fs) {
        console.log("requestFileSystem success : "+fs.name);
        fs.root.getFile( filename, {create: true}, function(fileEntry) {
            console.log("fileEntry.getFile : "+fileEntry.fullPath);
            startRecord(fileEntry.fullPath);
        }, function(e) {
            console.log('Error : '+e.code);
        });
    }, function(e) {
        console.log('Error : '+e.code);
    });
}


