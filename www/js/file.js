// gotReadFS : readFile 함수에서 파일 시스템을 정상적으로 얻었을 때 호출하는 함수
// getFile 메서드를 통해 read.txt를 얻는데 존재하지 않는 파일이면 새로 만들고 gotReadFileEntry 콜백 함수를 호출한다.
// 오류가 발생하면 fail 함수를 호출한다.
function gotReadFS(fileSystem) {
        fileSystem.root.getFile("readme.txt", {create: true}, gotReadFileEntry, fail);
}

//gotReadFileEntry : gotReadFS 함수에서 readme.txt 파일을 정상적으로 얻었을 때 호출하는 함수
//file 메서드를 호출하여 File 객체를 생성하고 gotReadFile 콜백 함수를 호출한다.
//오류가 발생하면 fail 함수를 호출한다.
function gotReadFileEntry(fileEntry) {
        fileEntry.file(gotReadFile, fail);
}

// gotReadWriter : gotReadFileEntry 함수에서 file 메서드에 의해 정상적으로 File 객체가 생성되면 호출하는 함수.
// File 객체를 이용하여 base64 인코딩 데이터 URL로 읽기, 텍스트 파일로 읽기를 수행한다.
function gotReadFile(file){
        readDataUrl(file);
        readAsText(file);
}

// readDataUrl : 지정된 파일을 base64 인코딩 데이터 URL로 읽어 화면에 표시한다.
function readDataUrl(file) {
        var reader = new FileReader();
        var element = document.getElementById('readFileResult');

        reader.onloadend = function(evt) {
            console.log("Read as data URL");
            console.log(evt.target.result);
            element.innerHTML = "Read as data URL" + "<br />"+ evt.target.result + element.innerHTML;
        };
        reader.readAsDataURL(file);
}

//readAsText : 지정된 파일을 텍스트 파일로 읽어 화면에 표시한다.
function readAsText(file) {
        var reader = new FileReader();
        var element = document.getElementById('readFileResult');

        reader.onloadend = function(evt) {
            console.log("Read as text");
            console.log(evt.target.result);
            element.innerHTML = "Read as text" + "<br />"+ evt.target.result + "<br />"+ element.innerHTML;
        };
        reader.readAsText(file);
}


//readFile : "Read File" 버튼을 눌렀을 때 호출하는 함수
//파일 시스템을 요청하고 정상적으로 파일 시스템을 얻으면 gotReadFS 콜백 함수를 호출하여 읽기 동작을 수행한다.
function readFile() {
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotReadFS, fail);
}

// gotWriteFS : writeFile 함수에서 파일 시스템을 정상적으로 얻었을 때 호출하는 함수
// getFile 메서드를 통해 read.txt를 얻는데 존재하지 않는 파일이면 새로 만들고 gotWriteFileEntry 콜백 함수를 호출한다.
// 오류가 발생하면 fail 함수를 호출한다.
function gotWriteFS(fileSystem) {
    fileSystem.root.getFile("readme.txt", {create: true}, gotWriteFileEntry, fail); 
}

// gotWriteFileEntry : gotWriteFS 함수에서 readme.txt 파일을 정상적으로 얻었을 때 호출하는 함수
// createWriter 메서드를 호출하여 FileWrite 객체를 생성하고 gotFileWriter 콜백 함수를 호출한다.
// 오류가 발생하면 fail 함수를 호출한다.
function gotWriteFileEntry(fileEntry) {
    fileEntry.createWriter(gotFileWriter, fail);
}



// gotFileWriter : gotWriterFileEntry 함수에서 createWriter 메서드에 의해 정상적으로 FileWriter 객체가 생성되면 호출하는 함수.
// 파일에 쓰기 동작이 완료되었을때 (writer.onwrite) 호출할 콜백 함수를 정의하고 파일에 "some sample text" 문자열을 쓴다.
// 파일 자르기, 이동하기 등을 수행하여 최종 파일에 쓰여진 문자열은 "some different text"가 된다.
// (주의) writer.write와 writer.truncate는 비동기 호출 메서드이다. 폰갭 문서 페이지의 설명에 있는 writer.write와 writer.truncate 예제
// 가 정상적으로 동작하지 않는데 해당 예제에서는 truncate 메서드를 동기 호출 메서드로 사용하였는데 이 예제 코드를 사용하면 정상적으로 원하는 결과를 얻지 못한다.
// write와 truncate 메서드는 비동기, seek는 동기 호출 메서드로 사용하여 위 예제와 같이 각 비동기 호출 메서드의 onwriteend 이벤트 콜백 함수에서 다음 메서드에 대한 
// onwrite, onwriteend 이벤트 콜백 함수를 새로 지정하여야 한다.
function gotFileWriter(writer) {
    var element = document.getElementById('writeFileResult');

    writer.onwrite = function(evt) {
    	console.log('onwrite for writer.write');
        element.innerHTML = "write success <br />"+ element.innerHTML;
    };
    
    // onwriteend for writer.write
    writer.onwriteend = function(evt) {
    	console.log('onwriteend for writer.write');
    	//onwrite for writer.truncate
        writer.onwrite = function(evt) {
        	console.log('onwrite for writer.truncate');
            element.innerHTML = "truncate success <br />"+ element.innerHTML;
        }
        // onwriteend for write.truncate
        writer.onwriteend = function(evt) {
        	console.log('onwriteend for writer.truncate');
            writer.onwrite = function(evt) {
            	console.log('onwrite for writer.write 2');
                element.innerHTML = "write success <br />"+ element.innerHTML;
            }
            writer.onwriteend = function(evt) {
            	console.log('onwriteend for writer.write 2');
                element.innerHTML = "write end  <br />"+ element.innerHTML;
            	
            }
            writer.seek(4);
            writer.write(" different text");
        }
        writer.truncate(11);
    }

    
    writer.write("some sample text");
}

// writeFile : "Write File" 버튼을 눌렀을 때 호출하는 함수
// 파일 시스템을 요청하고 정상적으로 파일 시스템을 얻으면 gotWriteFS 콜백 함수를 호출하여 쓰기 동작을 수행한다.
function writeFile() {
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotWriteFS, fail);
}


// onFileSystemSuccess : fileSystem 함수가 파일 시스템을 정상적으로 획득하면 호출하는 콜백 함수
// fileSystemResult 요소를 찾아 파일 시스템에 대한 정보를 표시한다.
function onFileSystemSuccess(fileSystem) {
    var element = document.getElementById('fileSystemResult');
    console.log(fileSystem.name);
    console.log(fileSystem.root.name);
    element.innerHTML = "File system name :"+ fileSystem.name +"<br />" + element.innerHTML;
    element.innerHTML = "File system root name :"+ fileSystem.root.name +"<br />" + element.innerHTML;

}

// fileSystem : "File System" 버튼을 눌렀을 때 호출하는 함수
// 파일 시스템을 요청한다.
function fileSystem() {
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, onFileSystemSuccess, fail);
}

// fail : 파일 API 수행에 오류가 발생했을때 호출하는 함수
// fileFailResult 요소를 찾아 오류 정보를 표시한다.
function fail(error) {
    var element = document.getElementById('FileFailResult');
    console.log(JSON.stringify(error));

    console.log(error.code);
    element.innerHTML = "fail : "+ error.code + "<br />"+ element.innerHTML;
}
