function addRule(elem) {
    let container = elem.parentNode.parentNode;

    let ruleContainer = document.createElement("div");
    ruleContainer.className = "ruleContainer";

    let pipe = document.createElement("p");
    pipe.innerHTML = "|&nbsp;&nbsp;&nbsp;";
    
    let input = document.createElement("input");
    input.type = "text";
    input.value = ".";
    input.addEventListener("click", function(){toggleColorOnClick(input);});
    
    let addRemoveRule = document.createElement("div");
    addRemoveRule.className = "addRemoveRule";
    
    let addButton = document.createElement("button");
    addButton.innerText = "+";
    addButton.addEventListener("click", function(){addRule(addButton)});

    let removeButton = document.createElement("button");
    removeButton.innerText = "-";
    removeButton.addEventListener("click", function(){removeRule(removeButton)});

    let moveRuleUpButton = document.createElement("button");
    moveRuleUpButton.className = "moveRuleUp";
    moveRuleUpButton.innerText = "/\\";
    moveRuleUpButton.addEventListener("click", function(){moveRule(moveRuleUpButton, true)});

    let moveRuleDownButton = document.createElement("button");
    moveRuleDownButton.className = "moveRuleDown";
    moveRuleDownButton.innerText = "\\/";
    moveRuleDownButton.addEventListener("click", function(){moveRule(moveRuleDownButton, false)});

    addRemoveRule.appendChild(addButton);
    addRemoveRule.appendChild(removeButton);
    addRemoveRule.appendChild(moveRuleUpButton);
    addRemoveRule.appendChild(moveRuleDownButton);
    
    ruleContainer.appendChild(addRemoveRule);
    ruleContainer.appendChild(pipe);
    ruleContainer.appendChild(input);

    container.insertAdjacentElement("afterend", ruleContainer);
}

function addFirstRule(elem) {
    let container = elem.parentNode.parentNode;

    addRule(elem);

    container.remove();
}

function removeRule(elem) {
    let container = elem.parentNode.parentNode;

    let parent = container.parentNode.parentNode.parentNode;
    let rulesCount = parent.children[0].children[1].children.length;

    if(rulesCount > 1) {
        container.remove();
    }

    // make sure to first rule has an arrow instead of a pipe
    if(rulesCount == 2) {
        parent.children[0].children[1].children[0].children[1].innerHTML = "->";
    }
}

function moveRule(elem, up) {
    let parent = elem.parentNode.parentNode.parentNode;
    let children = parent.children;
    let toMove = elem.parentNode.parentNode;
    let index = -1;

    // first find index of toMove in children
    for(let i = 0; i < children.length; i++) {
        if(children[i] == toMove) {
            if(up && (i > 0)) {
                index = i - 1;
            }
            else if(!(up) && (i < children.length - 1)) {
                index = i + 1;
            }
            else {
                index = i;
            }
            
            break;
        }
    }

    
    let temp = [];
    
    // create temporary array that will replace rightSide
    for(let i = 0; i < children.length; i++) {
        if(i == index) {
            if(up) {
                temp.push(toMove);
                temp.push(children[i]);
            }
            else {
                temp.push(children[i]);
                temp.push(toMove);
            }
        }
        else if(children[i] != toMove) {
            temp.push(children[i]);
        }
    }

    console.log(parent);
    // remove current elements in right side
    for(let i = 0; i < children.length; i++) {
        children[i].remove();
    }

    // add temp into right side
    for(let i = 0; i < temp.length; i++) {
        console.log(temp[i].children);
        // make sure controls for first rule are higher than other rule controls
        // and make sure the arrow or pipe is correctly
        if(i == 0) {
            temp[i].children[0].style.marginTop = "-1.5em";
            temp[i].children[1].innerHTML = "->";
        }
        else {
            temp[i].children[0].style.marginTop = "0";
            temp[i].children[1].innerHTML = "|&nbsp;&nbsp;&nbsp;";
        }

        parent.appendChild(temp[i]);
    }
}

