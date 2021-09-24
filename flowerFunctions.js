/this function gets all elements under the class name "presentationSelector"
const presentationElements = document.getElementsByClassName("presentationSelector");

/this function gets all elements under the class name "flowerImage"
const flowerCircles = document.getElementsByClassName("flowerImage");

/this function gets all elements under the class name "myOrder"
const orderStatus = document.getElementsByClassName("myOrder");

/this function sets the text when nothing has been selected
const defaultOrderText = 'You have not selected anything';

/this function gets all elements under the class name "mySelectedFlowerName"
const hoverPlaceholder = document.getElementsByClassName("mySelectedFlowerName")

/this function changes the text appearing when hovering on a flower to the data-name of that flower
const handleFlowerHover = (event)=>{
    for (let i = 0; i < hoverPlaceholder.length; i++) {
        hoverPlaceholder[i].innerHTML = event.srcElement.getAttribute("data-name")
    }
}

/this function declares the variable "order text" as nothing, then if an element has the class name "selectedOne", it changes the variable to the data-name of the element
const updateOrderText = () => {
    let orderText = '';
    for (let i = 0; i < presentationElements.length; i++) {
        if (presentationElements[i].classList.contains("selectedOne")) {
            orderText = presentationElements[i].getAttribute("data-name");
        }
    }

    /this adds a space and comma if one or more options are selected
    let separator = "";
    for (let i = 0; i < flowerCircles.length; i++) {
        if (orderText.length > 0) {
            separator = ", ";
        }
        if (flowerCircles[i].classList.contains("flowerHighlight")) {
            orderText = orderText + separator + flowerCircles[i].getAttribute("data-name");
        }
    }


    for (let i = 0; i < orderStatus.length; i++) {
        if (orderText.length > 0) {
        orderStatus[i].innerHTML = orderText
        } else {
            orderStatus[i].innerHTML = defaultOrderText
        }
    }
}

/this function adds a class to elements of the "presentationSelector" class on click if has not 
/been selected and removes the class from the other element of the same class if it had been previously clicked on. 
/It also adds the data-name of the selected element to the variable "OrderText"
const handlePresentationCLick = (event) => {
    for (let i = 0; i < presentationElements.length; i++) {
        presentationElements[i].classList.remove( "selectedOne")
    }
    event.srcElement.classList.add( "selectedOne")
    updateOrderText();
}

/this function toggles the "flowerHighlight" class on and off the "flowerImage" class, then updates the variable OrderText to contain the data-names of the elements selected. It does not allow you to select more than 4 elements of the class
const handleFlowerCircleCLick = (event) => {
    /removes the class "flowerHighlight" on click if it already contains the class
    if (event.srcElement.classList.contains("flowerHighlight")) {
        event.srcElement.classList.remove("flowerHighlight");
        updateOrderText();
    } else {
        /this variable keeps track of how many elements have been selected. When an element is selected, 1 is added to the variable.
        let selectedCount = 0;
        for (let i = 0; i < flowerCircles.length; i++) {
            if (flowerCircles[i].classList.contains("flowerHighlight")) {
                selectedCount++;
            }
        }
        /this loops prevents more than 4 elements of the class to be selected
        if (selectedCount <4) {
            event.srcElement.classList.add( "flowerHighlight")
            updateOrderText();
        }
    }

}

/this loop checks to see if any elements in the class "presentationSelector" have been clicked on
for (let i = 0; i < presentationElements.length; i++) {
    presentationElements[i].addEventListener('click', handlePresentationCLick, false);
}

/this loop checks to see if any elements in the class "flowerImage" have been clicked on or hovered on
for (let i = 0; i < flowerCircles.length; i++) {
    flowerCircles[i].addEventListener('click', handleFlowerCircleCLick, false);
    flowerCircles[i].addEventListener("mouseover", handleFlowerHover, false);
}