ContentPageBase.prototype = {
	id: null,
	init: function () { },
	signOut: function () { }
};

function ContentPageBase(options) {
	var defaults = { id: null };
	var initOptions = $.extend(defaults, options);
	this.id = initOptions.id;

	this.signOut = function () {
		window.localStorage.removeItem('username');
		window.sessionStorage.removeItem('username');
		window.localStorage.removeItem('userid');
		window.sessionStorage.removeItem('userid');
		$.mobile.changePage($('#sign-in'));
	};

	this.init = function () {
		if (this.id && this.id != '') {
			var currentPageElement = this;
			$('.sign-out-btn', $('#' + this.id)).click(function () {
				currentPageElement.signOut();
			});
		}
	};

	this.init();
}

/* LOGIN screen client object. */
var pageLogin = (function () {
	var page = {};

	page.signIn = function () {
		$.mobile.loading('show', { text: 'Signing in', textVisible: true });
		var user = $('#si-username').val();
		var password = $('#si-password').val();
		$.ajax({
			url: tools.ApiURI() + '/user/validate?pass=' + password + '&name=' + user,
			dataType: 'json',
			success: function (data) {
				window.sessionStorage.setItem('username', data.userName);
				window.sessionStorage.setItem('userid', data.id);
				$.mobile.changePage($('#play'));
			},
			error: function (jqXhr) {
				$('#invalid-credentials-message').html(jqXhr.responseText);
				$('#invalid-credentials-btn').click();
			},
			complete: function () {
				$.mobile.loading('hide');
			}
		});
	};

	page.init = function () {
		//// Redirects to "HOME" page if user is already signed in.
		if (tools.getUserId() != null) {
			$.mobile.changePage($('#play'));
			return;
		}

		$('#sign-in-action').click(function () { page.signIn(); });
	};

	return page;
})();

/* REGISTER screen client object. */
var pageRegister = (function () {
	var page = {};

	page.userRegister = function () {
		$.mobile.loading('show');
		$.post(tools.ApiURI() + '/user/register', $('#register-form').serialize(), function (data) {
			var userId = data.message;
			window.sessionStorage.setItem('userid', userId);
			$.mobile.loading('hide');

			$.mobile.changePage($('#play'));
		});

		return this;
	};

	page.init = function () {
		$('#agree-terms-conditions').click(function () {
			$('#action-register').toggleClass('ui-disabled');
		});

		//// Redirects to "PLAY" page if user is already signed in.
		var userId = tools.getUserId();
		if (userId != null) {
			$.mobile.changePage($('#play'));
			return;
		}

		$('#action-register').click(function () {
			page.userRegister();
		});
	};

	return page;
})();