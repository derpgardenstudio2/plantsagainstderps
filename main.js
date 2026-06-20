// ============================================================
// Plants Against Derps v2.9 - UI + PVP Connection Test
// Edit in the config thingy
// Features: direct image paths, pink-square fallback, fixed unlocks,
// loadout picker, upgrades, minigames, chess 1-4, enemy sizes/hitboxes,
// critical hits, alien gunner shots, speed buttons, pause, special plants,
// v2.6: plant stacking, extra levels/minigames, wider shooting types.
// ============================================================

"use strict";

const CONFIG = {
  gameTitle: "Plants Against Derps",
  saveKey: "plantsAgainstDerps_v28_save",

  board: { canvasW: 900, canvasH: 520, rows: 5, cols: 9, gridX: 80, gridY: 78, cellW: 86, cellH: 82 },

  currency: { name: "Twigs", minWinReward: 7, maxWinReward: 18 },

  audio: {
    enabled: true,
    tracks: {
      menu: "audio/mainmenubeat.m4a",
      world1: "audio/PAD-Theme1Remaster.m4a",
      battle: "audio/derpbattle1.m4a",
      desert: "audio/deserttheme.m4a",
      victory: "audio/derpvictorytheme.m4a",
      finalBoss: "audio/nerd.m4a"
    },
    menuTrack: "menu", defaultLevelTrack: "world1", victoryTrack: "victory",
    musicVolume: 0.42, victoryVolume: 0.55, sfxVolume: 0.035
  },

  backgrounds: {
    forest: "assets/bg-forest.png",
    desert: "assets/bg-desert.png",
    cloud: "assets/bg-cloud.png",
    milkyway: "assets/bg-milkyway.png",
    chess: "assets/bg-chess.png",
    debugHill: "assets/bg_debug_hill.png",
    matrixGrid: "assets/bg_matrix_grid.png",
    glitchArchive: "assets/bg_glitch_archive.png"
  },

  images: {
    removeTool: "assets/remove-tool.png",
    campfr: "assets/plant-campfr.png",
    treeGun: "assets/plant-tree-gun.png",
    rosegun: "assets/rosegun.png",
    soggyMattress: "assets/soggy-mattress.png",
    kaboom: "assets/plant-el-kaboom.png",
    bucketStalk: "assets/bucketboi.png",
    glowMush: "assets/glowmush.png",
    solarPanel: "assets/solarpanel.png",
    taxRock: "assets/taxrock.png",
    cardboardWall: "assets/cardboardwall.png",
    rustyFridge: "assets/rustyfridge.png",
    cloudPopper: "assets/cloudpopper.png",
    starfruitKnockoff: "assets/starfruitknockoff.png",
    beachBall: "assets/beachball.png",

    basicDerp: "assets/enemy-basic-derp.png",
    armoredDerp: "assets/enemy-armored-derp.png",
    fastDerp: "assets/enemy-fast-derp.png",
    assasinRover: "assets/assasin-rover.png",
    mechaDerp: "assets/mechaderp.png",
    alien: "assets/alien.png",
    alienGod: "assets/aliengod.png",
    alienFinalBoss: "assets/alienfinalboss.png",
    alienGun: "assets/aliengun.png",
    droneGun: "assets/dronegun.png",
    droneSaw: "assets/dronesaw.png"
  },

  upgrades: { maxLevel: 5, baseCost: 30, costPerLevel: 25, hpBoostPerLevel: 18, damageBoostPerLevel: 5, producerBoostPerLevel: 5 },
  gameplay: { glowFromEnemy: 6, waveGapTicks: 200, removeRefundPercent: 0.5, critChance: 0.08, critMultiplier: 2, maxLoadoutPlants: 5 },

  plants: {
    removeTool: { name: "Remove Tool", cost: 0, hp: 1, img: "removeTool", desc: "Removes a plant and refunds half Glow.", role: "Tool", tool: "remove" },
    campfr: { name: "Campfr", cost: 25, hp: 80, img: "campfr", desc: "Makes Glow over time. Weird but useful.", role: "Producer", producer: true, produceAmount: 25, produceCooldown: 900, placementCooldown: 120 },
    glowMush: { name: "Glow Mush", cost: 15, hp: 45, img: "assets/glowmush.png", desc: "Cheap mini producer. Small economy gremlin.", role: "Mini Producer", producer: true, produceAmount: 12, produceCooldown: 700, placementCooldown: 110 },
    solarPanel: { name: "Cracked Solar Panel", cost: 125, hp: 70, img: "assets/solarpanel.png", desc: "Slow but chunky Glow production.", role: "Big Producer", unlockCost: 7, producer: true, produceAmount: 70, produceCooldown: 1500, placementCooldown: 300 },
    taxRock: { name: "Tax Rock", cost: 75, hp: 230, img: "assets/taxrock.png", desc: "Wall that makes Glow when hit. Financially annoying.", role: "Producer Wall", unlockAt: "1-5", wall: true, produceWhenHit: 8, hitProduceCooldown: 24, placementCooldown: 220 },
    cardboardWall: { name: "Cardboard Wall", cost: 35, hp: 145, img: "assets/cardboardwall.png", desc: "Cheap emergency wall. Probably from a package.", role: "Wall", wall: true, placementCooldown: 150 },
    soggyMattress: { name: "Soggy Mattress", cost: 50, hp: 190, img: "soggyMattress", desc: "A gross wall with suspicious endurance.", role: "Wall", wall: true, placementCooldown: 210 },
    rustyFridge: { name: "Rusty Fridge", cost: 150, hp: 520, img: "assets/rustyfridge.png", desc: "Heavy wall. It remembers expired leftovers.", role: "Heavy Wall", unlockAt: "2-3", wall: true, placementCooldown: 380 },
    treeGun: { name: "Tree Gun", cost: 75, hp: 100, img: "treeGun", desc: "Reliable lane shooter.", role: "Shooter", shooter: true, fireType: "straight", shootCooldown: 115, projectileDamage: 24, projectileSpeed: 4.8, placementCooldown: 180 },
    rosegun: { name: "Rosegun", cost: 50, hp: 65, img: "rosegun", desc: "Cheap shooter with occasional double fire.", role: "Shooter", shooter: true, fireType: "straight", shootCooldown: 100, projectileDamage: 12, projectileSpeed: 5.2, doubleShotChance: 12, placementCooldown: 150 },
    bucketStalk: { name: "Bucket-Stalk", cost: 165, hp: 115, img: "assets/bucketboi.png", desc: "A bucket-powered heavy blaster.", role: "Heavy Shooter", unlockCost: 8, shooter: true, fireType: "straight", shootCooldown: 205, projectileDamage: 72, projectileSpeed: 6, placementCooldown: 350 },
    cloudPopper: { name: "Cloud Popper", cost: 125, hp: 90, img: "assets/cloudpopper.png", desc: "Bonus damage vs drones and aliens.", role: "Anti-Air Shooter", unlockAt: "3-1", shooter: true, fireType: "straight", targetTags: ["drone", "alien"], bonusVsTags: ["drone", "alien"], bonusMultiplier: 1.8, shootCooldown: 95, projectileDamage: 27, projectileSpeed: 6.4, placementCooldown: 240 },
    starfruitKnockoff: { name: "Starfruit Knockoff", cost: 175, hp: 90, img: "assets/starfruitknockoff.png", desc: "Shoots its lane and nearby lanes. Not suspicious at all.", role: "Multi-Lane Shooter", unlockAt: "3-5", shooter: true, fireType: "multiLane", shootCooldown: 150, projectileDamage: 22, projectileSpeed: 5.6, placementCooldown: 340 },
    beachBall: { name: "Beach Ball", cost: 100, hp: 1, img: "beachBall", desc: "Click it, then click a tile. It bonks the area and returns.", role: "Launch Special", unlockAt: "2-1", instantLaunch: true, fireType: "beachBall", damage: 105, radius: 105, placementCooldown: 240 },
    kaboom: { name: "El Kaboom", cost: 225, hp: 40, img: "kaboom", desc: "Explodes after a short fuse.", role: "Explosive", fuse: 90, damage: 190, radius: 145, placementCooldown: 420 }
  },

  enemies: {
    basic: { name: "Da Boiiiiii", hp: 90, speed: 0.14, damage: 10, img: "basicDerp", size: 1, desc: "The basic derp." },
    armored: { name: "Armored Da Boiiiiii", hp: 190, speed: 0.18, damage: 16, img: "armoredDerp", size: 1.08, desc: "More health. More problem." },
    fast: { name: "Fast Da Boiiiiii", hp: 65, speed: 0.46, damage: 8, img: "fastDerp", size: 0.92, desc: "Fast and annoying." },
    assasinRover: { name: "Assasin Rover", hp: 1, speed: 0.75, damage: 50, img: "assasinRover", size: 0.82, fragile: true, desc: "One HP glass cannon." },
    mechaDerp: { name: "Mecha Derp", hp: 620, speed: 0.13, damage: 28, img: "mechaDerp", size: 1.45, boss: true, desc: "Machine boss problem." },
    droneGun: { name: "Drone Gun", hp: 105, speed: 0.25, damage: 9, img: "droneGun", size: 0.9, tags: ["drone"], flying: true, rangedShooter: true, shootCooldown: 160, shotDamage: 12, shotSpeed: 3.6, desc: "Flying and rude." },
    droneSaw: { name: "Drone Saw", hp: 75, speed: 0.52, damage: 22, img: "droneSaw", size: 0.85, tags: ["drone"], flying: true, desc: "Rushes plants." },
    alien: { name: "Odd Alien", hp: 130, speed: 0.19, damage: 12, img: "alien", size: 1, tags: ["alien"], desc: "A strange alien." },
    alienGun: { name: "Alien Gunner", hp: 155, speed: 0.12, damage: 10, img: "alienGun", size: 1.05, tags: ["alien"], rangedShooter: true, shootCooldown: 130, shotDamage: 16, shotSpeed: 4.2, desc: "Shoots plants from range." },
    alienGod: { name: "Alien God", hp: 950, speed: 0.105, damage: 35, img: "alienGod", size: 1.65, tags: ["alien"], boss: true, desc: "Cosmic lawn thief." },
    alienFinalBoss: { name: "The Star-Eyed One", hp: 1900, speed: 0.08, damage: 45, img: "alienFinalBoss", size: 2.05, tags: ["alien"], boss: true, rangedShooter: true, shootCooldown: 100, shotDamage: 22, shotSpeed: 3.8, desc: "Final space boss." }
  },

  shopBadges: {
    proPlanter: { name: "Pro Planter", cost: 50, desc: "You placed plants and felt important." },
    kaboomMaster: { name: "Kaboom Master", cost: 75, desc: "Explosions solved your problems." },
    derpDeleter: { name: "Derp Deleter", cost: 100, desc: "Many derps were removed from existence." },
    twigCollector: { name: "Twig Collector", cost: 125, desc: "You collected sticks with financial intent." },
    backgroundEnjoyer: { name: "Background Enjoyer", cost: 175, desc: "You witnessed the lawn become more than tiles." }
  },

  defaultLoadout: ["campfr", "treeGun", "rosegun", "soggyMattress", "kaboom"],
  levels: [
    {
      name: "1-1",
      title: "First Derp",
      desc: "A regular lawn with regular bad decisions.",
      startGlow: 75,
      background: "forest",
      music: "world1",
      waves: [
        [{ type: "basic", row: 2, delay: 120 }],
        [
          { type: "basic", row: 1, delay: 100 },
          { type: "basic", row: 3, delay: 220 }
        ]
      ],
      lava: []
    },

    {
      name: "1-2",
      title: "Two Derps Maybe",
      desc: "More derps walk at you. Horrifying.",
      startGlow: 75,
      background: "forest",
      music: "world1",
      waves: [
        [
          { type: "basic", row: 0, delay: 80 },
          { type: "basic", row: 4, delay: 260 }
        ],
        [
          { type: "basic", row: 2, delay: 80 },
          { type: "fast", row: 3, delay: 250 }
        ]
      ],
      lava: []
    },

    {
      name: "1-3",
      title: "Fast Boi Test",
      desc: "Fast Da Boiiiiii joins the argument.",
      startGlow: 100,
      background: "forest",
      music: "world1",
      waves: [
        [{ type: "fast", row: 1, delay: 120 }],
        [
          { type: "basic", row: 2, delay: 90 },
          { type: "fast", row: 2, delay: 250 },
          { type: "basic", row: 4, delay: 420 }
        ]
      ],
      lava: []
    },

    {
      name: "1-4",
      title: "Armor Moment",
      desc: "Armored Da Boiiiiii is mildly rude.",
      startGlow: 100,
      background: "forest",
      music: "world1",
      waves: [
        [{ type: "armored", row: 2, delay: 180 }],
        [
          { type: "basic", row: 1, delay: 90 },
          { type: "armored", row: 3, delay: 300 }
        ]
      ],
      lava: []
    },

    {
      name: "1-5",
      title: "Mor Level Preview",
      desc: "Lava tiles exist. Do not plant there.",
      startGlow: 125,
      background: "forest",
      music: "world1",
      waves: [
        [
          { type: "basic", row: 0, delay: 100 },
          { type: "basic", row: 4, delay: 240 }
        ],
        [
          { type: "fast", row: 2, delay: 130 },
          { type: "armored", row: 3, delay: 360 }
        ]
      ],
      lava: [[4, 1], [4, 2], [4, 3]]
    },

    {
      name: "1-6",
      title: "Kaboom Lessons",
      desc: "El Kaboom solves problems loudly.",
      startGlow: 150,
      background: "forest",
      music: "world1",
      waves: [
        [
          { type: "basic", row: 1, delay: 80 },
          { type: "basic", row: 1, delay: 180 },
          { type: "basic", row: 1, delay: 280 }
        ],
        [{ type: "armored", row: 2, delay: 170 }]
      ],
      lava: []
    },

    {
      name: "1-7",
      title: "Lawn Malfunction",
      desc: "This lawn is not inspected.",
      startGlow: 150,
      background: "forest",
      music: "world1",
      waves: [
        [
          { type: "fast", row: 0, delay: 120 },
          { type: "fast", row: 4, delay: 250 }
        ],
        [
          { type: "basic", row: 2, delay: 100 },
          { type: "armored", row: 2, delay: 320 }
        ]
      ],
      lava: [[2, 0], [6, 4]]
    },

    {
      name: "1-8",
      title: "Derp Stack",
      desc: "Many derps. Concerning quantity.",
      startGlow: 175,
      background: "forest",
      music: "world1",
      waves: [
        [
          { type: "basic", row: 0, delay: 80 },
          { type: "basic", row: 1, delay: 130 },
          { type: "basic", row: 2, delay: 180 }
        ],
        [
          { type: "basic", row: 3, delay: 80 },
          { type: "fast", row: 4, delay: 240 },
          { type: "armored", row: 1, delay: 400 }
        ]
      ],
      lava: []
    },

    {
      name: "1-9",
      title: "Actual Problem",
      desc: "The derps found shoes.",
      startGlow: 200,
      background: "forest",
      music: "world1",
      waves: [
        [
          { type: "fast", row: 0, delay: 80 },
          { type: "fast", row: 2, delay: 190 },
          { type: "fast", row: 4, delay: 300 }
        ],
        [
          { type: "armored", row: 1, delay: 120 },
          { type: "armored", row: 3, delay: 360 }
        ]
      ],
      lava: [[3, 2], [5, 2]]
    },

    {
      name: "1-10",
      title: "The Derpening",
      desc: "Final level of world 1. Very serious.",
      startGlow: 225,
      background: "forest",
      music: "world1",
      waves: [
        [
          { type: "basic", row: 0, delay: 70 },
          { type: "basic", row: 2, delay: 160 },
          { type: "basic", row: 4, delay: 250 }
        ],
        [
          { type: "fast", row: 1, delay: 80 },
          { type: "armored", row: 2, delay: 280 },
          { type: "fast", row: 3, delay: 460 }
        ],
        [
          { type: "armored", row: 0, delay: 110 },
          { type: "armored", row: 4, delay: 270 },
          { type: "fast", row: 2, delay: 430 }
        ]
      ],
            lava: [[4, 0], [4, 1], [4, 3], [4, 4]]
    },

    {
      name: "2-1",
      title: "Start of The Derp Ages",
      desc: "Now fighting with machines.",
      startGlow: 125,
      background: "desert",
      music: "desert",
      waves: [
        [
          { type: "basic", row: 0, delay: 70 },
          { type: "basic", row: 2, delay: 160 },
          { type: "basic", row: 4, delay: 250 }
        ],
        [
          { type: "fast", row: 1, delay: 80 },
          { type: "armored", row: 2, delay: 280 },
          { type: "fast", row: 3, delay: 460 }
        ],
        [
          { type: "armored", row: 0, delay: 110 },
          { type: "armored", row: 4, delay: 270 },
          { type: "fast", row: 2, delay: 430 }
        ],
        [
          { type: "mechaDerp", row: 3, delay: 530 }
        ]
      ],
      lava: [[4, 0], [4, 1], [4, 3], [5, 1], [5, 4], [4, 4]]
    },

    {
      name: "2-2",
      title: "Derpday",
      desc: "The Derp's birthday. We are here to ruin it.",
      startGlow: 125,
      background: "desert",
      music: "desert",
      waves: [
        [
          { type: "armored", row: 0, delay: 70 },
          { type: "basic", row: 4, delay: 250 }
        ],
        [
          { type: "fast", row: 1, delay: 80 },
          { type: "armored", row: 2, delay: 280 },
          { type: "fast", row: 4, delay: 280 },
          { type: "fast", row: 3, delay: 460 }
        ],
        [
          { type: "armored", row: 0, delay: 110 },
          { type: "armored", row: 4, delay: 270 },
          { type: "fast", row: 2, delay: 430 }
        ],
        [
          { type: "mechaDerp", row: 1, delay: 530 },
          { type: "assasinRover", row: 3, delay: 760 }
        ]
      ],
      lava: [[4, 0], [4, 1], [4, 3], [5, 1], [5, 4], [1, 3], [4, 4]]
    },

    {
      name: "2-3",
      title: "Derp Campsite",
      desc: "Secret hideout no more.",
      startGlow: 125,
      background: "desert",
      music: "desert",
      waves: [
        [
          { type: "armored", row: 0, delay: 70 },
          { type: "basic", row: 2, delay: 160 },
          { type: "basic", row: 1, delay: 160 },
          { type: "basic", row: 4, delay: 250 }
        ],
        [
          { type: "fast", row: 1, delay: 80 },
          { type: "mechaDerp", row: 2, delay: 280 },
          { type: "fast", row: 3, delay: 460 }
        ],
        [
          { type: "armored", row: 0, delay: 110 },
          { type: "armored", row: 4, delay: 270 },
          { type: "fast", row: 2, delay: 430 }
        ],
        [
          { type: "assasinRover", row: 3, delay: 530 }
        ]
      ],
      lava: []
    },

    {
      name: "2-4",
      title: "Rush Storm!!",
      desc: "I wish you luck.",
      startGlow: 1000,
      background: "desert",
      music: "desert",
      waves: [
        [
          { type: "assasinRover", row: 0, delay: 70 },
          { type: "fast", row: 4, delay: 250 }
        ],
        [
          { type: "fast", row: 1, delay: 80 },
          { type: "assasinRover", row: 2, delay: 280 },
          { type: "armored", row: 2, delay: 280 },
          { type: "fast", row: 4, delay: 280 },
          { type: "fast", row: 3, delay: 460 }
        ],
                [
          { type: "mechaDerp", row: 0, delay: 110 },
          { type: "armored", row: 4, delay: 270 },
          { type: "fast", row: 2, delay: 430 }
        ],
        [
          { type: "mechaDerp", row: 1, delay: 530 },
          { type: "assasinRover", row: 3, delay: 760 }
        ]
      ],
      lava: []
    },
    {
      name: "2-5",
      title: "Sand in the Wires",
      desc: "The machines are getting crunchy.",
      startGlow: 175,
      background: "desert",
      music: "desert",
      waves: [
        [
          { type: "basic", row: 0, delay: 80 },
          { type: "basic", row: 2, delay: 180 },
          { type: "basic", row: 4, delay: 280 }
        ],
        [
          { type: "armored", row: 1, delay: 120 },
          { type: "fast", row: 3, delay: 260 },
          { type: "armored", row: 4, delay: 440 }
        ],
        [
          { type: "mechaDerp", row: 2, delay: 250 },
          { type: "assasinRover", row: 0, delay: 520 },
          { type: "assasinRover", row: 4, delay: 700 }
        ]
      ],
      lava: [[3, 1], [4, 1], [5, 3], [6, 3]]
    },
    {
      name: "2-6",
      title: "Do Not Touch The Red Sand",
      desc: "That is probably not sand.",
      startGlow: 225,
      background: "desert",
      music: "desert",
      waves: [
        [
          { type: "fast", row: 0, delay: 90 },
          { type: "fast", row: 4, delay: 210 }
        ],
        [
          { type: "armored", row: 1, delay: 100 },
          { type: "armored", row: 3, delay: 260 },
          { type: "basic", row: 2, delay: 380 }
        ],
        [
          { type: "mechaDerp", row: 1, delay: 280 },
          { type: "mechaDerp", row: 3, delay: 520 }
        ]
      ],
      lava: [[2, 0], [2, 1], [2, 2], [2, 3], [2, 4], [6, 2]]
    },
    {
      name: "2-7",
      title: "Rover Practice",
      desc: "They keep sending the tiny murder cars.",
      startGlow: 300,
      background: "desert",
      music: "desert",
      waves: [
        [
          { type: "assasinRover", row: 0, delay: 120 },
          { type: "assasinRover", row: 2, delay: 260 },
          { type: "assasinRover", row: 4, delay: 400 }
        ],
        [
          { type: "basic", row: 1, delay: 80 },
          { type: "assasinRover", row: 1, delay: 250 },
          { type: "armored", row: 3, delay: 420 }
        ],
        [
          { type: "fast", row: 0, delay: 110 },
          { type: "fast", row: 4, delay: 180 },
          { type: "assasinRover", row: 2, delay: 360 },
          { type: "mechaDerp", row: 2, delay: 620 }
        ]
      ],
      lava: [[4, 0], [4, 4]]
    },
    {
      name: "2-8",
      title: "The Campfire Is Not Safe",
      desc: "They found your Glow economy.",
      startGlow: 100,
      background: "desert",
      music: "desert",
      waves: [
        [
          { type: "basic", row: 2, delay: 90 },
          { type: "fast", row: 2, delay: 230 }
        ],
        [
          { type: "assasinRover", row: 1, delay: 120 },
          { type: "assasinRover", row: 3, delay: 280 },
          { type: "armored", row: 2, delay: 460 }
        ],
        [
          { type: "mechaDerp", row: 0, delay: 250 },
          { type: "mechaDerp", row: 4, delay: 450 },
          { type: "fast", row: 2, delay: 650 }
        ]
      ],
      lava: [[5, 1], [5, 2], [5, 3]]
    },
    {
      name: "2-9",
      title: "Mecha Derp Parking Lot",
      desc: "Why are there so many of them.",
      startGlow: 500,
      background: "desert",
      music: "desert",
      waves: [
        [
          { type: "mechaDerp", row: 0, delay: 180 },
          { type: "mechaDerp", row: 4, delay: 360 }
        ],
        [
          { type: "armored", row: 1, delay: 100 },
          { type: "armored", row: 3, delay: 180 },
          { type: "assasinRover", row: 2, delay: 400 }
        ],
        [
          { type: "mechaDerp", row: 1, delay: 200 },
          { type: "mechaDerp", row: 2, delay: 420 },
          { type: "mechaDerp", row: 3, delay: 640 }
        ]
      ],
      lava: [[3, 0], [3, 2], [3, 4], [6, 1], [6, 3]]
    },

    {
      name: "2-10",
      title: "Derp Factory Shutdown",
      desc: "Final desert level. Turn the machines into scrap before they escape upward.",
      startGlow: 800,
      background: "desert",
      music: "desert",
      waves: [
        [
          { type: "armored", row: 0, delay: 80 },
          { type: "armored", row: 2, delay: 180 },
          { type: "armored", row: 4, delay: 280 }
        ],
        [
          { type: "fast", row: 1, delay: 90 },
          { type: "assasinRover", row: 3, delay: 250 },
          { type: "mechaDerp", row: 2, delay: 430 }
        ],
        [
          { type: "mechaDerp", row: 0, delay: 170 },
          { type: "mechaDerp", row: 4, delay: 330 },
          { type: "assasinRover", row: 2, delay: 520 }
        ],
        [
          { type: "mechaDerp", row: 1, delay: 240 },
          { type: "mechaDerp", row: 2, delay: 420 },
          { type: "mechaDerp", row: 3, delay: 600 },
          { type: "assasinRover", row: 0, delay: 820 },
          { type: "assasinRover", row: 4, delay: 900 }
        ]
      ],
      lava: [[4, 0], [4, 1], [4, 3], [4, 4], [6, 2]]
    },

    {
      name: "3-1",
      title: "Evacuation Gone Wrong",
      desc: "The clouds were supposed to be safe. They were not.",
      startGlow: 175,
      background: "cloud",
      music: "world1",
      waves: [
        [
          { type: "basic", row: 2, delay: 100 },
          { type: "fast", row: 1, delay: 240 },
          { type: "fast", row: 3, delay: 380 }
        ],
        [
          { type: "droneSaw", row: 0, delay: 160 },
          { type: "basic", row: 2, delay: 300 },
          { type: "droneSaw", row: 4, delay: 460 }
        ],
        [
          { type: "armored", row: 1, delay: 160 },
          { type: "droneSaw", row: 3, delay: 360 },
          { type: "fast", row: 2, delay: 520 }
        ]
      ],
      lava: [[4, 1], [4, 3]]
    },

    {
      name: "3-2",
      title: "Cloud Traffic",
      desc: "The sky has lanes now. Nobody is following them.",
      startGlow: 200,
      background: "cloud",
      music: "menu",
      waves: [
        [
          { type: "fast", row: 0, delay: 90 },
          { type: "fast", row: 4, delay: 210 }
        ],
        [
          { type: "droneSaw", row: 1, delay: 120 },
          { type: "droneSaw", row: 3, delay: 260 },
          { type: "basic", row: 2, delay: 390 }
        ],
        [
          { type: "armored", row: 0, delay: 160 },
          { type: "armored", row: 4, delay: 320 },
          { type: "droneSaw", row: 2, delay: 500 }
        ]
      ],
      lava: [[5, 2]]
    },

    {
      name: "3-3",
      title: "Drone Delivery Failure",
      desc: "Nobody ordered this many flying problems.",
      startGlow: 250,
      background: "cloud",
      music: "battle",
      waves: [
        [
          { type: "droneSaw", row: 1, delay: 100 },
          { type: "droneSaw", row: 3, delay: 190 },
          { type: "basic", row: 2, delay: 300 }
        ],
        [
          { type: "assasinRover", row: 0, delay: 120 },
          { type: "assasinRover", row: 4, delay: 250 },
          { type: "droneSaw", row: 2, delay: 390 },
          { type: "armored", row: 2, delay: 560 }
        ],
        [
          { type: "mechaDerp", row: 1, delay: 240 },
          { type: "mechaDerp", row: 3, delay: 480 },
          { type: "droneSaw", row: 2, delay: 680 }
        ]
      ],
      lava: [[3, 0], [3, 4], [6, 2]]
    },

    {
      name: "3-4",
      title: "Alien Airspace",
      desc: "The derps were bad. The aliens are worse.",
      startGlow: 275,
      background: "cloud",
      music: "desert",
      waves: [
        [
          { type: "alien", row: 0, delay: 120 },
          { type: "alien", row: 2, delay: 240 },
          { type: "alien", row: 4, delay: 360 }
        ],
        [
          { type: "droneSaw", row: 1, delay: 120 },
          { type: "fast", row: 3, delay: 260 },
          { type: "alien", row: 2, delay: 430 }
        ],
        [
          { type: "alien", row: 0, delay: 170 },
          { type: "armored", row: 2, delay: 320 },
          { type: "alien", row: 4, delay: 470 }
        ]
      ],
      lava: [[4, 1], [5, 1], [4, 3], [5, 3]]
    },

    {
      name: "3-5",
      title: "Pew Pew Panic",
      desc: "Some aliens remembered they have weapons.",
      startGlow: 300,
      background: "cloud",
      music: "world1",
      waves: [
        [{ type: "alienGun", row: 2, delay: 180 }],
        [
          { type: "alien", row: 0, delay: 100 },
          { type: "alienGun", row: 1, delay: 260 },
          { type: "droneSaw", row: 4, delay: 420 }
        ],
        [
          { type: "alienGun", row: 3, delay: 160 },
          { type: "droneSaw", row: 1, delay: 320 },
          { type: "armored", row: 2, delay: 500 }
        ],
        [
          { type: "alienGun", row: 0, delay: 220 },
          { type: "alienGun", row: 4, delay: 420 },
          { type: "fast", row: 2, delay: 620 }
        ]
      ],
      lava: [[2, 2], [6, 2]]
    },

    {
      name: "3-6",
      title: "Emergency Exit Blocked",
      desc: "The evacuation path is blocked by drones, aliens, and bad planning.",
      startGlow: 325,
      background: "cloud",
      music: "menu",
      waves: [
        [
          { type: "droneSaw", row: 0, delay: 90 },
          { type: "droneSaw", row: 4, delay: 210 },
          { type: "alien", row: 2, delay: 360 }
        ],
        [
          { type: "alienGun", row: 1, delay: 140 },
          { type: "alienGun", row: 3, delay: 300 },
          { type: "fast", row: 2, delay: 460 }
        ],
        [
          { type: "mechaDerp", row: 0, delay: 220 },
          { type: "alien", row: 2, delay: 420 },
          { type: "mechaDerp", row: 4, delay: 620 }
        ],
        [
          { type: "assasinRover", row: 1, delay: 180 },
          { type: "assasinRover", row: 3, delay: 320 },
          { type: "alienGun", row: 2, delay: 520 }
        ]
      ],
      lava: [[3, 1], [3, 3], [5, 1], [5, 3]]
    },
        {
      name: "3-7",
      title: "Floating Platform Incident",
      desc: "Several platforms are gone. Please pretend this is fine.",
      startGlow: 350,
      background: "cloud",
      music: "desert",
      waves: [
        [
          { type: "alien", row: 1, delay: 100 },
          { type: "alien", row: 3, delay: 230 }
        ],
        [
          { type: "droneSaw", row: 0, delay: 80 },
          { type: "droneSaw", row: 2, delay: 210 },
          { type: "droneSaw", row: 4, delay: 340 }
        ],
        [
          { type: "alienGun", row: 1, delay: 150 },
          { type: "alienGun", row: 3, delay: 330 },
          { type: "armored", row: 2, delay: 520 }
        ],
        [
          { type: "mechaDerp", row: 2, delay: 280 },
          { type: "droneSaw", row: 0, delay: 520 },
          { type: "droneSaw", row: 4, delay: 620 }
        ]
      ],
      lava: [[1, 0], [1, 4], [4, 2], [7, 0], [7, 4]]
    },

    {
      name: "3-8",
      title: "Alien Blockade",
      desc: "The aliens are not letting anything leave.",
      startGlow: 400,
      background: "cloud",
      music: "battle",
      waves: [
        [
          { type: "alien", row: 0, delay: 90 },
          { type: "alien", row: 2, delay: 190 },
          { type: "alien", row: 4, delay: 290 }
        ],
        [
          { type: "alienGun", row: 1, delay: 130 },
          { type: "alienGun", row: 3, delay: 260 },
          { type: "droneSaw", row: 2, delay: 420 }
        ],
        [
          { type: "mechaDerp", row: 0, delay: 200 },
          { type: "alien", row: 2, delay: 400 },
          { type: "mechaDerp", row: 4, delay: 600 }
        ],
        [
          { type: "alienGun", row: 0, delay: 150 },
          { type: "alienGun", row: 4, delay: 300 },
          { type: "assasinRover", row: 2, delay: 470 },
          { type: "droneSaw", row: 1, delay: 620 },
          { type: "droneSaw", row: 3, delay: 760 }
        ]
      ],
      lava: [[4, 0], [4, 4], [5, 1], [5, 3]]
    },

    {
      name: "3-9",
      title: "Cloud Base Collapse",
      desc: "The clouds are falling apart and everyone is still attacking you for some reason.",
      startGlow: 500,
      background: "cloud",
      music: "world1",
      waves: [
        [
          { type: "droneSaw", row: 0, delay: 80 },
          { type: "alien", row: 1, delay: 180 },
          { type: "alien", row: 3, delay: 300 },
          { type: "droneSaw", row: 4, delay: 420 }
        ],
        [
          { type: "alienGun", row: 2, delay: 160 },
          { type: "mechaDerp", row: 0, delay: 360 },
          { type: "mechaDerp", row: 4, delay: 560 }
        ],
        [
          { type: "alienGod", row: 2, delay: 420 }
        ],
        [
          { type: "assasinRover", row: 1, delay: 120 },
          { type: "assasinRover", row: 3, delay: 240 },
          { type: "alienGun", row: 0, delay: 420 },
          { type: "alienGun", row: 4, delay: 560 }
        ]
      ],
      lava: [[2, 1], [2, 3], [4, 0], [4, 4], [6, 2]]
    },

    {
      name: "3-10",
      title: "Evacuation Final Call",
      desc: "The final sky escape. The alien boss does not approve.",
      startGlow: 900,
      background: "cloud",
      music: "finalBoss",
      waves: [
        [
          { type: "alien", row: 0, delay: 80 },
          { type: "alien", row: 2, delay: 180 },
          { type: "alien", row: 4, delay: 280 }
        ],
        [
          { type: "droneSaw", row: 1, delay: 120 },
          { type: "droneSaw", row: 3, delay: 260 },
          { type: "alienGun", row: 2, delay: 420 }
        ],
        [
          { type: "alienGod", row: 0, delay: 280 },
          { type: "alienGod", row: 4, delay: 520 }
        ],
        [
          { type: "alienGun", row: 1, delay: 120 },
          { type: "alienGun", row: 3, delay: 260 },
          { type: "droneSaw", row: 2, delay: 420 },
          { type: "assasinRover", row: 0, delay: 620 },
          { type: "assasinRover", row: 4, delay: 760 }
        ],
        [
          { type: "alienFinalBoss", row: 2, delay: 500 },
          { type: "alienGod", row: 1, delay: 900 },
          { type: "alienGod", row: 3, delay: 1120 }
        ]
      ],
      lava: [[3, 0], [3, 4], [4, 1], [4, 3], [6, 0], [6, 4]]
    },

    {
      name: "4-1",
      title: "Welcome To Space, Sadly",
      desc: "The evacuation worked. The destination did not.",
      startGlow: 500,
      background: "milkyway",
      music: "world1",
      waves: [
        [
          { type: "alien", row: 0, delay: 90 },
          { type: "alien", row: 2, delay: 190 },
          { type: "alien", row: 4, delay: 290 }
        ],
        [
          { type: "droneSaw", row: 1, delay: 100 },
          { type: "droneSaw", row: 3, delay: 240 },
          { type: "alienGun", row: 2, delay: 420 }
        ],
        [
          { type: "mechaDerp", row: 0, delay: 200 },
          { type: "mechaDerp", row: 4, delay: 420 },
          { type: "alien", row: 2, delay: 620 }
        ]
      ],
      lava: [[4, 2], [6, 1], [6, 3]]
    },

    {
      name: "4-2",
      title: "Low Gravity, High Problems",
      desc: "Everything is floating except your stress.",
      startGlow: 550,
      background: "milkyway",
      music: "menu",
      waves: [
        [
          { type: "fast", row: 0, delay: 80 },
          { type: "droneSaw", row: 1, delay: 170 },
          { type: "fast", row: 3, delay: 260 },
          { type: "droneSaw", row: 4, delay: 350 }
        ],
        [
          { type: "alienGun", row: 0, delay: 160 },
          { type: "alienGun", row: 4, delay: 320 },
          { type: "assasinRover", row: 2, delay: 500 }
        ],
        [
          { type: "alien", row: 1, delay: 130 },
          { type: "alien", row: 3, delay: 260 },
          { type: "mechaDerp", row: 2, delay: 520 }
        ]
      ],
      lava: [[3, 0], [3, 4], [5, 2], [7, 1], [7, 3]]
    },

    {
      name: "4-3",
      title: "Satellite Yard Sale",
      desc: "Old space junk is now attacking you. Somehow.",
      startGlow: 600,
      background: "milkyway",
      music: "desert",
      waves: [
        [
          { type: "armored", row: 1, delay: 100 },
          { type: "armored", row: 3, delay: 240 },
          { type: "droneSaw", row: 2, delay: 380 }
        ],
        [
          { type: "mechaDerp", row: 0, delay: 170 },
          { type: "alienGun", row: 2, delay: 360 },
          { type: "mechaDerp", row: 4, delay: 550 }
        ],
        [
          { type: "droneSaw", row: 0, delay: 80 },
          { type: "droneSaw", row: 1, delay: 160 },
          { type: "droneSaw", row: 3, delay: 300 },
          { type: "droneSaw", row: 4, delay: 380 },
          { type: "alien", row: 2, delay: 560 }
        ]
      ],
      lava: [[2, 2], [4, 0], [4, 4], [6, 2]]
    },

    {
      name: "4-4",
      title: "Cosmic Toll Booth",
      desc: "The aliens are charging you for existing in space.",
      startGlow: 625,
      background: "milkyway",
      music: "battle",
      waves: [
        [
          { type: "alienGun", row: 1, delay: 120 },
          { type: "alienGun", row: 3, delay: 260 }
        ],
        [
          { type: "alien", row: 0, delay: 90 },
          { type: "alien", row: 2, delay: 210 },
          { type: "alien", row: 4, delay: 330 },
          { type: "assasinRover", row: 2, delay: 520 }
        ],
        [
          { type: "alienGod", row: 2, delay: 430 }
        ],
        [
          { type: "droneSaw", row: 0, delay: 100 },
          { type: "droneSaw", row: 4, delay: 210 },
          { type: "alienGun", row: 1, delay: 380 },
          { type: "alienGun", row: 3, delay: 520 }
        ]
      ],
      lava: [[3, 1], [3, 3], [5, 0], [5, 4], [7, 2]]
    },

    {
      name: "4-5",
      title: "Meteor Insurance Scam",
      desc: "Nobody told you the meteor policy expired.",
      startGlow: 700,
      background: "milkyway",
      music: "world1",
      waves: [
        [
          { type: "mechaDerp", row: 1, delay: 180 },
          { type: "mechaDerp", row: 3, delay: 360 }
        ],
        [
          { type: "alienGun", row: 0, delay: 140 },
          { type: "alienGun", row: 4, delay: 280 },
          { type: "droneSaw", row: 2, delay: 460 }
        ],
        [
          { type: "alienGod", row: 0, delay: 260 },
          { type: "alienGod", row: 4, delay: 520 }
        ],
        [
          { type: "assasinRover", row: 1, delay: 130 },
          { type: "assasinRover", row: 3, delay: 260 },
          { type: "alien", row: 2, delay: 430 },
          { type: "mechaDerp", row: 2, delay: 650 }
        ]
      ],
      lava: [[2, 0], [2, 4], [4, 1], [4, 3], [6, 2]]
    },

    {
      name: "4-6",
      title: "Starship Parking Violation",
      desc: "Every ship parked here is angry at you.",
      startGlow: 750,
      background: "milkyway",
      music: "menu",
      waves: [
        [
          { type: "droneSaw", row: 0, delay: 70 },
          { type: "droneSaw", row: 2, delay: 180 },
          { type: "droneSaw", row: 4, delay: 290 }
        ],
        [
          { type: "alienGun", row: 1, delay: 120 },
          { type: "alienGun", row: 3, delay: 240 },
          { type: "alien", row: 2, delay: 390 }
        ],
        [
          { type: "mechaDerp", row: 0, delay: 200 },
          { type: "mechaDerp", row: 2, delay: 420 },
          { type: "mechaDerp", row: 4, delay: 640 }
        ],
        [
          { type: "alienGod", row: 1, delay: 330 },
          { type: "alienGod", row: 3, delay: 620 }
        ]
      ],
      lava: [[1, 2], [3, 0], [3, 4], [5, 1], [5, 3], [7, 2]]
    },
        {
      name: "4-7",
      title: "The Stars Are Staring",
      desc: "The background is not just a background anymore.",
      startGlow: 825,
      background: "milkyway",
      music: "desert",
      waves: [
        [
          { type: "alien", row: 0, delay: 80 },
          { type: "alienGun", row: 2, delay: 220 },
          { type: "alien", row: 4, delay: 360 }
        ],
        [
          { type: "alienGod", row: 2, delay: 360 },
          { type: "droneSaw", row: 0, delay: 650 },
          { type: "droneSaw", row: 4, delay: 760 }
        ],
        [
          { type: "alienGun", row: 0, delay: 120 },
          { type: "alienGun", row: 1, delay: 240 },
          { type: "alienGun", row: 3, delay: 400 },
          { type: "alienGun", row: 4, delay: 520 }
        ],
        [
          { type: "mechaDerp", row: 1, delay: 220 },
          { type: "mechaDerp", row: 3, delay: 440 },
          { type: "alienGod", row: 2, delay: 780 }
        ]
      ],
      lava: [[2, 1], [2, 3], [4, 2], [6, 1], [6, 3], [8, 2]]
    },

    {
      name: "4-8",
      title: "Alien God Reunion",
      desc: "There are several of them. This was not in the plan.",
      startGlow: 950,
      background: "milkyway",
      music: "battle",
      waves: [
        [
          { type: "alienGod", row: 0, delay: 220 },
          { type: "alienGod", row: 4, delay: 440 }
        ],
        [
          { type: "droneSaw", row: 1, delay: 90 },
          { type: "droneSaw", row: 2, delay: 180 },
          { type: "droneSaw", row: 3, delay: 270 },
          { type: "alienGun", row: 2, delay: 520 }
        ],
        [
          { type: "alienGod", row: 1, delay: 260 },
          { type: "alienGod", row: 3, delay: 520 },
          { type: "assasinRover", row: 0, delay: 760 },
          { type: "assasinRover", row: 4, delay: 860 }
        ],
        [
          { type: "mechaDerp", row: 0, delay: 170 },
          { type: "mechaDerp", row: 4, delay: 340 },
          { type: "alienGun", row: 1, delay: 520 },
          { type: "alienGun", row: 3, delay: 700 },
          { type: "alienGod", row: 2, delay: 980 }
        ]
      ],
      lava: [[3, 0], [3, 1], [3, 3], [3, 4], [6, 0], [6, 4]]
    },

    {
      name: "4-9",
      title: "Before The Real Problem",
      desc: "The universe is spamming warnings and none of them are helpful.",
      startGlow: 1200,
      background: "milkyway",
      music: "world1",
      waves: [
        [
          { type: "alien", row: 0, delay: 70 },
          { type: "alien", row: 1, delay: 140 },
          { type: "alien", row: 2, delay: 210 },
          { type: "alien", row: 3, delay: 280 },
          { type: "alien", row: 4, delay: 350 }
        ],
        [
          { type: "droneSaw", row: 0, delay: 80 },
          { type: "droneSaw", row: 4, delay: 160 },
          { type: "assasinRover", row: 1, delay: 300 },
          { type: "assasinRover", row: 3, delay: 430 },
          { type: "alienGun", row: 2, delay: 620 }
        ],
        [
          { type: "alienGod", row: 0, delay: 260 },
          { type: "alienGod", row: 2, delay: 520 },
          { type: "alienGod", row: 4, delay: 780 }
        ],
        [
          { type: "mechaDerp", row: 1, delay: 150 },
          { type: "mechaDerp", row: 3, delay: 320 },
          { type: "alienGun", row: 0, delay: 500 },
          { type: "alienGun", row: 4, delay: 680 },
          { type: "droneSaw", row: 2, delay: 860 }
        ],
        [
          { type: "alienFinalBoss", row: 2, delay: 600 },
          { type: "alienGod", row: 0, delay: 980 },
          { type: "alienGod", row: 4, delay: 1180 },
          { type: "assasinRover", row: 1, delay: 1420 },
          { type: "assasinRover", row: 3, delay: 1540 }
        ]
      ],
      lava: [[2, 0], [2, 4], [4, 1], [4, 3], [5, 2], [7, 0], [7, 4]]
    },

    {
      name: "4-10",
      title: "The Great Derpocolypse",
      desc: "Look how far you've came. I belive in you.",
      startGlow: 200,
      background: "milkyway",
      music: "finalBoss",
      waves: [
        [
          { type: "droneSaw", row: 2, delay: 50 },
          { type: "fast", row: 2, delay: 140 },
          { type: "alienGod", row: 2, delay: 360 },
          { type: "alien", row: 0, delay: 480 },
          { type: "alienGod", row: 1, delay: 600 },
          { type: "alienFinalBoss", row: 4, delay: 720 }
        ],
        [
          { type: "assasinRover", row: 1, delay: 120 },
          { type: "alienGod", row: 0, delay: 240 },
          { type: "alienGun", row: 2, delay: 360 },
          { type: "mechaDerp", row: 3, delay: 480 },
          { type: "alienFinalBoss", row: 2, delay: 600 },
          { type: "assasinRover", row: 4, delay: 720 }
        ],
        [
          { type: "alienFinalBoss", row: 0, delay: 120 },
          { type: "alienFinalBoss", row: 1, delay: 240 },
          { type: "alienFinalBoss", row: 2, delay: 360 },
          { type: "alienFinalBoss", row: 3, delay: 480 },
          { type: "alienFinalBoss", row: 4, delay: 600 },
          { type: "mechaDerp", row: 2, delay: 720 }
        ],
        [
          { type: "basic", row: 2, delay: 120 },
          { type: "armored", row: 2, delay: 240 },
          { type: "fast", row: 2, delay: 360 },
          { type: "assasinRover", row: 2, delay: 480 },
          { type: "mechaDerp", row: 2, delay: 600 },
          { type: "alien", row: 2, delay: 720 },
          { type: "alienGun", row: 2, delay: 840 },
          { type: "droneSaw", row: 2, delay: 960 },
          { type: "alienGod", row: 2, delay: 1080 },
          { type: "alienFinalBoss", row: 2, delay: 1200 }
        ],
        [
          { type: "alienGun", row: 3, delay: 120 },
          { type: "alienFinalBoss", row: 2, delay: 240 },
          { type: "assasinRover", row: 1, delay: 360 },
          { type: "assasinRover", row: 4, delay: 480 },
          { type: "droneSaw", row: 0, delay: 600 },
          { type: "droneSaw", row: 0, delay: 601 }
        ],
        [
          { type: "alienFinalBoss", row: 4, delay: 120 },
          { type: "alienFinalBoss", row: 3, delay: 240 },
          { type: "alienFinalBoss", row: 1, delay: 360 },
          { type: "alienFinalBoss", row: 4, delay: 480 }
        ],
        [
          { type: "assasinRover", row: 2, delay: 120 }
        ]
      ],
      lava: [
        [7, 1], [6, 0], [6, 2], [7, 3], [6, 4],
        [5, 1], [5, 3], [5, 4], [5, 2], [6, 3],
        [6, 1], [5, 0], [7, 0], [7, 2], [7, 4],
        [8, 0], [8, 1], [8, 2], [8, 3], [8, 4],
        [3, 0], [3, 2], [3, 4], [4, 3], [4, 1]
      ]
    }
  ],

  minigames: [
    {
      name: "Chessboard Easy",
      title: "Chess 1: Pawn Problems",
      desc: "Small chessboard derp test.",
      startGlow: 300,
      background: "chess",
      music: "battle",
      waves: [
        [
          { type: "basic", row: 1, delay: 120 },
          { type: "basic", row: 3, delay: 260 }
        ],
        [
          { type: "armored", row: 2, delay: 260 }
        ]
      ],
      lava: [[1, 0], [3, 1], [5, 3], [7, 4]]
    },

    {
      name: "Chessboard Normal",
      title: "Chess 2: Rook Ruckus",
      desc: "More rows, more nonsense.",
      startGlow: 450,
      background: "chess",
      music: "battle",
      waves: [
        [
          { type: "basic", row: 0, delay: 90 },
          { type: "basic", row: 2, delay: 180 },
          { type: "basic", row: 4, delay: 270 }
        ],
        [
          { type: "fast", row: 1, delay: 140 },
          { type: "fast", row: 3, delay: 300 },
          { type: "armored", row: 2, delay: 480 }
        ]
      ],
      lava: [[2, 0], [2, 2], [2, 4], [6, 1], [6, 3]]
    },
        {
      name: "Chessboard Hard",
      title: "Chess 3: Illegal Bishop Energy",
      desc: "Several pieces are illegal now.",
      startGlow: 475,
      background: "chess",
      music: "desert",
      waves: [
        [
          { type: "alien", row: 0, delay: 90 },
          { type: "alien", row: 2, delay: 190 },
          { type: "alien", row: 4, delay: 290 }
        ],
        [
          { type: "alienGun", row: 1, delay: 160 },
          { type: "alienGun", row: 3, delay: 320 },
          { type: "droneSaw", row: 2, delay: 520 }
        ],
        [
          { type: "alienGod", row: 2, delay: 620 },
          { type: "assasinRover", row: 0, delay: 860 },
          { type: "assasinRover", row: 4, delay: 940 }
        ]
      ],
      lava: [[1, 0], [3, 0], [5, 0], [7, 0], [0, 2], [2, 2], [4, 2], [6, 2], [8, 2], [1, 4], [3, 4], [5, 4], [7, 4]]
    },

    {
      name: "Chessboard Deadly",
      title: "Chess 4: Checkmate Or Something",
      desc: "The board is no longer asking politely.",
      startGlow: 850,
      background: "chess",
      music: "finalBoss",
      waves: [
        [
          { type: "alienGun", row: 0, delay: 100 },
          { type: "alienGun", row: 4, delay: 220 },
          { type: "droneSaw", row: 2, delay: 340 }
        ],
        [
          { type: "alienGod", row: 1, delay: 360 },
          { type: "alienGod", row: 3, delay: 620 }
        ],
        [
          { type: "alienFinalBoss", row: 2, delay: 620 },
          { type: "alienGod", row: 0, delay: 980 },
          { type: "alienGod", row: 4, delay: 1180 }
        ]
      ],
      lava: [
        [0, 0], [2, 0], [4, 0], [6, 0], [8, 0],
        [1, 1], [3, 1], [5, 1], [7, 1],
        [0, 2], [2, 2], [6, 2], [8, 2],
        [1, 3], [3, 3], [5, 3], [7, 3],
        [0, 4], [2, 4], [4, 4], [6, 4], [8, 4]
      ]
    },

    {
      name: "The Scrapped Folder",
      title: "Unused Background Energy",
      desc: "A cursed folder full of things that probably should not be loaded.",
      startGlow: 600,
      background: "glitchArchive",
      music: "menu",
      waves: [
        [
          { type: "basic", row: 0, delay: 60 },
          { type: "fast", row: 1, delay: 130 },
          { type: "armored", row: 2, delay: 220 },
          { type: "alien", row: 3, delay: 310 },
          { type: "droneSaw", row: 4, delay: 400 }
        ],
        [
          { type: "alienGun", row: 0, delay: 200 },
          { type: "mechaDerp", row: 2, delay: 420 },
          { type: "alienGun", row: 4, delay: 640 }
        ]
      ],
      lava: [[4, 0], [4, 1], [4, 3], [4, 4]]
    },

    {
      name: "Matrix Test Chamber",
      title: "Pick Your Bullcrap Simulator",
      desc: "A Matrix grid test chamber for dumb ideas.",
      startGlow: 777,
      background: "matrixGrid",
      music: "finalBoss",
      waves: [
        [
          { type: "alien", row: 0, delay: 80 },
          { type: "alien", row: 1, delay: 160 },
          { type: "alien", row: 2, delay: 240 },
          { type: "alien", row: 3, delay: 320 },
          { type: "alien", row: 4, delay: 400 }
        ],
        [
          { type: "alienFinalBoss", row: 2, delay: 700 }
        ]
      ],
      lava: []
    }
  ]

};

