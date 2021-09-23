const presentationElements = document.getElementsByClassName("presentationSelector");
const flowerCircles = document.getElementsByClassName("flowerImage");
const orderStatus = document.getElementsByClassName("myOrder");
const defaultOrderText = 'You have not selected anything';
const hoverPlaceholder = document.getElementsByClassName("mySelectedFlowerName")
const handleFlowerHover = (event)=>{
    for (let i = 0; i < hoverPlaceholder.length; i++) {
        hoverPlaceholder[i].innerHTML = event.srcElement.getAttribute("data-name")
    }
}

const updateOrderText = () => {
    let orderText = '';
    for (let i = 0; i < presentationElements.length; i++) {
        if (presentationElements[i].classList.contains("selectedOne")) {
            orderText = presentationElements[i].getAttribute("data-name");
        }
    }

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

const handlePresentationCLick = (event) => {
    for (let i = 0; i < presentationElements.length; i++) {
        presentationElements[i].classList.remove( "selectedOne")
    }
    event.srcElement.classList.add( "selectedOne")
    updateOrderText();
}

const handleFlowerCircleCLick = (event) => {
    if (event.srcElement.classList.contains("flowerHighlight")) {
        event.srcElement.classList.remove("flowerHighlight");
        updateOrderText();
    } else {
        let selectedCount = 0;
        for (let i = 0; i < flowerCircles.length; i++) {
            if (flowerCircles[i].classList.contains("flowerHighlight")) {
                selectedCount++;
            }
        }
        if (selectedCount <4) {
            event.srcElement.classList.add( "flowerHighlight")
            updateOrderText();
        }
    }

}


for (let i = 0; i < presentationElements.length; i++) {
    presentationElements[i].addEventListener('click', handlePresentationCLick, false);
}

for (let i = 0; i < flowerCircles.length; i++) {
    flowerCircles[i].addEventListener('click', handleFlowerCircleCLick, false);
    flowerCircles[i].addEventListener("mouseover", handleFlowerHover, false);
}