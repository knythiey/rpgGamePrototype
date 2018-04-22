
var userName = prompt("What is your name?");

var randomNumber = randomizeMsg();
var msg = [
		' "Attackkk!!" ',
		' "Take this!" ',
		' "Hmmmm . . ." ', 
		' "Lets see what you ve got" ',
		' "Going all out!" ',
		' "Goodbye my friend." '
		];


// player stats
var user = {
	name: userName,
	hpStats: Math.floor(Math.random() * (10 - 8 + 1)) + 8,
	atkStats: Math.floor(Math.random() * (2 - 1 + 1)) + 1,
	defStats: Math.floor(Math.random() * (2 - 0 + 1)) + 0,
	spdStats: Math.floor(Math.random() * (3 - 1 + 1)) + 1
}

$('#userName').html(userName);
$('#userhpStats').html(user.hpStats);
$('#useratkStats').html(user.atkStats);
$('#userdefStats').html(user.defStats);
$('#userspdStats').html(user.spdStats);

// cpu stats
var cpu = {
	name: "Tikbalang ",
	hpStats: Math.floor(Math.random() * (15 - 13 + 1)) + 13,
	atkStats: Math.floor(Math.random() * (3 - 1 + 1)) + 1,
	defStats: Math.floor(Math.random() * (3 - 1 + 1)) + 1,
	spdStats: Math.floor(Math.random() * (3 - 2 + 1)) + 2,
}

$('#cpuName').html(cpu.name);
$('#cpuhpStats').html(cpu.hpStats);
$('#cpuatkStats').html(cpu.atkStats);
$('#cpudefStats').html(cpu.defStats);
$('#cpuspdStats').html(cpu.spdStats);
$('#cpuMsg').html(msg[randomNumber]);

var cpuDmg = parseInt(user.hpStats - cpu.atkStats);
var userDmg = parseInt(cpu.hpStats - user.atkStats);

/**********************/
/* 		ATK BTN	  	  */
/**********************/

$('#atkbtn').click(function(){
	// if both user and cpu chose atk
	if($('#cpuMsg').html() == msg[0] || $('#cpuMsg').html() == msg[1]) {
		if(user.spdStats < cpu.spdStats){
			user.hpStats = user.hpStats - cpu.atkStats;
			resetUserHpDisplay();
			checkUserAlive();
			cpu.hpStats = cpu.hpStats - user.atkStats;
			resetCpuHpDisplay();
			checkVictory();
		}
		else if(user.spdStats > cpu.spdStats){
			cpu.hpStats = cpu.hpStats - user.atkStats;
			resetCpuHpDisplay();
			checkVictory();
			user.hpStats = user.hpStats - cpu.atkStats;
			resetUserHpDisplay();
			checkUserAlive();
		}
		else if ( user.spdStats == cpu.spdStats) {
			user.hpStats = user.hpStats - cpu.atkStats;
			resetUserHpDisplay();
			checkUserAlive();
			cpu.hpStats = cpu.hpStats - user.atkStats;
			resetCpuHpDisplay();
			checkVictory();
		}
	}

	//if user atks, cpu defends 
	if($('#cpuMsg').html() == msg[2] || $('#cpuMsg').html() == msg[3]) {
		var modDmg = user.atkStats - cpu.defStats;
		if(modDmg <= 0) {
			modDmg = 1;
		}
		cpu.hpStats -= modDmg;
		resetUserHpDisplay();
		resetCpuHpDisplay();
		checkVictory();
	}

	//if user atks, cpu rush
	if($('#cpuMsg').html() == msg[4] || $('#cpuMsg').html() == msg[5]) {
		user.hpStats = user.hpStats - (cpu.atkStats * 1.5);
		resetUserHpDisplay();
		checkUserAlive();
		cpu.hpStats = cpu.hpStats - user.atkStats;
		resetCpuHpDisplay();
		checkVictory();
	}
	
	resetCpuMsg();
});


/**********************/
/* 		DEF BTN	  	  */
/**********************/

