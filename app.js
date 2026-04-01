(() => {
  const config = window.CONNECTIONS_CONFIG;
  const solvedColours = ['var(--yellow)', 'var(--green)', 'var(--blue)', 'var(--purple)', 'var(--orange)', 'var(--rose)', 'var(--teal)'];

  const categoryPool = [
    ['Birds of prey', ['EAGLE', 'FALCON', 'HAWK', 'OWL']],
    ['Planets', ['MERCURY', 'VENUS', 'MARS', 'SATURN']],
    ['Gemstones', ['RUBY', 'OPAL', 'TOPAZ', 'JADE']],
    ['Dog breeds', ['BEAGLE', 'POODLE', 'BOXER', 'CORGI']],
    ['Tree types', ['MAPLE', 'CEDAR', 'BIRCH', 'SPRUCE']],
    ['Kitchen tools', ['WHISK', 'LADLE', 'TONGS', 'GRATER']],
    ['Board games', ['CHESS', 'CHECKERS', 'RISK', 'SCRABBLE']],
    ['Musical instruments', ['VIOLIN', 'TRUMPET', 'FLUTE', 'CELLO']],
    ['Sea creatures', ['OCTOPUS', 'LOBSTER', 'SEAL', 'TURTLE']],
    ['Flowers', ['TULIP', 'DAISY', 'LILAC', 'POPPY']],
    ['Canadian provinces', ['ALBERTA', 'ONTARIO', 'MANITOBA', 'QUEBEC']],
    ['Winter gear', ['PARKA', 'MITTENS', 'SCARF', 'TOQUE']],
    ['Math terms', ['ANGLE', 'RADIUS', 'VECTOR', 'FRACTION']],
    ['Baking ingredients', ['FLOUR', 'YEAST', 'COCOA', 'BUTTER']],
    ['Camping items', ['TENT', 'LANTERN', 'COOLER', 'SLEEPINGBAG']],
    ['Weather words', ['BLIZZARD', 'DRIZZLE', 'FOG', 'THUNDER']],
    ['Shoe types', ['SANDAL', 'LOAFER', 'SNEAKER', 'BOOT']],
    ['Camera terms', ['LENS', 'SHUTTER', 'FLASH', 'TRIPOD']],
    ['Office supplies', ['STAPLER', 'MARKER', 'BINDER', 'SCISSORS']],
    ['Farm animals', ['DONKEY', 'GOOSE', 'LLAMA', 'PIG']],
    ['Fruits', ['APPLE', 'BANANA', 'MANGO', 'PEACH']],
    ['Vegetables', ['CARROT', 'CELERY', 'RADISH', 'TURNIP']],
    ['Ice cream flavours', ['VANILLA', 'CHOCOLATE', 'PISTACHIO', 'STRAWBERRY']],
    ['Coffee drinks', ['LATTE', 'MOCHA', 'ESPRESSO', 'CAPPUCCINO']],
    ['Sports balls', ['BASEBALL', 'SOFTBALL', 'HANDBALL', 'DODGEBALL']],
    ['Card games', ['POKER', 'BRIDGE', 'RUMMY', 'EUCHRE']],
    ['Greek letters', ['ALPHA', 'BETA', 'DELTA', 'OMEGA']],
    ['School subjects', ['BIOLOGY', 'HISTORY', 'CHEMISTRY', 'ALGEBRA']],
    ['Art supplies', ['CANVAS', 'EASEL', 'PALETTE', 'CHARCOAL']],
    ['Laundry terms', ['DETERGENT', 'BLEACH', 'SOFTENER', 'HAMPER']],
    ['Bathroom items', ['MIRROR', 'TOWEL', 'SOAP', 'RAZOR']],
    ['Space words', ['COMET', 'ASTEROID', 'NEBULA', 'GALAXY']],
    ['Desserts', ['BROWNIE', 'CUPCAKE', 'CHEESECAKE', 'DONUT']],
    ['Sandwiches', ['PANINI', 'REUBEN', 'SUB', 'WRAP']],
    ['Common file types', ['PDF', 'DOCX', 'CSV', 'PNG']],
    ['Phone app tabs', ['HOME', 'SEARCH', 'PROFILE', 'SETTINGS']],
    ['Hair salon words', ['FRINGE', 'LAYER', 'BOB', 'PERM']],
    ['Painting verbs', ['BRUSH', 'ROLL', 'PRIME', 'VARNISH']],
    ['Types of pasta', ['PENNE', 'FUSILLI', 'RIGATONI', 'FARFALLE']],
    ['Car parts', ['BUMPER', 'AXLE', 'MIRRORCAP', 'MUFFLER']],
    ['Public transit words', ['TRANSFER', 'PLATFORM', 'TURNSTILE', 'TIMETABLE']],
    ['Construction materials', ['BRICK', 'CEMENT', 'PLYWOOD', 'REBAR']],
    ['Jewellery pieces', ['BROOCH', 'ANKLET', 'PENDANT', 'BANGLE']],
    ['Hospital rooms or areas', ['WARD', 'CLINIC', 'LAB', 'PHARMACY']],
    ['Tennis terms', ['SERVE', 'VOLLEY', 'LOB', 'DEUCE']],
    ['Theatre jobs', ['ACTOR', 'DIRECTOR', 'USHER', 'STAGEHAND']],
    ['Airport words', ['TERMINAL', 'GATE', 'RUNWAY', 'HANGAR']],
    ['Ocean zones', ['REEF', 'LAGOON', 'TRENCH', 'ESTUARY']],
    ['Common prefixes', ['PRE', 'SUB', 'ANTI', 'INTER']],
    ['Common suffixes', ['MENT', 'TION', 'NESS', 'ABLE']],
    ['Measurement tools', ['RULER', 'TAPE', 'CALIPER', 'COMPASS']],
    ['Park features', ['BENCH', 'FOUNTAIN', 'PAVILION', 'GAZEBO']],
    ['Room shapes', ['OVAL', 'SQUARE', 'ROUND', 'RECTANGLE']],
    ['Time units', ['SECOND', 'MINUTE', 'HOUR', 'DECADE']],
    ['Metal types', ['COPPER', 'NICKEL', 'TIN', 'ZINC']],
    ['Rock genres', ['PUNK', 'GRUNGE', 'INDIE', 'METAL']],
    ['Dance styles', ['BALLET', 'SALSA', 'TANGO', 'WALTZ']],
    ['Tropical storms words', ['EYEWALL', 'GUST', 'SURGE', 'CYCLONE']],
    ['Programming terms', ['LOOP', 'ARRAY', 'STRING', 'BOOLEAN']],
    ['Web browser words', ['TAB', 'BOOKMARK', 'COOKIE', 'EXTENSION']],
    ['Retail words', ['AISLE', 'COUPON', 'CHECKOUT', 'CLEARANCE']],
    ['Classroom furniture', ['DESK', 'LECTERN', 'CUBBY', 'WHITEBOARD']],
    ['Garden tasks', ['WEED', 'MULCH', 'PRUNE', 'WATER']],
    ['Road features', ['SHOULDER', 'MEDIAN', 'RAMP', 'TOLLBOOTH']],
    ['Camping cooking gear', ['SKILLET', 'BURNER', 'KETTLE', 'SPATULA']],
    ['Sewing words', ['THIMBLE', 'BOBBIN', 'SEAM', 'HEM']],
    ['Gym equipment', ['BARBELL', 'TREADMILL', 'KETTLEBELL', 'ROWER']],
    ['Office verbs', ['FILE', 'PRINT', 'SCROLL', 'ATTACH']],
    ['Wood shop tools', ['CHISEL', 'SANDER', 'LATHE', 'CLAMP']],
    ['Beach items', ['SUNSCREEN', 'UMBRELLA', 'COOLERBAG', 'FLIPFLOPS']],
    ['Common fabrics', ['DENIM', 'LINEN', 'SATIN', 'CORDUROY']],
    ['Breakfast foods', ['WAFFLE', 'OMELET', 'BAGEL', 'GRANOLA']],
    ['Ski hill words', ['GONDOLA', 'CHAIRLIFT', 'MOGUL', 'LODGE']],
    ['Map words', ['LEGEND', 'INSET', 'SCALEBAR', 'COMPASSROSE']],
    ['Store departments', ['BAKERY', 'PHARMACYDEPT', 'PRODUCE', 'DELI']],
    ['Phone hardware', ['SCREEN', 'BATTERY', 'CAMERA', 'SPEAKER']],
    ['Words on a cheque', ['PAYEE', 'MEMO', 'AMOUNT', 'SIGNATURE']],
    ['Puzzle words', ['CLUE', 'GRID', 'ACROSS', 'DOWN']],
    ['Home repair items', ['DRYWALL', 'CAULK', 'PUTTY', 'SANDPAPER']],
    ['Picnic items', ['PLAIDBLANKET', 'BASKET', 'THERMOS', 'NAPKINS']],
    ['Fishing gear', ['TACKLE', 'LURE', 'BOBBER', 'REEL']],
    ['Library words', ['STACKS', 'CATALOGUE', 'BOOKMARKER', 'CHECKOUTDESK']],
    ['Bakery display items', ['MUFFIN', 'CROISSANT', 'TART', 'SCONE']],
    ['Postal words', ['STAMP', 'ENVELOPE', 'POSTMARK', 'MAILBOX']],
    ['Scent words', ['MUSK', 'CITRUS', 'CEDARWOOD', 'VANILLABEAN']],
    ['Computer peripherals', ['KEYBOARD', 'MOUSE', 'WEBCAM', 'MICROPHONE']],
    ['Pool items', ['GOGGLES', 'KICKBOARD', 'LADDER', 'LANE']],
    ['Movie set jobs', ['GAFFER', 'GRIP', 'EDITOR', 'PRODUCER']],
    ['House styles', ['BUNGALOW', 'COTTAGE', 'DUPLEX', 'TOWNHOUSE']],
    ['Painting surfaces', ['WOODPANEL', 'PLASTER', 'MASONRY', 'DRYWALLBOARD']],
    ['Types of beans', ['KIDNEY', 'PINTO', 'NAVY', 'LENTIL']],
    ['Words after “snow”', ['BALL', 'CONE', 'DRIFT', 'FALL']],
    ['Words after “book”', ['MARK', 'CASE', 'SHELF', 'STORE']],
    ['Words after “hand”', ['SHAKE', 'WRITING', 'BAG', 'RAIL']],
    ['Words before “shop”', ['FLOWER', 'GIFT', 'COFFEE', 'BARBER']],
    ['Words before “room”', ['MAIL', 'NEWS', 'SUN', 'SHOW']],
    ['Words before “light”', ['DAY', 'MOON', 'FLASH', 'LAMP']],
    ['Words before “line”', ['HEAD', 'TAG', 'SKY', 'BASE']],
    ['Words before “board”', ['SKATE', 'SCORE', 'HEAD', 'CUP']],
    ['Words before “box”', ['TOOL', 'MAIL', 'JUKE', 'ICE']],
    ['Words before “house”', ['DOG', 'WARE', 'GREEN', 'PLAY']],
    ['Words before “stone”', ['MILE', 'GEM', 'TOMB', 'FLAG']],
    ['Words before “print”', ['BLUE', 'PAW', 'NEWS', 'FOOT']],
    ['Words after “star”', ['FISH', 'DUST', 'BOARD', 'LIGHT']],
    ['Words after “fire”', ['WORK', 'PLACE', 'HOUSE', 'BALL']],
    ['Words after “water”', ['FALL', 'FRONT', 'PROOF', 'MELON']],
    ['Words after “rain”', ['BOW', 'COAT', 'DROP', 'STORM']],
    ['Words after “moon”', ['LIGHT', 'BEAM', 'ROOF', 'STONE']],
    ['Words after “back”', ['PACK', 'DROP', 'BOARD', 'DOOR']],
    ['Words after “blue”', ['PRINT', 'BERRY', 'BIRD', 'MOON']],
    ['Words after “head”', ['BAND', 'LIGHT', 'BOARD', 'PHONE']],
    ['Words after “foot”', ['BALL', 'PRINT', 'NOTE', 'BRIDGE']],
    ['Words after “sun”', ['RISE', 'SET', 'BEAM', 'FLOWER']],
    ['Words after “note”', ['BOOK', 'CARD', 'PAD', 'WORTHY']]
  ].map(([title, words], index) => ({ id: `c${index + 1}`, title, words }));

  const boardEl = document.getElementById('board');
  const solvedTrayEl = document.getElementById('solvedTray');
  const mistakesEl = document.getElementById('mistakes');
  const groupsEl = document.getElementById('groups');
  const seedLabelEl = document.getElementById('seedLabel');
  const statusBannerEl = document.getElementById('statusBanner');
  const strikesEl = document.getElementById('strikes');
  const shuffleBtn = document.getElementById('shuffleBtn');
  const deselectBtn = document.getElementById('deselectBtn');

  const seedInfo = getSeedInfo(config.puzzleType);
  const storageKey = `${config.storagePrefix}:v3:${seedInfo.key}`;
  seedLabelEl.textContent = seedInfo.label;

  const puzzle = buildPuzzle(seedInfo.key, config.categoryCount);
  let state = loadState();
  if (!state || !Array.isArray(state.units)) state = createFreshState();
  normaliseState();
  render();

  shuffleBtn.addEventListener('click', () => {
    if (state.locked) return;
    shuffleUnits();
    saveState();
    renderBoard();
  });

  deselectBtn.addEventListener('click', () => {
    state.selected = [];
    saveState();
    renderBoard();
  });

  function createFreshState() {
    return {
      selected: [],
      solvedIds: [],
      mistakes: 0,
      locked: false,
      won: false,
      revealedOnLoss: false,
      statusMessage: '',
      units: puzzle.tiles.map(tile => ({
        id: `u-${tile.id}`,
        categoryId: tile.categoryId,
        tileIds: [tile.id]
      }))
    };
  }

  function normaliseState() {
    const validTileIds = new Set(puzzle.tiles.map(tile => tile.id));
    const validCategoryIds = new Set(puzzle.categories.map(cat => cat.id));

    state.solvedIds = (state.solvedIds || []).filter(id => validCategoryIds.has(id));
    state.units = (state.units || []).map(unit => ({
      id: unit.id || `u-${Math.random().toString(36).slice(2, 9)}`,
      categoryId: unit.categoryId,
      tileIds: Array.isArray(unit.tileIds) ? unit.tileIds.filter(id => validTileIds.has(id)) : []
    })).filter(unit => validCategoryIds.has(unit.categoryId) && unit.tileIds.length);

    const seenTileIds = new Set();
    state.units = state.units.filter(unit => {
      const deduped = unit.tileIds.filter(tileId => !seenTileIds.has(tileId));
      deduped.forEach(tileId => seenTileIds.add(tileId));
      unit.tileIds = deduped;
      return unit.tileIds.length > 0;
    });

    for (const tile of puzzle.tiles) {
      if (!seenTileIds.has(tile.id) && !state.solvedIds.includes(tile.categoryId)) {
        state.units.push({ id: `u-${tile.id}`, categoryId: tile.categoryId, tileIds: [tile.id] });
      }
    }

    state.selected = (state.selected || []).filter(id => state.units.some(unit => unit.id === id)).slice(0, 2);

    if (state.mistakes >= 4) {
      state.locked = true;
      state.revealedOnLoss = true;
    }
    if (state.solvedIds.length === puzzle.categories.length) {
      state.won = true;
      state.locked = true;
    }
  }

  function loadState() {
    try {
      const raw = localStorage.getItem(storageKey);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }

  function saveState() {
    localStorage.setItem(storageKey, JSON.stringify(state));
  }

  function buildPuzzle(seed, count) {
    const rng = mulberry32(hashString(`${config.storagePrefix}:${seed}`));
    const shuffledCategories = [...categoryPool];
    shuffleInPlace(shuffledCategories, rng);

    const chosenCategories = [];
    const usedWords = new Set();
    for (const cat of shuffledCategories) {
      const clash = cat.words.some(word => usedWords.has(word.toUpperCase()));
      if (clash) continue;
      chosenCategories.push(cat);
      cat.words.forEach(word => usedWords.add(word.toUpperCase()));
      if (chosenCategories.length === count) break;
    }

    if (chosenCategories.length !== count) {
      throw new Error(`Not enough unique categories to build a ${count}-group puzzle.`);
    }

    const categories = chosenCategories.map((cat, catIndex) => ({ ...cat, order: catIndex }));
    const tiles = categories.flatMap(cat => cat.words.map((word, wordIndex) => ({
      id: `${cat.id}-${wordIndex}`,
      word,
      categoryId: cat.id,
      categoryTitle: cat.title,
      order: wordIndex
    })));

    const shuffledTiles = [...tiles];
    shuffleInPlace(shuffledTiles, mulberry32(hashString(`${config.storagePrefix}:${seed}:tiles`)));

    return {
      categories,
      categoryById: new Map(categories.map(cat => [cat.id, cat])),
      tiles: shuffledTiles,
      tileById: new Map(tiles.map(tile => [tile.id, tile]))
    };
  }

  function setStatus(message) {
    state.statusMessage = message;
  }

  function render() {
    renderMeta();
    renderStrikes();
    renderSolvedTray();
    renderBoard();
  }

  function renderMeta() {
    mistakesEl.textContent = String(state.mistakes);
    groupsEl.textContent = `${state.solvedIds.length} / ${puzzle.categories.length}`;
    statusBannerEl.textContent = state.statusMessage || '';
  }

  function renderStrikes() {
    strikesEl.innerHTML = '';
    for (let i = 0; i < 4; i += 1) {
      const dot = document.createElement('span');
      dot.className = `strike-dot${i < state.mistakes ? ' used' : ''}`;
      strikesEl.appendChild(dot);
    }
  }

  function renderSolvedTray() {
    solvedTrayEl.innerHTML = '';
    const visibleIds = state.revealedOnLoss ? puzzle.categories.map(cat => cat.id) : state.solvedIds;
    visibleIds.forEach((categoryId, index) => {
      const cat = puzzle.categoryById.get(categoryId);
      const card = document.createElement('article');
      card.className = 'solved-card';
      card.style.background = solvedColours[index % solvedColours.length];
      const title = document.createElement('p');
      title.className = 'solved-title';
      title.textContent = cat.title;
      const words = document.createElement('p');
      words.className = 'solved-words';
      words.textContent = cat.words.map(formatDisplayWord).join(', ');
      card.append(title, words);
      solvedTrayEl.appendChild(card);
    });
  }

  function renderBoard() {
    boardEl.innerHTML = '';
    getVisibleUnits().forEach(unit => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = `tile size-${Math.min(unit.tileIds.length, 4)}${unit.tileIds.length >= 2 ? ' grouped' : ''}`;
      const isSelected = state.selected.includes(unit.id);
      if (isSelected) btn.classList.add('selected');
      btn.setAttribute('aria-pressed', String(isSelected));
      btn.addEventListener('click', () => toggleUnit(unit.id));

      const label = document.createElement('span');
      label.className = 'tile-label';
      label.textContent = formatUnitLabel(unit);
      btn.appendChild(label);
      boardEl.appendChild(btn);
    });
  }

  function getVisibleUnits() {
    return state.units.filter(unit => !state.solvedIds.includes(unit.categoryId));
  }

  function formatUnitLabel(unit) {
    const words = unit.tileIds
      .map(id => puzzle.tileById.get(id))
      .filter(Boolean)
      .sort((a, b) => a.order - b.order)
      .map(tile => formatDisplayWord(tile.word));
    return words.join(', ');
  }

  function formatDisplayWord(word) {
    const spaced = word
      .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
      .replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2')
      .replace(/_/g, ' ')
      .trim()
      .toLowerCase();
    return spaced ? spaced.charAt(0).toUpperCase() + spaced.slice(1) : '';
  }

  function toggleUnit(unitId) {
    if (state.locked) return;
    if (state.selected.includes(unitId)) {
      state.selected = state.selected.filter(id => id !== unitId);
      saveState();
      renderBoard();
      return;
    }

    if (state.selected.length >= 2) return;
    state.selected = [...state.selected, unitId];

    if (state.selected.length === 2) {
      resolvePair();
      return;
    }

    saveState();
    renderBoard();
  }

  function resolvePair() {
    const [firstId, secondId] = state.selected;
    const first = state.units.find(unit => unit.id === firstId);
    const second = state.units.find(unit => unit.id === secondId);
    if (!first || !second) {
      state.selected = [];
      saveState();
      render();
      return;
    }

    if (first.categoryId === second.categoryId) {
      const merged = {
        id: `u-${first.categoryId}-${Date.now().toString(36)}`,
        categoryId: first.categoryId,
        tileIds: [...new Set([...first.tileIds, ...second.tileIds])]
      };
      state.units = state.units.filter(unit => unit.id !== firstId && unit.id !== secondId);

      if (merged.tileIds.length >= 4) {
        if (!state.solvedIds.includes(merged.categoryId)) state.solvedIds.push(merged.categoryId);
        setStatus('Correct.');
      } else {
        state.units.push(merged);
        setStatus('Match found.');
      }

      if (state.solvedIds.length === puzzle.categories.length) {
        state.won = true;
        state.locked = true;
        setStatus('Solved. A new puzzle will appear automatically on the next date or week.');
      }
    } else {
      state.mistakes += 1;
      setStatus('Not a match.');
      if (state.mistakes >= 4) {
        state.locked = true;
        state.revealedOnLoss = true;
        setStatus('Out of mistakes. The groups are shown below.');
      }
    }

    state.selected = [];
    saveState();
    render();
  }

  function shuffleUnits() {
    const visible = getVisibleUnits();
    shuffleInPlace(visible, mulberry32(hashString(`${storageKey}:${Date.now()}`)));
    const visibleIds = new Set(visible.map(unit => unit.id));
    const hidden = state.units.filter(unit => !visibleIds.has(unit.id));
    state.units = [...visible, ...hidden];
  }

  function getSeedInfo(type) {
    const now = new Date();
    const local = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    if (type === 'weekly') {
      const day = local.getDay();
      const mondayOffset = day === 0 ? -6 : 1 - day;
      const monday = new Date(local);
      monday.setDate(local.getDate() + mondayOffset);
      return { key: formatDateKey(monday), label: formatLongDate(monday) };
    }
    return { key: formatDateKey(local), label: formatLongDate(local) };
  }

  function formatDateKey(date) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }

  function formatLongDate(date) {
    return new Intl.DateTimeFormat('en-CA', { year: 'numeric', month: 'long', day: 'numeric' }).format(date);
  }

  function hashString(str) {
    let h = 1779033703 ^ str.length;
    for (let i = 0; i < str.length; i += 1) {
      h = Math.imul(h ^ str.charCodeAt(i), 3432918353);
      h = (h << 13) | (h >>> 19);
    }
    return () => {
      h = Math.imul(h ^ (h >>> 16), 2246822507);
      h = Math.imul(h ^ (h >>> 13), 3266489909);
      return (h ^= h >>> 16) >>> 0;
    };
  }

  function mulberry32(seedFactory) {
    let t = typeof seedFactory === 'function' ? seedFactory() : seedFactory;
    return function() {
      t += 0x6D2B79F5;
      let x = Math.imul(t ^ (t >>> 15), t | 1);
      x ^= x + Math.imul(x ^ (x >>> 7), x | 61);
      return ((x ^ (x >>> 14)) >>> 0) / 4294967296;
    };
  }

  function shuffleInPlace(arr, rng) {
    for (let i = arr.length - 1; i > 0; i -= 1) {
      const j = Math.floor(rng() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }
})();
