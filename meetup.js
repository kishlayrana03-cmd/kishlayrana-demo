// Sample profiles for demo
const sampleProfiles = [
    {
        id: 1,
        username: "Alex Johnson",
        age: 26,
        location: "New York, USA",
        bio: "Adventure enthusiast and coffee lover. Always up for exploring new places!",
        interests: ["Travel", "Hiking", "Photography", "Coffee"],
        photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop"
    },
    {
        id: 2,
        username: "Sarah Chen",
        age: 24,
        location: "San Francisco, USA",
        bio: "Artist and yoga enthusiast. Love meeting creative people and discussing art.",
        interests: ["Art", "Yoga", "Music", "Design"],
        photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=500&fit=crop"
    },
    {
        id: 3,
        username: "Marcus Williams",
        age: 28,
        location: "Los Angeles, USA",
        bio: "Tech enthusiast, gamer, and foodie. Love trying new restaurants.",
        interests: ["Gaming", "Tech", "Food", "Movies"],
        photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=500&fit=crop"
    },
    {
        id: 4,
        username: "Emma Davis",
        age: 25,
        location: "Austin, USA",
        bio: "Book lover and nature enthusiast. Weekends are for hiking and reading.",
        interests: ["Books", "Nature", "Hiking", "Writing"],
        photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=500&fit=crop"
    },
    {
        id: 5,
        username: "Lucas Rodriguez",
        age: 27,
        location: "Miami, USA",
        bio: "Sports fanatic and beach lover. Always ready for outdoor activities.",
        interests: ["Sports", "Beach", "Swimming", "Fitness"],
        photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=500&fit=crop"
    },
    {
        id: 6,
        username: "Sophia Martinez",
        age: 23,
        location: "Seattle, USA",
        bio: "Music lover and coffee enthusiast. Let's jam or chat over coffee!",
        interests: ["Music", "Coffee", "Art", "Travel"],
        photo: "https://images.unsplash.com/photo-1539571696357-5a69c006ae30?w=400&h=500&fit=crop"
    }
];

// State management
let currentUser = null;
let allProfiles = [...sampleProfiles];
let likes = [];
let matches = [];
let messages = {};
let conversations = [];

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    loadDataFromStorage();
    showHome();
});

// Save/Load from localStorage
function saveDataToStorage() {
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    localStorage.setItem('allProfiles', JSON.stringify(allProfiles));
    localStorage.setItem('likes', JSON.stringify(likes));
    localStorage.setItem('matches', JSON.stringify(matches));
    localStorage.setItem('messages', JSON.stringify(messages));
    localStorage.setItem('conversations', JSON.stringify(conversations));
}

function loadDataFromStorage() {
    const saved = localStorage.getItem('currentUser');
    if (saved) {
        currentUser = JSON.parse(saved);
        allProfiles = JSON.parse(localStorage.getItem('allProfiles') || '[]');
        likes = JSON.parse(localStorage.getItem('likes') || '[]');
        matches = JSON.parse(localStorage.getItem('matches') || '[]');
        messages = JSON.parse(localStorage.getItem('messages') || '{}');
        conversations = JSON.parse(localStorage.getItem('conversations') || '[]');
        updateNavigation();
    }
}

// Navigation
function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(sectionId).classList.add('active');
}

function updateNavigation() {
    const isLoggedIn = currentUser !== null;
    document.getElementById('myProfileNav').style.display = isLoggedIn ? 'block' : 'none';
    document.getElementById('matchesNav').style.display = isLoggedIn ? 'block' : 'none';
    document.getElementById('messagesNav').style.display = isLoggedIn ? 'block' : 'none';
    document.getElementById('logoutBtn').style.display = isLoggedIn ? 'block' : 'none';
    document.getElementById('signupBtn').style.display = isLoggedIn ? 'none' : 'block';
}

function showHome() {
    showSection('homeSection');
}

function showSignup() {
    if (currentUser) {
        alert('You are already logged in. Please logout first.');
        return;
    }
    document.getElementById('signupForm').reset();
    showSection('signupSection');
}

function showProfiles() {
    showSection('profilesSection');
    loadProfiles();
}

function showMyProfile() {
    if (!currentUser) {
        showSignup();
        return;
    }
    showSection('myProfileSection');
    displayMyProfile();
}

function showMatches() {
    if (!currentUser) {
        showSignup();
        return;
    }
    showSection('matchesSection');
    displayMatches();
}

function showMessages() {
    if (!currentUser) {
        showSignup();
        return;
    }
    showSection('messagesSection');
    loadConversations();
}

// Sign Up
function handleSignup(event) {
    event.preventDefault();
    
    const newUser = {
        id: Date.now(),
        username: document.getElementById('username').value,
        email: document.getElementById('email').value,
        age: parseInt(document.getElementById('age').value),
        location: document.getElementById('location').value,
        bio: document.getElementById('bio').value,
        interests: document.getElementById('interests').value.split(',').map(i => i.trim()),
        photo: document.getElementById('photo').value
    };

    currentUser = newUser;
    messages[currentUser.id] = {};
    saveDataToStorage();
    updateNavigation();
    showHome();
    alert('Profile created successfully! Welcome to ConnectHub!');
}

