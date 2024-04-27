var character = document.getElementById('character');
var block = document.getElementById('block');
var text = document.getElementById('text');
var viewportWidth = parseInt(window.innerWidth);
var running = true;
var score = document.getElementById('score');
var jumpHeight = 162; // Default jump height
var jumpDuration = 500;
var body = document.getElementById('body');
var jumping = false;



// Adjust jump height based on viewport width
setInterval(function(){
    if (viewportWidth <= 900) {
        jumpHeight = 30;          //small view!!!!!!!!!!!!!!!!!!!!
        normalHeight = 105;
    } else {
        jumpHeight = 100;         //normal desktop view!!!!!!!!!!!!!!!!!!!!!!
        normalHeight = 217;
    }
},10)


body.addEventListener('click', jumpactive); // checks if clicked/jump requested
function jumpactive(){       // checks, if game is running && not already jumping 
    if(running && jumping == false){
        jump();
    }
}

function jump() {
        jumping = true;   //declares that character is jumping --> cannot jump again until jump is finished
        const startTime = performance.now();

        function animateJump(currentTime) {
            const elapsedTime = currentTime - startTime;
            const progress = elapsedTime / jumpDuration;

            if (progress < 1) {
                const jumpProgress = Math.sin(progress * Math.PI); // Apply a sine function for a more natural jump curve
                const heightOffset = normalHeight - (jumpProgress * jumpHeight);

                character.style.top = heightOffset + 'px';

                requestAnimationFrame(animateJump);
            } else {
                character.style.top = normalHeight + 'px'; // Reset position
                jumping = false;  //declares that is not jumping --> player can jump again
            }
            
        }
        requestAnimationFrame(animateJump);
        
}




var checkdead = setInterval(function() {
    var characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
    var blockLeft = parseInt(window.getComputedStyle(block).getPropertyValue("left"));

    if (viewportWidth <= 900) {
        if (blockLeft < 20 && blockLeft > 0 && characterTop >= 90) {
            block.style.animation = "none";
            block.style.display = "none";
            running = false;
            character.style.top = normalHeight + 'px'; // Reset position
            text.innerText = "You Lose";
            setTimeout(function() {
                text.innerText = "Let's Play!"
            }, 3000)
        }
    } else {
        if (blockLeft < 40 && blockLeft > 0 && characterTop >= 175) {
            block.style.animation = "none";
            block.style.display = "none";
            running = false;
            character.style.top = normalHeight + 'px'; // Reset position
            text.innerText = "You Lose";
            setTimeout(function() {
                text.innerText = "Let's Play!"
            }, 3000)
        }
    }
}, 10)



function restart() {
    location.reload();
    setTimeout(function() {
        running = true;
    }, 10);
}



var time = 0;
setInterval(function() {
    if (running) {

        time++;
        if(time < 10){
            time = "0000" + time;
        }
        else if(time < 100){
            time = "000" + time;
        }
        else if(time < 1000){
            time = "00" + time;
        }
        else if(time < 10000){
            time = "0" + time;
        }
        score.innerText = "score " + time
    }
}, 100)