function addStatement(elem, above) {
    let statement = elem.parentNode.parentNode;

    let newStatement = document.createElement("div");
    newStatement.className = "container";

    let statementContainer = document.createElement("div");
    statementContainer.className = "statementContainer";

    let firstInput = document.createElement("input");
    firstInput.type = "text";
    firstInput.value = ".";
    firstInput.addEventListener("click", function(){toggleColorOnClick(firstInput);});

    statementContainer.appendChild(firstInput);

    let rightSide = document.createElement("div");
    rightSide.className = "rightSide";

    let ruleContainerTop = document.createElement("div");
    ruleContainerTop.className = "ruleContainer";

    let arrow = document.createElement("p");
    arrow.innerHTML = "->";

    let input = document.createElement("input");
    input.type = "text";
    input.value = ".";
    input.addEventListener("click", function(){toggleColorOnClick(input);});

    ruleContainerTop.appendChild(arrow);
    ruleContainerTop.appendChild(input);

    rightSide.appendChild(ruleContainerTop);

    let ruleContainerBottom = document.createElement("div");
    ruleContainerBottom.className = "ruleContainer";

    let ruleControls = document.createElement("div");
    ruleControls.className = "addRemoveRule";
    ruleControls.style.marginTop = "-3em";

    let addRuleButton = document.createElement("button");
    addRuleButton.innerText = "+";
    addRuleButton.addEventListener("click", function(){addRule(addRuleButton)});

    let removeRuleButton = document.createElement("button");
    removeRuleButton.innerText = "-";
    removeRuleButton.addEventListener("click", function(){removeRule(removeRuleButton)});

    let moveRuleUpButton = document.createElement("button");
    moveRuleUpButton.className = "moveRuleUp";
    moveRuleUpButton.innerText = "/\\";
    moveRuleUpButton.addEventListener("click", function(){moveRule(moveRuleUpButton, true)});

    let moveRuleDownButton = document.createElement("button");
    moveRuleDownButton.className = "moveRuleDown";
    moveRuleDownButton.innerText = "\\/";
    moveRuleDownButton.addEventListener("click", function(){moveRule(moveRuleDownButton, false)});

    ruleControls.appendChild(addRuleButton);
    ruleControls.appendChild(removeRuleButton);
    ruleControls.appendChild(moveRuleUpButton);
    ruleControls.appendChild(moveRuleDownButton);

    ruleContainerBottom.appendChild(ruleControls);

    rightSide.appendChild(ruleContainerBottom);

    statementContainer.appendChild(rightSide);

    newStatement.appendChild(statementContainer);
    
    let addRemoveStatement = document.createElement("div");
    addRemoveStatement.className = "addRemoveStatement";

    let addAboveButton = document.createElement("button");
    addAboveButton.innerText = "^+";
    addAboveButton.addEventListener("click", function(){addStatement(addButton, true)});

    let addButton = document.createElement("button");
    addButton.innerText = "+";
    addButton.addEventListener("click", function(){addStatement(addButton, false)});
    
    let removeButton = document.createElement("button");
    removeButton.innerText = "-";
    removeButton.addEventListener("click", function(){removeStatement(removeButton)});

    addRemoveStatement.appendChild(addAboveButton);
    addRemoveStatement.appendChild(addButton);
    addRemoveStatement.appendChild(removeButton);

    let moveUpButton = document.createElement("button");
    moveUpButton.innerText = "/\\";
    moveUpButton.style.backgroundColor = "rgb(100, 110, 140)";
    moveUpButton.style.marginLeft = "0.75em";
    moveUpButton.addEventListener("click", function(){moveStatement(moveUpButton.parentNode.parentNode, true)});
    
    let moveDownButton = document.createElement("button");
    moveDownButton.innerText = "\\/";
    moveDownButton.style.backgroundColor = "rgb(100, 110, 140)";
    moveDownButton.addEventListener("click", function(){moveStatement(moveDownButton.parentNode.parentNode, false)});

    addRemoveStatement.appendChild(moveUpButton);
    addRemoveStatement.appendChild(moveDownButton);

    newStatement.appendChild(addRemoveStatement);

    if(above) {
        statement.insertAdjacentElement("beforebegin", newStatement);
    }
    else {
        statement.insertAdjacentElement("afterend", newStatement);
    }
}

function removeStatement(elem) {
    let statementCount = document.body.children.length;
    if(statementCount > 3) {
        let statement = elem.parentNode.parentNode;

        statement.remove();
    }
}

function moveStatement(elem, up) {
    let temp = [];
    
    // first get index of element to move

    let children = document.getElementsByClassName("container");
    let index = -1;

    for(let i = 0; i < children.length; i++) {
        if(children[i] == elem) {
            if(up && (i > 0)) {
                index = i - 1;
            }
            else if(!(up) && (i < children.length - 1)) {
                index = i + 1;
            }
            else {
                index = i;
            }
            
            break;
        }
    }


    // reorder in temporary array that will get set to body 
    // after clearing
    for(let i = 0; i < children.length; i++) {
        if(i == index) {
            if(!(up)) {
                temp.push(children[i]);
                temp.push(elem);
            }
            else {
                temp.push(elem);
                temp.push(children[i]);
            }
        }
        else if(children[i] != elem) {
            temp.push(children[i]);
        }
    }

    
    // clear body
    for(let i = 0; i < children.length; i++) {
        children[i].remove();
    }

    // add temp into body
    for(let i = 0; i < temp.length; i++) {
        document.body.appendChild(temp[i]);
    }
}

