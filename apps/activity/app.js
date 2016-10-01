var page = '<h2>Activity Stream</h2><p><textarea id="s-p-i1" rows="7" cols="30" style="height:200px"></textarea></p><p><button id="s-p-b1" class="k-primary">Post</button></p>';
$("#s-p").html(page);
$("#s-p-i1").kendoEditor({ resizable: {	content: true, toolbar: true }});
$("#s-p-b1")..kendoButton();
