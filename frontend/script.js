const API_BASE = 'http://100.48.7.111:5000';

// 1. Fetch Student Details
async function fetchStudentDetails() {
    try {
        const response = await fetch(`${API_BASE}/student-details`);
        const data = await response.json();
        document.getElementById('student-info').innerHTML = `
            <p><strong>Name:</strong> ${data.name}</p>
            <p><strong>Reg No:</strong> ${data.register_number}</p>
        `;
    } catch (error) {
        document.getElementById('student-info').innerHTML = `<p>Error loading details.</p>`;
    }
}

// 2. Fetch and Render Games
async function loadGames() {
    try {
        const response = await fetch(`${API_BASE}/api/games`);
        const games = await response.json();
        const container = document.getElementById('games-container');
        container.innerHTML = ''; // Clear current list

        games.forEach(game => {
            const card = document.createElement('div');
            card.className = 'game-card';
            card.innerHTML = `<h3>${game.title}</h3>`;
            // Click listener to show details
            card.onclick = () => showGameDetails(game);
            container.appendChild(card);
        });
    } catch (error) {
        console.error("Error fetching games:", error);
    }
}

// 3. Show/Hide Game Details
function showGameDetails(game) {
    document.getElementById('detail-title').innerText = game.title;
    document.getElementById('detail-desc').innerText = game.description;
    document.getElementById('detail-download').href = game.download_link;
    document.getElementById('game-details').classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

document.getElementById('close-details').onclick = () => {
    document.getElementById('game-details').classList.add('hidden');
};

// 4. Handle New Game Request
document.getElementById('request-form').onsubmit = async (e) => {
    e.preventDefault(); // Prevent page reload
    
    const newGame = {
        title: document.getElementById('game-title').value,
        description: document.getElementById('game-desc').value
    };

    try {
        await fetch(`${API_BASE}/api/games`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newGame)
        });
        
        // Reset form and reload list
        document.getElementById('request-form').reset();
        loadGames(); 
    } catch (error) {
        console.error("Error submitting game:", error);
    }
};

// Initialize App
fetchStudentDetails();
loadGames();