$('#defbtn').click(function(){
	// if both user and cpu chose def
	if($('#cpuMsg').html() == msg[2] || $('#cpuMsg').html() == msg[3]) {
		var newMsg = $('#cpuMsg').html("");
		newMsg = $('#cpuMsg').html("Looks like we both think the same!");
		return newMsg;
	}

	//if user defends, cpu atks 
	if($('#cpuMsg').html() == msg[0] || $('#cpuMsg').html() == msg[1]) {
		var modDmg = cpu.atkStats - user.defStats;
		if(modDmg <= 0) {
			modDmg = 1;
		}
		user.hpStats -= modDmg;
		resetUserHpDisplay();
		resetCpuHpDisplay();
		checkUserAlive();
	}

	//if user defends, cpu rush
	if($('#cpuMsg').html() == msg[4] || $('#cpuMsg').html() == msg[5]) {
		cpu.hpStats = cpu.hpStats - user.atkStats;
		resetCpuHpDisplay();
		checkVictory();
	}
	
	resetCpuMsg();
});

/**********************/
/* 		RUSH BTN  	  */
/**********************/

$('#rushbtn').click(function(){
	// if both user and cpu chose rush
	if($('#cpuMsg').html() == msg[4] || $('#cpuMsg').html() == msg[5]) {
		if(user.spdStats < cpu.spdStats){
			user.hpStats = user.hpStats - (cpu.atkStats * 1.5);
			resetUserHpDisplay();
			checkUserAlive();
			cpu.hpStats = cpu.hpStats - (user.atkStats * 1.5);
			resetCpuHpDisplay();
			checkVictory();
		}
		else if(user.spdStats > cpu.spdStats){
			cpu.hpStats = cpu.hpStats - (user.atkStats * 1.5);
			resetCpuHpDisplay();
			checkVictory();
			user.hpStats = user.hpStats - (cpu.atkStats * 1.5);
			resetUserHpDisplay();
			checkUserAlive();
		}
		else if ( user.spdStats == cpu.spdStats) {
			user.hpStats = user.hpStats - (cpu.atkStats * 1.5);
			resetUserHpDisplay();
			checkUserAlive();
			cpu.hpStats = cpu.hpStats - (user.atkStats * 1.5);
			resetCpuHpDisplay();
			checkVictory();
		}
	}

	//if user rush, cpu defends 
	if($('#cpuMsg').html() == msg[2] || $('#cpuMsg').html() == msg[3]) {
		user.hpStats = user.hpStats - cpu.atkStats;
		resetUserHpDisplay();
		checkUserAlive();
	}

	//if user rush, cpu atk
	if($('#cpuMsg').html() == msg[0] || $('#cpuMsg').html() == msg[1]) {
		cpu.hpStats = cpu.hpStats - (user.atkStats * 1.5);
		resetCpuHpDisplay();
		checkVictory();
		user.hpStats = user.hpStats - cpu.atkStats;
		resetUserHpDisplay();
		checkUserAlive();
	}
	
	// resets computer msg
	resetCpuMsg();
});

/**********************/
/* 		FUNCTIONS	  */
/**********************/

function randomizeMsg() {
	var result = Math.floor(Math.random() * (5 - 0 + 1)) + 0;
	return result;
}

function resetUserHpDisplay() {
	var result = $('#userhpStats').html("");
	result = $('#userhpStats').html(user.hpStats);
	return result;
}

function resetCpuHpDisplay() {
	var result = $('#cpuhpStats').html("");
	result = $('#cpuhpStats').html(cpu.hpStats);
	return result;
}

function resetCpuMsg () {
	var newMsg = $('#cpuMsg').html("");
	newMsg = $('#cpuMsg').html(msg[Math.floor(Math.random() * (5 - 0 + 1)) + 0]);
	return newMsg;
}

function checkUserAlive() {
	if(user.hpStats <= 0 ) {
		alert("G A M E  O V E R ! ! T R Y  A G A I N !");
		location.reload();
	} else {
		$('#userLog').html(userName + " has received " + parseInt(cpu.atkStats) + " DMG!");
		$('#userLog2').html(userName + " has " + user.hpStats + " Health left!");
	}
}

function checkVictory() {
	if(cpu.hpStats <= 0 ) {
		alert("V I C T O R Y ! !");
		location.reload();
	} else {
		$('#cpuLog').html(cpu.name + " has received " + parseInt(user.atkStats) + " DMG!");
		$('#cpuLog2').html(cpu.name + " has " + cpu.hpStats + " Health left!");
		$('#userhpStats').html(user.hpStats);
	}
}