// ============================================================
// 1B. DERPGARDENSTUDIO2 EXPANSION PACK
// ============================================================
// This section is intentionally additive so it is easier to keep/reuse.
// You can delete this whole function later if you want the old v2.5 config.

(function installDerpGardenStudio2Expansion() {
  CONFIG.gameTitle = "Plants Against Derps: derpgardenstudio2";
  CONFIG.saveKey = "plantsAgainstDerps_v26_dgs2_save";
  CONFIG.gameplay.maxPlantStack = 6;

  Object.assign(CONFIG.plants, {
    scatterSprout: {
      name: "Scatter Sprout",
      cost: 115,
      hp: 80,
      img: "treeGun",
      desc: "Shoots a messy shotgun spread into nearby lanes.",
      role: "Spread Shooter",
      unlockAt: "2-5",
      shooter: true,
      fireType: "scatter",
      shootCooldown: 135,
      projectileDamage: 14,
      projectileSpeed: 5.7,
      placementCooldown: 260
    },

    derpAlienGun: {
      name: "Derp Alien Gun",
      cost: 210,
      hp: 95,
      img: "assets/aliengun.png",
      desc: "A stolen alien gun that shoots every lane if anything exists there.",
      role: "All-Lane Shooter",
      unlockAt: "3-7",
      shooter: true,
      fireType: "allLane",
      shootCooldown: 190,
      projectileDamage: 20,
      projectileSpeed: 6.6,
      bonusVsTags: ["alien", "drone"],
      bonusMultiplier: 1.45,
      placementCooldown: 420
    },

    twigShotgun: {
      name: "Twig Shotgun",
      cost: 140,
      hp: 75,
      img: "assets/plant-tree-gun.png",
      desc: "Tree Gun's angrier cousin. Fires a 5-lane burst.",
      role: "Shotgun Shooter",
      unlockCost: 12,
      shooter: true,
      fireType: "wideShot",
      shootCooldown: 230,
      projectileDamage: 18,
      projectileSpeed: 6.2,
      placementCooldown: 360
    }
  });

  Object.assign(CONFIG.enemies, {
    wetDerp: {
      name: "Wet Derp",
      hp: 140,
      speed: 0.22,
      damage: 13,
      img: "basicDerp",
      size: 1.08,
      desc: "Somehow soggy and still walking."
    },

    alienShotgunner: {
      name: "Alien Shotgunner",
      hp: 220,
      speed: 0.11,
      damage: 13,
      img: "alienGun",
      size: 1.1,
      tags: ["alien"],
      rangedShooter: true,
      multiShot: true,
      shootCooldown: 145,
      shotDamage: 14,
      shotSpeed: 4.5,
      desc: "Shoots multiple rows like it is cheating."
    },

    cardboardTank: {
      name: "Cardboard Tank",
      hp: 780,
      speed: 0.09,
      damage: 34,
      img: "cardboardWall",
      size: 1.55,
      boss: true,
      desc: "A box with unreasonable confidence."
    }
  });

  CONFIG.levels.push(
    {
      name: "3-6",
      title: "Drone Rude Awakening",
      desc: "Anti-air actually matters here. Cloud Popper gets to feel useful.",
      startGlow: 425,
      background: "cloud",
      music: "battle",
      waves: [
        [
          { type: "droneGun", row: 0, delay: 120 },
          { type: "droneSaw", row: 4, delay: 240 },
          { type: "fast", row: 2, delay: 360 }
        ],
        [
          { type: "droneGun", row: 1, delay: 120 },
          { type: "droneGun", row: 3, delay: 260 },
          { type: "droneSaw", row: 2, delay: 420 }
        ],
        [
          { type: "mechaDerp", row: 2, delay: 400 },
          { type: "droneSaw", row: 0, delay: 540 },
          { type: "droneSaw", row: 4, delay: 700 }
        ]
      ],
      lava: [[4, 1], [4, 3]]
    },
    {
      name: "3-7",
      title: "Alien Gun Safety Violation",
      desc: "The aliens discovered ranged attacks and instantly became annoying.",
      startGlow: 500,
      background: "milkyway",
      music: "desert",
      waves: [
        [
          { type: "alienGun", row: 1, delay: 100 },
          { type: "alien", row: 3, delay: 260 },
          { type: "alienGun", row: 4, delay: 440 }
        ],
        [
          { type: "alienShotgunner", row: 2, delay: 180 },
          { type: "alien", row: 0, delay: 340 },
          { type: "alien", row: 4, delay: 460 }
        ],
        [
          { type: "alienGod", row: 2, delay: 520 },
          { type: "alienGun", row: 1, delay: 680 },
          { type: "alienGun", row: 3, delay: 780 }
        ]
      ],
      lava: []
    },
    {
      name: "3-8",
      title: "Stacking Tutorial But Violent",
      desc: "Place the same plant on itself to stack it. Recharge gets cut in half each stack.",
      startGlow: 650,
      background: "forest",
      music: "world1",
      waves: [
        [
          { type: "wetDerp", row: 0, delay: 80 },
          { type: "wetDerp", row: 2, delay: 180 },
          { type: "wetDerp", row: 4, delay: 280 }
        ],
        [
          { type: "armored", row: 1, delay: 150 },
          { type: "armored", row: 3, delay: 280 },
          { type: "fast", row: 2, delay: 380 }
        ],
        [
          { type: "cardboardTank", row: 2, delay: 520 }
        ]
      ],
      lava: [[5, 0], [5, 4]]
    },
    {
      name: "3-9",
      title: "Multi-Lane Meltdown",
      desc: "Starfruit knockoffs and alien guns become socially unacceptable.",
      startGlow: 725,
      background: "matrixGrid",
      music: "finalBoss",
      waves: [
        [
          { type: "fast", row: 0, delay: 80 },
          { type: "fast", row: 1, delay: 120 },
          { type: "fast", row: 2, delay: 160 },
          { type: "fast", row: 3, delay: 200 },
          { type: "fast", row: 4, delay: 240 }
        ],
        [
          { type: "alienShotgunner", row: 1, delay: 260 },
          { type: "alienShotgunner", row: 3, delay: 430 },
          { type: "droneGun", row: 2, delay: 620 }
        ],
        [
          { type: "alienGod", row: 0, delay: 620 },
          { type: "alienGod", row: 4, delay: 740 },
          { type: "cardboardTank", row: 2, delay: 920 }
        ]
      ],
      lava: [[2, 1], [2, 3], [6, 0], [6, 2], [6, 4]]
    },
    {
      name: "3-10",
      title: "The Reupload Boss",
      desc: "derpgardenstudio2 had to rebuild the garden, so the derps made it personal.",
      startGlow: 900,
      background: "milkyway",
      music: "finalBoss",
      waves: [
        [
          { type: "alienGun", row: 0, delay: 120 },
          { type: "alienGun", row: 4, delay: 260 },
          { type: "droneSaw", row: 2, delay: 420 }
        ],
        [
          { type: "alienShotgunner", row: 1, delay: 220 },
          { type: "alienShotgunner", row: 3, delay: 420 },
          { type: "alienGod", row: 2, delay: 760 }
        ],
        [
          { type: "alienFinalBoss", row: 2, delay: 620 },
          { type: "cardboardTank", row: 0, delay: 920 },
          { type: "cardboardTank", row: 4, delay: 1120 }
        ]
      ],
      lava: [[1, 2], [3, 2], [5, 2], [7, 2]]
    }
  );

  CONFIG.minigames.push(
    {
      name: "Shotgun Field",
      title: "Tree Gun Had Enough Preview",
      desc: "A mini preview of shotgun chaos. Bring Twig Shotgun or suffer with confidence.",
      startGlow: 999,
      background: "forest",
      music: "battle",
      waves: [
        [
          { type: "basic", row: 0, delay: 50 },
          { type: "basic", row: 1, delay: 70 },
          { type: "basic", row: 2, delay: 90 },
          { type: "basic", row: 3, delay: 110 },
          { type: "basic", row: 4, delay: 130 }
        ],
        [
          { type: "fast", row: 0, delay: 160 },
          { type: "fast", row: 1, delay: 190 },
          { type: "fast", row: 2, delay: 220 },
          { type: "fast", row: 3, delay: 250 },
          { type: "fast", row: 4, delay: 280 }
        ]
      ],
      lava: []
    },
    {
      name: "Alien Gunner Range",
      title: "They Shoot Back Now",
      desc: "Alien gunners and drone gunners test your walls from rude distances.",
      startGlow: 850,
      background: "milkyway",
      music: "desert",
      waves: [
        [
          { type: "alienGun", row: 0, delay: 90 },
          { type: "alienGun", row: 2, delay: 230 },
          { type: "alienGun", row: 4, delay: 370 }
        ],
        [
          { type: "alienShotgunner", row: 1, delay: 250 },
          { type: "alienShotgunner", row: 3, delay: 480 },
          { type: "droneGun", row: 2, delay: 660 }
        ]
      ],
      lava: [[4, 0], [4, 2], [4, 4]]
    },
    {
      name: "One Lane Is Not Enough",
      title: "All-Lane Panic",
      desc: "Every lane starts yelling at once. Multi-lane plants recommended.",
      startGlow: 1200,
      background: "matrixGrid",
      music: "finalBoss",
      waves: [
        [
          { type: "wetDerp", row: 0, delay: 60 },
          { type: "wetDerp", row: 1, delay: 60 },
          { type: "wetDerp", row: 2, delay: 60 },
          { type: "wetDerp", row: 3, delay: 60 },
          { type: "wetDerp", row: 4, delay: 60 }
        ],
        [
          { type: "cardboardTank", row: 2, delay: 480 },
          { type: "alienGod", row: 0, delay: 700 },
          { type: "alienGod", row: 4, delay: 820 }
        ]
      ],
      lava: [[0, 1], [0, 3], [8, 1], [8, 3]]
    },
    {
      name: "Stack Or Get Smacked",
      title: "Stacking Stress Test",
      desc: "Lots of Glow, lots of danger. Stack your shooters until the lawn becomes illegal.",
      startGlow: 1500,
      background: "cloud",
      music: "battle",
      waves: [
        [
          { type: "armored", row: 0, delay: 120 },
          { type: "armored", row: 1, delay: 200 },
          { type: "armored", row: 2, delay: 280 },
          { type: "armored", row: 3, delay: 360 },
          { type: "armored", row: 4, delay: 440 }
        ],
        [
          { type: "alienFinalBoss", row: 2, delay: 720 }
        ]
      ],
      lava: []
    }
  );
})();

