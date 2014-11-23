<p>You're on a mobile device. <strong>Can I Graduate?</strong> is network-intensive and not recommended for throttled or metered data connections. Are you sure you wish to continue?</p>
<p><button id="continue">Continue</button></p>
<script>
document.getElementById('continue').addEventListener('click', function() {
	var date = new Date();
	date.setTime(date.getTime()+(30*24*60*60*1000));
	document.cookie = "mobileokay=true; expires=" + date.toGMTString() + ";path=/";
	document.location = "https://canigraduate.uchicago.edu/";
});
</script>
