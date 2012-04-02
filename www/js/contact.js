// onSaveSuccess : 연락처를 기기의 주소록에 성공적으로 저장하였을때 호출하는 콜백 함수.
function onSaveSuccess() {
    var element = document.getElementById('ContactSaveResult');
    
    element.innerHTML += '<br />Contact saved';
}

// onError : 연락처 저장에 실패했을 때 호출하는 콜백 함수.
function onError(contactError) {
    var element = document.getElementById('ContactSaveResult');
    
    element.innerHTML += '<br />Error = '+ contactError.code;
}

// saveContact : "Create & save new contact" 버튼을 눌렀을때 호출하는 함수.
// 새로운 연락처 객체를 생성하여 정보를 기록하고 기기의 주소록에 저장한다.
// 연락처 객체를 복사(clone) 하여 정보를 수정한 후 기기의 주소록에 저장한다.
function saveContact() {
    var myContact = navigator.contacts.create();
    var element = document.getElementById('ContactSaveResult');
    
    myContact.displayName = "Woojin Jeong";
    myContact.nickname = "Woojin Jeong";

    element.innerHTML = 'displayName = ' + myContact.displayName +'<br />' +
                        'nickname = ' + myContact.nickname +'<br />'   ;
    
    var name = new ContactName();
    name.givenName = "Woojin";
    name.familyName = "Jeong";
    myContact.name = name;
    
    var phoneNumbers = [3];
    phoneNumbers[0] = new ContactField('work', '031-730-0566', false);
    phoneNumbers[1] = new ContactField('mobile', '012-345-6789', true);
    phoneNumbers[2] = new ContactField('home', '012-345-6789', false);
    myContact.phoneNumbers = phoneNumbers;
    
    var emails = [1];
    
    emails[0] = new ContactField('work', 'jeong.woojin@gmail.com', true);
    myContact.emails = emails;
    
    var organizations = [1];
    
    organizations[0] = new ContactOrganization(true,'work','TRUEMobile','개발','대장');
    myContact.organizations = organizations;
    
    var note = "주소록 노트에 내용을 넣습니다.";
    myContact.note = note;
    
    var addresses = [1];
    addresses[0] = new ContactAddress(true, 'work', '',
        '대치4동 890-32 현민타워 2층', '강남구', '서울시','135-839', '대한민국');
    
    myContact.addresses = addresses;
    
    var urls = [2];
    
    urls[0] = new ContactField('work','http://www.truemobile.com', false);
    urls[1] = new ContactField('home','http://ujeani.wordpress.com', true);
    myContact.urls = urls;
   
    
    myContact.save(onSaveSuccess, onError);
    
    var myClone = myContact.clone();
    myClone.name.givenName = "우진";
    myClone.name.familyName = "정";
    myClone.displayName = "정우진";

    element.innerHTML += '<br>Copy & save contact';

    myClone.save(onSaveSuccess, onError);
    
}

// onFindSuccess : 주소록에서 원하는 정보를 찾는데 성공했을때 호출하는 콜백 함수
// 반환 받은 정보 중에서 이름과 전화번호 정보를 표시한다.
function onFindSuccess(contacts) {
    var element = document.getElementById('ContactFindResult');
    element.innerHTML = "";
    
    for (var i=0; i<contacts.length; i++) {
        element.innerHTML += "<br />Display Name = " + 
                             contacts[i].name.givenName +
                             ","+contacts[i].name.familyName;
        
    	if(contacts[i].phoneNumbers != null) {
            for (var j=0; j<contacts[i].phoneNumbers.length; j++) {
                element.innerHTML += "<br />&nbsp;&nbsp;" + 
                                     contacts[i].phoneNumbers[j].type + 
                                     " : "  + contacts[i].phoneNumbers[j].value;
                if(contacts[i].phoneNumbers[j].pref == true) {
                    element.innerHTML += " (p)";
                }
            }
    	}
    }    
}

//onFindError : 연락처 검색에 실패했을 때 호출하는 콜백 함수.
function onFindError(contactError) {
    var element = document.getElementById('ContactFindResult');
    
    element.innerHTML += '<br />Error = '+ contactError.code;
}

// findContacts : Find "TRUEMobile" 버튼을 눌렀을때 호출하는 함수.
// 기기의 주소록에서 "displayName", "organization","phoneNumbers", "name" 필드에
// TRUEMobile 문자열을 포함하는 정보를 찾는다.
function findContacts() {
    var options = new ContactFindOptions();
    options.filter="TRUEMobile";
    options.multiple=true;
    var fields = ["displayName","organizations","phoneNumbers","name"];
    navigator.contacts.find(fields, onFindSuccess, onFindError, options);
}