// ============================================================
// 2. GLOBAL STATE + ASSET LOADING
// ============================================================

const ROWS = CONFIG.board.rows;
const COLS = CONFIG.board.cols;
const GRID_X = CONFIG.board.gridX;
const GRID_Y = CONFIG.board.gridY;
const CELL_W = CONFIG.board.cellW;
const CELL_H = CONFIG.board.cellH;

let app = null;
let canvas = null;
let ctx = null;

let currentScreen = "menu";
let currentMusic = null;
let audioUnlocked = false;
let loopId = 0;

let state = null;
let pendingLoadout = null;

let save = {
  twigs: 0,
  sticks: 0,
  badges: {},
  upgrades: {},
  statUpgrades: {},
  unlockedPlants: {},
  cleared: {},
  bestMinigames: {}
};

const directImageCache = {};
const music = {};

function getImageSrc(img) {
  if (!img) return "";
  return CONFIG.images?.[img] || CONFIG.backgrounds?.[img] || img;
}

function getGameImage(img) {
  const src = getImageSrc(img);
  if (!src) return null;

  if (!directImageCache[src]) {
    directImageCache[src] = new Image();
    directImageCache[src].src = src;
  }

  return directImageCache[src];
}

function imageReady(img) {
  return img && img.complete && img.naturalWidth > 0;
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function cellCenter(col, row) {
  return {
    x: GRID_X + col * CELL_W + CELL_W / 2,
    y: GRID_Y + row * CELL_H + CELL_H / 2
  };
}

function posToCell(mx, my) {
  const col = Math.floor((mx - GRID_X) / CELL_W);
  const row = Math.floor((my - GRID_Y) / CELL_H);

  if (col < 0 || row < 0 || col >= COLS || row >= ROWS) {
    return null;
  }

  return { col, row };
}

for (const [key, src] of Object.entries(CONFIG.audio.tracks)) {
  music[key] = new Audio(src);
  music[key].loop = key !== CONFIG.audio.victoryTrack;
  music[key].volume = key === CONFIG.audio.victoryTrack
    ? CONFIG.audio.victoryVolume
    : CONFIG.audio.musicVolume;
}

function loadSave() {
  try {
    const raw = localStorage.getItem(CONFIG.saveKey);
    if (raw) {
      const parsed = JSON.parse(raw);
      save = { ...save, ...parsed };
    }
  } catch (err) {
    console.warn("Save load failed:", err);
  }

  fixSave();
}

function saveGame() {
  fixSave();

  try {
    localStorage.setItem(CONFIG.saveKey, JSON.stringify(save));
  } catch (err) {
    console.warn("Save failed:", err);
  }
}

function fixSave() {
  save.twigs = Number(save.twigs || 0);
  save.sticks = Number(save.sticks || 0);
  save.badges = save.badges || {};
  save.upgrades = save.upgrades || {};
  save.statUpgrades = save.statUpgrades || {};
  save.unlockedPlants = save.unlockedPlants || {};
  save.cleared = save.cleared || {};
  save.bestMinigames = save.bestMinigames || {};

  for (const id of Object.keys(CONFIG.plants)) {
    const plant = CONFIG.plants[id];

    if (!plant.unlockCost && !plant.unlockAt) {
      save.unlockedPlants[id] = true;
    }
  }

  save.unlockedPlants.removeTool = true;
}

function getSticks() {
  return Number(save.sticks || 0);
}

function getPlantLevel(id) {
  return clamp(Number(save.upgrades[id] || 1), 1, CONFIG.upgrades.maxLevel);
}

function getPlantExtraUpgrades(id) {
  if (!save.statUpgrades[id]) {
    save.statUpgrades[id] = {
      cooldown: 0,
      cost: 0,
      health: 0,
      power: 0
    };
  }

  return save.statUpgrades[id];
}

function getPlantExtraTotal(id) {
  const extra = getPlantExtraUpgrades(id);

  return (
    Number(extra.cooldown || 0) +
    Number(extra.cost || 0) +
    Number(extra.health || 0) +
    Number(extra.power || 0)
  );
}

function getPlantLevelText(id) {
  return `Lv ${getPlantLevel(id)} +${getPlantExtraTotal(id)}`;
}

function getUpgradeCost(id) {
  const level = getPlantLevel(id);
  return CONFIG.upgrades.baseCost + (level - 1) * CONFIG.upgrades.costPerLevel;
}

function getStatUpgradeCost(id, stat) {
  const extra = getPlantExtraUpgrades(id);
  const current = Number(extra[stat] || 0);
  return 2 + current * 2;
}

function isPlantUnlocked(id) {
  const plant = CONFIG.plants[id];
  if (!plant) return false;

  if (id === "removeTool") return true;

  if (!plant.unlockCost && !plant.unlockAt) {
    return true;
  }

  return !!save.unlockedPlants[id];
}

function unlockPlant(id) {
  save.unlockedPlants[id] = true;
  saveGame();
}

function getPlantStats(id) {
  const base = CONFIG.plants[id];
  if (!base) return null;

  const level = getPlantLevel(id);
  const bonus = level - 1;
  const extra = getPlantExtraUpgrades(id);

  const cooldownBonus = Number(extra.cooldown || 0);
  const costBonus = Number(extra.cost || 0);
  const healthBonus = Number(extra.health || 0);
  const powerBonus = Number(extra.power || 0);

  const costMultiplier = Math.max(0.55, 1 - costBonus * 0.06);
  const cooldownMultiplier = Math.max(0.45, 1 - cooldownBonus * 0.07);
  const placementMultiplier = Math.max(0.55, 1 - cooldownBonus * 0.05);

  return {
    ...base,

    cost: Math.max(0, Math.round((base.cost || 0) * costMultiplier)),

    hp:
      (base.hp || 1) +
      bonus * CONFIG.upgrades.hpBoostPerLevel +
      healthBonus * 22,

    projectileDamage:
      (base.projectileDamage || 0) +
      bonus * CONFIG.upgrades.damageBoostPerLevel +
      powerBonus * 7,

    damage:
      (base.damage || 0) +
      bonus * CONFIG.upgrades.damageBoostPerLevel +
      powerBonus * 9,

    produceAmount:
      (base.produceAmount || 0) +
      bonus * CONFIG.upgrades.producerBoostPerLevel +
      powerBonus * 6,

    shootCooldown: base.shootCooldown
      ? Math.max(20, Math.round(base.shootCooldown * cooldownMultiplier))
      : base.shootCooldown,

    produceCooldown: base.produceCooldown
      ? Math.max(60, Math.round(base.produceCooldown * cooldownMultiplier))
      : base.produceCooldown,

    placementCooldown: base.placementCooldown
      ? Math.max(0, Math.round(base.placementCooldown * placementMultiplier))
      : base.placementCooldown
  };
}

function unlockAudio() {
  if (audioUnlocked) return;
  audioUnlocked = true;

  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!window.padAudioContext) {
      window.padAudioContext = new AudioContext();
    }
  } catch (err) {}
}

