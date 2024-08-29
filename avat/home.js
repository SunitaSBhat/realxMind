function shownav(){
    const ul=document.getElementById("ul");
    const lastWords=document.getElementsByClassName("lastWords");
    if(ul.style.display!="none"){
        ul.style.display="none";
        console.log(lastWords);
        lastWords.style.display="none";  
      }
    else{
    console.log(ul);
    ul.style.display="flex";
    lastWords.style.display="flex"; 
    }
}

