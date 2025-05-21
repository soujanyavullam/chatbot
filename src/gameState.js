class GameState {
    constructor() {
        this.currentScene = 'start';
        this.inventory = [];
        this.health = 100;
        this.choices = [];
        this.discoveredItems = new Set();
        this.hasTorch = false;
        this.hasKey = false;
        this.hasAmulet = false;
    }

    updateState(choice) {
        this.choices.push(choice);
        
        // Handle inventory items
        if (choice === 'take_torch') this.hasTorch = true;
        if (choice === 'take_key') this.hasKey = true;
        if (choice === 'take_amulet') this.hasAmulet = true;

        switch(this.currentScene) {
            case 'start':
                this.currentScene = choice === 'forest' ? 'forest' : 'cave';
                break;
            case 'forest':
                this.currentScene = choice === 'explore' ? 'forest_clearing' : 'forest_dark';
                break;
            case 'cave':
                this.currentScene = choice === 'enter' ? 'cave_deep' : 'cave_entrance';
                break;
        }
    }

    getCurrentScene() {
        const scenes = {
            start: {
                text: "You find yourself at a crossroads. The sun is setting, and you need to make a decision quickly. To your left is a dark forest, to your right, a mysterious cave.",
                image: "/images/test.jpg", // Using test image
                sound: "/sounds/ambient.mp3",
                choices: [
                    { id: 'forest', text: 'Enter the forest' },
                    { id: 'cave', text: 'Explore the cave' }
                ]
            },
            forest: {
                text: "The forest is dense and ancient. You can hear strange sounds in the distance. What do you do?",
                image: "/images/test.jpg", // Using test image
                sound: "/sounds/forest.mp3",
                choices: [
                    { id: 'explore', text: 'Follow the sounds deeper into the forest' },
                    { id: 'return', text: 'Go back to the crossroads' }
                ]
            },
            cave: {
                text: "The cave entrance is dark and foreboding. A cool breeze whispers from within.",
                image: "/images/test.jpg", // Using test image
                sound: "/sounds/cave.mp3",
                choices: [
                    { id: 'enter', text: 'Venture deeper into the cave' },
                    { id: 'return', text: 'Return to the crossroads' }
                ]
            }
        };

        return scenes[this.currentScene] || {
            text: "The story continues...",
            image: "/images/test.jpg", // Using test image
            sound: "/sounds/ambient.mp3",
            choices: []
        };
    }
}

module.exports = GameState; 