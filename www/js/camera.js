
// onPhotoDataSuccess: 사진을 정상적으로 가져왔을 때 호출되는 콜백 함수
// 전달되는 정보는 base64 인코딩 문자열이다.
function onPhotoDataSuccess(imageData) {
    var smallImage = document.getElementById('smallImage');

    smallImage.style.display = 'block';

    // 가져온 사진을 표시한다.
    smallImage.src = "data:image/jpeg;base64," + imageData;
}

// onPhotoURISuccess: 사진을 정상적으로 가져왔을 때 호출되는 콜백 함수
// 전달되는 정보는 이미지 파일의 위치 정보이다.
function onPhotoURISuccess(imageURI) {
    var largeImage = document.getElementById('largeImage');

    largeImage.style.display = 'block';

    // 가져온 사진을 표시한다.
    largeImage.src = imageURI;
}

// onFail: 오류가 발생했을 때 호출되는 콜백 함수
function onFail(message) {
 alert('Failed because: ' + message);
}

// capturePhoto: "Capture Photo" 버튼이 눌렸을 때 호출되는 함수 
function capturePhoto() {
    navigator.camera.getPicture(
        onPhotoDataSuccess,
        onFail,
        { quality: 50 }
    );
}

// capturePhotoEdit: "Capture Editable Photo" 버튼이 눌렸을 때 호출되는 함수 
function capturePhotoEdit() {
    // Take picture using device camera, allow edit, and retrieve image as base64-encoded string  
    navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 20, allowEdit: true }); 
}

// getPhoto: "From Photo Library"나 "From Photo Album" 버튼이 눌렸을 때 호출되는 함수 
//
function getPhoto(source) {
    navigator.camera.getPicture(
        onPhotoURISuccess, 
        onFail, 
        { quality: 50, 
          destinationType: Camera.DestinationType.FILE_URI,
          sourceType: source }
    );
}

