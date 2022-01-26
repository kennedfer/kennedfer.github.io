

function shuffleName(name){
    
    name.innerHTML = shuffleString(name.innerHTML);
    //alert("botao");
}

function shuffleString(str){
    let arr = str.split('');
    arr = arr.map((elem)=>{
        return String.fromCharCode(97+Math.random()*25);
    });
    
    arr[0]=arr[0].toUpperCase();
    arr[1] = '.';
    return arr.join('');
}


let name = document.getElementById('name');
let shuffleButton = document.getElementById('shuffle');

console.log(shuffleButton);
shuffleButton.addEventListener("click", function(){
    shuffleName(name)
});