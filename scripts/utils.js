if (typeof String.prototype.startsWith != 'function') {
	String.prototype.startsWith = function (str) {
		return this.indexOf(str) == 0;
	};
}

var tools = (function () {
	var toolsDef = {};

	toolsDef.getUserId = function () {
		var userId = window.sessionStorage.getItem('userid');
		if (!userId) {
			userId = window.localStorage.getItem('userid');
		}

		return userId;
	};

	toolsDef.checkAccess = function () {
		var userId = this.getUserId();
		if (!userId || userId == '') {
			window.location.href = 'index.html';
		}
	};

	toolsDef.isGpsEnabled = function () {
		var gpsStatus = window.localStorage.getItem('gps-status');
		return gpsStatus && gpsStatus == 'on';
	};

	toolsDef.handleBadge = function (jqXhr, nextUrl) {
		if (!jqXhr) {
			return;
		}

		if (!nextUrl || nextUrl == '') {
			nextUrl = 'index.html';
		}

		var badgeId = jqXhr.getResponseHeader('BadgeId');
		if (badgeId && badgeId != '') {
			nextUrl = 'badge.html?id=' + badgeId + '&return=' + encodeURIComponent(nextUrl);
		}

		window.location.href = nextUrl;
	};

	toolsDef.ApiURI = function () {

		return 'http://r1.contestanywhere.com/admin/api';
		//return 'http://rplakhuta.levi9.com/contest/api';
		//return '/contest/api';
	};

	return toolsDef;
})();