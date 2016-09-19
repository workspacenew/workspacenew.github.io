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
	$("#signin").addClass("hidden");
	$("#wsapps").removeClass("hidden");
}
