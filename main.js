import { games, servers } from './config.js';

function createGameCard(game) {
    const card = document.createElement('div');
    card.className = 'game-card';
    
    card.innerHTML = `
        <h3 class="game-title">${game.title}</h3>
        <p>${game.description}</p>
        <a href="${game.link}" class="minecraft-button">
            <span class="button-content">Play Now</span>
        </a>
    `;
    
    return card;
}

function createServerCard(server) {
    const card = document.createElement('div');
    card.className = 'server-card';
    
    card.innerHTML = `
        <h3 class="server-name">${server.name}</h3>
        <div class="server-info">
            <div class="address-label">Eaglercraft Address:</div>
            <div class="server-address">${server.address}</div>
            <div class="address-label">Java Address:</div>
            <div class="server-address java-address">${server.javaAddress}</div>
        </div>
        <div class="server-version">Version: ${server.version}</div>
        <p class="server-description">${server.description}</p>
    `;
    
    return card;
}

function initializeGames() {
    const gameGrid = document.getElementById('gameGrid');
    games.forEach(game => {
        gameGrid.appendChild(createGameCard(game));
    });
}

function initializeServers() {
    const serverGrid = document.getElementById('serverGrid');
    const showMoreButton = document.getElementById('showMoreServers');
    let visibleServers = 6; // Initial number of visible servers

    function updateServerDisplay() {
        serverGrid.innerHTML = ''; // Clear current servers
        const serversToShow = servers.slice(0, visibleServers);
        serversToShow.forEach(server => {
            serverGrid.appendChild(createServerCard(server));
        });

        // Hide button if all servers are shown
        if (visibleServers >= servers.length) {
            showMoreButton.style.display = 'none';
        }
    }

    showMoreButton.addEventListener('click', () => {
        visibleServers += 6; // Show 6 more servers
        updateServerDisplay();
    });

    updateServerDisplay(); // Initial display
}

function setupFileRunner() {
    const fileInput = document.getElementById('fileInput');
    const selectedFileName = document.getElementById('selectedFileName');
    const runButton = document.getElementById('runButton');

    fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            selectedFileName.textContent = file.name;
            runButton.style.display = 'inline-block';
        }
    });

    runButton.addEventListener('click', () => {
        const file = fileInput.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const htmlContent = e.target.result;
                const newWindow = window.open('about:blank', '_blank');
                if (newWindow) {
                    newWindow.document.write(htmlContent);
                    newWindow.document.close();
                } else {
                    alert('Please allow pop-ups to run the HTML file.');
                }
            };
            reader.readAsText(file);
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initializeGames();
    initializeServers();
    setupFileRunner();
});