function addRule(elem) {
    let container = elem.parentNode.parentNode;

    let ruleContainer = document.createElement("div");
    ruleContainer.className = "ruleContainer";

    let pipe = document.createElement("p");
    pipe.innerHTML = "|&nbsp;&nbsp;&nbsp;";
    
    let input = document.createElement("input");
    input.type = "text";
    input.value = ".";
    
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
        console.log("do it")
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

function addStatement(elem) {
    let statement = elem.parentNode.parentNode;

    let newStatement = document.createElement("div");
    newStatement.className = "container";

    let statementContainer = document.createElement("div");
    statementContainer.className = "statementContainer";

    let firstInput = document.createElement("input");
    firstInput.type = "text";
    firstInput.value = ".";

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

    let addButton = document.createElement("button");
    addButton.innerText = "+";
    addButton.addEventListener("click", function(){addStatement(addButton)});
    
    let removeButton = document.createElement("button");
    removeButton.innerText = "-";
    removeButton.addEventListener("click", function(){removeStatement(removeButton)});

    addRemoveStatement.appendChild(addButton);
    addRemoveStatement.appendChild(removeButton);

    newStatement.appendChild(addRemoveStatement);

    statement.insertAdjacentElement("afterend", newStatement);
}

function removeStatement(elem) {
    let statementCount = document.body.children.length;
    if(statementCount > 2) {
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
                button.style.visibility = "visible";
                // button.style.display = "block";
            }
            else {
                button.style.visibility = "hidden";
                // button.style.display = "none";
            }
        }
    }
}