function stopMusic() {
  for (const track of Object.values(music)) {
    track.pause();
    track.currentTime = 0;
  }

  currentMusic = null;
}

function playMusic(name) {
  if (!CONFIG.audio.enabled) return;

  unlockAudio();

  const track = music[name] || music[CONFIG.audio.defaultLevelTrack];
  if (!track) return;

  if (currentMusic === track && !track.paused) return;

  stopMusic();

  currentMusic = track;
  track.currentTime = 0;
  track.play().catch(() => {});
}

function playSfx(type) {
  if (!CONFIG.audio.enabled) return;

  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!window.padAudioContext) {
      window.padAudioContext = new AudioContext();
    }

    const audioCtx = window.padAudioContext;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    const data = {
      plant: [520, 0.06, "triangle"],
      no: [95, 0.12, "sawtooth"],
      shoot: [180, 0.035, "square"],
      hit: [130, 0.055, "sawtooth"],
      glow: [760, 0.06, "triangle"],
      boom: [70, 0.22, "sawtooth"],
      win: [880, 0.12, "triangle"],
      crit: [980, 0.05, "square"],
      laser: [420, 0.04, "sawtooth"]
    }[type] || [300, 0.08, "square"];

    osc.type = data[2];
    osc.frequency.value = data[0];
    gain.gain.value = CONFIG.audio.sfxVolume * (type === "boom" ? 2 : 1);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + data[1]);
    osc.stop(audioCtx.currentTime + data[1]);
  } catch (err) {}
}

// ============================================================
// 3. UI CREATION
// ============================================================

function installBaseHTML() {
  document.body.innerHTML = `<div id="padApp"></div>`;
  app = document.getElementById("padApp");
}
function installStyles() {
  document.getElementById("padV25Style")?.remove();

  const style = document.createElement("style");
  style.id = "padV25Style";
  style.textContent = `
* {
  box-sizing: border-box;
}

html,
body {
  margin: 0;
  min-height: 100%;
  background: #071014;
  color: white;
  font-family: system-ui, Arial, sans-serif;
  overflow-x: hidden;
}

button {
  font-family: inherit;
}

#padApp {
  min-height: 100vh;
  background:
    radial-gradient(circle at 20% 10%, rgba(80, 220, 255, .2), transparent 30%),
    linear-gradient(135deg, #030608, #0c181d 55%, #05080a);
}

.screen {
  min-height: 100vh;
  padding: 24px;
}

.title {
  font-size: 42px;
  font-weight: 900;
  margin: 0 0 8px;
  text-shadow: 0 0 18px #53e7ff;
}

.sub {
  opacity: .8;
  margin: 0 0 18px;
}

.panel {
  background: rgba(0, 0, 0, .45);
  border: 1px solid rgba(133, 234, 255, .35);
  border-radius: 18px;
  padding: 18px;
  box-shadow: 0 0 28px rgba(0, 220, 255, .1);
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(190px, 1fr));
  gap: 14px;
}

.menu {
  display: grid;
  grid-template-columns: minmax(240px, 330px) 1fr;
  gap: 22px;
  align-items: start;
}

.btn {
  border: 1px solid rgba(130, 235, 255, .55);
  background: rgba(9, 35, 44, .85);
  color: white;
  border-radius: 14px;
  padding: 12px 14px;
  cursor: pointer;
  font-weight: 800;
  box-shadow: 0 0 14px rgba(0, 255, 255, .08);
}

.btn:hover {
  background: rgba(18, 70, 83, .95);
  transform: translateY(-1px);
}

.btn.bad {
  border-color: #ff7788;
  background: #351119;
}

.btn.good {
  border-color: #89ff9d;
  background: #12351c;
}

.btn.warn {
  border-color: #ffd36a;
  background: #37290f;
}

.btn:disabled {
  opacity: .45;
  cursor: not-allowed;
  transform: none;
}

.stack {
  display: grid;
  gap: 10px;
}

.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
  gap: 12px;
}

.card {
  background: rgba(255, 255, 255, .06);
  border: 1px solid rgba(255, 255, 255, .16);
  border-radius: 16px;
  padding: 12px;
  min-height: 126px;
}

.card.locked {
  opacity: .65;
  filter: grayscale(.35);
}

.card h3 {
  margin: 0 0 4px;
}

.tiny {
  font-size: 12px;
  opacity: .72;
}

.topbar {
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-bottom: 10px;
}

.gameWrap {
  display: grid;
  justify-content: center;
  gap: 10px;
}

.hud {
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
}

.pill {
  padding: 8px 11px;
  background: rgba(0, 0, 0, .45);
  border: 1px solid rgba(255, 255, 255, .18);
  border-radius: 999px;
}

canvas {
  max-width: 100%;
  background: #123;
  border: 2px solid rgba(160, 240, 255, .35);
  border-radius: 18px;
  box-shadow: 0 0 30px rgba(0, 220, 255, .15);
  touch-action: none;
}

.plantbar {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  justify-content: center;
}

.plantCard {
  width: 112px;
  min-height: 112px;
  border: 1px solid rgba(255, 255, 255, .2);
  background: rgba(0, 0, 0, .5);
  border-radius: 14px;
  color: white;
  padding: 7px;
  cursor: pointer;
}

.plantCard.selected {
  outline: 3px solid #57f3ff;
}

.plantCard.cool {
  opacity: .45;
}

.plantCard .name {
  font-size: 12px;
  font-weight: 900;
}

.plantCard .cost {
  font-size: 12px;
  color: #ffe899;
}

.row {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  align-items: center;
}

.notice {
  position: fixed;
  left: 50%;
  top: 22px;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, .82);
  border: 1px solid #6ff;
  border-radius: 14px;
  padding: 12px 16px;
  z-index: 5;
  box-shadow: 0 0 20px rgba(0, 255, 255, .2);
}

@media (max-width: 760px) {
  .menu {
    grid-template-columns: 1fr;
  }

  .screen {
    padding: 14px;
  }

  .title {
    font-size: 32px;
  }

  .plantCard {
    width: 96px;
  }
}

/* PAD v2.7 homepage/editor polish */
.pad-home-v27 { grid-template-columns: minmax(280px, 420px) 1fr; }
.heroPanel { border-color: rgba(245,255,120,.55); background: linear-gradient(180deg, rgba(4,20,25,.86), rgba(10,35,45,.72)); }
.bigMenuButtons .btn { font-size: 16px; padding: 14px 16px; }
.updatePanel h2 { margin-top: 0; }
.miniCards { grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); }
.worldGroup { margin: 18px 0 28px; }
.worldGroup h2 { border-left: 6px solid #dfff5a; padding-left: 10px; text-shadow: 0 0 10px rgba(223,255,90,.45); }
@media (max-width: 760px) { .pad-home-v27 { grid-template-columns: 1fr; } }

/* derpgardenstudio2 polish */
body::before {
  content: "";
  position: fixed;
  inset: 0;
  pointer-events: none;
  background: repeating-linear-gradient(0deg, rgba(255,255,255,.035), rgba(255,255,255,.035) 1px, transparent 1px, transparent 4px);
  opacity: .16;
  mix-blend-mode: screen;
  z-index: 9999;
}
.card, .panel, .plantCard, .pill, .btn { backdrop-filter: blur(8px); }
.card:hover, .plantCard:hover { transform: translateY(-2px); border-color: rgba(255, 235, 110, .65); }
.plantCard { position: relative; overflow: hidden; }
.plantCard::after {
  content: "";
  position: absolute;
  inset: -40%;
  background: radial-gradient(circle, rgba(255,255,255,.16), transparent 45%);
  transform: translateX(-60%);
  transition: transform .25s ease;
}
.plantCard:hover::after { transform: translateX(20%); }

/* PAD v2.9 UI + PVP homepage */
.pad-home-v29 { min-height:100vh; padding:28px; background:radial-gradient(circle at 50% 12%,rgba(120,235,255,.20),transparent 28%),linear-gradient(145deg,#02070a,#09232c 48%,#081015); }
.pad-v29-header { max-width:1320px; margin:0 auto 18px; display:flex; justify-content:space-between; align-items:flex-end; gap:18px; }
.pad-v29-kicker { letter-spacing:.32em; color:#9cf5ff; font-weight:900; font-size:13px; }
.pad-v29-logo { margin:0; font-size:clamp(74px,11vw,150px); line-height:.78; color:#f7ff78; text-shadow:0 0 18px rgba(247,255,120,.55),5px 6px 0 #122a31; }
.pad-v29-wallet { display:flex; gap:8px; flex-wrap:wrap; justify-content:flex-end; }
.pad-v29-layout { max-width:1320px; margin:auto; display:grid; grid-template-columns:minmax(220px,290px) minmax(340px,1fr) minmax(220px,290px); gap:18px; align-items:start; }
.pad-v29-column { display:grid; gap:11px; background:rgba(0,0,0,.34); border:1px solid rgba(135,236,255,.25); border-radius:22px; padding:16px; }
.pad-v29-column h2 { margin:0 0 5px; color:#dffcff; }
.pad-v29-column .btn { width:100%; min-height:50px; text-align:left; }
.pad-v29-primary { font-size:22px; min-height:66px !important; }
.pad-v29-pvp { border-color:#ff90e7; background:linear-gradient(135deg,#3b143a,#162c4b); font-size:20px; }
.pad-v29-pvp span { float:right; font-size:11px; color:#ffe078; margin-top:5px; }
.pad-v29-center { text-align:center; min-height:510px; display:flex; flex-direction:column; justify-content:center; }
.pad-v29-update-badge { display:inline-block; align-self:center; background:#f7ff78; color:#102126; font-weight:1000; border-radius:999px; padding:8px 14px; letter-spacing:.08em; }
.pad-v29-center h2 { font-size:clamp(25px,3vw,40px); margin-bottom:4px; }
.pad-v29-feature-grid { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:10px; margin:18px 0; }
.pad-v29-feature-grid article { text-align:left; background:rgba(255,255,255,.07); border:1px solid rgba(255,255,255,.13); border-radius:15px; padding:13px; }
.pad-v29-feature-grid b,.pad-v29-feature-grid small { display:block; }
.pad-v29-feature-grid small { opacity:.72; margin-top:5px; }
.pad-v29-big-minigame { width:100%; min-height:68px; font-size:23px; margin-top:10px; }
@media(max-width:940px){.pad-v29-layout{grid-template-columns:1fr}.pad-v29-center{order:-1;min-height:auto}.pad-v29-header{align-items:flex-start}.pad-v29-feature-grid{grid-template-columns:1fr 1fr}}
@media(max-width:560px){.pad-home-v29{padding:14px}.pad-v29-header{display:block}.pad-v29-wallet{justify-content:flex-start;margin-top:12px}.pad-v29-feature-grid{grid-template-columns:1fr}}

`;

  document.head.appendChild(style);
}

function setScreen(html) {
  app.innerHTML = html;
}

function toast(msg) {
  const el = document.createElement("div");
  el.className = "notice";
  el.textContent = msg;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 1800);
}

function currencyHtml() {
  return `
    <span class="pill">Twigs: <b>${save.twigs}</b></span>
    <span class="pill">Sticks: <b>${save.sticks}</b></span>
  `;
}

function imgTag(id, size = 48) {
  const src = getImageSrc(id);

  return `
    <img
      src="${src}"
      onerror="this.style.display='none';this.nextElementSibling.style.display='grid'"
      style="width:${size}px;height:${size}px;object-fit:contain;image-rendering:auto"
    >
    <span
      style="display:none;width:${size}px;height:${size}px;background:#ff4bd8;color:#111;place-items:center;font-weight:900;border-radius:8px"
    >?</span>
  `;
}

function showMenuV29() {
  currentScreen = "menu";
  state = null;
  playMusic(CONFIG.audio.menuTrack);

  setScreen(`
    <div class="screen pad-home-v29">
      <header class="pad-v29-header">
        <div>
          <div class="pad-v29-kicker">PLANTS AGAINST DERPS</div>
          <h1 class="pad-v29-logo">PAD</h1>
          <p class="sub">v2.9 • UI + PVP Connection Test</p>
        </div>
        <div class="pad-v29-wallet">${currencyHtml()}</div>
      </header>

      <main class="pad-v29-layout">
        <section class="pad-v29-column pad-v29-main-actions">
          <h2>Main Game</h2>
          <button class="btn good pad-v29-primary" onclick="showLevelSelect()">▶ Play Story</button>
          <button class="btn pad-v29-pvp" onclick="window.open('pvp/','_self')">⚔ PVP <span>Experimental</span></button>
          <button class="btn" onclick="showUpgrades()">Upgrade Plants</button>
          <button class="btn" onclick="showAlmanac()">Equip / Meet Da Whatever</button>
        </section>

        <section class="pad-v29-center panel">
          <div class="pad-v29-update-badge">UI + PVP UPDATE</div>
          <h2>Welcome to the rebuilt homepage</h2>
          <p>
            Story mode, tools, extras, and the experimental two-player PVP connection test
            now have their own clear sections.
          </p>
          <div class="pad-v29-feature-grid">
            <article><b>Plant vs Derp</b><small>Create or join a short-code room.</small></article>
            <article><b>Realtime Test</b><small>Presence and test actions through Supabase.</small></article>
            <article><b>Local Fallback</b><small>Test with two tabs even without internet rooms.</small></article>
            <article><b>Next Step</b><small>Loadouts, rerolls, Glow, then actual combat.</small></article>
          </div>
          <button class="btn good pad-v29-big-minigame" onclick="showMinigames()">MINIGAMES</button>
        </section>

        <section class="pad-v29-column pad-v29-tools">
          <h2>Tools & Extras</h2>
          <button class="btn" onclick="showCustomLevels()">Level Maker / Custom Levels</button>
          <button class="btn" onclick="window.open('mod/','_self')">PAD Modder / Fangame Forge</button>
          <button class="btn" onclick="showShop()">Twig Shop</button>
          <button class="btn warn" onclick="showSaveBackup()">Saves / Backup</button>
          <button class="btn" onclick="showV29Info()">Changelog + More</button>
        </section>
      </main>
    </div>
  `);
}

function showV29Info() {
  currentScreen = "v29info";
  setScreen(`
    <div class="screen">
      <div class="topbar">
        <button class="btn" onclick="showMenu()">← Menu</button>
        ${currencyHtml()}
      </div>
      <h1 class="title">PAD v2.9 — UI + PVP</h1>
      <div class="panel stack">
        <h2>What works in this test build</h2>
        <p>• New grouped homepage UI</p>
        <p>• Create and join PVP rooms with short codes</p>
        <p>• Realtime presence showing connected players</p>
        <p>• Plant/Derp role preference and simple role assignment</p>
        <p>• Send test plant / derp actions between browsers</p>
        <p>• Local two-tab fallback with BroadcastChannel</p>
        <h2>What comes next</h2>
        <p>Random six-unit loadouts, three rerolls, 1250 Glow, ready confirmation, and the real synchronized battle.</p>
        <button class="btn good" onclick="window.open('pvp/','_self')">Open PVP Test</button>
      </div>
    </div>
  `);
}

function isLevelUnlocked(i) {
  return i === 0 || !!save.cleared[CONFIG.levels[i - 1]?.name];
}

function showLevelSelect() {
  currentScreen = "levels";
  playMusic(CONFIG.audio.menuTrack);

  const cards = CONFIG.levels.map((lv, i) => {
    const unlocked = isLevelUnlocked(i);
    const clear = save.cleared[lv.name] ? "✅ Cleared" : "";

    return `
      <div class="card ${unlocked ? "" : "locked"}">
        <h3>${lv.name} ${lv.title || ""}</h3>
        <p class="tiny">${lv.desc || ""}</p>
        <p class="tiny">${clear}</p>
        <button
          class="btn good"
          ${unlocked ? "" : "disabled"}
          onclick="showLoadoutPicker(${i},'levels')"
        >
          ${unlocked ? "Pick Your Bullcrap" : "Locked"}
        </button>
      </div>
    `;
  }).join("");

  setScreen(`
    <div class="screen">
      <div class="topbar">
        <button class="btn" onclick="showMenu()">← Menu</button>
        ${currencyHtml()}
      </div>

      <h1 class="title">Level Selectr</h1>
      <div class="cards">${cards}</div>
    </div>
  `);
}

function showMinigames() {
  currentScreen = "minigames";

  const cards = MINIGAMES.map((lv, i) => `
    <div class="card">
      <h3>${lv.name} ${lv.title}</h3>
      <p class="tiny">${lv.desc}</p>
      <p class="tiny">Best: ${save.bestMinigames[lv.name] ? "✅ Won" : "—"}</p>
      <button class="btn good" onclick="showLoadoutPicker(${i},'minigames')">
        Pick Your Bullcrap
      </button>
    </div>
  `).join("");

  setScreen(`
    <div class="screen">
      <div class="topbar">
        <button class="btn" onclick="showMenu()">← Menu</button>
        ${currencyHtml()}
      </div>

      <h1 class="title">Minigames</h1>
      <div class="cards">${cards}</div>
    </div>
  `);
}

function getLevelList(name) {
  if (name === "minigames") return MINIGAMES;
  if (name === "custom") return getCustomLevels();
  return CONFIG.levels;
}
function showLoadoutPicker(index, listName) {
  currentScreen = "loadout";

  const level = getLevelList(listName)[index];

  let selected = (
    JSON.parse(localStorage.getItem("pad_v25_last_loadout") || "null") ||
    CONFIG.defaultLoadout
  )
    .filter(isPlantUnlocked)
    .filter(id => id !== "removeTool")
    .slice(0, CONFIG.gameplay.maxLoadoutPlants);

  if (selected.length === 0) {
    selected = ["campfr", "treeGun"].filter(isPlantUnlocked);
  }

  pendingLoadout = {
    index,
    listName,
    selected
  };

  renderLoadoutPicker();
}

function renderLoadoutPicker() {
  const { index, listName, selected } = pendingLoadout;
  const level = getLevelList(listName)[index];

  const plantCards = Object.keys(CONFIG.plants)
    .filter(id => id !== "removeTool")
    .map(id => {
      const p = CONFIG.plants[id];
      const unlocked = isPlantUnlocked(id);
      const on = selected.includes(id);

      return `
        <div class="card ${unlocked ? "" : "locked"}">
          <div class="row">
            ${imgTag(p.img, 46)}
            <div>
              <h3>${p.name}</h3>
              <div class="tiny">${p.role} • ${getPlantLevelText(id)}</div>
            </div>
          </div>

          <p class="tiny">${p.desc}</p>

          <button
            class="btn ${on ? "bad" : "good"}"
            ${unlocked ? "" : "disabled"}
            onclick="toggleLoadout('${id}')"
          >
            ${unlocked ? (on ? "Remove" : "Add") : "Locked"}
          </button>
        </div>
      `;
    })
    .join("");

  const backAction =
    listName === "levels"
      ? "showLevelSelect()"
      : listName === "minigames"
        ? "showMinigames()"
        : "showCustomLevels()";

  setScreen(`
    <div class="screen">
      <div class="topbar">
        <button class="btn" onclick="${backAction}">← Back</button>
        ${currencyHtml()}
      </div>

      <h1 class="title">Pick Your Bullcrap</h1>
      <p class="sub">
        ${level.name}: ${level.title || ""} —
        choose up to ${CONFIG.gameplay.maxLoadoutPlants} plants.
        Remove Tool is always included.
      </p>

      <div class="panel">
        <b>Selected:</b>
        ${selected.map(id => CONFIG.plants[id]?.name || id).join(", ") || "None"}
        <br><br>

        <button
          class="btn good"
          ${selected.length ? "" : "disabled"}
          onclick="startPickedLevel()"
        >
          Start Level
        </button>
      </div>

      <br>
      <div class="cards">${plantCards}</div>
    </div>
  `);
}

