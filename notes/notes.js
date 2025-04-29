const user = "your-github-username";
const repo = "your-repo";
const branch = "main";

// Fetch manifest.json
fetch(`https://raw.githubusercontent.com/${user}/${repo}/${branch}/manifest.json`)
    .then(response => response.json())
    .then(filenames => {
        filenames.forEach(filename => {
            // Fetch each text file
            fetch(`https://raw.githubusercontent.com/${user}/${repo}/${branch}/text-files/${filename}`)
                .then(response => response.text())
                .then(text => {
                    // Add to HTML
                    const div = document.createElement('div');
                    div.textContent = text;
                    document.body.appendChild(div);
                });
        });
    });