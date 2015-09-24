/* Progressive enhancement: show anchor links after <h?> tags */
function add_heading_anchor_links()
{
    // need to resort to this Array.slice.call tomfoolery to turn
    // HTMLCollection into a real Array.
    headings = [].concat(
        [].slice.call(document.getElementsByTagName("h2")),
        [].slice.call(document.getElementsByTagName("h3")),
        [].slice.call(document.getElementsByTagName("dt"))
    );

    function create_link(id)
    {
        var a = document.createElement("a");
        a.href = "#" + id;
        a.className = "heading-anchor-link";
        a.textContent = "\u00b6"; /* Paragraph symbol */
        return a;
    }

    var i, elem;
    for (i = 0; i < headings.length; i++) {
        elem = headings[i];
        if (elem.id) {
            elem.appendChild(create_link(elem.id));
        }
    }

    var sections = document.getElementsByTagName("section");
    for (i = 0; i < sections.length; i++) {
        if (sections[i].id) {
            elem = sections[i].firstChild;
            // find the first heading
            while (elem) {
                if (elem.tagName === 'H2' || elem.tagName === 'H3') {
                    elem.appendChild(create_link(sections[i].id));
                    break;
                } else {
                    elem = elem.nextSibling;
                }
            }
        }
    }
}

window.addEventListener("load", add_heading_anchor_links, false);