let showButtons = true;
function toggleButtons() {
    showButtons = !(showButtons);

    let buttons = document.getElementsByTagName("button");
    for(let button of buttons) {
        if(button.className != "mainControlButton") {
            if(showButtons) {
                // button.style.visibility = "visible";
                button.style.display = "block";
            }
            else {
                // button.style.visibility = "hidden";
                button.style.display = "none";
            }
        }
    }
}

let loadData;
function load(input) {
    let fileReader = new FileReader();
    fileReader.readAsText(input.files[0]);

    fileReader.onload = function() {
        let result = fileReader.result;
        loadData = JSON.parse(result);
        input.value = "";

        createHTMLfromLoadData();
    }
}

function createHTMLfromLoadData() {
    let statementCount = loadData.statements.length;

    // first clear existing html
    if(statementCount > 0) {
        let remove = true;
        while(remove) {
            let container = document.body.children[1];
            if(container.className == "container") {
                container.remove();
            }
            else {
                remove = false;
            }
        }
    }

    // then add statements
    for(let i = statementCount - 1; i >= 0; i--) {
        let newStatement = document.createElement("div");
        newStatement.className = "container";

        let statementContainer = document.createElement("div");
        statementContainer.className = "statementContainer";

        let firstInput = document.createElement("input");
        firstInput.type = "text";
        firstInput.value = loadData.statements[i].name;
        firstInput.addEventListener("click", function(){toggleColorOnClick(firstInput);});

        statementContainer.appendChild(firstInput);

        let rightSide = document.createElement("div");
        rightSide.className = "rightSide";

        let ruleContainerTop = document.createElement("div");
        ruleContainerTop.className = "ruleContainer";

        let addRemoveRule = document.createElement("div");
        addRemoveRule.className = "addRemoveRule";
        addRemoveRule.style.marginTop = "-1.5em";

        let addRuleButton = document.createElement("button");
        addRuleButton.innerText = "+";
        addRuleButton.addEventListener("click", function(){addRule(addRuleButton)});

        let removeRuleButton = document.createElement("button");
        removeRuleButton.innerText = "-";
        removeRuleButton.addEventListener("click", function(){removeRule(removeRuleButton)});

        let moveRuleUpButton = document.createElement("button");
        moveRuleUpButton.className = "moveRuleUp";
        moveRuleUpButton.innerText = "/\\";
        moveRuleUpButton.addEventListener("click", function(){moveRule(moveRuleUpButton, true)});

        let moveRuleDownButton = document.createElement("button");
        moveRuleDownButton.className = "moveRuleDown";
        moveRuleDownButton.innerText = "\\/";
        moveRuleDownButton.addEventListener("click", function(){moveRule(moveRuleDownButton, false)});

        addRemoveRule.appendChild(addRuleButton);
        addRemoveRule.appendChild(removeRuleButton);
        addRemoveRule.appendChild(moveRuleUpButton);
        addRemoveRule.appendChild(moveRuleDownButton);

        ruleContainerTop.appendChild(addRemoveRule);

        let arrow = document.createElement("p");
        arrow.innerHTML = "->";

        let input = document.createElement("input");
        input.type = "text";
        input.value = loadData.statements[i].rules[0];
        input.addEventListener("click", function(){toggleColorOnClick(input);});

        ruleContainerTop.appendChild(arrow);
        ruleContainerTop.appendChild(input);

        rightSide.appendChild(ruleContainerTop);

        for(let ruleIndex = 1; ruleIndex < loadData.statements[i].rules.length; ruleIndex++) {
            let ruleContainer = document.createElement("div");
            ruleContainer.className = "ruleContainer";

            let pipe = document.createElement("p");
            pipe.innerHTML = "|&nbsp;&nbsp;&nbsp;";
            
            let input = document.createElement("input");
            input.type = "text";
            input.value = loadData.statements[i].rules[ruleIndex];
            input.addEventListener("click", function(){toggleColorOnClick(input);});
            
            let addRemoveRule = document.createElement("div");
            addRemoveRule.className = "addRemoveRule";
            
            let addButton = document.createElement("button");
            addButton.innerText = "+";
            addButton.addEventListener("click", function(){addRule(addButton)});
            
            let removeButton = document.createElement("button");
            removeButton.innerText = "-";
            removeButton.addEventListener("click", function(){removeRule(removeButton)});

            let moveRuleUpButton = document.createElement("button");
            moveRuleUpButton.className = "moveRuleUp";
            moveRuleUpButton.innerText = "/\\";
            moveRuleUpButton.addEventListener("click", function(){moveRule(moveRuleUpButton, true)});

            let moveRuleDownButton = document.createElement("button");
            moveRuleDownButton.className = "moveRuleDown";
            moveRuleDownButton.innerText = "\\/";
            moveRuleDownButton.addEventListener("click", function(){moveRule(moveRuleDownButton, false)});

            addRemoveRule.appendChild(addButton);
            addRemoveRule.appendChild(removeButton);
            addRemoveRule.appendChild(moveRuleUpButton);
            addRemoveRule.appendChild(moveRuleDownButton);
            
            ruleContainer.appendChild(addRemoveRule);
            ruleContainer.appendChild(pipe);
            ruleContainer.appendChild(input);

            rightSide.appendChild(ruleContainer);
        }

        statementContainer.appendChild(rightSide);

        newStatement.appendChild(statementContainer);
        
        let addRemoveStatement = document.createElement("div");
        addRemoveStatement.className = "addRemoveStatement";

        let addAboveButton = document.createElement("button");
        addAboveButton.innerText = "^+";
        addAboveButton.addEventListener("click", function(){addStatement(addButton, true)});

        let addButton = document.createElement("button");
        addButton.innerText = "+";
        addButton.addEventListener("click", function(){addStatement(addButton)});
        
        let removeButton = document.createElement("button");
        removeButton.innerText = "-";
        removeButton.addEventListener("click", function(){removeStatement(removeButton)});

        addRemoveStatement.appendChild(addAboveButton);
        addRemoveStatement.appendChild(addButton);
        addRemoveStatement.appendChild(removeButton);

        let moveUpButton = document.createElement("button");
        moveUpButton.innerText = "/\\";
        moveUpButton.style.backgroundColor = "rgb(100, 110, 140)";
        moveUpButton.style.marginLeft = "0.75em";
        moveUpButton.addEventListener("click", function(){moveStatement(moveUpButton.parentNode.parentNode, true)});
        
        let moveDownButton = document.createElement("button");
        moveDownButton.innerText = "\\/";
        moveDownButton.style.backgroundColor = "rgb(100, 110, 140)";
        moveDownButton.addEventListener("click", function(){moveStatement(moveDownButton.parentNode.parentNode, false)});

        addRemoveStatement.appendChild(moveUpButton);
        addRemoveStatement.appendChild(moveDownButton);

        newStatement.appendChild(addRemoveStatement);

        let insertAfterElem = document.getElementById("mainControls");
        insertAfterElem.insertAdjacentElement("afterend", newStatement);
    }
}

