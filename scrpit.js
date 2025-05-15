let button = document.getElementById("btn");

button.addEventListener("click", () => {
    const box = document.querySelector(".box");
    box.innerHTML = `<b class="b1">If you want to add new link please contact on mentioned email!:- <a href="us781819@gmail.com">us781819@gmail.com!</a></b><br>
        <b class="b2">Note:- When contacting by email, please mention the link or name of the website you want to add!</b>
    `;

    // alert("When contacting by email, please mention the link or name of the website you want to add")
    setTimeout(() => {
        const boldTags = box.querySelectorAll("b");
        boldTags.forEach(tag => tag.style.display = "none");
    }, 10000);
});
