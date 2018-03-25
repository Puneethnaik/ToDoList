//localStorage.removeItem('list')


clearList = function(){
    var List = document.getElementById("toDoList");
    while(List.hasChildNodes()){
        List.removeChild(List.firstChild);
    }
}

displayList = function(){
    clearList();
    console.log("Logging");
    if(localStorage.list){
        var List = JSON.parse(localStorage.list);
        for(var obj in List){
            console.log(List[obj]);
            listDisplayItem(obj, List[obj]);
        }
    }
    else{
        document.getElementById('todoListp').innerHTML = "No items to show";
    }
};

//displayList();
setInterval(displayList, 1000);

listAddItem = function(){
    problemName = prompt("Enter the problem name");
    problemDate = new Date();
    console.log(problemName + " " + problemDate.toLocaleString);
    if(localStorage.list){
        List = JSON.parse(localStorage.list);
        List[problemName] = problemDate;
    }
    else{
        List = {};
    }
    localStorage.setItem('list', JSON.stringify(List));
    //displayList();
}

listRemoveItem = function(){
    problemName = prompt("Enter key to remove");
    console.log("entered remove item" + problemName);
    List = JSON.parse(localStorage.list);
    if(localStorage.list){
        if(List.hasOwnProperty(problemName)){
            delete List[problemName];
        }
        else{
            alert("The key doesnt exist");
            listRemoveItem(problemName);
        }
        localStorage.setItem('list', JSON.stringify(List));
    }
    else{
        document.getElementById('todoListp').innerHTML = "The list is empty";
    }
    //displayList();
}

var numDaysBetween = function(d1, d2) {
    var diff = Math.abs(d1.getTime() - d2.getTime());
    return diff / (1000 * 60 * 60 * 24);
  };

function listDisplayItem(keyToInsert, valueToInsert) {
    valueToInsert = new Date(valueToInsert);
    var ul = document.getElementById("toDoList");
    var li = document.createElement("li");
    //console.log("valueInsert" + valueToInsert);
    li.appendChild(document.createTextNode(keyToInsert + " : " + Math.floor(numDaysBetween(valueToInsert, new Date()))));
    li.setAttribute("id", keyToInsert); // added line
    ul.appendChild(li);
}
