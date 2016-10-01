/*WorkSpace App Core*/
var appId = 'workspace_app7_';
var appDate = new Date( new Date().getTime() + +5.5 * 3600 * 1000).toUTCString()+'+0530 (India Standard Time)';
/*var appLoading=function(){var c,d,e,f,g,h,k={width:"100%",height:"4px",zIndex:9999,top:"0"},l={width:0,height:"100%",clear:"both",transition:"height .3s"};c=function(a,b){for(var c in b)a.style[c]=b[c];a.style["float"]="left"};f=function(){var a=this,b=this.width-this.here;0.1>b&&-0.1<b?(g.call(this,this.here),this.moving=!1,100==this.width&&(this.el.style.height=0,setTimeout(function(){a.cont.el.removeChild(a.el)},300))):(g.call(this,this.width-b/4),setTimeout(function(){a.go()},16))};g=function(a){this.width=
a;this.el.style.width=this.width+"%"};h=function(){var a=new d(this);this.bars.unshift(a)};d=function(a){this.el=document.createElement("div");this.el.style.backgroundColor=a.opts.bg;this.here=this.width=0;this.moving=!1;this.cont=a;c(this.el,l);a.el.appendChild(this.el)};d.prototype.go=function(a){a?(this.here=a,this.moving||(this.moving=!0,f.call(this))):this.moving&&f.call(this)};e=function(a){a=this.opts=a||{};var b;a.bg=a.bg||"#000";this.bars=[];b=this.el=document.createElement("div");c(this.el,
k);a.id&&(b.id=a.id);b.style.position=a.target?"relative":"fixed";a.target?a.target.insertBefore(b,a.target.firstChild):document.getElementsByTagName("body")[0].appendChild(b);h.call(this)};e.prototype.go=function(a){this.bars[0].go(a);100==a&&h.call(this)};return e}();
var appProgress = new appLoading({bg:'#09f'});
function toNull(e){}*/
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
function setProgress(p){if(p == 100) $("#loader").addClass("hidden"); else $("#loader").removeClass("hidden"); /*toNull(appProgress.go(p));*/}
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
	setProgress(40);
	lset('googleProfile', '{"Email":"'+profile.getEmail()+'","Name":"'+profile.getName()+'","ID":"'+profile.getId()+'"}');
	$.getJSON('https://script.google.com/macros/s/AKfycbxZltCYi59joSZn20WE9EACY8hrkx5_PiZxMSs5cBrZTToZ-eV9/exec?type=auth&email='+profile.getEmail()).done(function(result){
		if(result){
			lset('appProfile', j2t(result));
			onMenuLoad();
			onUserCommonDataLoad();
			switchToApp(true);
		}else{
			$(".g-signin2").html('<p>Sorry! service not yet available for you.<br /><a href="javascript:void(0)" onclick="reportAppIssue(1)">Report this issue</a></p>');
			setProgress(100);
		}
	}).fail(function(result){
		$(".g-signin2").html('<p>Connection problem, try again later!</p>');
		setProgress(100);
	});
}

function onMenuLoad(){
	setProgress(60);
	$.getJSON('https://script.google.com/macros/s/AKfycbwsBdoCvKzSMAhQeSYicMlEb_UC4fRKW31OXlAtVQ7g67orKqk8/exec?type=main&r='+t2j(lget('appProfile')).Role).done(function(result){
		if(result){
			lset('appMenu', j2t(result));
			
			$.each(result, function(k, d){
				$("#s-a").append('<li><a id="n-'+d.ID+'" href="javascript:void(0)" onclick="openApp(this)">'+d.Name+'</a></li>');
			});
			setProgress(100);
		}else{
			msg('Sorry! Unable to process your request.'); setProgress(100);
		}
	}).fail(function(result){
		msg('Error: Connection problem'); setProgress(100);
	});	
}

function onUserCommonDataLoad(){
	$("#a-p-name").html(t2j(lget('appProfile')).Name.split(" ")[0]);
}

function openApp(a){
	var appName = a.id.split("n-")[1];
	if(appName){ setProgress(60); $.getScript("apps/"+appName+"/app.js").done(function(script, textStatus){setProgress(100);});}
}

function reportAppIssue(i){
	$(".g-signin2").html('<p>Sending data...</p>');
	$.getJSON('https://script.google.com/macros/s/AKfycbyUmYiwmC_lUwW3LxukXdTNE8p_srsGqFXw-CKwPl9l3KD8XgVH/exec?type=reportissue&data={"Issue":"'+i+'","googleProfile":'+lget('googleProfile')+'}').done(function(result){
		if(result){
			$(".g-signin2").html('<p>Issue reported, we will get back to you soon.</p>');
		}else{
			$(".g-signin2").html('<p>Sorry! Unable to process your request.</p>');
		}
	}).fail(function(result){
		$(".g-signin2").html('<p>Connection problem, try again later!</p>');
	});	
}
