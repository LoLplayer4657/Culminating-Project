var right = false;

function newGame(){
    var text = document.getElementById("text-container").innerHTML = 'the quick brown fox jumps over the lazy dog';
    const aos = text.split(" ");
    for(const word of aos){
        const wordDiv = document.createElement("div");
        wordDiv.id = word;
        document.getElementById("text-container").appendChild(wordDiv);
    }
}
 
newGame();

document.addEventListener("keydown", write);

function write(event){
    if(event.key >= 'a' && event.key <= 'z'){
        document.getElementById("user-text-container").innerHTML += event.key;
    }
    else if(event.keyCode = "Space"){
        document.getElementById("user-text-container").innerHTML += " ";
    }
    else if(event.keyCode = 8){
        console.log(event.key);
        var text = document.getElementById("user-text-container").innerHTML;
        text = text.slice(0, -1);
        document.getElementById("user-text-container").innerHTML = text;
    }
}


    


