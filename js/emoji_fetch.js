function createEmojiItem(emoji) {
    const li = document.createElement('li');

    const img = document.createElement('img');
    img.src = emoji.sourceURL
    img.alt = emoji.sourceName;

    const nameSpan = document.createElement('span');
    nameSpan.textContent = emoji.sourceName;

    const copyBtn = document.createElement('button');
    copyBtn.textContent = 'Copy';
    copyBtn.className = 'btn btn-secondary';  
    copyBtn.onclick = () => {
        navigator.clipboard.writeText(emoji.sourceURL)
            .then(() => alert('URL copied to clipboard!'))
            .catch(err => console.error('Failed to copy: ', err));
    };

    li.appendChild(img);
    li.appendChild(nameSpan);
    li.appendChild(copyBtn);

    return li;
}


function loadEmojiJson() {
    fetch('/emoji_json/file_list.txt')
        .then((response) => response.text())
        .then((data) => {
            const ul = document.getElementById('emojiList');

            // Split the text into an array of filenames
            const fileNames = data.split('\n').map(name => name.trim()).filter(name => name);

            // Fetch each JSON file
            fileNames.forEach(fileName => {
                fetch(`/emoji_json/${fileName}`)
                    .then((response) => response.json())
                    .then((data) => {
                        const emoji = data.emoji_source;
                        const li = createEmojiItem(emoji);
                        ul.appendChild(li);
                    })
                    .catch((err) => {
                        console.error(`Error fetching ${fileName}:`, err);
                        ul.innerHTML += '<li>Error loading an emoji</li>';
                    });
            });
        })
        .catch((err) => {
            console.error('Error fetching file_list.txt:', err);
            // Fallback with example data if fetch fails (optional)
            const ul = document.getElementById('emojiList');
            const exampleEmoji = {
                imageHeader: 'https://i.imgur.com/gulEHPV.png',
                sourceName: 'Pepe-vàng-vẩu',
                sourceURL: 'https://example.com/pepe'
            };
            const li = createEmojiItem(exampleEmoji);
            ul.appendChild(li);
        });
}