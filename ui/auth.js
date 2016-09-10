function onSignIn(googleUser) {
	var profile = googleUser.getBasicProfile();
	/*console.log('ID: ' + profile.getId());
	console.log('Name: ' + profile.getName());
	console.log('Image URL: ' + profile.getImageUrl());
	console.log('Email: ' + profile.getEmail());*/
}

function appLoad(t){
	if(t){
		$("#signin").addClass("hidden");
		$("#apps").removeClass("hidden");
		$("body").addClass("appbg");
	}else{
		$("#signin").removeClass("hidden");
		$("#apps").addClass("hidden");
		$("body").removeClass("appbg");
	}
}