function toggleLoadout(id) {
  const selected = pendingLoadout.selected;

  if (selected.includes(id)) {
    pendingLoadout.selected = selected.filter(x => x !== id);
  } else {
    if (selected.length >= CONFIG.gameplay.maxLoadoutPlants) {
      toast("Only 5 plants. The bullcrap limit has spoken.");
      return;
    }

    selected.push(id);
  }

  renderLoadoutPicker();
}

function startPickedLevel() {
  localStorage.setItem(
    "pad_v25_last_loadout",
    JSON.stringify(pendingLoadout.selected)
  );

  startLevel(
    pendingLoadout.index,
    pendingLoadout.listName,
    pendingLoadout.selected
  );
}

function showShop() {
  currentScreen = "shop";

  const badges = Object.entries(CONFIG.shopBadges).map(([id, b]) => `
    <div class="card">
      <h3>${b.name}</h3>
      <p class="tiny">${b.desc}</p>
      <button
        class="btn"
        ${save.badges[id] ? "disabled" : ""}
        onclick="buyBadge('${id}')"
      >
        ${save.badges[id] ? "Owned" : `Buy ${b.cost} Twigs`}
      </button>
    </div>
  `).join("");

  setScreen(`
    <div class="screen">
      <div class="topbar">
        <button class="btn" onclick="showMenu()">← Menu</button>
        ${currencyHtml()}
      </div>

      <h1 class="title">Twig Shop</h1>

      <div class="panel row">
        <button class="btn good" onclick="tradeSticks()">
          Trade 5 Twigs → 3 Sticks
        </button>
      </div>

      <br>
      <div class="cards">${badges}</div>
    </div>
  `);
}

function tradeSticks() {
  if (save.twigs < 5) {
    toast("Not enough Twigs.");
    return;
  }

  save.twigs -= 5;
  save.sticks += 3;
  saveGame();
  showShop();
}

function buyBadge(id) {
  const badge = CONFIG.shopBadges[id];

  if (!badge || save.badges[id] || save.twigs < badge.cost) return;

  save.twigs -= badge.cost;
  save.badges[id] = true;
  saveGame();
  showShop();
}




// ============================================================
// SAVE BACKUP TERMINAL
// Encoded save codes for backups/imports.
// ============================================================

function encodeBase64Url(str) {
  const bytes = new TextEncoder().encode(str);
  let bin = "";

  for (const b of bytes) {
    bin += String.fromCharCode(b);
  }

  return btoa(bin)
    .replaceAll("+", "-")
    .replaceAll("/", "_")
    .replaceAll("=", "");
}

function decodeBase64Url(str) {
  let fixed = str
    .replaceAll("-", "+")
    .replaceAll("_", "/");

  while (fixed.length % 4) {
    fixed += "=";
  }

  const bin = atob(fixed);
  const bytes = new Uint8Array(bin.length);

  for (let i = 0; i < bin.length; i++) {
    bytes[i] = bin.charCodeAt(i);
  }

  return new TextDecoder().decode(bytes);
}

function toPad36(num, size = 5) {
  return Math.max(0, Number(num || 0))
    .toString(36)
    .toUpperCase()
    .padStart(size, "0");
}

function padChecksum(text) {
  let hash = 2166136261;

  for (let i = 0; i < text.length; i++) {
    hash ^= text.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }

  return (hash >>> 0)
    .toString(36)
    .toUpperCase()
    .slice(-4)
    .padStart(4, "0");
}

function makeSaveCode() {
  fixSave();

  const compactSave = {
    twigs: save.twigs,
    sticks: save.sticks,
    badges: save.badges || {},
    upgrades: save.upgrades || {},
    statUpgrades: save.statUpgrades || {},
    unlockedPlants: save.unlockedPlants || {},
    cleared: save.cleared || {},
    bestMinigames: save.bestMinigames || {}
  };

  const payload = {
    format: "PAD25",
    made: Date.now(),
    save: compactSave
  };

  const clearedCount = Object.values(save.cleared || {}).filter(Boolean).length;
  const data = encodeBase64Url(JSON.stringify(payload));

  const body = [
    "DERP",
    "PAD25",
    `L${toPad36(clearedCount)}`,
    `T${toPad36(save.twigs)}`,
    `S${toPad36(save.sticks)}`,
    `D${data}`
  ].join("-");

  return `${body}-C${padChecksum(body)}`;
}

function readSaveCode(code) {
  const clean = String(code || "").trim().replace(/\s+/g, "");

  const match = clean.match(
    /^DERP-PAD25-L([A-Z0-9]+)-T([A-Z0-9]+)-S([A-Z0-9]+)-D([A-Za-z0-9_-]+)-C([A-Z0-9]+)$/i
  );

  if (!match) {
    throw new Error("That does not look like a PAD25 save code.");
  }

  const body = clean.replace(/-C[A-Z0-9]+$/i, "");
  const givenChecksum = match[5].toUpperCase();
  const realChecksum = padChecksum(body);

  if (givenChecksum !== realChecksum) {
    throw new Error("Checksum failed. The code may be mistyped or broken.");
  }

  const payload = JSON.parse(decodeBase64Url(match[4]));

  if (!payload || payload.format !== "PAD25" || !payload.save) {
    throw new Error("This save code is not a valid PAD25 save.");
  }

  return payload.save;
}

async function copySaveCode() {
  const code = makeSaveCode();

  try {
    await navigator.clipboard.writeText(code);
    toast("Save code copied!");
  } catch (err) {
    prompt("Copy your PAD save code:", code);
  }
}

function importSaveCode() {
  const code = prompt("Paste your PAD save code:");

  if (!code) return;

  try {
    const imported = readSaveCode(code);

    save = {
      twigs: Number(imported.twigs || 0),
      sticks: Number(imported.sticks || 0),
      badges: imported.badges || {},
      upgrades: imported.upgrades || {},
      statUpgrades: imported.statUpgrades || {},
      unlockedPlants: imported.unlockedPlants || {},
      cleared: imported.cleared || {},
      bestMinigames: imported.bestMinigames || {}
    };

    fixSave();
    saveGame();

    toast("Save imported!");
    showSaveBackup();
  } catch (err) {
    toast(err.message || "Import failed.");
  }
}

