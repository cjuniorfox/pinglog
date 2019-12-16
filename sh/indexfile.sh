createIndexFile(){
	rm -rf $dir/index.html
	cat << eof >> $dir/index.html
	<html lang="pt">
	<head>
	        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>                                                   
		<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
	<script type="text/javascript">
		var jsonName="log.json";

		\$(document).ready(function(){

			\$("#voltarAoTopo").click(function(){
				window.scrollTo(0,0);
			});

			\$("#linkError").click(function(){
				jsonName="error.json";
				\$("#logcontent").html(" ");
			});

			\$("#linkCompleto").click(function(){
				jsonName="log.json";
				\$("#logcontent").html(" ");
			});

			\$("#showLog").click(function(){
				if (\$("#links_complete").is(":visible")){
					\$("#links_complete").slideUp();
					\$("#showLog").html("Exibir arquivos log");
				}else{
					\$("#links_complete").slideDown();
					\$("#showLog").html("Ocultar arquivos log")
				}
			});

			\$("#showErrorLog").click(function(){
				if (\$("#links_errors").is(":visible")){
					\$("#links_errors").slideUp();
					\$("#showErrorLog").html("Exibir arquivos erro");
				}else{
					\$("#links_errors").slideDown();
					\$("#showErrorLog").html("Ocultar arquivos erro")
				}
			});

			setInterval(
				function(){
					//Popula links com log
					\$.getJSON("log.json", function(data){
						\$.each( data, function( key, val ) {
								\$.each(val,function(key,file){
								var linkId = (file).replace("./log/","").replace("./error/","").replace(".html","");
								if  ( ! \$("#link_"+linkId).length){
					        		\$("#links_complete").append("<li><a id=\"link_"+linkId+"\" href="+file + "?rand=" + Math.floor(Math.random() * 100000) + ">"+linkId+"</a></li>");
					        	}
					    	});
						});
					});
					\$.getJSON("error.json", function(data){
						\$.each( data, function( key, val ) {
								\$.each(val,function(key,file){
								var linkId = (file).replace("./log/","").replace("./error/","").replace(".html","");
								if  ( ! \$("#errorLink_"+linkId).length){
					        		\$("#links_errors").append("<li><a id=\"errorLink_"+linkId+"\" href=" + file + "?rand=" + Math.floor(Math.random() * 100000) + ">"+linkId+"</a></li>");
					        	}
					    	});
						});
					});
					//Carrega log atual
					\$.getJSON(jsonName,function(data){
					    \$.each( data, function( key, val ) {
					        \$.each(val,function(key,file){
					            if (key >= val.length - 2){
					                \$.get(file + "?rand=" + Math.floor(Math.random() * 100000) , function(content) {
					                	var elId = (file).replace("./log/","").replace("./error/","").replace(".html","");
					                	if(\$("#"+elId).length){
					                		\$("#"+elId).html(content);
					                	}else{
					                		\$("#logcontent").append("<div id=\""+elId+"\">"+content+"</div>");
					                	}
   										if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight - 250) {
   											\$("#autoscroll").show();
       										window.scrollTo(0,document.body.scrollHeight);
   										}else{
   											\$("#autoscroll").hide();
   										}
					                });
					            }
					        });
					    });
					});
					
				},3000
			);
		});
	</script>
	</head>
	<body>
		<h1>Log de estabilidade</h1>
		<div id="logfiles">
			<a id="linkError" href="#">Log de Erros</a> | <a id="linkCompleto" href="#">Log Completo</a><br />
			<a id="showLog" href="#">Exibir arquivos log</a> | <a id="showErrorLog" href="#">Exibir arquivos erro</a>  
			<ul style="display:none;" id="links_complete"></ul>
			<ul style="display:none;" id="links_errors"></ul>
			<div id="autoscroll" style="background-color:green;color:white; position:fixed; top:0; left:0;">Scroll automatico</div>
		</div>
		<div id="logcontent" style="font-size:0.8em; padding:2em"></div>
		<a id="voltarAoTopo" href="#">Voltar ao topo</a> 
	</body>
eof
}

createIndexFile;