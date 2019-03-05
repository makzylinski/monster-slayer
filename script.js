new Vue({
    el: '#app',
    data: {
        playerHealth: 100,
        monsterHealth: 100,
        fightLog: [],
        gameIsRunning: false
    },
    methods: { 
        startGame: function() {
            this.gameIsRunning = true;
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.fightLog = [];
        },

        monsterAttack: function() {
            var monsterHit = Math.floor(Math.random()*10)+1;
            return monsterHit;
        },

        attack: function() {
            var playerHit = Math.floor(Math.random()*8)+1;
            if(this.checkWin()){
                return;
            }
                this.monsterHealth = this.monsterHealth - playerHit;
                this.playerHealth = this.playerHealth - this.monsterAttack();
                this.fightLog.unshift("You hit the monster with " + playerHit + " damage." + " Monster attacks with " + this.monsterAttack() + " damage.");
                this.checkWin();
        },

        specialAttack: function() {
            var spec = Math.floor(Math.random()*20)+10;
                this.monsterHealth = this.monsterHealth - spec;
                if(this.checkWin()){
                    return;
                }
                this.playerHealth = this.playerHealth - this.monsterAttack();
                this.checkWin();
                this.fightLog.unshift("You hit the monster with special attack causing " + spec + " damage!" + " Monster attacks with " + this.monsterAttack() + " damage.");
        },

        heal: function() {
            var heal = Math.floor(Math.random()*15)+1
            if(this.playerHealth + heal <= 100 && this.monsterHealth > 0){
                this.playerHealth = this.playerHealth + heal;
                this.playerHealth = this.playerHealth - this.monsterAttack();
                this.fightLog.unshift("You healed yourself with " + heal + " hp." + " Same time monster deals " + this.monsterAttack() + " damage!")
            } else if(this.monsterHealth > 0){
                this.playerHealth = this.playerHealth - this.monsterAttack();
                this.fightLog.unshift("You cannot heal yourself. Monster deals " + this.monsterAttack() + " damage!")
            }
        },

        surrender: function() {
            this.gameIsRunning = false;
            if(this.monsterHealth <=0) {
                this.fightLog.unshift("Well, the monster is actually dead, so technically you can't give up, but I'll reload the page, just for the record. Good job!");
                setTimeout( function() {
                    document.location.reload();
                }, 1000);
            } else{
                this.fightLog.unshift("You surrendered. Monster wins :(");
                setTimeout( function() {
                document.location.reload();
            }, 1000);
            }
        },

        checkWin: function() {
            if(this.monsterHealth <= 0) {
                if(confirm('You won! New Game?')){
                    this.startGame();
                } else{
                    this.gameIsRunning = false;
                }
                return true;
            }  else if(this.playerHealth <= 0) {
                if(confirm('You lost! New Game?')){
                    this.startGame();
                } else{
                    this.gameIsRunning = false;
                }
                return true;
            }
            return false;
        }
    }
});