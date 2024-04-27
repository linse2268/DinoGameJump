var character = document.getElementById('character');
var block = document.getElementById('block');
var text = document.getElementById('text');
var viewportWidth =  parseInt(window.innerWidth);
var running = true;
var score = document.getElementById('score');
var jumpheight = 162;
var jumpDuration = 500;
var body = document.getElementById('body');

character.addEventListener('click', jump);

function jump (){

    if(running){
        const startTime = performance.now();

        function animateJump(currentTime) {
            const elapsedTime = currentTime - startTime;
            const progress = elapsedTime / jumpDuration;

            if (progress < 1) {
                const jumpProgress = Math.sin(progress * Math.PI); // Apply a sine function for a more natural jump curve
                const heightOffset = 217 - (jumpProgress * jumpHeight);
            
                character.style.top = heightOffset + 'px';

                requestAnimationFrame(animateJump);
            } 
            else {
                character.style.top = '217px'; // Reset position
            }
        }

        requestAnimationFrame(animateJump);
    }
}

var checkdead = setInterval(function () {

    var characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
    var blockLeft = parseInt(window.getComputedStyle(block).getPropertyValue("left"));


    if(viewportWidth <= 750){

        jumpheight = 30; // setting the jumpheight for specific viweportwidth (kleiner Missbrauch der Funktion aber egal)

        if(blockLeft < 20 && blockLeft > 0 && characterTop >= 90){
        
            block.style.animation = "none";
            block.style.display = "none";
            running = false;
            
            text.innerText = "You Lose";
            setTimeout(function(){
                text.innerText = "Let's Play!"
            }, 3000)
        }
    }
    else{

        jumpheight = 162; // setting the jumpheight for specific viweportwidth (kleiner Missbrauch der Funktion aber egal)

        if(blockLeft < 40 && blockLeft > 0 && characterTop >= 175){
        
            block.style.animation = "none";
            block.style.display = "none";
            running = false;
            
            text.innerText = "You Lose";
            setTimeout(function(){
                text.innerText = "Let's Play!"
            }, 3000)
        }

    }
    

}, 10)

function restart(){
    location.reload();
    setTimeout(function(){running = true;},10);
}

function animationTime(){
    var time = Math.random(1, 2).toFixed(1);
    
    block.style.animation = "block" + time +"linear";

}

var time = 0;
setInterval(function(){
    if(running){
        time++;
        score.innerText = "score " + time;
    }
}, 10)