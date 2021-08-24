addLayer("a", {
    name: "adventurer", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "A", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
        best: new Decimal(0),
    }},
    color: "#626360",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "Adventurer levels", // Name of prestige currency
    baseResource: "experience", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 1, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "a", description: "A: Reset for Adventurer levels", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},

    upgrades: {
        11: {
            name: "Test Upgrade",
            description: "This is what an upgrade does.",
            cost: new Decimal(1),

            effect() {
                return 2
            },

        },
        12: {
            name: "Test Upgrade 2",
            description: "This is the second upgrade. See the effect below.",
            cost: new Decimal(3),
            effect() {
                return player[this.layer].points.add(1).pow(0.5)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect

        },
    },
})

addLayer("c", {
    name: "combat", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "X", // Update this in the future to a monster icon.
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
    }},
    color: "#7CAB2A",

    type: "none", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    row: "side", // Row the layer is in on the tree (0 is the first row)
    layerShown(){return true},
    tooltip(){return ""}, // Disables any tooltip pop-up when mousing over the node on the tree.

    tabFormat: [
        ["row",[["bar","playerHealthBar"],["blank",["100px","0px"]],["bar","enemyHealthBar"],]],
        "blank",
        "blank",
        "clickables",
    ],

    bars: {
        playerHealthBar: {
            direction: RIGHT,
            width: 300,
            height: 40,
            progress() {
                return 0.1; // Replace with player health.
            },
            display() {
                return "Your Health";
            },

        },
        enemyHealthBar: {
            direction: RIGHT,
            width: 300,
            height: 40,
            progress() {
                return 0.1; // Replace with enemy health.
            },
            display() {
                return "Enemy Health";
            },

        },
    }
    
})