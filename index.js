let track = document.createElement("audio");
let svg = document.querySelector(".play svg path");

var isPlaying = false;
track.src = "./assets/audio_fe4d3bcac9.mp3";

function playmusic() {
	isPlaying ? track.pause() : track.play();
}

track.onplaying = function () {
	isPlaying = true;
	svg.style.fill = "#2EDDE8";
};
track.onpause = function () {
	isPlaying = false;
	svg.style.fill = "#2EE88F";
};

//game
let isClicked = false;
document.querySelector(".start").addEventListener("click", () => {
	if (isClicked == false) {
		start();
	}
});

function start() {
	if (isPlaying == false) {
		track.play();
	}
	isClicked = true;
	counter = 0;
	document.querySelector(".score").innerHTML = 0;

	var char = document.getElementById("char");
	var bird = document.getElementById("bird");
	var bird2 = document.getElementById("bird2");
	var block = document.getElementById("block");
	var startMssg = document.querySelector(".message");

	document.querySelector(".score").style.display = "block";
	startMssg.style.display = "block";
	/* 
	document.querySelector("#char").style.backgoundImage =
		"url(./assets/herochar_idle_anim.gif)"; */

	document.querySelector("#char").classList.add("motion");
	console.log(char.style);
	block.classList.add("run");

	bird2.style.display = "block";
	let gameover = document.querySelector(".gameover");
	let scoreDisplay = document.querySelector(".scoreDisplay");
	gameover.innerText = "";
	scoreDisplay.innerText = "";
	if (char.classList == "jump") {
		return;
	}

	const jumpClick = document.body.addEventListener("click", addClass);
	window.addEventListener("keydown", keyPress);

	var checkDead = setInterval(() => {
		let characterTop = parseInt(
			window.getComputedStyle(char).getPropertyValue("top")
		);
		let blockLeft = parseInt(
			window.getComputedStyle(block).getPropertyValue("left")
		);
		if (blockLeft < 20 && blockLeft > -20 && characterTop >= 280) {
			char.classList.remove("jump");
			block.classList.remove("run");
			char.classList.remove("motion");
			bird.classList.remove("fly");
			bird2.classList.remove("fly2");
			/* 	alert("Game Over. score: " + Math.floor(counter / 100)); */

			gameover.innerText = "GAMEOVER.";
			scoreDisplay.innerText = "Score" + " " + Math.floor(counter / 100);
			startMssg.style.display = "none";
			document.body.removeEventListener("click", addClass);
			window.removeEventListener("keydown", keyPress);
			document.querySelector(".score").innerHTML = 0;
			window.clearInterval(checkDead);
			isClicked = false;
		} else {
			counter++;
			document.querySelector(".score").innerHTML = Math.floor(counter / 100);
			if (Math.floor(counter / 100) == 1) {
				bird.classList.add("fly");
				console.log("bird1", Math.floor(counter / 100));
			}
			if (Math.floor(counter / 100) == 5) {
				bird2.classList.add("fly2");
			}
		}
	}, 10);

	document.querySelector(".stop").addEventListener("click", () => {
		window.clearInterval(checkDead);
		char.classList.remove("jump");
		char.classList.remove("motion");
		block.classList.remove("run");
		bird.classList.remove("fly");
		bird2.classList.remove("fly2");
		char.style.backgoundImage = "url(./assets/herochar_idle_anim_strip_4.png)";
		startMssg.style.display = "none";
		document.querySelector(".score").innerHTML = 0;
		counter = 0;
		document.body.removeEventListener("click", addClass);
		window.removeEventListener("keydown", keyPress);
		track.pause();
		track.currentTime = 0;
		isClicked = false;
	});
}
//game jump
function addClass() {
	var char = document.getElementById("char");
	char.classList.add("jump");

	setTimeout(function () {
		char.classList.remove("jump");
	}, 500);
}
window.addEventListener("keydown", function (e) {
	if (e.keyCode == 32 && e.target == document.body) {
		e.preventDefault();
	}
});

function keyPress(e) {
	if (e.keyCode == 32) {
		e.preventDefault();
		var char = document.getElementById("char");
		char.classList.add("jump");

		setTimeout(function () {
			char.classList.remove("jump");
		}, 500);
	}
}
