console.log("JavaScript Loaded");

/* ===================================================== */
/* 1. CLICK EVENT */

document.getElementById("clickBtn").addEventListener("click", function() {

    document.getElementById("clickOutput").textContent =
    "Button was clicked!";

});

/* ===================================================== */
/* 2. EVENT BUBBLING */

document.getElementById("parent").addEventListener("click", function() {

    document.getElementById("bubbleOutput").textContent =
    "Parent clicked";

});

document.getElementById("child").addEventListener("click", function(e) {

    e.stopPropagation();

    document.getElementById("bubbleOutput").textContent =
    "Child clicked WITHOUT parent trigger";

});

/* ===================================================== */
/* 3. CHANGE TEXT */

document.getElementById("changeText").addEventListener("click", function() {

    document.getElementById("demoText").textContent =
    "TEXT CHANGED SUCCESSFULLY";

});

/* ===================================================== */
/* 4. CHANGE STYLE */

document.getElementById("changeStyle").addEventListener("click", function() {

    let box = document.getElementById("demoBox");

    box.style.backgroundColor = "black";
    box.style.color = "white";
    box.style.fontSize = "25px";
    box.style.padding = "20px";

});

/* ===================================================== */
/* 5. TOGGLE CLASS */

document.getElementById("toggleBtn").addEventListener("click", function() {

    document.getElementById("toggleText").classList.toggle("highlight");

});

/* ===================================================== */
/* 6. CHANGE IMAGE ATTRIBUTE */

document.getElementById("changeImg").addEventListener("click", function() {

    document.getElementById("demoImg").setAttribute(
        "src",
        "https://media1.tenor.com/m/4ue9qZqz6zUAAAAC/hello-you-there.gif"
    );

});

/* ===================================================== */
/* 7. CREATE ELEMENT */

document.getElementById("createElement").addEventListener("click", function() {

    let newParagraph = document.createElement("p");

    newParagraph.textContent = "New paragraph created dynamically!";

    document.getElementById("container").appendChild(newParagraph);

});

/* ===================================================== */
/* 8. FORM VALIDATION */

document.getElementById("myForm").addEventListener("submit", function(e) {

    let input = document.getElementById("inputField").value;

    if(input.trim() === "") {

        e.preventDefault();

        document.getElementById("formMessage").textContent =
        "Input required!";

    }
    else {

        e.preventDefault();

        document.getElementById("formMessage").textContent =
        "Form submitted successfully!";

    }

});

/* ===================================================== */
/* 9. DISABLE BUTTON */

document.getElementById("disableBtn").addEventListener("click", function(e) {

    let button = e.target;

    button.setAttribute("disabled", true);

    button.textContent = "Already Clicked";

});

/* ===================================================== */
/* 10. KEY DETECTION */

document.addEventListener("keydown", function(e) {

    let output = document.getElementById("keyOutput");

    if(e.key === "Enter") {

        output.textContent = "You pressed ENTER";

    }
    else if(e.key === "0") {

        output.textContent = "SECRET MODE ACTIVATED";

    }
    else {

        output.textContent = "Key pressed: " + e.key;

    }

});

/* ===================================================== */
/* 11. COLOR BUTTONS */

document.querySelectorAll(".colorBtn").forEach(function(btn) {

    btn.addEventListener("click", function(e) {

        let color =
        e.target.textContent.toLowerCase();

        document.body.style.backgroundColor = color;

    });

});

/* ===================================================== */
/* 12. EVENT LOOP DEMO */

document.getElementById("runEventLoop").addEventListener("click", function() {

    let output = document.getElementById("eventLoopOutput");

    output.innerHTML = "";

    function log(message) {

        output.innerHTML += message + "<br>";

    }

    log("1. Start");

    setTimeout(() => {

        log("4. setTimeout Callback");

    }, 0);

    Promise.resolve().then(() => {

        log("3. Promise Callback");

    });

    log("2. End");

});

/* ===================================================== */