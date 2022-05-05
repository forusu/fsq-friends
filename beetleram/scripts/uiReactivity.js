function handleNavigationClick() {
    let navmenu = document.getElementById("navigation-menu");
    if (navmenu.classList.contains("nav-translated")) {
        navmenu.classList.remove("nav-translated")
    } else {
        navmenu.classList.add("nav-translated");
    }

}

function handleDiscordButtonClick() {
    let dummy = document.createElement("textarea");
    document.body.appendChild(dummy);
    dummy.value = "Beetleram#1751";
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
    setDiscordToolTip();
}
function setDiscordToolTip() {
    let tooltip = document.getElementById("discord-tooltip");
    tooltip.innerHTML = "Beetleram#1751 Copied!";

}
function resetDiscordToolTip() {
    let tooltip = document.getElementById("discord-tooltip");
    tooltip.innerHTML = "Copy Beetleram#1751";
}