function downloadSaveTxt() {
  const code = makeSaveCode();

  const text =
`Plants Against Derps Save Backup

Copy this code somewhere safe:

${code}

If an update breaks your save, open PAD → Save Backup → Import Save Code.
`;

  const blob = new Blob([text], { type: "text/plain" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "PAD_Save_Backup.txt";
  document.body.appendChild(a);
  a.click();
  a.remove();

  URL.revokeObjectURL(url);
  toast("Save .txt downloaded!");
}

function resetSaveDanger() {
  const ok = confirm(
    "This will reset your PAD save on this browser. Export a save code first if you care about it. Reset?"
  );

  if (!ok) return;

  localStorage.removeItem(CONFIG.saveKey);

  save = {
    twigs: 0,
    sticks: 0,
    badges: {},
    upgrades: {},
    statUpgrades: {},
    unlockedPlants: {},
    cleared: {},
    bestMinigames: {}
  };

  fixSave();
  saveGame();

  toast("Save reset.");
  showMenu();
}

function showSaveBackup() {
  const code = makeSaveCode();

  setScreen(`
    <div class="screen">
      <div class="topbar">
        <button class="btn" onclick="showMenu()">← Menu</button>
        ${currencyHtml()}
      </div>

      <h1 class="title">Save Backup Terminal</h1>

      <div class="panel">
        <p class="sub">
          This creates an encoded PAD save code. It is not a real account system,
          but it protects your progress from updates, browser clearing, or cursed code moments.
        </p>

        <div class="stack">
          <button class="btn good" onclick="copySaveCode()">Copy Save Code</button>
          <button class="btn" onclick="importSaveCode()">Import Save Code</button>
          <button class="btn" onclick="downloadSaveTxt()">Download Save .txt</button>
          <button class="btn bad" onclick="resetSaveDanger()">Reset Save</button>
        </div>
      </div>

      <br>

      <div class="panel">
        <h2>Current Save Code</h2>

        <textarea
          readonly
          style="width:100%;height:150px;border-radius:12px;background:#081116;color:white;padding:10px"
        >${code}</textarea>

        <p class="tiny">
          Code preview sections:
          L = story levels cleared,
          T = Twigs,
          S = Sticks,
          D = encoded save data,
          C = typo/broken-code checker.
        </p>
      </div>
    </div>
  `);
}






function showUpgrades() {
  currentScreen = "upgrades";

  const cards = Object.entries(CONFIG.plants)
    .filter(([id]) => id !== "removeTool")
    .map(([id, p]) => {
      const unlocked = isPlantUnlocked(id);
      const level = getPlantLevel(id);
      const extra = getPlantExtraUpgrades(id);

      let unlockTxt = "";

      if (!unlocked) {
        if (p.unlockCost) {
          unlockTxt = `
            <button class="btn good" onclick="buyPlantUnlock('${id}')">
              Unlock for ${p.unlockCost} Sticks
            </button>
          `;
        } else {
          unlockTxt = `
            <button class="btn" disabled>
              Unlocks after ${p.unlockAt}
            </button>
          `;
        }
      }

      return `
        <div class="card ${unlocked ? "" : "locked"}">
          <div class="row">
            ${imgTag(p.img, 48)}
            <div>
              <h3>${p.name}</h3>
              <div class="tiny">${p.role} • ${getPlantLevelText(id)}</div>
            </div>
          </div>

          <p class="tiny">${p.desc}</p>
          ${unlockTxt}

          <div class="stack">
            <button
              class="btn"
              ${!unlocked || level >= CONFIG.upgrades.maxLevel ? "disabled" : ""}
              onclick="buyMainUpgrade('${id}')"
            >
              Main Level:
              ${level >= CONFIG.upgrades.maxLevel ? "MAX" : getUpgradeCost(id) + " Twigs"}
            </button>

            <button
              class="btn"
              ${!unlocked ? "disabled" : ""}
              onclick="buyStatUpgrade('${id}', 'cooldown')"
            >
              Cooldown + (${extra.cooldown}) -
              ${getStatUpgradeCost(id, "cooldown")} Sticks
            </button>

            <button
              class="btn"
              ${!unlocked ? "disabled" : ""}
              onclick="buyStatUpgrade('${id}', 'cost')"
            >
              Cost + (${extra.cost}) -
              ${getStatUpgradeCost(id, "cost")} Sticks
            </button>

            <button
              class="btn"
              ${!unlocked ? "disabled" : ""}
              onclick="buyStatUpgrade('${id}', 'health')"
            >
              Health + (${extra.health}) -
              ${getStatUpgradeCost(id, "health")} Sticks
            </button>

            <button
              class="btn"
              ${!unlocked ? "disabled" : ""}
              onclick="buyStatUpgrade('${id}', 'power')"
            >
              Power + (${extra.power}) -
              ${getStatUpgradeCost(id, "power")} Sticks
            </button>
          </div>
        </div>
      `;
    })
    .join("");

  setScreen(`
    <div class="screen">
      <div class="topbar">
        <button class="btn" onclick="showMenu()">← Menu</button>
        ${currencyHtml()}
      </div>

      <h1 class="title">Upgrade Plants</h1>
      <div class="cards">${cards}</div>
    </div>
  `);
}

function buyPlantUnlock(id) {
  const plant = CONFIG.plants[id];

  if (!plant?.unlockCost || save.sticks < plant.unlockCost) {
    toast("Need more Sticks.");
    return;
  }

  save.sticks -= plant.unlockCost;
  unlockPlant(id);
  showUpgrades();
}

function buyMainUpgrade(id) {
  const cost = getUpgradeCost(id);

  if (save.twigs < cost) {
    toast("Need more Twigs.");
    return;
  }

  if (getPlantLevel(id) >= CONFIG.upgrades.maxLevel) return;

  save.twigs -= cost;
  save.upgrades[id] = getPlantLevel(id) + 1;
  saveGame();
  showUpgrades();
}

function buyStatUpgrade(id, stat) {
  const cost = getStatUpgradeCost(id, stat);

  if (save.sticks < cost) {
    toast("Need more Sticks.");
    return;
  }

  const extra = getPlantExtraUpgrades(id);

  save.sticks -= cost;
  extra[stat] = Number(extra[stat] || 0) + 1;

  saveGame();
  showUpgrades();
}
function showAlmanac() {
  const plantHtml = Object.entries(CONFIG.plants)
    .map(([id, p]) => `
      <div class="card ${isPlantUnlocked(id) ? "" : "locked"}">
        <div class="row">
          ${imgTag(p.img, 50)}
          <div>
            <h3>${p.name}</h3>
            <span class="tiny">
              ${p.role || "Plant"} • ${isPlantUnlocked(id) ? "Unlocked" : "Locked"}
            </span>
          </div>
        </div>

        <p class="tiny">${p.desc || ""}</p>
      </div>
    `)
    .join("");

  const enemyHtml = Object.entries(CONFIG.enemies)
    .map(([id, e]) => `
      <div class="card">
        <div class="row">
          ${imgTag(e.img, 50)}
          <div>
            <h3>${e.name}</h3>
            <span class="tiny">
              HP ${e.hp} • Size ${e.size || 1}x ${e.rangedShooter ? "• Gunner" : ""}
            </span>
          </div>
        </div>

        <p class="tiny">${e.desc || ""}</p>
      </div>
    `)
    .join("");

  setScreen(`
    <div class="screen">
      <div class="topbar">
        <button class="btn" onclick="showMenu()">← Menu</button>
        ${currencyHtml()}
      </div>

      <h1 class="title">Meet Da Whatever</h1>

      <h2>Plants</h2>
      <div class="cards">${plantHtml}</div>

      <h2>Enemies</h2>
      <div class="cards">${enemyHtml}</div>
    </div>
  `);
}

function getCustomLevels() {
  try {
    return JSON.parse(localStorage.getItem("pad_custom_levels_v1") || "[]");
  } catch (err) {
    return [];
  }
}

function saveCustomLevels(list) {
  localStorage.setItem("pad_custom_levels_v1", JSON.stringify(list));
}

function showCustomLevels() {
  currentScreen = "custom";

  const list = getCustomLevels();

  const cards = list.map((lv, i) => `
    <div class="card">
      <h3>${lv.name || "Custom"} ${lv.title || ""}</h3>
      <p class="tiny">${lv.desc || ""}</p>

      <button class="btn good" onclick="showLoadoutPicker(${i}, 'custom')">
        Pick Your Bullcrap
      </button>

      <button class="btn bad" onclick="deleteCustom(${i})">
        Delete
      </button>
    </div>
  `).join("") || `
    <div class="card">
      No custom levels yet. Paste a share code below.
    </div>
  `;

  setScreen(`
    <div class="screen">
      <div class="topbar">
        <button class="btn" onclick="showMenu()">← Menu</button>
        ${currencyHtml()}
      </div>

      <h1 class="title">Custom Levels</h1>

      <div class="panel">
        <textarea
          id="shareCode"
          style="width:100%;height:90px;border-radius:12px;background:#081116;color:white"
          placeholder="Paste PAD Modder share code here..."
        ></textarea>

        <br><br>

        <button class="btn good" onclick="importCustomLevel()">
          Import Share Code
        </button>
      </div>

      <br>

      <div class="cards">${cards}</div>
    </div>
  `);
}

function importCustomLevel() {
  const val = document.getElementById("shareCode").value.trim();
  if (!val) return;

  try {
    let obj;

    try {
      obj = JSON.parse(val);
    } catch (err) {
      obj = JSON.parse(atob(val));
    }

    const list = getCustomLevels();
    list.push(obj);
    saveCustomLevels(list);
    showCustomLevels();
  } catch (err) {
    toast("That share code did not parse.");
  }
}

function deleteCustom(i) {
  const list = getCustomLevels();
  list.splice(i, 1);
  saveCustomLevels(list);
  showCustomLevels();
}

// ============================================================
// 4. GAME START + LOOP
// ============================================================

function rand(min, max) {
  return randomInt(min, max);
}

function normalizeLevel(level) {
  const copy = JSON.parse(JSON.stringify(level));

  copy.name = copy.name || "Custom";
  copy.title = copy.title || "Untitled";
  copy.desc = copy.desc || "";
  copy.startGlow = Number(copy.startGlow || 150);
  copy.background = copy.background || "forest";
  copy.music = copy.music || CONFIG.audio.defaultLevelTrack;
  copy.waves = Array.isArray(copy.waves) ? copy.waves : [];
  copy.lava = Array.isArray(copy.lava) ? copy.lava : [];

  return copy;
}

function startLevel(index = 0, listName = "levels", loadout = CONFIG.defaultLoadout) {
  const level = normalizeLevel(getLevelList(listName)[index]);

  currentScreen = "game";
  loopId++;

  const selected = [
    "removeTool",
    ...loadout
      .filter(id => id !== "removeTool" && isPlantUnlocked(id))
      .slice(0, CONFIG.gameplay.maxLoadoutPlants)
  ];

  setScreen(`
    <div class="screen gameWrap">
      <div class="hud">
        <button class="btn" onclick="exitGame()">← Exit</button>
        <span class="pill" id="levelName"></span>
        <span class="pill" id="glowHud"></span>
        <span class="pill" id="waveHud"></span>

        <button class="btn" onclick="togglePause()" id="pauseBtn">Pause</button>
        <button class="btn" onclick="setGameSpeed(0.5)">Slow</button>
        <button class="btn" onclick="setGameSpeed(1)">1x</button>
        <button class="btn" onclick="setGameSpeed(2)">2x</button>
      </div>

      <canvas
        id="gameCanvas"
        width="${CONFIG.board.canvasW}"
        height="${CONFIG.board.canvasH}"
      ></canvas>

      <div class="plantbar" id="plantBar"></div>
    </div>
  `);

  canvas = document.getElementById("gameCanvas");
  ctx = canvas.getContext("2d");

  state = {
    level,
    index,
    listName,
    loadout: selected,

    running: true,
    gameSpeed: 1,
    tick: 0,

    glow: level.startGlow,

    plants: [],
    enemies: [],
    projectiles: [],
    enemyBullets: [],
    explosions: [],
    particles: [],
    texts: [],

    waveIndex: 0,
    waveTick: 0,
    waveActive: false,
    spawnQueue: [],

    lava: new Set(level.lava.map(a => `${a[0]},${a[1]}`)),
    cooldowns: {},

    selectedPlant: selected[1] || selected[0],
    beachPending: null,

    shake: 0,
    won: false,
    lost: false,
    kills: 0
  };

  canvas.addEventListener("pointerdown", handleCanvasClick);

  playMusic(level.music || CONFIG.audio.defaultLevelTrack);
  renderCards();
  updateHud();

  requestAnimationFrame(() => gameLoop(loopId));
}

function exitGame() {
  loopId++;
  state = null;
  showMenu();
}

function togglePause() {
  if (!state) return;

  state.running = !state.running;

  const btn = document.getElementById("pauseBtn");
  if (btn) {
    btn.textContent = state.running ? "Pause" : "Resume";
  }
}

function setGameSpeed(v) {
  if (!state) return;

  state.gameSpeed = v;

  toast(
    v === 0.5
      ? "Slow mode"
      : v === 2
        ? "2x chaos"
        : "Normal speed"
  );
}

function updateHud() {
  if (!state) return;

  const levelName = document.getElementById("levelName");
  const glowHud = document.getElementById("glowHud");
  const waveHud = document.getElementById("waveHud");

  if (levelName) {
    levelName.textContent = `${state.level.name}: ${state.level.title}`;
  }

  if (glowHud) {
    glowHud.textContent = `Glow: ${Math.floor(state.glow)}`;
  }

  if (waveHud) {
    waveHud.textContent =
      `Wave ${Math.min(state.waveIndex + 1, state.level.waves.length)}/${state.level.waves.length} • ${state.gameSpeed}x`;
  }
}

function renderCards() {
  const bar = document.getElementById("plantBar");
  if (!bar || !state) return;

  bar.innerHTML = state.loadout.map(id => {
    const p = getPlantStats(id);
    const cd = Math.ceil((state.cooldowns[id] || 0) / 60);
    const selected = state.selectedPlant === id;

    return `
      <button
        class="plantCard ${selected ? "selected" : ""} ${cd > 0 ? "cool" : ""}"
        onclick="selectPlant('${id}')"
      >
        <div class="name">${p.name}</div>
        ${imgTag(p.img, 38)}
        <div class="cost">${p.tool ? "Tool" : p.cost + " Glow"}</div>
        <div class="tiny">${cd > 0 ? "CD " + cd + "s" : p.role}</div>
      </button>
    `;
  }).join("");
}

function selectPlant(id) {
  if (!state) return;

  state.selectedPlant = id;
  renderCards();
}

function handleCanvasClick(ev) {
  if (!state || state.won || state.lost) return;

  unlockAudio();

  const rect = canvas.getBoundingClientRect();

  const mx = (ev.clientX - rect.left) * (canvas.width / rect.width);
  const my = (ev.clientY - rect.top) * (canvas.height / rect.height);

  const cell = posToCell(mx, my);
  if (!cell) return;

  useSelectedOnCell(cell.col, cell.row);
}
function getStackLevel(p) {
  return Math.max(1, Number(p?.stack || 1));
}

function getStackMultiplier(p) {
  return Math.pow(0.5, getStackLevel(p) - 1);
}

function getStackedCooldown(p, def) {
  return Math.max(12, Math.round((def.shootCooldown || 120) * getStackMultiplier(p)));
}

function getStackedProducerCooldown(p, def) {
  return Math.max(45, Math.round((def.produceCooldown || 999999) * getStackMultiplier(p)));
}

function stackPlant(existing, def, id) {
  const maxStack = CONFIG.gameplay.maxPlantStack || 6;

  if (existing.stack >= maxStack) {
    playSfx("no");
    popText(existing.x, existing.y, "MAX STACK", "#ffef8a");
    return;
  }

  if (state.cooldowns[id] > 0) {
    playSfx("no");
    return;
  }

  if (state.glow < def.cost) {
    playSfx("no");
    popText(existing.x, existing.y, "Need Glow", "#ffd36a");
    return;
  }

  state.glow -= def.cost;
  state.cooldowns[id] = def.placementCooldown || 120;

  existing.stack = Math.min(maxStack, (existing.stack || 1) + 1);
  existing.maxHp += Math.max(5, Math.round(def.hp * 0.35));
  existing.hp = Math.min(existing.maxHp, existing.hp + Math.round(def.hp * 0.55));
  existing.cooldown = Math.min(existing.cooldown || 0, getStackedCooldown(existing, def));

  addParticles(existing.x, existing.y, "#caff6a", 16);
  popText(existing.x, existing.y, `STACK x${existing.stack}`, "#d8ff6a");
  playSfx("plant");
  renderCards();
  updateHud();
}

function useSelectedOnCell(col, row) {
  const id = state.selectedPlant;
  const def = getPlantStats(id);
  if (!def) return;

  const key = `${col},${row}`;
  const existing = state.plants.find(p => p.col === col && p.row === row);

  if (def.tool === "remove") {
    if (existing) {
      state.plants = state.plants.filter(p => p !== existing);
      state.glow += Math.floor((existing.cost || 0) * CONFIG.gameplay.removeRefundPercent);
      popText(existing.x, existing.y, "Refund!", "#8ff");
      playSfx("glow");
    }
    return;
  }

  if (state.lava.has(key)) {
    playSfx("no");
    popText(GRID_X + col * CELL_W + 20, GRID_Y + row * CELL_H + 30, "NOPE", "#f66");
    return;
  }

  if (state.cooldowns[id] > 0) {
    playSfx("no");
    return;
  }

  if (state.glow < def.cost) {
    playSfx("no");
    popText(GRID_X + col * CELL_W + 15, GRID_Y + row * CELL_H + 35, "Need Glow", "#ffd36a");
    return;
  }

  if (def.instantLaunch) {
    state.glow -= def.cost;
    state.cooldowns[id] = def.placementCooldown || 120;
    launchBeachBall(col, row, def);
    playSfx("shoot");
    renderCards();
    updateHud();
    return;
  }

  if (existing) {
    if (existing.id === id && !def.instantLaunch && !def.tool) {
      stackPlant(existing, def, id);
    } else {
      playSfx("no");
      popText(existing.x, existing.y, "Occupied", "#ff8888");
    }
    return;
  }

  const c = cellCenter(col, row);

  state.glow -= def.cost;
  state.cooldowns[id] = def.placementCooldown || 120;

  state.plants.push({
    id,
    col,
    row,
    x: c.x,
    y: c.y,
    hp: def.hp,
    maxHp: def.hp,
    cost: def.cost,
    stack: 1,
    tick: rand(0, 40),
    fuse: def.fuse || 0,
    hitGlowCd: 0
  });

  addParticles(c.x, c.y, "#7cff6b", 8);
  playSfx("plant");
  renderCards();
  updateHud();
}

function launchBeachBall(col, row, def) {
  const c = cellCenter(col, row);

  state.projectiles.push({
    kind: "beach",
    x: GRID_X - 35,
    y: c.y,
    x0: GRID_X - 35,
    y0: c.y,
    x1: c.x,
    y1: c.y,
    t: 0,
    total: 42,
    returning: false,
    damage: def.damage,
    radius: def.radius,
    row,
    fromPlant: "beachBall",
    img: def.img
  });
}

function gameLoop(myLoop) {
  if (!state || myLoop !== loopId || currentScreen !== "game") return;

  if (state.running) {
    const steps = Math.max(1, Math.round(state.gameSpeed));
    const slow = state.gameSpeed < 1;

    for (let i = 0; i < steps; i++) {
      if (slow && state.tick % 2 === 1) {
        state.tick++;
        continue;
      }

      state.tick++;
      updateCooldowns();
      updateWaves();
      updatePlants();
      updateProjectiles();
      updateEnemyBullets();
      updateEnemies();
      updateEffects();
      checkEnd();
    }

    updateHud();

    if (state.tick % 30 === 0) {
      renderCards();
    }
  }

  draw();
  requestAnimationFrame(() => gameLoop(myLoop));
}

function updateCooldowns() {
  for (const id of Object.keys(state.cooldowns)) {
    state.cooldowns[id] = Math.max(0, state.cooldowns[id] - 1);
  }
}

function updateWaves() {
  if (state.waveIndex >= state.level.waves.length) return;

  if (!state.waveActive) {
    state.spawnQueue = (state.level.waves[state.waveIndex] || []).map(s => ({
      ...s,
      delay: Number(s.delay || 0)
    }));

    state.waveTick = 0;
    state.waveActive = true;
  }

  state.waveTick++;

  for (const s of state.spawnQueue) {
    if (!s.spawned && state.waveTick >= s.delay) {
      spawnEnemy(s);
      s.spawned = true;
    }
  }

  if (state.spawnQueue.every(s => s.spawned)) {
    if (state.enemies.length === 0) {
      state.waveActive = false;
      state.waveIndex++;
      state.waveTick = -CONFIG.gameplay.waveGapTicks;
    }
  }
}

function spawnEnemy(sp) {
  const def = CONFIG.enemies[sp.type] || CONFIG.enemies.basic;
  const row = clamp(Number(sp.row ?? rand(0, ROWS - 1)), 0, ROWS - 1);
  const size = Number(sp.size || def.size || 1);
  const hp = Math.round(Number(sp.hp || def.hp) * size);
  const c = cellCenter(COLS - 1, row);

  state.enemies.push({
    type: sp.type || "basic",
    row,
    x: CONFIG.board.canvasW + 45 * size,
    y: c.y,
    hp,
    maxHp: hp,
    size,
    speed: Number(sp.speed || def.speed),
    damage: Number(sp.damage || def.damage),
    attackCd: 0,
    shootCd: rand(40, 120),
    hitbox: 42 * size
  });
}

function findEnemyInLane(row, x) {
  return state.enemies
    .filter(e => e.row === row && e.x > x - 10)
    .sort((a, b) => a.x - b.x)[0];
}

function findAnyEnemy(row) {
  return state.enemies
    .filter(e => e.row === row)
    .sort((a, b) => a.x - b.x)[0];
}
function updatePlants() {
  for (const p of [...state.plants]) {
    const def = getPlantStats(p.id);

    p.tick++;

    if (p.hitGlowCd > 0) {
      p.hitGlowCd--;
    }

    if (def.producer && p.tick % getStackedProducerCooldown(p, def) === 0) {
      const produced = Math.round(def.produceAmount * (1 + (getStackLevel(p) - 1) * 0.35));
      state.glow += produced;
      addParticles(p.x, p.y, "#ffe76a", 10 + getStackLevel(p));
      popText(p.x, p.y, `+${produced}`, "#ffe76a");
      playSfx("glow");
    }

    if (def.shooter) {
      updatePlantShooter(p, def);
    }

    if (def.fuse) {
      p.fuse--;

      if (p.fuse <= 0) {
        explode(p.x, p.y, def.radius, def.damage, "kaboom");
        state.plants = state.plants.filter(x => x !== p);
      }
    }

    if (p.hp <= 0) {
      state.plants = state.plants.filter(x => x !== p);
    }
  }
}

function updatePlantShooter(p, def) {
  if (p.cooldown > 0) {
    p.cooldown--;
    return;
  }

  const target = findEnemyInLane(p.row, p.x);

  if (!target && def.fireType !== "multiLane") {
    return;
  }

  if (def.fireType === "multiLane") {
    let fired = false;

    for (const r of [p.row - 1, p.row, p.row + 1]) {
      if (r < 0 || r >= ROWS) continue;

      if (findAnyEnemy(r)) {
        fireStraight(p.x + 24, cellCenter(0, r).y, def, p.id, r);
        fired = true;
      }
    }

    if (fired) {
      p.cooldown = getStackedCooldown(p, def);
      playSfx("shoot");
    }

    return;
  }

  if (def.fireType === "allLane") {
    let fired = false;

    for (let r = 0; r < ROWS; r++) {
      if (findAnyEnemy(r)) {
        fireStraight(p.x + 24, cellCenter(0, r).y, def, p.id, r);
        fired = true;
      }
    }

    if (fired) {
      p.cooldown = getStackedCooldown(p, def);
      playSfx("laser");
    }

    return;
  }

  if (def.fireType === "wideShot" || def.fireType === "scatter") {
    const rows = def.fireType === "wideShot"
      ? [p.row - 2, p.row - 1, p.row, p.row + 1, p.row + 2]
      : [p.row - 1, p.row, p.row + 1];

    let fired = false;

    for (const r of rows) {
      if (r < 0 || r >= ROWS) continue;
      if (findAnyEnemy(r) || r === p.row) {
        fireStraight(p.x + 24, cellCenter(0, r).y + rand(-5, 5), def, p.id, r);
        fired = true;
      }
    }

    if (fired) {
      p.cooldown = getStackedCooldown(p, def);
      playSfx("shoot");
    }

    return;
  }

  if (def.fireType === "lob") {
    fireLob(p, target, def);
  } else {
    fireStraight(p.x + 24, p.y, def, p.id, p.row);

    const extra =
      def.doubleShotChance &&
      rand(1, 100) <= def.doubleShotChance;

    if (extra) {
      setTimeout(() => {
        if (state) {
          fireStraight(p.x + 24, p.y + 6, def, p.id, p.row);
        }
      }, 60);
    }
  }

  p.cooldown = getStackedCooldown(p, def);
  playSfx("shoot");
}

function calcDamage(base, sourceId, target) {
  let dmg = base;

  const def = CONFIG.plants[sourceId] || {};
  const tags = CONFIG.enemies[target?.type]?.tags || [];

  if (def.bonusVsTags?.some(t => tags.includes(t))) {
    dmg *= def.bonusMultiplier || 1.5;
  }

  const crit = Math.random() < CONFIG.gameplay.critChance;

  if (crit) {
    dmg *= CONFIG.gameplay.critMultiplier;
  }

  return {
    dmg: Math.round(dmg),
    crit
  };
}

function fireStraight(x, y, def, from, row) {
  state.projectiles.push({
    kind: "straight",
    x,
    y,
    row,
    damage: def.projectileDamage || 20,
    speed: def.projectileSpeed || 5,
    fromPlant: from,
    radius: def.areaRadius || 0,
    color: def.bonusVsTags ? "#9dfcff" : "#704018"
  });
}

function fireLob(p, target, def) {
  state.projectiles.push({
    kind: "lob",
    x: p.x,
    y: p.y,
    x0: p.x,
    y0: p.y,
    x1: target.x,
    y1: target.y,
    t: 0,
    total: 55,
    damage: def.projectileDamage || 40,
    radius: def.areaRadius || 90,
    fromPlant: p.id
  });
}

function updateProjectiles() {
  for (const pr of [...state.projectiles]) {
    if (pr.kind === "straight") {
      pr.x += pr.speed;

      const hit = state.enemies.find(e =>
        e.row === pr.row &&
        Math.abs(e.x - pr.x) < e.hitbox
      );

      if (hit) {
        const res = calcDamage(pr.damage, pr.fromPlant, hit);
        damageEnemy(hit, res.dmg, res.crit);

        if (pr.radius) {
          explode(pr.x, pr.y, pr.radius, pr.damage, pr.fromPlant);
        }

        state.projectiles = state.projectiles.filter(x => x !== pr);
      }

      if (pr.x > CONFIG.board.canvasW + 40) {
        state.projectiles = state.projectiles.filter(x => x !== pr);
      }
    } else if (pr.kind === "lob" || pr.kind === "beach") {
      pr.t++;

      const t = pr.t / pr.total;
      const arc = Math.sin(t * Math.PI) * 70;

      pr.x = pr.x0 + (pr.x1 - pr.x0) * t;
      pr.y = pr.y0 + (pr.y1 - pr.y0) * t - arc;

      if (pr.t >= pr.total) {
        explode(pr.x1, pr.y1, pr.radius, pr.damage, pr.fromPlant);

        if (pr.kind === "beach" && !pr.returning) {
          pr.returning = true;
          pr.t = 0;

          [pr.x0, pr.x1] = [pr.x1, GRID_X - 35];

          pr.y0 = pr.y1;
          pr.y1 = pr.y0;
        } else {
          state.projectiles = state.projectiles.filter(x => x !== pr);
        }
      }
    }
  }
}

function damageEnemy(e, dmg, crit = false) {
  e.hp -= dmg;

  addParticles(
    e.x,
    e.y,
    crit ? "#fff36a" : "#ff5959",
    crit ? 10 : 4
  );

  popText(
    e.x,
    e.y,
    crit ? `CRIT ${dmg}` : `-${dmg}`,
    crit ? "#fff36a" : "#ff8888"
  );

  playSfx(crit ? "crit" : "hit");

  if (e.hp <= 0) {
    state.enemies = state.enemies.filter(x => x !== e);
    state.glow += CONFIG.gameplay.glowFromEnemy;
    state.kills++;
    addParticles(e.x, e.y, "#ffe76a", 12);
  }
}

function explode(x, y, radius, damage, source = "boom") {
  state.explosions.push({
    x,
    y,
    radius,
    life: 24
  });

  state.shake = 8;

  for (const e of [...state.enemies]) {
    const d = Math.hypot(e.x - x, e.y - y);

    if (d <= radius + e.hitbox) {
      const res = calcDamage(damage, source, e);
      damageEnemy(e, res.dmg, res.crit);
    }
  }

  playSfx("boom");
}
function updateEnemyBullets() {
  for (const b of [...state.enemyBullets]) {
    b.x -= b.speed;

    const hit = state.plants.find(p =>
      p.row === b.row &&
      Math.abs(p.x - b.x) < 35
    );

    if (hit) {
      hit.hp -= b.damage;
      addParticles(hit.x, hit.y, "#9dfffa", 5);
      state.enemyBullets = state.enemyBullets.filter(x => x !== b);
      playSfx("hit");
    }

    if (b.x < 0) {
      state.enemyBullets = state.enemyBullets.filter(x => x !== b);
    }
  }
}

function updateEnemies() {
  for (const e of [...state.enemies]) {
    const def = CONFIG.enemies[e.type] || CONFIG.enemies.basic;

    const plant = state.plants
      .filter(p =>
        p.row === e.row &&
        Math.abs(p.x - e.x) < (34 + e.hitbox / 2)
      )
      .sort((a, b) => b.x - a.x)[0];

    const rangedTarget = state.plants
      .filter(p =>
        p.row === e.row &&
        p.x < e.x &&
        e.x - p.x < 420
      )
      .sort((a, b) => b.x - a.x)[0];

    if (def.rangedShooter && rangedTarget && !plant) {
      e.shootCd--;

      if (e.shootCd <= 0) {
        e.shootCd = def.shootCooldown || 150;

        const rows = def.multiShot ? [e.row - 1, e.row, e.row + 1] : [e.row];
        for (const r of rows) {
          if (r < 0 || r >= ROWS) continue;
          state.enemyBullets.push({
            x: e.x - 25,
            y: cellCenter(0, r).y,
            row: r,
            damage: def.shotDamage || 12,
            speed: def.shotSpeed || 3.5
          });
        }

        addParticles(e.x, e.y, "#55fff2", def.multiShot ? 10 : 5);
        playSfx("laser");
      }

      e.x -= e.speed * 0.25;
    } else if (plant) {
      e.attackCd--;

      if (e.attackCd <= 0) {
        e.attackCd = 45;
        plant.hp -= e.damage;

        const pdef = getPlantStats(plant.id);

        if (pdef.produceWhenHit && plant.hitGlowCd <= 0) {
          plant.hitGlowCd = pdef.hitProduceCooldown || 30;
          state.glow += pdef.produceWhenHit;

          popText(
            plant.x,
            plant.y,
            `Tax +${pdef.produceWhenHit}`,
            "#ffe76a"
          );

          addParticles(plant.x, plant.y, "#ffe76a", 8);
        }

        addParticles(plant.x, plant.y, "#ff5555", 5);
        playSfx("hit");
      }
    } else {
      e.x -= e.speed;
    }

    if (e.x < GRID_X - 48) {
      loseGame();
      return;
    }
  }
}

function updateEffects() {
  for (const ex of [...state.explosions]) {
    ex.life--;

    if (ex.life <= 0) {
      state.explosions = state.explosions.filter(x => x !== ex);
    }
  }

  for (const p of [...state.particles]) {
    p.x += p.vx;
    p.y += p.vy;
    p.life--;

    if (p.life <= 0) {
      state.particles = state.particles.filter(x => x !== p);
    }
  }

  for (const t of [...state.texts]) {
    t.y -= 0.45;
    t.life--;

    if (t.life <= 0) {
      state.texts = state.texts.filter(x => x !== t);
    }
  }

  if (state.shake > 0) {
    state.shake--;
  }
}

function addParticles(x, y, color, count = 6) {
  for (let i = 0; i < count; i++) {
    state.particles.push({
      x,
      y,
      vx: (Math.random() - 0.5) * 3,
      vy: (Math.random() - 0.5) * 3,
      life: rand(18, 45),
      color
    });
  }
}

function popText(x, y, text, color = "#fff") {
  state.texts.push({
    x,
    y,
    text,
    color,
    life: 45
  });
}

function checkEnd() {
  if (state.lost || state.won) return;

  if (
    state.waveIndex >= state.level.waves.length &&
    state.enemies.length === 0 &&
    !state.waveActive
  ) {
    winGame();
  }
}

function winGame() {
  if (state.won) return;

  state.won = true;
  state.running = false;

  const reward =
    rand(CONFIG.currency.minWinReward, CONFIG.currency.maxWinReward) +
    Math.floor(state.kills / 5);

  const sticks = state.listName === "minigames" ? 2 : 1;

  save.twigs += reward;
  save.sticks += sticks;

  if (state.listName === "levels") {
    save.cleared[state.level.name] = true;
  }

  if (state.listName === "minigames") {
    save.bestMinigames[state.level.name] = true;
  }

  const newly = [];

  for (const [id, p] of Object.entries(CONFIG.plants)) {
    if (p.unlockAt === state.level.name && !save.unlockedPlants[id]) {
      save.unlockedPlants[id] = true;
      newly.push(p.name);
    }
  }

  saveGame();
  playMusic(CONFIG.audio.victoryTrack);
  playSfx("win");

  setTimeout(() => {
    toast(
      `Victory! +${reward} Twigs, +${sticks} Sticks${
        newly.length ? ` • Unlocked: ${newly.join(", ")}` : ""
      }`
    );

    showMenu();
  }, 900);
}

function loseGame() {
  if (state.lost) return;

  state.lost = true;
  state.running = false;

  playSfx("no");

  setTimeout(() => {
    toast("A derp escaped. Pain.");
    showMenu();
  }, 700);
}
// ============================================================
// 5. DRAWING
// ============================================================

function draw() {
  if (!ctx || !state) return;

  ctx.save();

  if (state.shake > 0) {
    ctx.translate(
      rand(-state.shake, state.shake),
      rand(-state.shake, state.shake)
    );
  }

  drawBackground();
  drawGrid();
  drawLava();
  drawPlants();
  drawEnemies();
  drawProjectiles();
  drawEnemyBullets();
  drawExplosions();
  drawParticles();
  drawTexts();

  if (!state.running && !state.won && !state.lost) {
    drawOverlay("PAUSED");
  }

  ctx.restore();
}

function drawBackground() {
  const bg = getGameImage(state.level.background);

  if (imageReady(bg)) {
    ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);
  } else {
    const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);

    grad.addColorStop(0, "#13262d");
    grad.addColorStop(1, "#071014");

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#ff4bd8";
    ctx.fillRect(14, 14, 32, 32);
  }
}

function drawGrid() {
  ctx.lineWidth = 2;

  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const x = GRID_X + c * CELL_W;
      const y = GRID_Y + r * CELL_H;

      ctx.fillStyle =
        (c + r) % 2 === 0
          ? "rgba(255,255,255,.08)"
          : "rgba(0,0,0,.09)";

      ctx.fillRect(x, y, CELL_W, CELL_H);

      ctx.strokeStyle = "rgba(180,245,255,.22)";
      ctx.strokeRect(x, y, CELL_W, CELL_H);
    }
  }
}

function drawLava() {
  for (const key of state.lava) {
    const [c, r] = key.split(",").map(Number);

    const x = GRID_X + c * CELL_W;
    const y = GRID_Y + r * CELL_H;

    ctx.fillStyle = "rgba(255,70,30,.55)";
    ctx.fillRect(x + 4, y + 4, CELL_W - 8, CELL_H - 8);

    ctx.fillStyle = "rgba(255,210,40,.35)";
    ctx.fillRect(x + 14, y + 18, CELL_W - 28, 12);
  }
}

function drawFallbackSquare(x, y, w, h, label) {
  ctx.fillStyle = "#ff4bd8";
  ctx.fillRect(x, y, w, h);

  ctx.strokeStyle = "#111";
  ctx.strokeRect(x, y, w, h);

  ctx.fillStyle = "#111";
  ctx.font = "10px monospace";
  ctx.fillText(String(label || "?").slice(0, 10), x + 5, y + h / 2);
}

