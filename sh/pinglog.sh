#!/usr/bin/zsh
export IP=$1 ; 
export c=0 ; 
export seconds=2;
export errorFile="";
export errorFileCount=1;
export file="";
export fileCount=1;

export dir="./pinglog"
export logDir=$dir/log;
export errorDir=$dir/error
export maxBytes=4096;


function createLogJson(){
	mkdir -p $dir;
	mkdir -p $logDir;
	mkdir -p $errorDir;

	list="";
	if  [ ! -f $logDir/$file ]; then
		return;
	fi;
	for f in $logDir/*.json ; do 
		if [ -z "$list" ]; then
			list=" \"$f\" ";
		else
			list=$list", \"$f\" ";
		fi;
	done;
	echo "[$list]" | sed "s|$dir|\.|g" > $dir/log.json
	list="";
	if [ ! -f $errorDir/$file ]; then
		return;
	fi;
	for f in $errorDir/*.json; do 
		if [ -z "$list" ]; then
			list=" \"$f\" ";
		else
			list=$list", \"$f\" ";
		fi;
	done;
	echo "{\"files\":[$list]}" | sed "s|$dir|\.|g" > $dir/error.json
}

function nameFiles(){
	fileCount=1;
	file="log_$(printf "%08d\n" $fileCount).json";
	while [[ -f $logDir/$file  &&  $( wc -c $logDir/$file | awk '{ print $1 }' ) -gt $maxBytes ]] ; do
		fileCount=$(($fileCount+1));
		file="log_$(printf "%08d\n" $fileCount).json";
	done;

	errorFileCount=1;
	errorFile="log_$(printf "%08d\n" $errorFileCount).json";
	while [[ -f $errorDir/$errorFile  && $( wc -c $errorDir/$errorFile | awk '{ print $1 }' ) -gt $maxBytes ]] ; do
		errorFileCount=$(($errorFileCount+1));
		errorFile="log_$(printf "%08d\n" $errorFileCount).json";
	done;
}

logFile(){
	json=$1;
	f=$2;
	if  [ ! -f $f ]  || [ ! -s $f ];  then
		echo "[]" | tee $f ;
	fi;
 	sed -i "s/\]/$json\]/g" $f;
	sed -i "s/}{/},{/g" $f;
}

loopLog(){
	while :; do 
		template="{\"status\":\"%STATUS\",\"interval\":\"%INTERVAL\",\"address\":\"$IP\",\"time\":\"$(date -u +%Y-%m-%dT%H:%M:%S.000Z)\"}";
		nameFiles;
		createLogJson;
		response=$(ping -c 1 -W 1 $IP); 
		if ! [[ "$response" =~ " 0%" ]]; then
			seconds=2;
			if [[ "$s" != "lost" ]] && [[ "$s" != "timeout" ]]; then
				s="lost";
			else
				s="timeout";
			fi;
			c=0;
		else  #Connection restabilished
			seconds=30;
			if [[ "$s" != "ok" ]] && [[ "$s" != "estabilished" ]]; then
				
				s="estabilished";
			else
				 #connection ok
				s="ok";
			fi;
		fi;
		
		json=$(echo $template | sed "s/%STATUS/$s/" | sed "s/%INTERVAL/$seconds/" | tee "$dir/status.json");
		echo $json;
		if [[ "$s" == "lost" ]] || [[ "$s" == "timeout" ]] || [[ "$s" == "estabilished" ]] ; then
			logFile $json $errorDir/$errorFile ;
		fi;
		
		logFile "$json" $logDir/$file ;
		sleep $seconds ; 

	done;
}


#createIndexFile;
echo "Instalar lightttp lighttpd-mod-setenv"
nameFiles;
createLogJson;
lighttpd -f ./lighttpd.conf -D &
	loopLog;

