function createLogHtml(){
	rm -rf $dir/log.hml
	list="";for f in $logDir/*; do list=$list"logFiles.push(\"$f\");"; done;
	cat << eof >> $dir/log.html
<html>
<head>
	<script>
		\$(document).ready(function(){
			var logFiles[];
			$list = new Array();
			logFiles.forEach( function(fileName){
				\$.get(fileName, function(data){
					\$("#logcontent").append().html(data);
				});
			});		
			window.scrollTo(0,document.body.scrollHeight);
		});
	</script>
</head>
<body>
</body>
</html>
eof
}

createLogHtml;