function save() {
    let saveData = {"statements":[]};

    let statements = document.getElementsByClassName("container");
    for(let i = 0; i < statements.length; i++) {
        let statement = {
            "name": (statements[i].children[0].children[0].value).toString(), 
            "rules": []
        };

        let rules = statements[i].children[0].children[1].children;
        
        let rule = rules[0].children[2].value;
        statement.rules.push(rule);

        for(let j = 1; j < rules.length; j++) {
            // if there is only one rule, the add rule button will be below
            if(rules[j].children.length > 1) {
                rule = rules[j].children[2].value;
    
                statement.rules.push(rule);
            }
        }

        saveData.statements.push(statement);
    }
    
    let dataStringify = JSON.stringify(saveData);
    let file = new Blob([dataStringify], {type: "application/json"});
    let url = URL.createObjectURL(file);
    
    let aRef = document.getElementById("downloadLink")
    aRef.href = url;
    aRef.download = "CFG.json";

    aRef.style.visibility = "visible"
}

function downloadFile() {
    document.getElementById("downloadLink").style.visibility = "hidden";
}

let changeColorOnClick = false;
function toggleChangeColorOnClick(button) {
    changeColorOnClick = !(changeColorOnClick);

    if(changeColorOnClick) {
        button.innerHTML = "Don't Change Color on Click";
    }
    else {
        button.innerHTML = "Change Color on Click";
    }
}

function toggleColorOnClick(input) {
    if(changeColorOnClick) {
        let styles = window.getComputedStyle(input);
        let currentColor = styles.getPropertyValue("color");
        let formatted = currentColor.replace("rgb(", "").replace(")", "").split(",");

        if(formatted[0] == 209 && formatted[1] == 196 && formatted[2] == 233) {
            input.style.color = "#FFF9C4";
        }
        else {
            input.style.color = "#d1c4e9";
        }
    }
}