function drawPlants() {
  for (const p of state.plants) {
    const def = getPlantStats(p.id);
    const img = getGameImage(def.img);

    const x = p.x - 32;
    const y = p.y - 34;

    if (imageReady(img)) {
      ctx.drawImage(img, x, y, 64, 64);
    } else {
      drawFallbackSquare(x, y, 58, 58, def.name);
    }

    if (p.hp < p.maxHp) {
      ctx.fillStyle = "#000";
      ctx.fillRect(p.x - 30, p.y + 34, 60, 6);

      ctx.fillStyle = "#49ff49";
      ctx.fillRect(
        p.x - 30,
        p.y + 34,
        60 * Math.max(0, p.hp / p.maxHp),
        6
      );
    }

    if ((p.stack || 1) > 1) {
      ctx.fillStyle = "rgba(0,0,0,.72)";
      ctx.beginPath();
      ctx.arc(p.x + 25, p.y - 25, 13, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#eaff6a";
      ctx.font = "bold 12px monospace";
      ctx.textAlign = "center";
      ctx.fillText(`x${p.stack}`, p.x + 25, p.y - 21);
      ctx.textAlign = "left";
    }
  }
}

function drawEnemies() {
  for (const e of state.enemies) {
    const def = CONFIG.enemies[e.type] || CONFIG.enemies.basic;
    const img = getGameImage(def.img);

    const size = 68 * (e.size || 1);

    if (imageReady(img)) {
      ctx.drawImage(img, e.x - size / 2, e.y - size / 2, size, size);
    } else {
      drawFallbackSquare(
        e.x - size / 3,
        e.y - size / 2,
        size * 0.66,
        size * 0.72,
        def.name
      );
    }

    ctx.fillStyle = "#000";
    ctx.fillRect(
      e.x - 32 * e.size,
      e.y - size / 2 - 12,
      64 * e.size,
      6
    );

    ctx.fillStyle = def.boss
      ? "#ffbb33"
      : def.fragile
        ? "#ff2222"
        : "#ff3333";

    ctx.fillRect(
      e.x - 32 * e.size,
      e.y - size / 2 - 12,
      64 * e.size * Math.max(0, e.hp / e.maxHp),
      6
    );
  }
}

function drawProjectiles() {
  for (const p of state.projectiles) {
    if (p.kind === "beach") {
      const img = getGameImage(p.img);

      if (imageReady(img)) {
        ctx.drawImage(img, p.x - 18, p.y - 18, 36, 36);
      } else {
        ctx.fillStyle = "#ff4bd8";
        ctx.beginPath();
        ctx.arc(p.x, p.y, 17, 0, Math.PI * 2);
        ctx.fill();
      }
    } else if (p.kind === "lob") {
      ctx.fillStyle = "#b37a32";
      ctx.beginPath();
      ctx.arc(p.x, p.y, 8, 0, Math.PI * 2);
      ctx.fill();
    } else {
      ctx.fillStyle = p.color || "#6b3a19";
      ctx.fillRect(p.x - 4, p.y - 3, 18, 6);
    }
  }
}

function drawEnemyBullets() {
  ctx.fillStyle = "#67fff4";

  for (const b of state.enemyBullets) {
    ctx.fillRect(b.x - 12, b.y - 3, 22, 6);
  }
}

function drawExplosions() {
  for (const ex of state.explosions) {
    ctx.strokeStyle = `rgba(255,130,25,${ex.life / 24})`;
    ctx.lineWidth = 8;

    ctx.beginPath();
    ctx.arc(
      ex.x,
      ex.y,
      ex.radius * (1 - ex.life / 50),
      0,
      Math.PI * 2
    );
    ctx.stroke();
  }
}

function drawParticles() {
  for (const p of state.particles) {
    ctx.globalAlpha = Math.max(0, p.life / 45);
    ctx.fillStyle = p.color;
    ctx.fillRect(p.x - 4, p.y - 4, 8, 8);
    ctx.globalAlpha = 1;
  }
}

function drawTexts() {
  ctx.font = "bold 14px monospace";
  ctx.textAlign = "center";

  for (const t of state.texts) {
    ctx.globalAlpha = Math.max(0, t.life / 45);
    ctx.fillStyle = t.color;
    ctx.fillText(t.text, t.x, t.y);
    ctx.globalAlpha = 1;
  }

  ctx.textAlign = "left";
}

function drawOverlay(txt) {
  ctx.fillStyle = "rgba(0,0,0,.45)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#fff";
  ctx.font = "bold 44px system-ui";
  ctx.textAlign = "center";
  ctx.fillText(txt, canvas.width / 2, canvas.height / 2);
  ctx.textAlign = "left";
}

// ============================================================
// 6. BOOT
// ============================================================

function boot() {
  loadSave();
  installBaseHTML();
  installStyles();

  document.addEventListener("click", unlockAudio);
  document.addEventListener("keydown", unlockAudio);

  showMenu();

  console.log("PAD v2.6 derpgardenstudio2 Expansion booted.");
}


// ============================================================
// PAD v2.7 - Fangame Forge Update patch
// Adds grouped plant/enemy configs, World 4 extension fixes,
// new uploaded art, homepage polish, hidden maker support, and
// fixes Odd Alien / Alien Gunner behavior.
// ============================================================
function applyPAD27Patch() {
  CONFIG.version = "2.7 Fangame Forge Update";
  CONFIG.gameTitle = "Plants Against Derps: Fangame Forge Update";
  CONFIG.saveKey = "plantsAgainstDerps_v27_save";

  Object.assign(CONFIG.images, {
    alien: "assets/alien.png",
    mossCannon: "assets/plant-moss-cannon.png",
    kaboomCannon: "assets/plant-kaboom-cannon.png",
    threeGunPrototype: "assets/plant-three-gun-prototype.png",
    guntankBoi: "assets/enemy-guntank-boi.png",
    unknownCubes: "assets/enemy-unknown-cubes.png",
    ragingBoi: "assets/enemy-raging-boi.png"
  });

  // Remove old/accidental alien plant ids if any older save/build had them.
  delete CONFIG.plants.alienPlant;
  delete CONFIG.plants.oddAlienPlant;
  delete CONFIG.plants.alien;

  // Texture/config groups so plants are organized more like the level system.
  CONFIG.plantGroups = {
    economy: {
      title: "Economy / Glow Goblins",
      plants: ["campfr", "glowMush", "solarPanel", "taxRock"]
    },
    walls: {
      title: "Walls / Stuff That Gets Hit",
      plants: ["cardboardWall", "soggyMattress", "rustyFridge"]
    },
    shooters: {
      title: "Shooters",
      plants: ["treeGun", "rosegun", "bucketStalk", "mossCannon"]
    },
    specials: {
      title: "Special / Explosive / Prototype",
      plants: ["beachBall", "kaboom", "kaboomCannon", "cloudPopper", "starfruitKnockoff", "threeGunPrototype"]
    }
  };

  CONFIG.enemyGroups = {
    derps: { title: "Derps", enemies: ["basic", "armored", "fast", "assasinRover", "wetDerp", "mechaDerp"] },
    machines: { title: "Machines", enemies: ["droneGun", "droneSaw", "guntankBoi", "unknownCubes", "cardboardTank"] },
    aliens: { title: "Aliens", enemies: ["alien", "alienGun", "alienShotgunner", "alienGod", "alienFinalBoss", "ragingBoi"] }
  };

  Object.assign(CONFIG.plants, {
    mossCannon: {
      name: "Moss Cannon",
      cost: 150,
      hp: 120,
      img: "mossCannon",
      desc: "A mossy cannon that fires chunky green shots. Bonus damage versus machines.",
      role: "Heavy Shooter",
      unlockAt: "4-2",
      shooter: true,
      fireType: "straight",
      shootCooldown: 175,
      projectileDamage: 48,
      projectileSpeed: 5.2,
      bonusVsTags: ["machine", "drone"],
      bonusMultiplier: 1.45,
      placementCooldown: 310
    },
    kaboomCannon: {
      name: "Kaboom Cannon",
      cost: 250,
      hp: 90,
      img: "kaboomCannon",
      desc: "Lobs explosive nonsense. Like El Kaboom, but with commitment issues.",
      role: "Lob Explosive",
      unlockAt: "4-4",
      shooter: true,
      fireType: "lob",
      shootCooldown: 245,
      projectileDamage: 75,
      projectileSpeed: 4.3,
      areaRadius: 95,
      placementCooldown: 450
    },
    threeGunPrototype: {
      name: "Three-Gun Prototype",
      cost: 190,
      hp: 85,
      img: "threeGunPrototype",
      desc: "Prototype art/config for fangames. The 3-lane shooting code exists, but this plant stays locked for now.",
      role: "Prototype / Maker Asset",
      unlockAt: "NEVER_USED_YET",
      shooter: true,
      fireType: "multiLane",
      shootCooldown: 150,
      projectileDamage: 18,
      projectileSpeed: 6,
      placementCooldown: 320,
      hiddenPrototype: true
    }
  });

  Object.assign(CONFIG.enemies, {
    guntankBoi: {
      name: "Guntank Boi",
      hp: 720,
      speed: 0.075,
      damage: 30,
      img: "guntankBoi",
      size: 1.55,
      tags: ["machine"],
      boss: true,
      rangedShooter: true,
      shootCooldown: 135,
      shotDamage: 18,
      shotSpeed: 3.8,
      desc: "A tank with questionable licensing and too many tiny gun bits."
    },
    unknownCubes: {
      name: "Unknown Cubes",
      hp: 480,
      speed: 0.11,
      damage: 24,
      img: "unknownCubes",
      size: 1.35,
      tags: ["alien", "glitch"],
      rangedShooter: true,
      multiShot: true,
      shootCooldown: 165,
      shotDamage: 12,
      shotSpeed: 3.4,
      desc: "Purple cubes asking questions nobody wants to answer."
    },
    ragingBoi: {
      name: "Raging Boi",
      hp: 260,
      speed: 0.34,
      damage: 26,
      img: "ragingBoi",
      size: 1.12,
      tags: ["derp"],
      desc: "A derp who discovered forward momentum and anger."
    }
  });

  // Hard fix: Odd Alien uses the alien PNG; Alien Gunner definitely shoots.
  CONFIG.enemies.alien.img = "alien";
  Object.assign(CONFIG.enemies.alienGun, {
    img: "alienGun",
    rangedShooter: true,
    shootCooldown: 115,
    shotDamage: 18,
    shotSpeed: 4.8,
    desc: "Shoots plants from range. Fixed in v2.7 so it actually does the pew-pew job."
  });

  // Rename accidentally duplicated post-expansion World 3 levels into real World 4 extension.
  const duplicateTitles = new Map([
    ["Drone Rude Awakening", "4-11"],
    ["Alien Gun Safety Violation", "4-12"],
    ["Stacking Tutorial But Violent", "4-13"],
    ["Multi-Lane Meltdown", "4-14"],
    ["The Reupload Boss", "4-15"]
  ]);

  for (const lv of CONFIG.levels) {
    if (duplicateTitles.has(lv.title)) {
      lv.name = duplicateTitles.get(lv.title);
      lv.background = lv.background || "milkyway";
      lv.music = lv.music || "finalBoss";
      lv.world = 4;
      lv.desc = (lv.desc || "") + " [v2.7: moved into extended World 4.]";
    }
  }

  // New extended World 4 content using the uploaded enemies/plants.
  const existingNames = new Set(CONFIG.levels.map(lv => lv.name));
  const extraWorld4 = [
    {
      name: "4-16", title: "Moss Cannon Field Test", desc: "Moss Cannon finally gets a job. Guntank Boi strongly disagrees.", startGlow: 520, background: "milkyway", music: "battle", world: 4,
      waves: [[{type:"guntankBoi",row:2,delay:160}], [{type:"alienGun",row:0,delay:120},{type:"alienGun",row:4,delay:260},{type:"ragingBoi",row:2,delay:380}], [{type:"guntankBoi",row:1,delay:160},{type:"guntankBoi",row:3,delay:420}]], lava:[[4,2],[5,2]]
    },
    {
      name: "4-17", title: "Unknown Cube Stack", desc: "The cubes are staring. The lawn is not paid enough for this.", startGlow: 560, background: "milkyway", music: "finalBoss", world: 4,
      waves: [[{type:"unknownCubes",row:1,delay:120},{type:"unknownCubes",row:3,delay:260}], [{type:"alienShotgunner",row:2,delay:180},{type:"unknownCubes",row:0,delay:360},{type:"unknownCubes",row:4,delay:520}], [{type:"alienGod",row:2,delay:260},{type:"unknownCubes",row:1,delay:520},{type:"unknownCubes",row:3,delay:760}]], lava:[[3,1],[3,3],[6,2]]
    },
    {
      name: "4-18", title: "Raging Boi Sprint", desc: "A bad idea at high speed. Bring walls or emotional support.", startGlow: 500, background: "cloud", music: "battle", world: 4,
      waves: [[{type:"ragingBoi",row:0,delay:100},{type:"ragingBoi",row:2,delay:220},{type:"ragingBoi",row:4,delay:340}], [{type:"ragingBoi",row:1,delay:80},{type:"ragingBoi",row:3,delay:180},{type:"guntankBoi",row:2,delay:460}], [{type:"ragingBoi",row:0,delay:80},{type:"ragingBoi",row:1,delay:160},{type:"ragingBoi",row:2,delay:240},{type:"ragingBoi",row:3,delay:320},{type:"ragingBoi",row:4,delay:400}]], lava:[[2,0],[2,4]]
    },
    {
      name: "4-19", title: "Kaboom Cannon License Test", desc: "Lob shots, tank shots, alien shots. Everyone is shooting. Concerning.", startGlow: 620, background: "milkyway", music: "finalBoss", world: 4,
      waves: [[{type:"guntankBoi",row:0,delay:130},{type:"guntankBoi",row:4,delay:300}], [{type:"unknownCubes",row:2,delay:220},{type:"alienGun",row:1,delay:360},{type:"alienGun",row:3,delay:520}], [{type:"guntankBoi",row:1,delay:180},{type:"unknownCubes",row:2,delay:440},{type:"guntankBoi",row:3,delay:700}]], lava:[[4,0],[4,4],[5,2]]
    },
    {
      name: "4-20", title: "World 4 Actually Ends Here", desc: "The loopback curse is gone. Unfortunately, the enemies noticed.", startGlow: 700, background: "milkyway", music: "finalBoss", world: 4,
      waves: [[{type:"alienFinalBoss",row:2,delay:260}], [{type:"guntankBoi",row:0,delay:180},{type:"guntankBoi",row:4,delay:420},{type:"unknownCubes",row:2,delay:680}], [{type:"alienFinalBoss",row:2,delay:300},{type:"ragingBoi",row:0,delay:620},{type:"ragingBoi",row:4,delay:760},{type:"alienGod",row:1,delay:980},{type:"alienGod",row:3,delay:1120}]], lava:[[3,1],[3,3],[5,0],[5,4],[6,2]]
    }
  ];
  for (const lv of extraWorld4) if (!existingNames.has(lv.name)) CONFIG.levels.push(lv);

  // Add a few useful level metadata fields.
  for (const lv of CONFIG.levels) {
    const match = String(lv.name || "").match(/^(\d+)-/);
    lv.world = lv.world || (match ? Number(match[1]) : 0);
    lv.difficulty = lv.difficulty || (lv.boss ? "Boss" : lv.world >= 4 ? "Hard" : lv.world >= 3 ? "Medium" : "Starter");
    lv.tags = lv.tags || [];
  }

  // Make save migration gentle instead of exploding old saves.
  const oldSaveKeys = ["plantsAgainstDerps_v25_save", "plantsAgainstDerps_v26_save"];
  const existing = localStorage.getItem(CONFIG.saveKey);
  if (!existing) {
    for (const key of oldSaveKeys) {
      const data = localStorage.getItem(key);
      if (data) {
        localStorage.setItem(CONFIG.saveKey, data);
        break;
      }
    }
  }
}

applyPAD27Patch();

// Homepage UI polish override.
showMenu = function showMenu() {
  currentScreen = "menu";
  state = null;
  playMusic(CONFIG.audio.menuTrack);

  setScreen(`
    <div class="screen menu pad-home-v27">
      <div class="panel heroPanel">
        <div class="tiny">${CONFIG.version}</div>
        <h1 class="title">${CONFIG.gameTitle}</h1>
        <p class="sub">World 4 extended, Odd Alien fixed, Alien Gunner pew-pew repaired, and PAD Modder now has a fangame maker.</p>
        <div class="stack bigMenuButtons">
          <button class="btn good" onclick="showLevelSelect()">Play Story</button>
          <button class="btn" onclick="showMinigames()">Minigames</button>
          <button class="btn" onclick="showUpgrades()">Upgrade Plants</button>
          <button class="btn" onclick="showShop()">Twig Shop</button>
          <button class="btn" onclick="showAlmanac()">Meet Da Whatever</button>
          <button class="btn" onclick="showCustomLevels()">Custom Levels</button>
          <button class="btn warn" onclick="showSaveBackup()">Save Backup</button>
          <button class="btn good" onclick="window.open('mod/','_self')">Open PAD Modder / Fangame Forge</button>
        </div>
      </div>
      <div class="panel updatePanel">
        <div class="topbar">${currencyHtml()}</div>
        <h2>v2.7 update notes</h2>
        <div class="cards miniCards">
          <div class="card"><b>World 4 fixed</b><p class="tiny">Extra levels now extend into 4-11 through 4-20 instead of looping back to World 3.</p></div>
          <div class="card"><b>Alien fix</b><p class="tiny">Odd Alien uses alien.png; Alien Gunner has stronger fixed ranged behavior.</p></div>
          <div class="card"><b>New art</b><p class="tiny">Moss Cannon, Kaboom Cannon, Guntank Boi, Unknown Cubes, Three-Gun Prototype, and Raging Boi are included.</p></div>
          <div class="card"><b>Better modder</b><p class="tiny">Create levels, plants, and derps for fangames with grouped texture/config output.</p></div>
        </div>
      </div>
    </div>`);
};

showLevelSelect = function showLevelSelect() {
  currentScreen = "levels";
  playMusic(CONFIG.audio.menuTrack);
  const byWorld = new Map();
  CONFIG.levels.forEach((lv, i) => {
    const w = lv.world || 0;
    if (!byWorld.has(w)) byWorld.set(w, []);
    byWorld.get(w).push({ lv, i });
  });
  const groups = [...byWorld.entries()].sort((a,b)=>a[0]-b[0]).map(([world, items]) => `
    <section class="worldGroup">
      <h2>${world ? `World ${world}` : "Extras / Minigames-ish"}</h2>
      <div class="cards">
        ${items.map(({lv,i}) => {
          const unlocked = isLevelUnlocked(i);
          const clear = save.cleared[lv.name] ? "✅ Cleared" : "";
          return `<div class="card ${unlocked ? "" : "locked"}">
            <h3>${lv.name} ${lv.title || ""}</h3>
            <p class="tiny">${lv.desc || ""}</p>
            <p class="tiny">${clear} ${lv.difficulty ? `• ${lv.difficulty}` : ""}</p>
            <button class="btn good" ${unlocked ? "" : "disabled"} onclick="showLoadoutPicker(${i},'levels')">${unlocked ? "Pick Your Bullcrap" : "Locked"}</button>
          </div>`;
        }).join("")}
      </div>
    </section>`).join("");
  setScreen(`<div class="screen"><div class="topbar"><button class="btn" onclick="showMenu()">← Menu</button>${currencyHtml()}</div><h1 class="title">Level Selectr</h1><p class="sub">Grouped by world so World 4 does not pretend to be World 3 anymore.</p>${groups}</div>`);
};

showAlmanac = function showAlmanac() {
  const groupPlants = Object.entries(CONFIG.plantGroups || { all:{title:"Plants", plants:Object.keys(CONFIG.plants)} }).map(([gid, group]) => `
    <h2>${group.title}</h2>
    <div class="cards">${group.plants.filter(id => CONFIG.plants[id]).filter(id => !CONFIG.plants[id].hiddenPrototype || save.cleared["4-20"]).map(id => {
      const p = CONFIG.plants[id];
      return `<div class="card ${isPlantUnlocked(id) ? "" : "locked"}"><div class="row">${imgTag(p.img, 50)}<div><h3>${p.name}</h3><span class="tiny">${p.role || "Plant"} • ${isPlantUnlocked(id) ? "Unlocked" : "Locked"}</span></div></div><p class="tiny">${p.desc || ""}</p></div>`;
    }).join("")}</div>`).join("");

  const groupEnemies = Object.entries(CONFIG.enemyGroups || { all:{title:"Enemies", enemies:Object.keys(CONFIG.enemies)} }).map(([gid, group]) => `
    <h2>${group.title}</h2>
    <div class="cards">${group.enemies.filter(id => CONFIG.enemies[id]).map(id => {
      const e = CONFIG.enemies[id];
      return `<div class="card"><div class="row">${imgTag(e.img, 50)}<div><h3>${e.name}</h3><span class="tiny">HP ${e.hp} • Size ${e.size || 1}x ${e.rangedShooter ? "• Gunner" : ""}</span></div></div><p class="tiny">${e.desc || ""}</p></div>`;
    }).join("")}</div>`).join("");

  setScreen(`<div class="screen"><div class="topbar"><button class="btn" onclick="showMenu()">← Menu</button>${currencyHtml()}</div><h1 class="title">Meet Da Whatever</h1><p class="sub">Now grouped like the level/world system.</p>${groupPlants}${groupEnemies}</div>`);
};

// Hide unused prototype from loadout until later; the config remains for fangame makers.
const oldRenderLoadoutPicker_v27 = renderLoadoutPicker;
renderLoadoutPicker = function renderLoadoutPicker() {
  if (!pendingLoadout) return oldRenderLoadoutPicker_v27();
  const oldPlants = CONFIG.plants;
  const hidden = {};
  for (const [id,p] of Object.entries(CONFIG.plants)) {
    if (p.hiddenPrototype) hidden[id]=p;
  }
  for (const id of Object.keys(hidden)) delete CONFIG.plants[id];
  try { oldRenderLoadoutPicker_v27(); }
  finally { Object.assign(CONFIG.plants, hidden); }
};


// ============================================================
// PAD v2.8 - Clown Multiverse Update patch
// World 5, Blood Clown Moon, The Edge, merge balancing, challenge levels.
// ============================================================
function applyPAD28Patch() {
  CONFIG.version = "2.8 Clown Multiverse Update";
  CONFIG.gameTitle = "Plants Against Derps: Clown Multiverse";
  CONFIG.saveKey = "plantsAgainstDerps_v28_save";

  Object.assign(CONFIG.audio.tracks, {
    clownMultiverse: "audio/clownmultiverse.m4a",
    edge: "audio/nerd.m4a"
  });

  Object.assign(CONFIG.backgrounds, {
    clownBrown: "assets/bg-clown-brown.png",
    clownBlood: "assets/bg-clown-blood.png",
    clownChaos: "assets/bg-clown-chaos.png",
    clownTeal: "assets/bg-clown-teal.png",
    clownGreen: "assets/bg-clown-green.png",
    theEdge: "assets/bg-the-edge.png"
  });

  Object.assign(CONFIG.images, {
    darkMissileCannon: "assets/plant-dark-missile-cannon.png",
    eggPowerPlant: "assets/plant-egg-of-power.png",
    burntTreegun: "assets/plant-burnt-treegun.png",
    overgrownEye: "assets/plant-overgrown-eye.png",
    burningEye: "assets/plant-burning-eye.png",
    mrOrb: "assets/plant-mr-orb.png",
    eggPowerDerp: "assets/enemy-egg-of-power.png",
    curseDerp: "assets/enemy-curse-of-the-derp.png",
    puppetDerp: "assets/enemy-puppet-derp.png",
    clownCar: "assets/enemy-clown-car.png",
    clownDerp: "assets/enemy-clown-derp.png"
  });

  CONFIG.gameplay.maxPlantStack = 5;
  CONFIG.gameplay.stackCooldownFloor = 0.38;
  CONFIG.gameplay.bossDamageResist = 0.72;
  CONFIG.gameplay.bossPerHitDamageCap = 260;
  CONFIG.gameplay.bossOverperformerMult = 0.58;
  CONFIG.gameplay.challengeEveryFifth = true;
  CONFIG.gameplay.challengeHpMult = 1.28;
  CONFIG.gameplay.challengeSpeedMult = 1.10;
  CONFIG.gameplay.bloodMoonSpeedMult = 1.72;
  CONFIG.gameplay.bloodMoonSpawnDelayMult = 0.72;

  Object.assign(CONFIG.plants, {
    darkMissileCannon: {
      name: "Dark Missile Cannon", cost: 260, hp: 90, img: "darkMissileCannon",
      desc: "Fires slow heavy missiles that splash clown nonsense.", role: "Missile Splash", unlockAt: "5-2",
      shooter: true, fireType: "lob", shootCooldown: 260, projectileDamage: 130, areaRadius: 120, projectileSpeed: 4, placementCooldown: 480
    },
    eggPowerPlant: {
      name: "Egg of Power", cost: 190, hp: 160, img: "eggPowerPlant",
      desc: "A risky egg battery. Makes Glow, but World 5 derps seem to recognize it.", role: "Producer", unlockAt: "5-1",
      producer: true, produceAmount: 85, produceCooldown: 1400, placementCooldown: 360
    },
    burntTreegun: {
      name: "Burnt Treegun", cost: 135, hp: 80, img: "burntTreegun",
      desc: "A cursed Tree Gun variant. Better burst, worse recharge, much less boss-cheese.", role: "Cursed Shooter", unlockAt: "5-3",
      shooter: true, fireType: "straight", shootCooldown: 130, projectileDamage: 36, projectileSpeed: 6.2, placementCooldown: 260
    },
    overgrownEye: {
      name: "Overgrown Eye", cost: 210, hp: 115, img: "overgrownEye",
      desc: "Watches lanes and shoots nearby lanes when chaos gets too close.", role: "Lane Watcher", unlockAt: "5-4",
      shooter: true, fireType: "scatter", shootCooldown: 165, projectileDamage: 30, projectileSpeed: 5.4, placementCooldown: 340
    },
    burningEye: {
      name: "Burning Eye", cost: 235, hp: 100, img: "burningEye",
      desc: "Anti-clown focused eye. Bonus damage to clown and edge enemies.", role: "Anti-Clown", unlockAt: "5-5",
      shooter: true, fireType: "straight", shootCooldown: 92, projectileDamage: 31, projectileSpeed: 6.8,
      bonusVsTags: ["clown", "edge"], bonusMultiplier: 1.65, placementCooldown: 320
    },
    mrOrb: {
      name: "Mr. Orb", cost: 175, hp: 75, img: "mrOrb",
      desc: "Cheap orb shooter. Looks harmless, is not emotionally stable.", role: "Orb Shooter", unlockAt: "5-6",
      shooter: true, fireType: "straight", shootCooldown: 80, projectileDamage: 20, projectileSpeed: 7.1, doubleShotChance: 10, placementCooldown: 250
    }
  });

  Object.assign(CONFIG.enemies, {
    eggPowerDerp: { name: "Egg of Power", hp: 330, speed: 0.145, damage: 18, img: "eggPowerDerp", size: 1.20, tags: ["clown"], desc: "The egg chose the wrong side." },
    curseDerp: { name: "Curse of the Derp", hp: 540, speed: 0.105, damage: 26, img: "curseDerp", size: 1.30, tags: ["clown", "curse"], rangedShooter: true, shootCooldown: 150, shotDamage: 14, shotSpeed: 3.3, desc: "A curse with questionable handwriting." },
    puppetDerp: { name: "Puppet Derp", hp: 180, speed: 0.34, damage: 14, img: "puppetDerp", size: 0.95, tags: ["clown"], desc: "It walks like someone else is holding the keyboard." },
    clownCar: { name: "Clown Car", hp: 760, speed: 0.12, damage: 34, img: "clownCar", size: 1.55, tags: ["clown"], boss: true, desc: "Too many clowns, not enough warranty." },
    clownDerp: { name: "Clown Derp", hp: 145, speed: 0.44, damage: 12, img: "clownDerp", size: 0.95, tags: ["clown"], desc: "A fast clown problem." },
    edgeVoid: { name: "Edge Void", hp: 480, speed: 0.115, damage: 30, img: "curseDerp", size: 1.35, tags: ["edge"], boss: true, rangedShooter: true, shootCooldown: 120, shotDamage: 20, shotSpeed: 3.6, desc: "Something from the edge of the PAD universe." }
  });

  CONFIG.defaultLoadout = ["campfr", "treeGun", "rosegun", "soggyMattress", "kaboom"];

  CONFIG.plantGroups = CONFIG.plantGroups || {};
  CONFIG.plantGroups.clown = {
    title: "World 5 - Clown Multiverse Plants",
    plants: ["darkMissileCannon", "eggPowerPlant", "burntTreegun", "overgrownEye", "burningEye", "mrOrb"]
  };
  CONFIG.enemyGroups = CONFIG.enemyGroups || {};
  CONFIG.enemyGroups.clown = {
    title: "World 5 - Clown Multiverse Derps",
    enemies: ["eggPowerDerp", "curseDerp", "puppetDerp", "clownCar", "clownDerp"]
  };
  CONFIG.enemyGroups.edge = { title: "World 6 - The Edge", enemies: ["edgeVoid"] };

  const existing = new Set(CONFIG.levels.map(lv => lv.name));
  const rows = [0,1,2,3,4];
  const spam = (types, start=80, gap=90) => types.map((type, i) => ({ type, row: rows[i % 5], delay: start + i * gap }));
  const world5 = [
    { name: "5-1", title: "Clown Multiverse Opens", desc: "The board changes. The clown laws begin.", startGlow: 675, background: "clownBrown", music: "clownMultiverse", world: 5, difficulty: "Hard", bloodMoon: true, waves: [ spam(["clownDerp","basic","clownDerp"],80,110), spam(["puppetDerp","clownDerp","fast","clownDerp"],70,95), spam(["eggPowerDerp","clownDerp","puppetDerp","clownDerp"],120,130) ], lava: [[4,1],[4,3]] },
    { name: "5-2", title: "Red Blue Noise", desc: "Spam lanes. Bring walls and questionable confidence.", startGlow: 725, background: "clownChaos", music: "clownMultiverse", world: 5, difficulty: "Hard", bloodMoon: true, waves: [ spam(["clownDerp","clownDerp","puppetDerp","clownDerp","fast"],70,80), spam(["eggPowerDerp","clownDerp","clownDerp","puppetDerp","armored"],120,90), spam(["curseDerp","clownDerp","clownDerp","eggPowerDerp"],160,130) ], lava: [[3,0],[5,4]] },
    { name: "5-3", title: "Puppet Lane Panic", desc: "The puppets have entered their annoying era.", startGlow: 760, background: "clownTeal", music: "clownMultiverse", world: 5, difficulty: "Hard", bloodMoon: true, waves: [ spam(["puppetDerp","puppetDerp","clownDerp","puppetDerp"],70,85), spam(["curseDerp","puppetDerp","clownDerp","puppetDerp","eggPowerDerp"],120,100), spam(["puppetDerp","puppetDerp","puppetDerp","clownDerp","curseDerp"],80,80) ], lava: [[2,2],[6,2]] },
    { name: "5-4", title: "Eggs Should Not Move", desc: "Egg of Power shows up on both sides. This is a conflict of interest.", startGlow: 780, background: "clownGreen", music: "clownMultiverse", world: 5, difficulty: "Hard", bloodMoon: true, waves: [ spam(["eggPowerDerp","clownDerp","eggPowerDerp"],120,140), spam(["puppetDerp","eggPowerDerp","curseDerp","clownDerp"],90,120), spam(["eggPowerDerp","eggPowerDerp","clownDerp","curseDerp","puppetDerp"],120,110) ], lava: [[1,1],[7,3]] },
    { name: "5-5", title: "Challenge: Clown Car Incident", desc: "Every 5th level is nastier now. This one honks back.", startGlow: 850, background: "clownChaos", music: "clownMultiverse", world: 5, difficulty: "Challenge", challenge: true, bloodMoon: true, waves: [ spam(["clownDerp","puppetDerp","clownDerp","puppetDerp","clownDerp"],60,65), spam(["clownCar","clownDerp","clownDerp","eggPowerDerp"],150,150), spam(["clownCar","curseDerp","puppetDerp","clownDerp","clownDerp","eggPowerDerp"],180,125) ], lava: [[2,0],[2,4],[6,1],[6,3]] },
    { name: "5-6", title: "Orb Licensing Office", desc: "Mr. Orb arrives to make the clown multiverse slightly less legal.", startGlow: 820, background: "clownBrown", music: "clownMultiverse", world: 5, difficulty: "Hard", bloodMoon: true, waves: [ spam(["clownDerp","curseDerp","clownDerp"],80,100), spam(["puppetDerp","eggPowerDerp","clownDerp","curseDerp"],120,105), spam(["curseDerp","curseDerp","clownDerp","clownDerp","puppetDerp"],150,105) ], lava: [[3,1],[5,3]] },
    { name: "5-7", title: "Blood Moon Practice", desc: "The red background is not a decoration. It is a threat.", startGlow: 850, background: "clownTeal", music: "clownMultiverse", world: 5, difficulty: "Very Hard", bloodMoon: true, waves: [ spam(["clownDerp","clownDerp","clownDerp","puppetDerp","fast"],60,70), spam(["curseDerp","eggPowerDerp","clownDerp","clownDerp","puppetDerp"],100,90), spam(["clownCar","clownDerp","curseDerp","clownDerp","puppetDerp"],160,110) ], lava: [[4,0],[4,2],[4,4]] },
    { name: "5-8", title: "Too Many Doors", desc: "There are no doors. They arrive anyway.", startGlow: 875, background: "clownGreen", music: "clownMultiverse", world: 5, difficulty: "Very Hard", bloodMoon: true, waves: [ spam(["puppetDerp","clownDerp","puppetDerp","clownDerp","puppetDerp"],50,70), spam(["eggPowerDerp","curseDerp","clownDerp","eggPowerDerp","puppetDerp"],100,95), spam(["clownDerp","clownDerp","clownDerp","curseDerp","clownCar","clownDerp"],60,110) ], lava: [[1,0],[7,4]] },
    { name: "5-9", title: "Multiverse Traffic Jam", desc: "The clown cars found the highway and unfortunately it is your lawn.", startGlow: 925, background: "clownChaos", music: "clownMultiverse", world: 5, difficulty: "Very Hard", bloodMoon: true, waves: [ spam(["clownCar","clownDerp","puppetDerp"],180,130), spam(["clownCar","eggPowerDerp","curseDerp","clownDerp"],140,120), spam(["clownCar","clownCar","clownDerp","puppetDerp","curseDerp"],180,140) ], lava: [[2,1],[2,3],[6,1],[6,3]] },
    { name: "5-10", title: "Challenge: Honk End", desc: "World 5 ends with pure clown spam. The lawn is suing.", startGlow: 1050, background: "clownGreen", music: "clownMultiverse", world: 5, difficulty: "Challenge Boss", challenge: true, bloodMoon: true, waves: [ spam(["clownDerp","puppetDerp","clownDerp","puppetDerp","clownDerp","puppetDerp"],50,55), spam(["clownCar","curseDerp","eggPowerDerp","clownDerp","clownDerp"],140,95), spam(["clownCar","clownCar","curseDerp","eggPowerDerp","clownDerp","puppetDerp","clownDerp"],160,100) ], lava: [[1,1],[1,3],[4,2],[7,1],[7,3]] },
    { name: "6-1", title: "The Edge", desc: "The PAD universe runs out of safe places. This is a teaser for whatever comes next.", startGlow: 950, background: "theEdge", music: "edge", world: 6, difficulty: "Edge Teaser", waves: [ spam(["edgeVoid","curseDerp"],180,180), spam(["edgeVoid","puppetDerp","curseDerp"],160,150), spam(["edgeVoid","edgeVoid","clownDerp"],200,190) ], lava: [[4,0],[4,1],[4,3],[4,4]] }
  ];
  for (const lv of world5) if (!existing.has(lv.name)) CONFIG.levels.push(lv);

  for (const lv of CONFIG.levels) {
    const match = String(lv.name || "").match(/^(\d+)-(\d+)/);
    lv.world = lv.world || (match ? Number(match[1]) : 0);
    const num = match ? Number(match[2]) : 0;
    if (num && num % 5 === 0) {
      lv.challenge = true;
      if (!String(lv.difficulty || "").includes("Challenge")) lv.difficulty = "Challenge";
      lv.tags = Array.from(new Set([...(lv.tags || []), "challenge"]));
      lv.desc = (lv.desc || "") + (String(lv.desc || "").includes("Challenge") ? "" : " [Every 5th level challenge.] ");
    }
  }

  const oldSaveKeys = ["plantsAgainstDerps_v25_save", "plantsAgainstDerps_v26_save", "plantsAgainstDerps_v27_save"];
  if (!localStorage.getItem(CONFIG.saveKey)) {
    for (const key of oldSaveKeys) {
      const data = localStorage.getItem(key);
      if (data) { localStorage.setItem(CONFIG.saveKey, data); break; }
    }
  }
}

applyPAD28Patch();

const oldStartLevel_v28 = startLevel;
startLevel = function startLevel_v28(index = 0, listName = "levels", loadout = CONFIG.defaultLoadout) {
  oldStartLevel_v28(index, listName, loadout);
  if (!state) return;
  const level = state.level || {};
  state.challengeLevel = !!level.challenge;
  if (level.bloodMoon || level.world === 5) {
    state.bloodMoon = {
      active: false,
      nextTick: state.tick + rand(30 * 60, 60 * 60),
      endTick: 0,
      normalBackground: level.background,
      bloodBackground: "clownBlood"
    };
    state.texts.push({ x: CONFIG.board.canvasW/2, y: 45, text: "Blood Clown Moon can happen here.", color: "#ff7777", life: 120 });
  }
};

const oldGetStackMultiplier_v28 = getStackMultiplier;
getStackMultiplier = function getStackMultiplier_v28(p) {
  const lvl = getStackLevel(p);
  return Math.max(CONFIG.gameplay.stackCooldownFloor || 0.38, Math.pow(0.72, lvl - 1));
};

const oldStackPlant_v28 = stackPlant;
stackPlant = function stackPlant_v28(existing, def, id) {
  oldStackPlant_v28(existing, def, id);
  if (existing && existing.stack >= 4) {
    popText(existing.x, existing.y + 18, "soft cap", "#ffd36a");
  }
};

const oldSpawnEnemy_v28 = spawnEnemy;
spawnEnemy = function spawnEnemy_v28(sp) {
  const before = state?.enemies?.length || 0;
  const copy = { ...(sp || {}) };
  if (state?.challengeLevel) {
    const def = CONFIG.enemies[copy.type] || CONFIG.enemies.basic;
    copy.hp = Math.round(Number(copy.hp || def.hp) * (CONFIG.gameplay.challengeHpMult || 1.25));
    copy.speed = Number(copy.speed || def.speed) * (CONFIG.gameplay.challengeSpeedMult || 1.1);
  }
  if (state?.bloodMoon?.active) {
    const def = CONFIG.enemies[copy.type] || CONFIG.enemies.basic;
    copy.speed = Number(copy.speed || def.speed) * (CONFIG.gameplay.bloodMoonSpeedMult || 1.7);
  }
  oldSpawnEnemy_v28(copy);
  const e = state?.enemies?.[before];
  if (e && !e.baseSpeed) e.baseSpeed = e.speed;
};

const oldUpdateWaves_v28 = updateWaves;
updateWaves = function updateWaves_v28() {
  if (state?.bloodMoon?.active && state.waveActive && Array.isArray(state.spawnQueue)) {
    for (const s of state.spawnQueue) {
      if (!s._bloodAdjusted) {
        s.delay = Math.max(10, Math.round(s.delay * (CONFIG.gameplay.bloodMoonSpawnDelayMult || 0.72)));
        s._bloodAdjusted = true;
      }
    }
  }
  oldUpdateWaves_v28();
};

const oldUpdateEffects_v28 = updateEffects;
updateEffects = function updateEffects_v28() {
  oldUpdateEffects_v28();
  if (!state?.bloodMoon) return;
  const bm = state.bloodMoon;
  if (!bm.active && state.tick >= bm.nextTick) {
    bm.active = true;
    bm.endTick = state.tick + 10 * 60;
    state.shake = 10;
    state.texts.push({ x: CONFIG.board.canvasW/2, y: 72, text: "BLOOD CLOWN MOON", color: "#ff2b2b", life: 120 });
    playSfx("no");
  }
  if (bm.active && state.tick >= bm.endTick) {
    bm.active = false;
    bm.nextTick = state.tick + rand(30 * 60, 60 * 60);
    state.texts.push({ x: CONFIG.board.canvasW/2, y: 72, text: "the honking stops... for now", color: "#ffaaaa", life: 90 });
  }
  for (const e of state.enemies) {
    if (!e.baseSpeed) e.baseSpeed = e.speed;
    const mult = bm.active ? (CONFIG.gameplay.bloodMoonSpeedMult || 1.7) : 1;
    e.speed = e.baseSpeed * mult;
  }
};

const oldCalcDamage_v28 = calcDamage;
calcDamage = function calcDamage_v28(base, sourceId, target) {
  const res = oldCalcDamage_v28(base, sourceId, target);
  const enemyDef = CONFIG.enemies[target?.type] || {};
  if (enemyDef.boss || enemyDef.elite) {
    let mult = CONFIG.gameplay.bossDamageResist || 0.72;
    if (["treeGun", "threeGunPrototype", "burntTreegun", "starfruitKnockoff"].includes(sourceId)) {
      mult *= CONFIG.gameplay.bossOverperformerMult || 0.58;
    }
    res.dmg = Math.min(Math.round(res.dmg * mult), CONFIG.gameplay.bossPerHitDamageCap || 260);
  }
  return res;
};

const oldDrawBackground_v28 = drawBackground;
drawBackground = function drawBackground_v28() {
  if (state?.bloodMoon?.active) {
    const old = state.level.background;
    state.level.background = state.bloodMoon.bloodBackground;
    oldDrawBackground_v28();
    state.level.background = old;
    ctx.fillStyle = "rgba(120,0,0,.22)";
    ctx.fillRect(0,0,canvas.width,canvas.height);
    return;
  }
  oldDrawBackground_v28();
};

const oldUpdateHud_v28 = updateHud;
updateHud = function updateHud_v28() {
  oldUpdateHud_v28();
  const waveHud = document.getElementById("waveHud");
  if (waveHud && state?.bloodMoon?.active) waveHud.textContent += " • BLOOD MOON";
  if (waveHud && state?.challengeLevel) waveHud.textContent += " • CHALLENGE";
};

function showMenuV28Legacy() {
  currentScreen = "menu";
  state = null;
  playMusic(CONFIG.audio.menuTrack);
  setScreen(`
    <div class="screen menu pad-home-v27 pad-home-v28">
      <div class="panel heroPanel">
        <div class="tiny">${CONFIG.version}</div>
        <h1 class="title">${CONFIG.gameTitle}</h1>
        <p class="sub">World 5 is the Clown Multiverse: spam, Blood Clown Moon, new plants, clown derps, and better merge balancing.</p>
        <div class="stack bigMenuButtons">
          <button class="btn good" onclick="showLevelSelect()">Play Story</button>
          <button class="btn" onclick="showMinigames()">Minigames</button>
          <button class="btn" onclick="showUpgrades()">Upgrade Plants</button>
          <button class="btn" onclick="showShop()">Twig Shop</button>
          <button class="btn" onclick="showAlmanac()">Meet Da Whatever</button>
          <button class="btn" onclick="showCustomLevels()">Custom Levels</button>
          <button class="btn warn" onclick="showSaveBackup()">Save Backup</button>
          <button class="btn good" onclick="window.open('mod/','_self')">Open PAD Modder / Fangame Forge</button>
        </div>
      </div>
      <div class="panel updatePanel">
        <div class="topbar">${currencyHtml()}</div>
        <h2>v2.8 update notes</h2>
        <div class="cards miniCards">
          <div class="card"><b>World 5</b><p class="tiny">Clown Multiverse adds 10 chaotic levels, rotating backgrounds, and your clownmultiverse music.</p></div>
          <div class="card"><b>Blood Clown Moon</b><p class="tiny">Every 30–60 seconds in World 5, the red background appears for 10 seconds and derps speed up.</p></div>
          <div class="card"><b>Merge balance</b><p class="tiny">Stacking now has a cooldown soft cap and bosses resist boss-melting spam.</p></div>
          <div class="card"><b>Every 5th level</b><p class="tiny">5th/10th/etc. levels are marked as Challenge levels and get tougher pressure.</p></div>
          <div class="card"><b>World 6 teaser</b><p class="tiny">The Edge begins with a dark universe-ending board.</p></div>
        </div>
      </div>
    </div>`);
};

// Keep the v2.9 homepage active after older compatibility patches.
showMenu = showMenuV29;

boot();
