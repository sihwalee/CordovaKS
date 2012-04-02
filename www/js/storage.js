// queryDB : successCB() 함수에서 SQL 트랜잭션 수행을 위해 호출하는 함수
// DEMO 데이터베이스의 모든 요소를 얻어 querySuccess 콜백 함수에 전달한다.
function queryDB(tx) {
    tx.executeSql('SELECT * FROM DEMO', [], querySuccess, errorCB);
}

// querySuccess : queryDB() 함수의 트랜잭션 수행이 성공하면 호출하는 함수
// 데이터베이스에서 얻은 요소들의 정보를 출력한다.
function querySuccess(tx, results) {
    var len = results.rows.length;
    var element = document.getElementById('sqlResult');
        
    element.innerHTML += "DEMO table: " + len + " rows found.<br />";
        
    for (var i=0; i<len; i++){
        element.innerHTML += "Row = " + i + " ID = " + results.rows.item(i).id + " Data =  " + results.rows.item(i).data +"<br />"; 
    }
}

// errorCB : 트랜젝션 수행에 실패했을 때 호출하는 콜백 함수
function errorCB(err) {
    var element = document.getElementById('sqlResult');
    element.innerHTML += "Error processing SQL: "+err.code;
}

// successCB : sqlExample()의 db.transaction()에서 트랜잭션 수행에 성공하면 호출하는 콜백 함수.
// 동일한 데이터베이스를 다시 열고 queryDB()의 트랜잭션을 수행하도록 호출한다.
function successCB() {
    var db = window.openDatabase("Database", "1.0", "PhoneGap Demo", 200000);
    db.transaction(queryDB, errorCB);
}

// populateDB : sqlExample()함수에서 SQL 트랜잭션 수행을 위해 호출하는 함수
// DEMO 데이터베이스를 생성하고 두 개의 정보를 추가한다.
function populateDB(tx) {
    tx.executeSql('DROP TABLE IF EXISTS DEMO');
    tx.executeSql('CREATE TABLE IF NOT EXISTS DEMO (id unique, data)');
    tx.executeSql('INSERT INTO DEMO (id, data) VALUES (1, "First row")');
    tx.executeSql('INSERT INTO DEMO (id, data) VALUES (2, "Second row")');
}

// sqlExample : "SQL example" 버튼을 누르면 호출한다.
// Database 객체를 생성하고 populateDB의 트랜잭션을 수행한다.
function sqlExample() {
    var db = window.openDatabase("Database", "1.0", "PhoneGap Demo", 200000);
    db.transaction(populateDB, errorCB, successCB);    
}

// localStorageExample : "localStorage example" 버튼을 누르면 호출한다.
//  name, org 키와 값을 저장하고나서 이 저장소 값을 읽어 표시한다.
function localStorageExample() {
    var element = document.getElementById('localStorageResult');

	window.localStorage.setItem("name", "woojin jeong");
	window.localStorage.setItem("org", "TRUEMobile");

	alert(window.localStorage.length);
	for(var keyname, i=0; i<window.localStorage.length; i++) {
		keyname = window.localStorage.key(i);
	    element.innerHTML += keyname + " = " + window.localStorage.getItem(keyname)+"<br />";
	}
	
	window.localStorage.clear();
}