function logout() {
    if (confirm('Are you sure you want to logout?')) {
        currentUser = null;
        saveDataToStorage();
        updateNavigation();
        showHome();
    }
}

// Load and Display Profiles
function loadProfiles(filterText = '') {
    let filteredProfiles = allProfiles.filter(profile => profile.id !== currentUser?.id);

    if (filterText) {
        const searchLower = filterText.toLowerCase();
        filteredProfiles = filteredProfiles.filter(profile =>
            profile.interests.some(interest => interest.toLowerCase().includes(searchLower))
        );
    }

    const container = document.getElementById('profilesContainer');
    container.innerHTML = '';

    filteredProfiles.forEach(profile => {
        const isLiked = likes.some(like => like.fromId === currentUser?.id && like.toId === profile.id);
        const isMatched = matches.some(match => 
            (match.user1Id === currentUser?.id && match.user2Id === profile.id) ||
            (match.user1Id === profile.id && match.user2Id === currentUser?.id)
        );

        const card = document.createElement('div');
        card.className = 'profile-card';
        card.innerHTML = `
            <img src="${profile.photo}" alt="${profile.username}" class="profile-image" onerror="this.src='https://via.placeholder.com/400x500?text=Photo'">
            <div class="profile-info">
                <div class="profile-header">
                    <div class="profile-name">${profile.username}, ${profile.age}</div>
                    <div class="profile-location">📍 ${profile.location}</div>
                </div>
                <div class="profile-bio">${profile.bio}</div>
                <div class="profile-interests">
                    ${profile.interests.map(interest => `<span class="interest-tag">${interest}</span>`).join('')}
                </div>
                <div class="profile-actions">
                    ${currentUser ? `
                        <button class="profile-actions button ${isLiked ? 'btn-like' : 'btn-outline'}" 
                                onclick="toggleLike(${profile.id})">${isLiked ? '❤️ Liked' : '🤍 Like'}</button>
                        <button class="profile-actions button btn-message" onclick="startConversation(${profile.id}, '${profile.username}')">💬 Message</button>
                    ` : `
                        <button class="profile-actions button btn-primary" style="width: 100%" onclick="showSignup()">Sign Up to Like</button>
                    `}
                </div>
                ${isMatched ? '<div style="margin-top: 0.5rem; color: #ec4899; font-weight: bold;">✨ You matched!</div>' : ''}
            </div>
        `;
        container.appendChild(card);
    });

    if (filteredProfiles.length === 0) {
        container.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 2rem; color: white;">No profiles found. Try adjusting your filters!</p>';
    }
}

function applyFilters() {
    const filterText = document.getElementById('filterInterests').value;
    loadProfiles(filterText);
}

// Likes and Matches
function toggleLike(profileId) {
    if (!currentUser) {
        showSignup();
        return;
    }

    const likeIndex = likes.findIndex(like => like.fromId === currentUser.id && like.toId === profileId);
    
    if (likeIndex > -1) {
        likes.splice(likeIndex, 1);
    } else {
        likes.push({
            fromId: currentUser.id,
            toId: profileId,
            timestamp: Date.now()
        });

        // Check if it's a mutual like (match)
        const mutualLike = likes.find(like => like.fromId === profileId && like.toId === currentUser.id);
        if (mutualLike) {
            const isAlreadyMatched = matches.some(match => 
                (match.user1Id === currentUser.id && match.user2Id === profileId) ||
                (match.user1Id === profileId && match.user2Id === currentUser.id)
            );
            
            if (!isAlreadyMatched) {
                matches.push({
                    user1Id: currentUser.id,
                    user2Id: profileId,
                    matchedAt: Date.now()
                });
                alert('🎉 It\'s a match! You can now message them.');
            }
        }
    }

    saveDataToStorage();
    loadProfiles(document.getElementById('filterInterests').value);
}

// Display My Profile
function displayMyProfile() {
    if (!currentUser) return;

    const container = document.getElementById('myProfileContent');
    container.innerHTML = `
        <img src="${currentUser.photo}" alt="${currentUser.username}" class="profile-detail-image" onerror="this.src='https://via.placeholder.com/600x400?text=Photo'">
        <div class="profile-detail-header">
            <div class="profile-detail-name">${currentUser.username}</div>
            <div class="profile-detail-location">📍 ${currentUser.location} • ${currentUser.age} years old</div>
        </div>
        <div class="profile-detail-section">
            <h3>About Me</h3>
            <p>${currentUser.bio}</p>
        </div>
        <div class="profile-detail-section">
            <h3>Interests</h3>
            <div class="profile-interests">
                ${currentUser.interests.map(interest => `<span class="interest-tag">${interest}</span>`).join('')}
            </div>
        </div>
        <div class="profile-detail-section">
            <h3>Stats</h3>
            <p>❤️ Likes: ${likes.filter(l => l.fromId === currentUser.id).length}</p>
            <p>✨ Matches: ${matches.filter(m => m.user1Id === currentUser.id || m.user2Id === currentUser.id).length}</p>
        </div>
        <button class="btn btn-secondary" onclick="showSignup()">Edit Profile</button>
    `;
}

