window.smartShortcuts                      = {};
window.smartShortcuts.buttonsSmartShortcut = (data, document) => {
    let suggestions = '';
    data.map((item) => {
        suggestions += `<button  
                            class='reply-options' 
                            id='${item.content}'
                            title='${item.content}'>${item.icons}</button>`;
    });
    // buttons.unshift(elem('button', {'class': 'add-smart-replay'}, icons.settings, true))
    let footer = document.querySelector('footer');
    let div    = document.createElement("DIV");
    div.classList.add("grGJn");
    div.classList.add("smart-replay");
    div.innerHTML = suggestions;
    footer.insertBefore(div, footer.firstChild);
    document.querySelector('#main > div > div > div').scrollTop += 1000
    let elemSuggestion = document.body.querySelectorAll(".reply-options");
    elemSuggestion.forEach(el => el.addEventListener('click', ev => {
        if (!ev.target.id) return
        window.sendMessage(ev.target.id).then(text => console.log(text));
    }));


};