function handleNavigationClick() {
    let navmenu = document.getElementById("navigation-menu");
    if (navmenu.classList.contains("nav-translated")) {
        navmenu.classList.remove("nav-translated")
    } else {
        navmenu.classList.add("nav-translated");
    }

}