// Display Matches
function displayMatches() {
    const container = document.getElementById('matchesContainer');
    container.innerHTML = '';

    const userMatches = matches.filter(m => m.user1Id === currentUser.id || m.user2Id === currentUser.id);

    if (userMatches.length === 0) {
        container.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 2rem;">No matches yet. Browse profiles and find people you like!</p>';
        return;
    }

    userMatches.forEach(match => {
        const matchedUserId = match.user1Id === currentUser.id ? match.user2Id : match.user1Id;
        const matchedUser = allProfiles.find(p => p.id === matchedUserId);

        if (matchedUser) {
            const commonInterests = currentUser.interests.filter(i => 
                matchedUser.interests.includes(i)
            );

            const card = document.createElement('div');
            card.className = 'match-card';
            card.innerHTML = `
                <img src="${matchedUser.photo}" alt="${matchedUser.username}" class="match-avatar" onerror="this.src='https://via.placeholder.com/120x120?text=Photo'">
                <div class="match-name">${matchedUser.username}</div>
                <div class="match-common">${commonInterests.length} common interests</div>
                <div style="margin-bottom: 1rem; font-size: 0.9rem;">
                    ${commonInterests.map(i => `<span class="interest-tag">${i}</span>`).join('')}
                </div>
                <button class="btn btn-primary" style="width: 100%;" onclick="startConversation(${matchedUser.id}, '${matchedUser.username}')">💬 Message</button>
            `;
            container.appendChild(card);
        }
    });
}

// Messaging
function startConversation(userId, userName) {
    if (!currentUser) {
        showSignup();
        return;
    }

    const conversationId = [currentUser.id, userId].sort().join('-');
    
    let conversation = conversations.find(c => c.id === conversationId);
    if (!conversation) {
        conversation = {
            id: conversationId,
            participant1Id: currentUser.id,
            participant2Id: userId,
            participant1Name: currentUser.username,
            participant2Name: userName,
            messages: [],
            lastMessage: null,
            lastMessageTime: Date.now()
        };
        conversations.push(conversation);
    }

    currentConversationId = conversationId;
    saveDataToStorage();
    showMessages();
    displayConversation(conversationId);
}

let currentConversationId = null;

function loadConversations() {
    const container = document.getElementById('conversationsList');
    container.innerHTML = '';

    if (conversations.length === 0) {
        container.innerHTML = '<p style="padding: 1rem; text-align: center; color: #9ca3af;">No conversations yet</p>';
        document.getElementById('chatBox').style.display = 'none';
        return;
    }

    conversations.sort((a, b) => (b.lastMessageTime || 0) - (a.lastMessageTime || 0));

    conversations.forEach(conv => {
        const otherPersonName = conv.participant1Id === currentUser.id ? conv.participant2Name : conv.participant1Name;
        const item = document.createElement('div');
        item.className = `conversation-item ${currentConversationId === conv.id ? 'active' : ''}`;
        item.innerHTML = `
            <div class="conversation-name">${otherPersonName}</div>
            <div class="conversation-preview">${conv.lastMessage || 'No messages yet'}</div>
        `;
        item.onclick = () => displayConversation(conv.id);
        container.appendChild(item);
    });
}

function displayConversation(conversationId) {
    const conversation = conversations.find(c => c.id === conversationId);
    if (!conversation) return;

    currentConversationId = conversationId;
    document.getElementById('chatBox').style.display = 'flex';

    const messagesContainer = document.getElementById('chatMessages');
    messagesContainer.innerHTML = '';

    conversation.messages.forEach(msg => {
        const msgDiv = document.createElement('div');
        msgDiv.className = `message ${msg.senderId === currentUser.id ? 'sent' : 'received'}`;
        msgDiv.textContent = msg.text;
        messagesContainer.appendChild(msgDiv);
    });

    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    loadConversations();
}

function sendMessage() {
    if (!currentConversationId) return;

    const messageInput = document.getElementById('messageInput');
    const messageText = messageInput.value.trim();

    if (!messageText) return;

    const conversation = conversations.find(c => c.id === currentConversationId);
    if (conversation) {
        conversation.messages.push({
            senderId: currentUser.id,
            text: messageText,
            timestamp: Date.now()
        });
        conversation.lastMessage = messageText;
        conversation.lastMessageTime = Date.now();

        saveDataToStorage();
        messageInput.value = '';
        displayConversation(currentConversationId);
    }
}

// Handle Enter key in message input
document.addEventListener('DOMContentLoaded', () => {
    const messageInput = document.getElementById('messageInput');
    if (messageInput) {
        messageInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
            }
        });
    }
});
