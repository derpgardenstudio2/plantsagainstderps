"use strict";

(function installPad29UI() {
  function openPvp() {
    window.location.href = "pvp/";
  }
  window.openPadPvp = openPvp;

  // main.js has already booted by the time this file runs.
  // Replace only the homepage function and leave all gameplay code untouched.
  window.showMenu = function showMenuV29() {
    currentScreen = "menu";
    state = null;
    playMusic(CONFIG.audio.menuTrack);

    setScreen(`
      <div class="screen pad29-home">
        <section class="panel">
          <h2 class="pad29-section-title">Main Game</h2>
          <div class="pad29-button-grid">
            <button class="btn good pad29-play" onclick="showLevelSelect()">PLAY</button>
            <button class="btn pad29-pvp" onclick="openPadPvp()">PVP EXPERIMENTAL</button>
            <button class="btn" onclick="showUpgrades()">Upgrade Plants</button>
            <button class="btn" onclick="showLoadoutPicker ? showLevelSelect() : showLevelSelect()">Equip Stuff</button>
            <button class="btn" onclick="showShop()">Shop</button>
            <button class="btn warn" onclick="showSaveBackup()">Saves</button>
          </div>
        </section>

        <section class="panel pad29-center">
          <div><span class="pad29-update-badge">UI + PVP UPDATE</span></div>
          <div class="pad29-logo">PAD</div>
          <p class="sub">Plants Against Derps</p>
          <p class="pad29-small">The regular game still uses your existing main.js. This page is only a safe UI layer.</p>
          <div class="topbar" style="justify-content:center">${currencyHtml()}</div>
          <button class="btn good pad29-minigames" onclick="showMinigames()">MINIGAMES</button>
        </section>

        <section class="panel">
          <h2 class="pad29-section-title">Tools & Extras</h2>
          <div class="pad29-button-grid">
            <button class="btn" onclick="showCustomLevels()">Level Maker</button>
            <button class="btn" onclick="window.location.href='mod/'">PAD Modder</button>
            <button class="btn" onclick="showAlmanac()">Meet Da Whatever</button>
            <button class="btn" onclick="alert('Changelog page coming with the full v2.9 update.')">Changelog</button>
            <button class="btn" onclick="showSaveBackup()">More</button>
            <button class="btn warn" onclick="console.log({CONFIG,save,state}); alert('Debug info printed to the Console.')">Debug</button>
          </div>
        </section>
      </div>
    `);
  };

  // Replace the already-rendered old homepage immediately.
  window.showMenu();
})();
