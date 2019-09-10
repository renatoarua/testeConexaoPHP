//LIST OF TEST SERVERS. See documentation for details if needed
var SPEEDTEST_SERVERS=[
	{	//this is my demo server, remove it
		name:"Speedtest Demo Server (Helsinki)", //user friendly name for the server
		server:"//fi.openspeed.org/", //URL to the server. // at the beginning will be replaced with http:// or https:// automatically
		dlURL:"garbage.php",  //path to download test on this server (garbage.php or replacement)
		ulURL:"empty.php",  //path to upload test on this server (empty.php or replacement)
		pingURL:"empty.php",  //path to ping/jitter test on this server (empty.php or replacement)
		getIpURL:"getIP.php"  //path to getIP on this server (getIP.php or replacement)
	},
	{	//this is my demo server, remove it
		name:"Old Speedtest Demo Server",
		server:"//mpotdemo.fdossena.com/",
		dlURL:"garbage.php",
		ulURL:"empty.php",
		pingURL:"empty.php",
		getIpURL:"getIP.php"
	}
	//add other servers here, comma separated
];


//INITIALIZE SPEEDTEST
var s=new Speedtest(); //create speedtest object
s.addTestPoints(SPEEDTEST_SERVERS); //add list of servers
s.onupdate=function(data){ //callback to update data in UI
    I("ip").textContent=data.clientIp;
    I("dlText").textContent=(data.testState==1&&data.dlStatus==0)?"...":data.dlStatus;
    I("ulText").textContent=(data.testState==3&&data.ulStatus==0)?"...":data.ulStatus;
    I("pingText").textContent=data.pingStatus;
    I("jitText").textContent=data.jitterStatus;
}
s.onend=function(aborted){ //callback for test ended/aborted
    I("startStopBtn").className=""; //show start button again
    if(aborted){ //if the test was aborted, clear the UI and prepare for new test
		initUI();
    }
}
function selectServer(){ //called when the page is fully loaded
    I("startStopBtn").style.display="none"; //hide start/stop button during server selection
    s.selectServer(function(server){ //run server selection. When the server has been selected, display it in the UI
        I("startStopBtn").style.display=""; //show start/stop button again
        I("serverId").textContent=server.name; //show name of test server
    });
}


function startStop(){ //start/stop button pressed
	if(s.getState()==3){
		//speedtest is running, abort
		s.abort();
	}else{
		//test is not running, begin
		s.start();
		I("startStopBtn").className="running";
	}
}

//function to (re)initialize UI
function initUI(){
	I("dlText").textContent="";
	I("ulText").textContent="";
	I("pingText").textContent="";
	I("jitText").textContent="";
	I("ip").textContent="";
}

function I(id){return document.getElementById(id);}