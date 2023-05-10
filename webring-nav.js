const createPageLinkElement = (elementText, navDirection, site) => {
    let element = Object.assign(document.createElement("a"), {href: site.link}, {className: `ff-webring-${navDirection}`});
    element.append(document.createTextNode(elementText));
    return element;
}

const renderPageLinkElement = async (elementText, navDirection, scriptElement) => {
    const data = await fetch("https://forusu.github.io/fsq-friends/pages.json")
        .then((response) => response.json());
    const pageList = data.pages;
    const index = pageList.findIndex((site) => site.link == window.location.pathname);
    if (index === -1) {
        throw new Error(`Couldn't find the site with path '${window.location.pathname}' in the webring.`);
    }
    const prevSite = pageList[(index + pageList.length - 1) % pageList.length];
    const nextSite = pageList[(index + 1) % pageList.length];
    let pageLinkElement;
    switch (navDirection) {
        case "previous":
            pageLinkElement = createPageLinkElement(elementText, navDirection, prevSite);
            break;
        case "next":
            pageLinkElement = createPageLinkElement(elementText, navDirection, nextSite);
            break;
        default:
            console.log("uhhh you fucked something up");
    }
    scriptElement.replaceWith(pageLinkElement);
}

// Call the functions below within <script> elements. Include your preferred text inside.
// Example: <script>previousPage("Previous");</script>

// This links to the page before yours
const previousPage = (elementText) => {
    renderPageLinkElement(elementText, "previous", document.currentScript);
}

// This links to the page after yours
const nextPage = (elementText) => {
    renderPageLinkElement(elementText, "next", document.currentScript);
}