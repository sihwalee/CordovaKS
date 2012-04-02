// alertDismissed: 알림창이 닫힐 때 호출된다.
function alertDismissed() {
    alert("Alert Dismissed");
    // do something
}

// showAlert: 알림창을 표시한다.
function showAlert() {
    navigator.notification.alert(
        'You are the winner!',  // message
        alertDismissed,         // callback
        'Game Over',            // title
        'Done'                  // buttonName
    );
}

// onConfirm: 다이얼로그 창이 닫힐 때 호출된다. 
function onConfirm(button) {
    alert('You selected button ' + button);
}

// showConfirm: 버튼이 여러개인 다이얼로그 창이 표시된다.
function showConfirm() {
    navigator.notification.confirm(
        'You are the winner!',  // message
        onConfirm,              // callback to invoke with index of button pressed
        'Game Over',            // title
        'Restart,Exit,Other,4th Button'   // buttonLabels
    );
}

// playBeep : 알림음을 세 번 플레이한다.
function playBeep() {
    navigator.notification.beep(3);
}

// vibrate: 진동을 2초간 울린다. 
function vibrate() {
    navigator.notification.vibrate(2000);
}