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
		bAttack: 5,
		hp: 100,
		cAttack: 10,
		selected: false
	}, 
	"luke":{
		id: "luke",
		name: "Luke Skywalker",
		bAttack: 5,
		hp: 100,
		cAttack: 10,
		selected: false
	}, 
	"han":{
		id: "han",
		name: "Han Solo",
		bAttack: 5,
		hp: 100,
		cAttack: 10,
		selected: false
	}, 
	"vader":{
		id: "vader",
		name: "Darth Vader",
		bAttack: 5,
		hp: 100,
		cAttack: 10,
		selected: false
	}, 
	"sidious":{
		id: "sidious",
		name: "Darth Sidious",
		bAttack: 5,
		hp: 100,
		cAttack: 10,
		selected: false
	}
};

$(document).ready(function(){
	gameSetUp();
});

function gameSetUp(){
	$(".character").on("click", characterSelect);
	$("#attack").on("click", damage);
}

function characterSelect(evt){
	var card = evt.currentTarget;
	var char = evt.currentTarget.id;
	
	if(player == undefined){
		player = characters[char];
		player.selected = true;
		attack = player.bAttack;
		playerCard = card;
		$("#player").append(playerCard);

	} else if(defender == undefined && !characters[char].selected){
		defender = characters[char];
		defender.selected = true;
		defenderCard = card;
		$("#defender").append(defenderCard);
	} else {

	};

}

function damage(){
	if(player != undefined && defender != undefined){
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

}