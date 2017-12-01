var player;
var attack;
var defender;
var characters = {
	"porg":{
		id: "porg",
		name: "Porg",
		bAttack: 5,
		hp: 100,
		cAttack: 10
	}, 
	"luke":{
		id: "luke",
		name: "Luke Skywalker",
		bAttack: 5,
		hp: 100,
		cAttack: 10
	}, 
	"han":{
		id: "han",
		name: "Han Solo",
		bAttack: 5,
		hp: 100,
		cAttack: 10
	}, 
	"vader":{
		id: "vader",
		name: "Darth Vader",
		bAttack: 5,
		hp: 100,
		cAttack: 10
	}, 
	"sidious":{
		id: "sidious",
		name: "Darth Sidious",
		bAttack: 5,
		hp: 100,
		cAttack: 10
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
	var char = evt.currentTarget.id;
	
	if(player == undefined){
		player = characters[char];
		attack = player.bAttack;
		$("#player").append(evt.currentTarget);

	} else if(defender == undefined){
		defender = characters[char];
		$("#defender").append(evt.currentTarget);
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
			$("#defenderReadout").text(defender.name + " is defeated! Please select a new challenger.");
			defender = undefined;
		}
	}
}

function updateHp(){
	$("#" + defender.id + " .hp").text(defender.hp);
	$("#" + player.id + " .hp").text(player.hp);
}

function gameLose(){

}