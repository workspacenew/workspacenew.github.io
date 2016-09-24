startTime();

function startTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    // add a zero in front of numbers<10
    m = checkTime(m);
    s = checkTime(s);
    $("#timer").html(h + ":" + m + "");
    var t = setTimeout(function(){ startTime() }, 1000);
}

function checkTime(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}

function onSignIn(googleUser) {
	var profile = googleUser.getBasicProfile();
	/*console.log('ID: ' + profile.getId());
	console.log('Name: ' + profile.getName());
	console.log('Image URL: ' + profile.getImageUrl());
	console.log('Email: ' + profile.getEmail());*/
	setProgress(80);
	$.getJSON('https://script.google.com/macros/s/AKfycbxZltCYi59joSZn20WE9EACY8hrkx5_PiZxMSs5cBrZTToZ-eV9/exec/?type=auth&email='+profile.getEmail()).done(function(result){
		if(result){
			$("#signin").addClass("hidden"); $("#wsapps").removeClass("hidden");
		}else{
			msg('Sorry! Unable to process your request.'); setProgress(100);
		}
	}).fail(function(result){
		msg('Error: Connection problem'); setProgress(100);
	});
}

function setProgress(v){
	
}
function msg(t){alert(t);console.log(t);}
function log(t){console.log(t);}
function url(t, u){document.title = wsAppTitle+' '+t; history.pushState({}, t, u);}
function formatDateTime(t){return t.getDate()+'/'+t.getMonth()+'/'+t.getFullYear()+' '+t.getHours()+':'+t.getMinutes();}
