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

    addRemoveRule.appendChild(addButton);
    addRemoveRule.appendChild(removeButton);
    
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

    let parent = container.parentNode;
    let parentChilds = parent.children;
    let parentChildsLength = parentChilds.length;

    let containerIndex = -1;
    for(let i = 0; i < parentChilds.length; i++) {
        if(parentChilds[i] == container) {
            containerIndex = i;
            break;
        }
    }

    container.remove();

    if(containerIndex == 1 && parentChildsLength == 2) {
        let ruleContainer = document.createElement("div");
        ruleContainer.className = "ruleContainer";

        let firstAddRemoveRule = document.createElement("div");
        firstAddRemoveRule.className = "firstAddRemoveRule";

        let firstAddButton = document.createElement("button");
        firstAddButton.innerText = "+";
        firstAddButton.addEventListener("click", function(){addFirstRule(firstAddButton)});

        firstAddRemoveRule.appendChild(firstAddButton);

        ruleContainer.appendChild(firstAddRemoveRule);

        parent.appendChild(ruleContainer);
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

    let firstAddRemoveRule = document.createElement("div");
    firstAddRemoveRule.className = "firstAddRemoveRule";

    let firstAddButton = document.createElement("button");
    firstAddButton.innerText = "+";
    firstAddButton.addEventListener("click", function(){addFirstRule(firstAddButton)});

    firstAddRemoveRule.appendChild(firstAddButton);

    ruleContainerBottom.appendChild(firstAddRemoveRule);

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

        let arrow = document.createElement("p");
        arrow.innerHTML = "->";

        let input = document.createElement("input");
        input.type = "text";
        input.value = loadData.statements[i].rules[0];
        input.addEventListener("click", function(){toggleColorOnClick(input);});

        ruleContainerTop.appendChild(arrow);
        ruleContainerTop.appendChild(input);

        rightSide.appendChild(ruleContainerTop);

        if(loadData.statements[i].rules.length == 1) {
            let ruleContainerBottom = document.createElement("div");
            ruleContainerBottom.className = "ruleContainer";

            let firstAddRemoveRule = document.createElement("div");
            firstAddRemoveRule.className = "firstAddRemoveRule";

            let firstAddButton = document.createElement("button");
            firstAddButton.innerText = "+";
            firstAddButton.addEventListener("click", function(){addFirstRule(firstAddButton)});

            firstAddRemoveRule.appendChild(firstAddButton);

            ruleContainerBottom.appendChild(firstAddRemoveRule);

            rightSide.appendChild(ruleContainerBottom);
        }
        else {
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

                addRemoveRule.appendChild(addButton);
                addRemoveRule.appendChild(removeButton);
                
                ruleContainer.appendChild(addRemoveRule);
                ruleContainer.appendChild(pipe);
                ruleContainer.appendChild(input);

                rightSide.appendChild(ruleContainer);
            }
        }

        statementContainer.appendChild(rightSide);

        newStatement.appendChild(statementContainer);
        
        let addRemoveStatement = document.createElement("div");
        addRemoveStatement.className = "addRemoveStatement";

        let addButton = document.createElement("button");
        addButton.innerText = "+";
        addButton.addEventListener("click", function(){addStatement(addButton)});
        
        let removeButton = document.createElement("button");
        removeButton.innerText = "-";
        removeButton.addEventListener("click", function(){removeStatement(removeButton)});

        addRemoveStatement.appendChild(addButton);
        addRemoveStatement.appendChild(removeButton);

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
        
        let rule = rules[0].children[1].value;
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

    aRef.style.visibility = "visible";
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