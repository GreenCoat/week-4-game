var player;
var playerCard;
var attack;
var defender;
var defenderCard;
var wins = 0;
var characters = {
	"porg":{
		id: "porg",
		name: "Porg",
		bAttack: 4,
		hp: 150,
		bHp: 150,
		cAttack: 5,
		selected: false
	}, 
	"luke":{
		id: "luke",
		name: "Luke Skywalker",
		bAttack: 5,
		hp: 120,
		bHp: 120,
		cAttack: 10,
		selected: false
	}, 
	"han":{
		id: "han",
		name: "Han Solo",
		bAttack: 6,
		hp: 110,
		bHp: 110,
		cAttack: 15,
		selected: false
	}, 
	"vader":{
		id: "vader",
		name: "Darth Vader",
		bAttack: 7,
		hp: 100,
		bHp: 100,
		cAttack: 20,
		selected: false
	}, 
	"sidious":{
		id: "sidious",
		name: "Darth Sidious",
		bAttack: 8,
		hp: 90,
		bHp: 90,
		cAttack: 25,
		selected: false
	}
};

$(document).ready(function(){
	gameSetUp();
});

function gameSetUp(){

	gameReset();
	$("#attack").on("click", damage);
	$("#reset").on("click", gameReset);
}

function characterSelect(evt){
	var card = evt.currentTarget;
	var char = evt.currentTarget.id;
	
	if(player == undefined){
		player = characters[char];
		player.selected = true;
		attack = player.bAttack;
		playerCard = card;
		$(playerCard).addClass("player");
		$("#player").append(playerCard);

	} else if(defender == undefined && !characters[char].selected){
		defender = characters[char];
		defender.selected = true;
		defenderCard = card;
		$(defenderCard).addClass("defender");
		$("#defender").append(defenderCard);
	} else {

	};

}

function damage(){
	if(player != undefined && defender != undefined && player.hp > 0){
		defender.hp = defender.hp - attack;
		$("#playerReadout").text(player.name + " attacks " + defender.name + " dealing " + attack + " damage!  " + player.name + "'s attack increases by " + player.bAttack + "!");
		attack += player.bAttack;
		updateHp();

		if(defender.hp > 0){
			player.hp = player.hp - defender.cAttack;
			$("#defenderReadout").text(defender.name + " counter attacks, dealing " + defender.cAttack + " damage to " + player.name +  "!");
			updateHp();

			if(player.hp <= 0){
				gameLose();
			}

		} else {
			removeDefender();
			wins++;
			if(wins == 4){
				$("#defenderReadout").text(player.name + " has defeated all challengers! " + player.name + " is the champion!");
			}
		}
	}
}

function updateHp(){
	$("#" + defender.id + " .hp").text(defender.hp);
	$("#" + player.id + " .hp").text(player.hp);
}

function removeDefender(){
	$("#defenderReadout").text(defender.name + " is defeated! Please select a new challenger.");
	$(defenderCard).remove();
	defender = undefined;
}

function gameLose(){
	$("#defenderReadout").text(defender.name + " counter attacks, dealing " + defender.cAttack + " fatal damage to " + player.name +  "! " + player.name + " is defeated!");
	$(playerCard).addClass("defeated");
}

function gameReset(){
	$(".character").remove();
	$("#playerReadout").text("");
	$("#defenderReadout").text("");
	player = undefined;
	defender = undefined;
	wins = 0;
	
	createCard("porg");
	createCard("luke");
	createCard("han");
	createCard("vader");
	createCard("sidious");
	
	$(".character").on("click", characterSelect);

}

function createCard(id){
	var char = characters[id];
	char.selected = false;
	char.hp = char.bHp;
	$("#characters").append("<div class='character' id='" + char.id + "'><div class='name'>" + char.name + "</div><img src='assets/images/" + char.id + ".jpg' height='100' width='100'><div class='hp'>" + char.hp + "</div></div>");
}