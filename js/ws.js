/*WorkSpace App Core*/
var appId = 'workspace_app7_';
var appDate = new Date( new Date().getTime() + +5.5 * 3600 * 1000).toUTCString()+'+0530 (India Standard Time)';
function startTime(){var today = new Date(); var h = today.getHours(); var m = today.getMinutes(); var s = today.getSeconds(); m = checkTime(m); s = checkTime(s); $("#timer").html(h + ":" + m + ""); var t = setTimeout(function(){startTime();}, 1000);}
function checkTime(i){if(i < 10){i = "0" + i;}return i;}
function preventDefaults(e){if ((e.which || e.keyCode) == 116 || (e.which || e.keyCode) == 82) e.preventDefault();};
function lget(e){return window.sessionStorage.getItem(appId+e);}
function lset(e, v){return window.sessionStorage.setItem(appId+e, v);}
function msg(t){alert(t);console.log(t);}
function log(t){console.log(t);}
function url(t, u){document.title = t; history.pushState({}, t, u);}
function formatDateTime(t){return t.getDate()+'/'+t.getMonth()+'/'+t.getFullYear()+' '+t.getHours()+':'+t.getMinutes();}
function t2j(d){try{return JSON.parse(d);}catch(e){msg('Error: Cannot read data'); return false;}}
function j2t(d){try{return JSON.stringify(d);}catch(e){msg('Error: Cannot write data'); return false;}}
function setProgress(v){}
startTime();

/*Interface*/
function switchToApp(t){
	if(t){
		$("#signin").addClass("hidden");
		$("#wsapps").removeClass("hidden");
	}else{
		$("#signin").removeClass("hidden");
		$("#wsapps").addClass("hidden");
	}
}

function onSignIn(googleUser){
	var profile = googleUser.getBasicProfile();
	/*console.log('ID: ' + profile.getId());
	console.log('Name: ' + profile.getName());
	console.log('Image URL: ' + profile.getImageUrl());
	console.log('Email: ' + profile.getEmail());*/
	setProgress(80);
	$.getJSON('https://script.google.com/macros/s/AKfycbxZltCYi59joSZn20WE9EACY8hrkx5_PiZxMSs5cBrZTToZ-eV9/exec?type=auth&email='+profile.getEmail()).done(function(result){
		if(result){
			lset('userProfile', j2t(result));
			onMenuLoad();
		}else{
			msg('Sorry! Unable to process your request.'); setProgress(100);
		}
	}).fail(function(result){
		msg('Error: Connection problem'); setProgress(100);
	});
}

function onMenuLoad(){
	$.getJSON('https://script.google.com/macros/s/AKfycbwsBdoCvKzSMAhQeSYicMlEb_UC4fRKW31OXlAtVQ7g67orKqk8/exec?type=main&r='+j2t(lget('userProfile')).Role).done(function(result){
		if(result){
			lset('userMenu', j2t(result));
		}else{
			msg('Sorry! Unable to process your request.'); setProgress(100);
		}
	}).fail(function(result){
		msg('Error: Connection problem'); setProgress(100);
	});	
}
