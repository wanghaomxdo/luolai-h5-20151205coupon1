/**
 * tracking
 */
var tracking = function(){};

tracking.url = "tracking/tracking.php";
tracking.page_url = window.location.href;

tracking.init = function(){
	if(window.location.href.indexOf("/tracking/showtracking.php") > -1)
		tracking.url = "tracking.php"
	else
		tracking.pv(); // count for this page
};

tracking.add = function(type){
	$.post(this.url, {type: type, url: this.page_url}, function (result) {});
};

tracking.pv = function(){
	$.post(this.url, {type: "PV", url: this.page_url}, function (result) {});
};

tracking.click = function(id){
	$.post(this.url, {type: id, url: this.page_url}, function (result) {});
};

tracking.share = function(type){
	$.post(this.url, {type: type, url: this.page_url}, function (result) {});
};

// init
(function(){
	//tracking.init();
})();