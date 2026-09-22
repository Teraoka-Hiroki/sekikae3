/**
 * 席替えアプリ (sekikae2) - JavaScript Application Engine
 * Machine Learning (K-Means) & Mathematical Optimization (Simulated Annealing)
 */

// Sample Data loaded from student.xlsx
const DEFAULT_STUDENT_DATA = [
  { "No": 1, "Name": "山田 花音", "国語": 1, "数学": 4, "理科": 4, "社会": 5, "英語": 8, "積極性": 2, "協調性": 4 },
  { "No": 2, "Name": "佐藤 陽太", "国語": 4, "数学": 4, "理科": 5, "社会": 4, "英語": 1, "積極性": 6, "協調性": 3 },
  { "No": 3, "Name": "高橋 美咲", "国語": 1, "数学": 7, "理科": 8, "社会": 5, "英語": 2, "積極性": 5, "協調性": 8 },
  { "No": 4, "Name": "鈴木 悠真", "国語": 6, "数学": 5, "理科": 5, "社会": 4, "英語": 8, "積極性": 3, "協調性": 8 },
  { "No": 5, "Name": "田中 結菜", "国語": 7, "数学": 7, "理科": 6, "社会": 4, "英語": 6, "積極性": 6, "協調性": 3 },
  { "No": 6, "Name": "伊藤 海斗", "国語": 6, "数学": 6, "理科": 2, "社会": 3, "英語": 3, "積極性": 6, "協調性": 6 },
  { "No": 7, "Name": "渡辺 莉子", "国語": 8, "数学": 10, "理科": 1, "社会": 4, "英語": 5, "積極性": 6, "協調性": 3 },
  { "No": 8, "Name": "中村 陽翔", "国語": 10, "数学": 5, "理科": 5, "社会": 4, "英語": 1, "積極性": 5, "協調性": 7 },
  { "No": 9, "Name": "小林 心春", "国語": 4, "数学": 2, "理科": 9, "社会": 7, "英語": 5, "積極性": 6, "協調性": 6 },
  { "No": 10, "Name": "加藤 晴", "国語": 8, "数学": 6, "理科": 4, "社会": 2, "英語": 4, "積極性": 4, "協調性": 6 },
  { "No": 11, "Name": "吉田 陽菜", "国語": 7, "数学": 6, "理科": 4, "社会": 3, "英語": 3, "積極性": 6, "協調性": 4 },
  { "No": 12, "Name": "山本 蓮", "国語": 3, "数学": 5, "理科": 4, "社会": 7, "英語": 5, "積極性": 8, "協調性": 7 },
  { "No": 13, "Name": "木村 美羽", "国語": 6, "数学": 6, "理科": 4, "社会": 6, "英語": 7, "積極性": 6, "協調性": 5 },
  { "No": 14, "Name": "松本 大和", "国語": 7, "数学": 5, "理科": 7, "社会": 9, "英語": 7, "積極性": 6, "協調性": 8 },
  { "No": 15, "Name": "井上 優月", "国語": 5, "数学": 4, "理科": 7, "社会": 3, "英語": 7, "積極性": 2, "協調性": 6 },
  { "No": 16, "Name": "清水 琉生", "国語": 7, "数学": 4, "理科": 2, "社会": 6, "英語": 5, "積極性": 4, "協調性": 6 },
  { "No": 17, "Name": "林 柚葉", "国語": 6, "数学": 8, "理科": 1, "社会": 5, "英語": 5, "積極性": 4, "協調性": 7 },
  { "No": 18, "Name": "斎藤 翼", "国語": 6, "数学": 8, "理科": 7, "社会": 7, "英語": 3, "積極性": 1, "協調性": 7 },
  { "No": 19, "Name": "山口 詩", "国語": 6, "数学": 3, "理科": 7, "社会": 7, "英語": 8, "積極性": 8, "協調性": 4 },
  { "No": 20, "Name": "森 菜月", "国語": 4, "数学": 3, "理科": 7, "社会": 2, "英語": 7, "積極性": 2, "協調性": 4 },
  { "No": 21, "Name": "石川 結翔", "国語": 1, "数学": 5, "理科": 6, "社会": 5, "英語": 3, "積極性": 4, "協調性": 4 },
  { "No": 22, "Name": "橋本 蒼", "国語": 3, "数学": 2, "理科": 5, "社会": 5, "英語": 2, "積極性": 4, "協調性": 10 },
  { "No": 23, "Name": "池田 莉央", "国語": 4, "数学": 4, "理科": 6, "社会": 4, "英語": 6, "積極性": 8, "協調性": 5 },
  { "No": 24, "Name": "長谷川 駿", "国語": 7, "数学": 4, "理科": 6, "社会": 8, "英語": 7, "積極性": 5, "協調性": 6 },
  { "No": 25, "Name": "岡田 小春", "国語": 4, "数学": 2, "理科": 6, "社会": 6, "英語": 7, "積極性": 7, "協調性": 5 },
  { "No": 26, "Name": "カリム・ハッサン", "国語": 3, "数学": 4, "理科": 8, "社会": 7, "英語": 8, "積極性": 2, "協調性": 5 },
  { "No": 27, "Name": "エミリー・ジョーンズ", "国語": 3, "数学": 4, "理科": 5, "社会": 7, "英語": 6, "積極性": 3, "協調性": 5 },
  { "No": 28, "Name": "チェ・ユジン", "国語": 2, "数学": 4, "理科": 5, "社会": 3, "英語": 1, "積極性": 10, "協調性": 6 },
  { "No": 29, "Name": "藤田 陽和", "国語": 6, "数学": 7, "理科": 5, "社会": 2, "英語": 5, "積極性": 4, "協調性": 9 },
  { "No": 30, "Name": "大野 瑠依", "国語": 6, "数学": 4, "理科": 8, "社会": 6, "英語": 4, "積極性": 3, "協調性": 6 }
];

// App State
const state = {
  rawStudents: [],
  students: [],
  traitKeys: [],
  cols: 6,
  rows: 5,
  fixedSeats: {}, // seatIndex (number) -> studentNo (number)
  currentSeats: [], // Array of student objects or null
  activeTab: 'random', // 'random' or 'homogeneous'
  isCalculating: false,
  clusterCount: 6,
  charts: {}
};

// Colors for the 6 clusters
const CLUSTER_COLORS = [
  '#f43f5e', // 0: ローズレッド
  '#3b82f6', // 1: サファイアブルー
  '#2ec98f', // 2: ジェイドグリーン
  '#f6b40e', // 3: ゴールドイエロー
  '#b06ef7', // 4: アメジストパープル
  '#f06fb4'  // 5: ローズピンク
];

const CLUSTER_NAMES = [
  'クラスタ 1', 'クラスタ 2', 'クラスタ 3',
  'クラスタ 4', 'クラスタ 5', 'クラスタ 6'
];

// Initialize on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  initApp();
});

function initApp() {
  setupEventListeners();
  loadData(DEFAULT_STUDENT_DATA);
}

function setupEventListeners() {
  // File Upload Listener
  const fileInput = document.getElementById('excelFileInput');
  if (fileInput) {
    fileInput.addEventListener('change', handleFileUpload);
  }

  // Load Sample Data Button
  const btnSample = document.getElementById('btnLoadSample');
  if (btnSample) {
    btnSample.addEventListener('click', () => loadData(DEFAULT_STUDENT_DATA));
  }

  // Column Count Input
  const colInput = document.getElementById('gridColsInput');
  if (colInput) {
    colInput.addEventListener('change', (e) => {
      let val = parseInt(e.target.value, 10);
      if (isNaN(val) || val < 1) val = 6;
      state.cols = val;
      recalculateGrid();
    });
  }

  // Tab buttons
  const tabRandom = document.getElementById('tabRandom');
  const tabHomogeneous = document.getElementById('tabHomogeneous');
  if (tabRandom && tabHomogeneous) {
    tabRandom.addEventListener('click', () => switchTab('random'));
    tabHomogeneous.addEventListener('click', () => switchTab('homogeneous'));
  }

  // Optimization start button
  const btnOptimize = document.getElementById('btnStartOptimize');
  if (btnOptimize) {
    btnOptimize.addEventListener('click', startOptimization);
  }

  // Reset button
  const btnReset = document.getElementById('btnResetSeats');
  if (btnReset) {
    btnReset.addEventListener('click', resetSeats);
  }

  // Print button
  const btnPrint = document.getElementById('btnPrintLayout');
  if (btnPrint) {
    btnPrint.addEventListener('click', () => window.print());
  }

  // Export CSV button
  const btnExport = document.getElementById('btnExportCSV');
  if (btnExport) {
    btnExport.addEventListener('click', exportToCSV);
  }

  // Math explanation toggle modal
  const btnMathExplanation = document.getElementById('btnMathExplanation');
  const mathModal = document.getElementById('mathModal');
  const btnCloseMathModal = document.getElementById('btnCloseMathModal');

  if (btnMathExplanation && mathModal) {
    btnMathExplanation.addEventListener('click', () => {
      mathModal.classList.remove('hidden');
      // Trigger KaTeX rendering if available
      if (window.renderMathInElement) {
        window.renderMathInElement(mathModal, {
          delimiters: [
            {left: '$$', right: '$$', display: true},
            {left: '\\[', right: '\\]', display: true},
            {left: '$', right: '$', display: false},
            {left: '\\(', right: '\\)', display: false}
          ]
        });
      }
    });
  }
  if (btnCloseMathModal && mathModal) {
    btnCloseMathModal.addEventListener('click', () => mathModal.classList.add('hidden'));
  }
}

/**
 * Handle Excel or CSV file upload using SheetJS
 */
function handleFileUpload(e) {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(evt) {
    try {
      const data = new Uint8Array(evt.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];
      const json = XLSX.utils.sheet_to_json(worksheet);

      if (!json || json.length === 0) {
        alert('ファイルからデータを読み込めませんでした。形式を確認してください。');
        return;
      }
      loadData(json);
    } catch (err) {
      console.error(err);
      alert('ファイルの解析中にエラーが発生しました: ' + err.message);
    }
  };
  reader.readAsArrayBuffer(file);
}

/**
 * Process Raw Student Dataset
 */
function loadData(rawData) {
  state.rawStudents = rawData;
  state.fixedSeats = {}; // clear fixed seats on new data

  if (rawData.length === 0) return;

  // Detect Student No, Name, and Trait Keys
  const keys = Object.keys(rawData[0]);
  const noKey = keys.find(k => k.toLowerCase() === 'no' || k === '出席番号' || k === '番号') || keys[0];
  const nameKey = keys.find(k => k.toLowerCase() === 'name' || k === '氏名' || k === '名前' || k === '生徒名') || keys[1];
  
  // Numerical trait keys (excluding No and Name)
  state.traitKeys = keys.filter(k => k !== noKey && k !== nameKey && typeof rawData[0][k] === 'number');

  // Normalize Students
  state.students = rawData.map((item, idx) => {
    const studentNo = parseInt(item[noKey], 10) || (idx + 1);
    const studentName = String(item[nameKey] || `生徒 ${studentNo}`);
    const traits = {};
    state.traitKeys.forEach(t => {
      traits[t] = parseFloat(item[t]) || 0;
    });

    return {
      No: studentNo,
      Name: studentName,
      traits: traits,
      rawItem: item,
      cluster: 0,
      normalizedVector: []
    };
  });

  // Calculate Standardized Z-Scores
  computeZScores();

  // Run K-Means Clustering ($K=6$)
  runKMeansClustering();

  // Recalculate Classroom Grid
  recalculateGrid();

  // Render UI Components
  renderRosterTable();
  renderClusterAnalytics();

  showNotification(`名簿データをロードしました (${state.students.length}名, ${state.traitKeys.length}特性)`);
}

/**
 * Standardize features via Z-score normalization
 */
function computeZScores() {
  const traitStats = {};

  state.traitKeys.forEach(key => {
    const values = state.students.map(s => s.traits[key]);
    const mean = values.reduce((a, b) => a + b, 0) / values.length;
    const std = Math.sqrt(values.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / values.length) || 1;
    traitStats[key] = { mean, std };
  });

  state.students.forEach(s => {
    s.normalizedVector = state.traitKeys.map(key => {
      const stats = traitStats[key];
      return (s.traits[key] - stats.mean) / stats.std;
    });
  });
}

/**
 * K-Means Clustering Algorithm ($K=6$)
 */
function runKMeansClustering() {
  const K = Math.min(state.clusterCount, state.students.length);
  if (K === 0) return;

  const numFeatures = state.traitKeys.length;
  if (numFeatures === 0) return;

  // Initialize Centroids using K-Means++
  let centroids = [];
  centroids.push([...state.students[Math.floor(Math.random() * state.students.length)].normalizedVector]);

  for (let k = 1; k < K; k++) {
    const distances = state.students.map(s => {
      let minDist = Infinity;
      centroids.forEach(c => {
        const d = euclideanDistance(s.normalizedVector, c);
        if (d < minDist) minDist = d;
      });
      return minDist * minDist;
    });

    const sumDist = distances.reduce((a, b) => a + b, 0);
    let randVal = Math.random() * sumDist;
    let chosenIdx = 0;
    for (let i = 0; i < distances.length; i++) {
      randVal -= distances[i];
      if (randVal <= 0) {
        chosenIdx = i;
        break;
      }
    }
    centroids.push([...state.students[chosenIdx].normalizedVector]);
  }

  // Iterate Centroid updates
  let changed = true;
  let iter = 0;
  const maxIter = 100;

  while (changed && iter < maxIter) {
    iter++;
    changed = false;

    // Step 1: Assign clusters
    state.students.forEach(s => {
      let minDist = Infinity;
      let closestCluster = 0;
      centroids.forEach((c, cIdx) => {
        const dist = euclideanDistance(s.normalizedVector, c);
        if (dist < minDist) {
          minDist = dist;
          closestCluster = cIdx;
        }
      });

      if (s.cluster !== closestCluster) {
        s.cluster = closestCluster;
        changed = true;
      }
    });

    // Step 2: Update centroids
    const newCentroids = Array.from({ length: K }, () => new Array(numFeatures).fill(0));
    const counts = new Array(K).fill(0);

    state.students.forEach(s => {
      const cIdx = s.cluster;
      counts[cIdx]++;
      for (let f = 0; f < numFeatures; f++) {
        newCentroids[cIdx][f] += s.normalizedVector[f];
      }
    });

    for (let k = 0; k < K; k++) {
      if (counts[k] > 0) {
        for (let f = 0; f < numFeatures; f++) {
          newCentroids[k][f] /= counts[k];
        }
      } else {
        newCentroids[k] = [...state.students[Math.floor(Math.random() * state.students.length)].normalizedVector];
      }
    }
    centroids = newCentroids;
  }
}

/**
 * Euclidean Distance
 */
function euclideanDistance(vecA, vecB) {
  let sum = 0;
  for (let i = 0; i < vecA.length; i++) {
    const diff = vecA[i] - vecB[i];
    sum += diff * diff;
  }
  return Math.sqrt(sum);
}

/**
 * Recalculate Grid Dimensions and sync seating layout
 */
function recalculateGrid() {
  const totalStudents = state.students.length;
  state.rows = Math.ceil(totalStudents / state.cols);
  const totalSeats = state.rows * state.cols;

  // Initialize current seats array with default order
  state.currentSeats = new Array(totalSeats).fill(null);
  for (let i = 0; i < totalStudents; i++) {
    state.currentSeats[i] = state.students[i];
  }

  // Apply fixed seat locks
  applyFixedSeats();

  renderClassroomGrid();
}

/**
 * Apply fixed seats state to currentSeats
 */
function applyFixedSeats() {
  const totalSeats = state.currentSeats.length;

  Object.keys(state.fixedSeats).forEach(seatIdxStr => {
    const seatIdx = parseInt(seatIdxStr, 10);
    const studentNo = state.fixedSeats[seatIdxStr];

    if (seatIdx < totalSeats) {
      const targetStudent = state.students.find(s => s.No === studentNo);
      if (targetStudent) {
        const currentStudentAtSeat = state.currentSeats[seatIdx];

        if (!currentStudentAtSeat || currentStudentAtSeat.No !== studentNo) {
          // Find where target student currently is
          const prevIdx = state.currentSeats.findIndex(s => s && s.No === studentNo);
          
          if (prevIdx !== -1) {
            // Swap
            state.currentSeats[seatIdx] = targetStudent;
            state.currentSeats[prevIdx] = currentStudentAtSeat;
          } else {
            state.currentSeats[seatIdx] = targetStudent;
          }
        }
      }
    }
  });
}

/**
 * Switch Active Tab
 */
function switchTab(tabName) {
  state.activeTab = tabName;

  const tabRandom = document.getElementById('tabRandom');
  const tabHomogeneous = document.getElementById('tabHomogeneous');
  const modeDesc = document.getElementById('modeDescription');

  if (tabName === 'random') {
    tabRandom.className = "px-6 py-3 rounded-lg font-medium text-sm bg-cyan-500 text-white transition-all cursor-pointer flex items-center gap-2";
    tabHomogeneous.className = "px-6 py-3 rounded-lg font-medium text-sm bg-slate-800 text-slate-300 hover:bg-slate-700 transition-all cursor-pointer flex items-center gap-2";
    if (modeDesc) {
      modeDesc.innerHTML = `<span class="text-cyan-400 font-normal">【異質分散配置 (ランダム分散)】</span>: 学力や性格の特性が互いに異なる生徒同士が隣り合うように、K-Meansと焼きなまし法で離隔距離を最大化します。固定指定された生徒の席は動かしません。`;
    }
  } else {
    tabHomogeneous.className = "px-6 py-3 rounded-lg font-medium text-sm bg-cyan-500 text-white transition-all cursor-pointer flex items-center gap-2";
    tabRandom.className = "px-6 py-3 rounded-lg font-medium text-sm bg-slate-800 text-slate-300 hover:bg-slate-700 transition-all cursor-pointer flex items-center gap-2";
    if (modeDesc) {
      modeDesc.innerHTML = `<span class="text-emerald-400 font-normal">【同質近接配置】</span>: 特性が似ている生徒や同じクラスタの生徒が近い位置に集まるように数理最適化を行います。固定指定された生徒の席は動かしません。`;
    }
  }
}

const REEL_SYMBOLS = ['1', '3', '5', '7', 'BAR', '★', '席'];

const pachinkoFX = {
  canvas: null,
  ctx: null,
  raf: null,
  balls: [],
  pegs: [],
  running: false,
  fever: false,
  phase: 'spin',
  ledTimer: null,
  ledIndex: 0,
  spawnAcc: 0,
  audio: null
};

function initPachinkoAudio() {
  if (pachinkoFX.audio) return pachinkoFX.audio;
  const AudioCtx = window.AudioContext || window.webkitAudioContext;
  if (!AudioCtx) return null;
  pachinkoFX.audio = new AudioCtx();
  return pachinkoFX.audio;
}

function pachinkoBeep(freq, dur, type, gain) {
  const ctx = initPachinkoAudio();
  if (!ctx) return;
  if (ctx.state === 'suspended') ctx.resume();
  const osc = ctx.createOscillator();
  const g = ctx.createGain();
  osc.type = type || 'square';
  osc.frequency.value = freq;
  g.gain.setValueAtTime(gain || 0.04, ctx.currentTime);
  g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + dur);
  osc.connect(g);
  g.connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + dur);
}

function buildPachinkoLeds() {
  const wrap = document.getElementById('pachinkoLeds');
  if (!wrap || wrap.childElementCount) return;
  const n = 48;
  for (let i = 0; i < n; i++) {
    const t = i / n;
    const perim = 2 * (100 + 100);
    let d = t * perim;
    let x, y;
    if (d < 100) { x = d; y = 0; }
    else if (d < 200) { x = 100; y = d - 100; }
    else if (d < 300) { x = 100 - (d - 200); y = 100; }
    else { x = 0; y = 100 - (d - 300); }
    const led = document.createElement('span');
    led.className = 'led';
    led.style.left = x + '%';
    led.style.top = y + '%';
    wrap.appendChild(led);
  }
}

function chasePachinkoLeds() {
  const leds = document.querySelectorAll('#pachinkoLeds .led');
  if (!leds.length) return;
  leds.forEach((led, i) => {
    const windowSize = pachinkoFX.fever ? 18 : 8;
    const on = ((i - pachinkoFX.ledIndex + leds.length) % leds.length) < windowSize;
    led.classList.toggle('on', on);
  });
  pachinkoFX.ledIndex = (pachinkoFX.ledIndex + (pachinkoFX.fever ? 3 : 1)) % leds.length;
}

function layoutPachinkoPegs(w, h) {
  const pegs = [];
  const rows = 8;
  const cols = 8;
  const padX = 22;
  const padY = 28;
  const gapX = (w - padX * 2) / (cols - 1);
  const gapY = (h - padY - 36) / rows;
  for (let r = 0; r < rows; r++) {
    const offset = (r % 2) * (gapX / 2);
    const n = r % 2 ? cols - 1 : cols;
    for (let c = 0; c < n; c++) {
      pegs.push({ x: padX + c * gapX + offset, y: padY + r * gapY, r: 3.2 });
    }
  }
  return pegs;
}

function spawnPachinkoBall() {
  const canvas = pachinkoFX.canvas;
  if (!canvas) return;
  pachinkoFX.balls.push({
    x: canvas.width / 2 + (Math.random() - 0.5) * 70,
    y: 10,
    vx: (Math.random() - 0.5) * 2.4,
    vy: 0.4,
    r: pachinkoFX.fever ? 5.5 : 4.6,
    hue: pachinkoFX.fever ? 45 + Math.random() * 20 : 0
  });
}

function stepPachinkoPhysics(w, h) {
  const pegs = pachinkoFX.pegs;
  pachinkoFX.balls.forEach((b) => {
    b.vy += 0.16;
    b.vx *= 0.995;
    b.x += b.vx;
    b.y += b.vy;

    if (b.x < b.r) { b.x = b.r; b.vx = Math.abs(b.vx) * 0.55; }
    if (b.x > w - b.r) { b.x = w - b.r; b.vx = -Math.abs(b.vx) * 0.55; }

    for (let i = 0; i < pegs.length; i++) {
      const p = pegs[i];
      const dx = b.x - p.x;
      const dy = b.y - p.y;
      const minD = b.r + p.r;
      const distSq = dx * dx + dy * dy;
      if (distSq < minD * minD && distSq > 0.0001) {
        const dist = Math.sqrt(distSq);
        const nx = dx / dist;
        const ny = dy / dist;
        const vn = b.vx * nx + b.vy * ny;
        if (vn < 0) {
          b.vx -= 1.75 * vn * nx;
          b.vy -= 1.75 * vn * ny;
        }
        const overlap = minD - dist;
        b.x += nx * overlap;
        b.y += ny * overlap;
        b.vx += (Math.random() - 0.5) * 0.4;
      }
    }
  });
  pachinkoFX.balls = pachinkoFX.balls.filter((b) => b.y < h + 24);
}

function drawPachinkoFrame() {
  const { ctx, canvas, pegs, balls, fever } = pachinkoFX;
  if (!ctx || !canvas) return;
  const w = canvas.width;
  const h = canvas.height;

  ctx.fillStyle = fever ? '#161616' : '#0a0a0a';
  ctx.fillRect(0, 0, w, h);

  const grd = ctx.createRadialGradient(w / 2, 0, 10, w / 2, h, w);
  grd.addColorStop(0, fever ? 'rgba(232, 189, 63, 0.28)' : 'rgba(255, 255, 255, 0.06)');
  grd.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = grd;
  ctx.fillRect(0, 0, w, h);

  pegs.forEach((p) => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = '#e2c069';
    ctx.fill();
    ctx.fillStyle = '#fff7d0';
    ctx.beginPath();
    ctx.arc(p.x - 0.8, p.y - 0.8, p.r * 0.35, 0, Math.PI * 2);
    ctx.fill();
  });

  const pocketW = w / 5;
  for (let i = 0; i < 5; i++) {
    ctx.fillStyle = i === 2 ? '#f5c518' : '#262626';
    ctx.fillRect(i * pocketW + 2, h - 18, pocketW - 4, 16);
    ctx.fillStyle = i === 2 ? '#3a2005' : '#cfcfcf';
    ctx.font = '9px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(i === 2 ? 'V' : '×', i * pocketW + pocketW / 2, h - 7);
  }

  balls.forEach((b) => {
    ctx.beginPath();
    ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
    const ballGrad = ctx.createRadialGradient(b.x - 1.5, b.y - 1.5, 1, b.x, b.y, b.r);
    if (fever) {
      ballGrad.addColorStop(0, '#fff7cc');
      ballGrad.addColorStop(1, '#eab308');
    } else {
      ballGrad.addColorStop(0, '#fffdf5');
      ballGrad.addColorStop(1, '#b9a58f');
    }
    ctx.fillStyle = ballGrad;
    ctx.fill();
  });
}

function pachinkoLoop(ts) {
  if (!pachinkoFX.running) return;
  const canvas = pachinkoFX.canvas;
  const w = canvas.width;
  const h = canvas.height;

  pachinkoFX.spawnAcc += pachinkoFX.fever ? 0.35 : 0.12;
  while (pachinkoFX.spawnAcc >= 1) {
    spawnPachinkoBall();
    pachinkoFX.spawnAcc -= 1;
  }

  stepPachinkoPhysics(w, h);
  drawPachinkoFrame();
  pachinkoFX.raf = requestAnimationFrame(pachinkoLoop);
}

function setPachinkoPhase(phase) {
  pachinkoFX.phase = phase;
  const title = document.getElementById('pachinkoLcdTitle');
  const reels = document.querySelectorAll('#pachinkoReels .reel');
  const cabinet = document.getElementById('pachinkoCabinet');
  const banner = document.getElementById('jackpotBanner');

  reels.forEach((reel, i) => {
    reel.classList.remove('spinning', 'reach', 'stopped');
    const face = reel.querySelector('.reel-face');
    if (phase === 'spin') {
      reel.classList.add('spinning');
      if (face) face.textContent = REEL_SYMBOLS[(i + Math.floor(Math.random() * 5)) % REEL_SYMBOLS.length];
    } else if (phase === 'reach') {
      if (i < 2) {
        reel.classList.add('stopped');
        if (face) face.textContent = '7';
      } else {
        reel.classList.add('reach');
        if (face) face.textContent = '7';
      }
    } else if (phase === 'jackpot') {
      reel.classList.add('stopped');
      if (face) face.textContent = '7';
    }
  });

  if (title) {
    if (phase === 'spin') title.textContent = 'ヘソ回転中';
    if (phase === 'reach') title.textContent = 'リーチ!!';
    if (phase === 'jackpot') title.textContent = '7揃い 大当たり';
  }

  if (cabinet) cabinet.classList.toggle('fever', phase === 'jackpot');
  pachinkoFX.fever = phase === 'jackpot';
  if (banner) banner.classList.toggle('hidden', phase !== 'jackpot');
}

function startPachinkoFX() {
  buildPachinkoLeds();
  const canvas = document.getElementById('pachinkoCanvas');
  if (!canvas) return;
  pachinkoFX.canvas = canvas;
  pachinkoFX.ctx = canvas.getContext('2d');
  const rect = canvas.getBoundingClientRect();
  canvas.width = Math.max(280, Math.floor(rect.width) || 320);
  canvas.height = 220;
  pachinkoFX.pegs = layoutPachinkoPegs(canvas.width, canvas.height);
  pachinkoFX.balls = [];
  pachinkoFX.running = true;
  pachinkoFX.fever = false;
  pachinkoFX.spawnAcc = 4;
  setPachinkoPhase('spin');
  if (pachinkoFX.ledTimer) clearInterval(pachinkoFX.ledTimer);
  pachinkoFX.ledTimer = setInterval(chasePachinkoLeds, 70);
  cancelAnimationFrame(pachinkoFX.raf);
  pachinkoFX.raf = requestAnimationFrame(pachinkoLoop);
  initPachinkoAudio();
}

function stopPachinkoFX() {
  pachinkoFX.running = false;
  cancelAnimationFrame(pachinkoFX.raf);
  if (pachinkoFX.ledTimer) {
    clearInterval(pachinkoFX.ledTimer);
    pachinkoFX.ledTimer = null;
  }
  const cabinet = document.getElementById('pachinkoCabinet');
  if (cabinet) cabinet.classList.remove('fever');
  const banner = document.getElementById('jackpotBanner');
  if (banner) banner.classList.add('hidden');
  document.body.classList.remove('pachinko-fever');
}

function fireJackpotConfetti() {
  if (!window.confetti) return;
  const end = Date.now() + 1600;
  (function frame() {
    confetti({
      particleCount: 6,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: ['#facc15', '#ef4444', '#ffffff', '#fb923c']
    });
    confetti({
      particleCount: 6,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: ['#facc15', '#ef4444', '#ffffff', '#fb923c']
    });
    if (Date.now() < end) requestAnimationFrame(frame);
  })();
}

/**
 * Start Simulated Annealing Optimization
 */
function startOptimization() {
  if (state.isCalculating) return;
  state.isCalculating = true;

  applyFixedSeats();

  const progressModal = document.getElementById('progressModal');
  const progressBar = document.getElementById('progressBar');
  const progressPercent = document.getElementById('progressPercent');
  const progressStatus = document.getElementById('progressStatus');
  const tempVal = document.getElementById('tempVal');
  const scoreVal = document.getElementById('scoreVal');

  if (progressModal) progressModal.classList.remove('hidden');
  startPachinkoFX();

  let currentTemp = 100.0;
  const minTemp = 0.01;
  const coolingRate = 0.992;
  const iterationsPerStep = 50;
  const maxTotalSteps = 800;

  const totalSeats = state.currentSeats.length;
  const swappableIndices = [];
  for (let i = 0; i < totalSeats; i++) {
    if (state.currentSeats[i] !== null && !state.fixedSeats.hasOwnProperty(i)) {
      swappableIndices.push(i);
    }
  }

  if (swappableIndices.length < 2) {
    alert('固定されていない移動可能な生徒が2名未満のため、最適化を行えません。');
    state.isCalculating = false;
    stopPachinkoFX();
    if (progressModal) progressModal.classList.add('hidden');
    return;
  }

  let currentEnergy = computeEnergy(state.currentSeats, state.activeTab);
  let bestEnergy = currentEnergy;
  let bestSeats = [...state.currentSeats];

  let step = 0;
  let reached = false;

  function annealStep() {
    for (let i = 0; i < iterationsPerStep; i++) {
      const idxA = swappableIndices[Math.floor(Math.random() * swappableIndices.length)];
      let idxB = swappableIndices[Math.floor(Math.random() * swappableIndices.length)];
      while (idxA === idxB) {
        idxB = swappableIndices[Math.floor(Math.random() * swappableIndices.length)];
      }

      const candidateSeats = [...state.currentSeats];
      const temp = candidateSeats[idxA];
      candidateSeats[idxA] = candidateSeats[idxB];
      candidateSeats[idxB] = temp;

      const candidateEnergy = computeEnergy(candidateSeats, state.activeTab);
      const deltaE = candidateEnergy - currentEnergy;

      if (deltaE < 0 || Math.exp(-deltaE / currentTemp) > Math.random()) {
        state.currentSeats = candidateSeats;
        currentEnergy = candidateEnergy;

        if (currentEnergy < bestEnergy) {
          bestEnergy = currentEnergy;
          bestSeats = [...candidateSeats];
        }
      }
    }

    currentTemp *= coolingRate;
    step++;

    const percent = Math.min(100, Math.floor((step / maxTotalSteps) * 100));

    if (progressBar) progressBar.style.width = percent + '%';
    if (progressPercent) progressPercent.innerText = percent + '%';
    if (tempVal) tempVal.innerText = currentTemp.toFixed(2);
    if (scoreVal) scoreVal.innerText = Math.round(bestEnergy);

    if (!reached && percent >= 72) {
      reached = true;
      setPachinkoPhase('reach');
      pachinkoBeep(880, 0.18, 'square', 0.06);
      pachinkoBeep(1320, 0.28, 'square', 0.05);
    }

    if (progressStatus) {
      if (reached) {
        progressStatus.innerText = `リーチ継続中... 図柄テンパイ (${step}/${maxTotalSteps})`;
      } else {
        progressStatus.innerText = `ヘソから玉発射中... SA ${step}/${maxTotalSteps} ステップ`;
      }
    }

    if (step % 8 === 0) {
      pachinkoBeep(reached ? 740 : 420 + (step % 5) * 40, 0.04, 'square', 0.03);
    }

    if (step % 25 === 0) {
      renderClassroomGrid();
    }

    if (currentTemp > minTemp && step < maxTotalSteps) {
      setTimeout(annealStep, reached ? 12 : 4);
    } else {
      state.currentSeats = bestSeats;
      state.isCalculating = false;

      setPachinkoPhase('jackpot');
      document.body.classList.add('pachinko-fever');
      pachinkoBeep(523, 0.2, 'square', 0.07);
      setTimeout(() => pachinkoBeep(659, 0.2, 'square', 0.07), 120);
      setTimeout(() => pachinkoBeep(784, 0.45, 'square', 0.08), 240);
      fireJackpotConfetti();

      renderClassroomGrid();
      renderClusterAnalytics();

      document.querySelectorAll('.seat-card').forEach((card, i) => {
        card.style.animationDelay = `${i * 28}ms`;
        card.classList.add('seat-jackpot');
      });

      if (progressModal) {
        setTimeout(() => {
          progressModal.classList.add('hidden');
          stopPachinkoFX();
        }, 2200);
      }

      showNotification(`大当たり！【${state.activeTab === 'random' ? '異質分散' : '同質近接'}配置】が確定しました`);
    }
  }

  annealStep();
}

/**
 * Energy / Cost function for Seating Layout Optimization
 */
function computeEnergy(seats, mode) {
  let energy = 0;
  const cols = state.cols;
  const rows = state.rows;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const idx = r * cols + c;
      const s1 = seats[idx];
      if (!s1) continue;

      const neighbors = [
        { r: r, c: c + 1, weight: 1.0 },       // Right
        { r: r + 1, c: c, weight: 1.0 },       // Down
        { r: r + 1, c: c + 1, weight: 0.7 },   // Diagonal Right
        { r: r + 1, c: c - 1, weight: 0.7 }    // Diagonal Left
      ];

      neighbors.forEach(n => {
        if (n.r >= 0 && n.r < rows && n.c >= 0 && n.c < cols) {
          const nIdx = n.r * cols + n.c;
          const s2 = seats[nIdx];
          if (!s2) return;

          const traitDistance = euclideanDistance(s1.normalizedVector, s2.normalizedVector);
          const sameCluster = s1.cluster === s2.cluster;

          if (mode === 'random') {
            if (sameCluster) {
              energy += 100 * n.weight;
            }
            energy += (15.0 / (0.1 + traitDistance)) * n.weight;
          } else {
            if (!sameCluster) {
              energy += 80 * n.weight;
            }
            energy += (traitDistance * 10) * n.weight;
          }
        }
      });
    }
  }

  return energy;
}

/**
 * Reset seats to initial sequential order and clear fixed locks
 */
function resetSeats() {
  state.fixedSeats = {};
  recalculateGrid();
  showNotification('座席配置と固定ピンをリセットしました。');
}

/**
 * Render Classroom Grid UI with Direct Student No Inputs (Requirement 3)
 */
function renderClassroomGrid() {
  const container = document.getElementById('classroomGrid');
  if (!container) return;

  container.innerHTML = '';
  container.style.gridTemplateColumns = `repeat(${state.cols}, minmax(0, 1fr))`;

  const totalSeats = state.currentSeats.length;

  for (let i = 0; i < totalSeats; i++) {
    const student = state.currentSeats[i];
    const isFixed = state.fixedSeats.hasOwnProperty(i);
    const rowIdx = Math.floor(i / state.cols) + 1;
    const colIdx = (i % state.cols) + 1;

    const seatCard = document.createElement('div');
    seatCard.className = `seat-card relative p-2.5 rounded-xl border flex flex-col justify-between h-40 ${
      student ? `seat-border-${student.cluster}` : 'border-slate-800 bg-slate-900/50'
    } ${isFixed ? 'seat-fixed' : 'bg-slate-900/80'}`;

    seatCard.innerHTML = `
      <div class="flex justify-between items-center pb-1 border-b border-slate-800/60">
        <span class="text-[11px] font-medium ${isFixed ? 'text-amber-400' : 'text-slate-300'}">
          ${isFixed ? '<i class="fas fa-thumbtack mr-0.5"></i> 固定席' : `席 ${rowIdx}-${colIdx}`}
        </span>
        <button class="btn-toggle-fix cursor-pointer text-xs p-0.5 rounded hover:bg-slate-800 transition" data-seat="${i}" title="${isFixed ? '固定解除' : 'この席をピン留め固定'}">
          ${isFixed ? '<i class="fas fa-thumbtack text-amber-400"></i>' : '<i class="far fa-thumbtack text-slate-400 hover:text-amber-300"></i>'}
        </button>
      </div>

      <!-- Direct Student No. Input Field (Requirement 3) -->
      <div class="my-1.5 space-y-1">
        <div class="flex items-center gap-1">
          <span class="text-[11px] text-slate-300 font-normal shrink-0">生徒No:</span>
          <input type="number" min="1" max="${state.students.length}" 
                 value="${student ? student.No : ''}" 
                 data-seat="${i}" 
                 class="input-fixed-seat-no w-full bg-slate-950 border ${isFixed ? 'border-amber-500/80 text-amber-300' : 'border-slate-700 text-cyan-300'} focus:border-cyan-400 rounded px-1 py-0.5 text-xs text-center font-medium focus:outline-none" 
                 placeholder="番号">
        </div>

        <div class="text-center truncate">
          <span class="font-medium text-sm ${student ? 'text-slate-100' : 'text-slate-400'}">${student ? student.Name : '空席'}</span>
        </div>
      </div>

      <div class="flex items-center justify-between pt-1 border-t border-slate-800/80">
        ${student ? `
          <span class="px-1.5 py-0.5 rounded-full text-[11px] font-medium border cluster-badge-${student.cluster}">
            C${student.cluster + 1}
          </span>
          <button class="btn-inspect-student cursor-pointer text-[11px] text-cyan-300 hover:underline" data-student="${student.No}">
            詳細 <i class="fas fa-chevron-right"></i>
          </button>
        ` : '<div></div>'}
      </div>
    `;

    container.appendChild(seatCard);
  }

  // Attach Direct Student No Input change listeners
  document.querySelectorAll('.input-fixed-seat-no').forEach(input => {
    input.addEventListener('change', (e) => {
      const seatIdx = parseInt(input.getAttribute('data-seat'), 10);
      const val = parseInt(e.target.value, 10);
      handleDirectStudentFixInput(seatIdx, val);
    });
  });

  // Attach seat fix toggle button listeners
  document.querySelectorAll('.btn-toggle-fix').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const seatIdx = parseInt(btn.getAttribute('data-seat'), 10);
      toggleSeatFix(seatIdx);
    });
  });

  // Attach student detail inspect listeners
  document.querySelectorAll('.btn-inspect-student').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const studentNo = parseInt(btn.getAttribute('data-student'), 10);
      showStudentModal(studentNo);
    });
  });

  // Update fixed seat status summary list
  renderFixedSeatInputs();
}

/**
 * Handle direct student number typing in seat card input (Requirement 3)
 */
function handleDirectStudentFixInput(seatIdx, targetStudentNo) {
  if (isNaN(targetStudentNo) || targetStudentNo <= 0) {
    // Clear fixed status for this seat
    delete state.fixedSeats[seatIdx];
    recalculateGrid();
    return;
  }

  // Verify student exists
  const student = state.students.find(s => s.No === targetStudentNo);
  if (!student) {
    alert(`生徒番号 ${targetStudentNo} は名簿に存在しません (1〜${state.students.length} の範囲で入力してください)`);
    renderClassroomGrid();
    return;
  }

  // Remove target student from any previously fixed seat
  Object.keys(state.fixedSeats).forEach(k => {
    if (state.fixedSeats[k] === targetStudentNo) {
      delete state.fixedSeats[k];
    }
  });

  // Assign fixed seat
  state.fixedSeats[seatIdx] = targetStudentNo;

  // Re-apply fixed seats and update grid
  applyFixedSeats();
  renderClassroomGrid();

  showNotification(`席(${Math.floor(seatIdx / state.cols) + 1}-${(seatIdx % state.cols) + 1}) に 生徒No.${targetStudentNo} (${student.Name}) を固定指定しました`);
}

/**
 * Toggle Fixed Seat Pin via button
 */
function toggleSeatFix(seatIdx) {
  if (state.fixedSeats.hasOwnProperty(seatIdx)) {
    delete state.fixedSeats[seatIdx];
  } else {
    const student = state.currentSeats[seatIdx];
    if (student) {
      state.fixedSeats[seatIdx] = student.No;
    }
  }
  applyFixedSeats();
  renderClassroomGrid();
}

/**
 * Render Fixed Seat Manual Inputs panel
 */
function renderFixedSeatInputs() {
  const container = document.getElementById('fixedSeatList');
  if (!container) return;

  const entries = Object.entries(state.fixedSeats);
  if (entries.length === 0) {
    container.innerHTML = `<p class="text-xs text-slate-400 italic">固定された席はありません（各座席カードの「生徒No:」入力欄から番号を入力して固定できます）</p>`;
    return;
  }

  container.innerHTML = entries.map(([seatIdxStr, studentNo]) => {
    const seatIdx = parseInt(seatIdxStr, 10);
    const row = Math.floor(seatIdx / state.cols) + 1;
    const col = (seatIdx % state.cols) + 1;
    const student = state.students.find(s => s.No === studentNo);

    return `
      <div class="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs px-2.5 py-1 rounded-full">
        <span><i class="fas fa-thumbtack"></i> 席(${row}-${col}): No.${studentNo} ${student ? student.Name : ''}</span>
        <button class="hover:text-red-400 cursor-pointer" onclick="removeFixedSeat(${seatIdx})">&times;</button>
      </div>
    `;
  }).join(' ');
}

window.removeFixedSeat = function(seatIdx) {
  delete state.fixedSeats[seatIdx];
  applyFixedSeats();
  renderClassroomGrid();
};

/**
 * Render Roster Table
 */
function renderRosterTable() {
  const tableHead = document.getElementById('rosterTableHead');
  const tableBody = document.getElementById('rosterTableBody');
  const countBadge = document.getElementById('studentCountBadge');

  if (countBadge) countBadge.innerText = `${state.students.length}名`;

  if (tableHead) {
    tableHead.innerHTML = `
      <tr>
        <th class="px-4 py-2 text-left text-xs font-normal text-slate-300 uppercase tracking-wider">No</th>
        <th class="px-4 py-2 text-left text-xs font-normal text-slate-300 uppercase tracking-wider">氏名</th>
        <th class="px-4 py-2 text-center text-xs font-normal text-slate-300 uppercase tracking-wider">クラスタ</th>
        ${state.traitKeys.map(t => `<th class="px-3 py-2 text-center text-xs font-normal text-cyan-300 uppercase tracking-wider">${t}</th>`).join('')}
      </tr>
    `;
  }

  if (tableBody) {
    tableBody.innerHTML = state.students.map(s => `
      <tr class="hover:bg-slate-800/50 transition-colors border-b border-slate-800/50">
        <td class="px-4 py-2.5 text-xs font-medium text-slate-300">${s.No}</td>
        <td class="px-4 py-2.5 text-xs font-normal text-slate-100">${s.Name}</td>
        <td class="px-4 py-2.5 text-center">
          <span class="px-2 py-0.5 rounded-full text-[11px] font-medium border cluster-badge-${s.cluster}">
            C${s.cluster + 1}
          </span>
        </td>
        ${state.traitKeys.map(t => `<td class="px-3 py-2.5 text-center text-xs text-slate-300">${s.traits[t]}</td>`).join('')}
      </tr>
    `).join('');
  }
}

/**
 * Render Analytics & Cluster Charts using Chart.js
 */
function renderClusterAnalytics() {
  const ctxCluster = document.getElementById('chartClusterDist');
  if (!ctxCluster || !window.Chart) return;

  const clusterCounts = new Array(state.clusterCount).fill(0);
  state.students.forEach(s => clusterCounts[s.cluster]++);

  if (state.charts.clusterDist) {
    state.charts.clusterDist.destroy();
  }

  state.charts.clusterDist = new Chart(ctxCluster, {
    type: 'doughnut',
    data: {
      labels: CLUSTER_NAMES,
      datasets: [{
        data: clusterCounts,
        backgroundColor: CLUSTER_COLORS,
        borderColor: '#000000',
        borderWidth: 2
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
          labels: { color: '#c5c5c5', font: { size: 11 } }
        }
      }
    }
  });

  const ctxTraits = document.getElementById('chartClusterTraits');
  if (!ctxTraits) return;

  const datasets = CLUSTER_NAMES.map((name, cIdx) => {
    const clusterStudents = state.students.filter(s => s.cluster === cIdx);
    const averages = state.traitKeys.map(tKey => {
      if (clusterStudents.length === 0) return 0;
      const sum = clusterStudents.reduce((acc, s) => acc + s.traits[tKey], 0);
      return Math.round((sum / clusterStudents.length) * 10) / 10;
    });

    return {
      label: name,
      data: averages,
      backgroundColor: CLUSTER_COLORS[cIdx] + '80',
      borderColor: CLUSTER_COLORS[cIdx],
      borderWidth: 1.5
    };
  });

  if (state.charts.clusterTraits) {
    state.charts.clusterTraits.destroy();
  }

  state.charts.clusterTraits = new Chart(ctxTraits, {
    type: 'bar',
    data: {
      labels: state.traitKeys,
      datasets: datasets
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: { ticks: { color: '#c5c5c5' }, grid: { color: '#2f2f2f' } },
        y: { ticks: { color: '#c5c5c5' }, grid: { color: '#2f2f2f' }, beginAtZero: true }
      },
      plugins: {
        legend: { labels: { color: '#c5c5c5', font: { size: 10 } } }
      }
    }
  });
}

/**
 * Show Modal inspecting single student profile & traits
 */
function showStudentModal(studentNo) {
  const student = state.students.find(s => s.No === studentNo);
  if (!student) return;

  const modal = document.getElementById('studentDetailModal');
  const body = document.getElementById('studentDetailBody');
  if (!modal || !body) return;

  body.innerHTML = `
    <div class="flex items-center gap-4 mb-4 pb-3 border-b border-slate-700">
      <div class="w-12 h-12 rounded-full flex items-center justify-center font-medium text-lg border ${`cluster-badge-${student.cluster}`}">
        No.${student.No}
      </div>
      <div class="flex-1">
        <label class="block text-[11px] text-slate-400 mb-1">氏名 (直接編集できます)</label>
        <input id="editStudentNameInput" type="text" value="${String(student.Name).replace(/"/g, '&quot;')}" maxlength="30"
               class="bg-slate-950 border border-slate-700 focus:border-cyan-400 rounded-lg px-3 py-1.5 text-base font-medium text-white focus:outline-none w-full transition-colors"
               placeholder="氏名">
        <p class="text-[11px] text-slate-400 mt-1">編集後、Enterキーまたはフォーカスを外すと確定します</p>
        <p class="text-xs text-cyan-400 font-normal mt-1">所属: クラスタ ${student.cluster + 1}</p>
      </div>
    </div>

    <div class="space-y-3">
      <h4 class="text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">特性・評価値 (直接編集できます)</h4>
      <p class="text-[11px] text-slate-400">値を変更すると確定時にZスコアとクラスタが自動で再計算されます</p>
      ${state.traitKeys.map((t, tIdx) => {
        const val = student.traits[t];
        const pct = Math.min(100, Math.max(0, (val / 10) * 100));
        return `
          <div>
            <div class="flex justify-between items-center text-xs mb-1 gap-2">
              <span class="text-slate-300 font-normal">${t}</span>
              <input type="number" class="trait-edit-input bg-slate-950 border border-slate-700 focus:border-cyan-400 rounded px-2 py-1 text-xs font-medium text-cyan-300 text-center w-16 focus:outline-none transition-colors"
                     data-trait-idx="${tIdx}" value="${val}" step="any">
            </div>
            <div class="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
              <div class="bg-cyan-500 h-2 rounded-full" style="width: ${pct}%"></div>
            </div>
          </div>
        `;
      }).join('')}
    </div>
  `;

  modal.classList.remove('hidden');

  // Direct name editing: save on change (Enter / blur)
  const nameInput = document.getElementById('editStudentNameInput');
  if (nameInput) {
    nameInput.addEventListener('change', () => {
      const newName = nameInput.value.trim();
      if (!newName) {
        showNotification('氏名を空にすることはできません');
        nameInput.value = student.Name;
        return;
      }
      if (newName === student.Name) return;
      const oldName = student.Name;
      student.Name = newName;
      renderClassroomGrid();
      renderRosterTable();
      showNotification(`生徒No.${student.No} の氏名を「${oldName}」→「${newName}」に変更しました`);
    });
    nameInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        nameInput.blur();
      }
    });
  }

  // Direct trait (ability) editing: recompute Z-scores & clusters on change
  document.querySelectorAll('#studentDetailBody .trait-edit-input').forEach(input => {
    input.addEventListener('change', () => {
      const tIdx = parseInt(input.getAttribute('data-trait-idx'), 10);
      const traitKey = state.traitKeys[tIdx];
      const parsed = parseFloat(input.value);
      if (isNaN(parsed)) {
        showNotification('評価値は数値で入力してください');
        input.value = student.traits[traitKey];
        return;
      }
      if (parsed === student.traits[traitKey]) return;
      const oldVal = student.traits[traitKey];
      student.traits[traitKey] = parsed;

      // Recompute normalization (Z-score) & K-Means clusters, then refresh all views
      computeZScores();
      runKMeansClustering();
      renderClassroomGrid();
      renderRosterTable();
      renderClusterAnalytics();

      // Refresh modal (cluster badge / bars reflect the new values)
      showStudentModal(student.No);
      showNotification(`生徒No.${student.No} (${student.Name}) の「${traitKey}」を ${oldVal} → ${parsed} に変更しました`);
    });
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        input.blur();
      }
    });
  });

  const btnClose = document.getElementById('btnCloseStudentModal');
  if (btnClose) {
    btnClose.onclick = () => modal.classList.add('hidden');
  }
}

/**
 * Export Seating Grid to CSV
 */
function exportToCSV() {
  if (state.currentSeats.length === 0) return;

  let csvContent = "\uFEFF" + "行,列,座席番号,生徒番号,氏名,クラスタ\n";
  const cols = state.cols;

  state.currentSeats.forEach((student, idx) => {
    const r = Math.floor(idx / cols) + 1;
    const c = (idx % cols) + 1;
    if (student) {
      csvContent += `${r},${c},${r}-${c},${student.No},"${student.Name}",C${student.cluster + 1}\n`;
    } else {
      csvContent += `${r},${c},${r}-${c},,,空席\n`;
    }
  });

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.setAttribute("download", `sekikae_layout_${state.activeTab}_${new Date().toISOString().slice(0,10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * Simple Toast Notification
 */
function showNotification(msg) {
  const toast = document.createElement('div');
  toast.className = "fixed bottom-5 right-5 bg-slate-800 text-slate-100 font-medium text-xs px-4 py-3 rounded-lg shadow-lg border border-slate-600 z-50 transition-opacity duration-300 flex items-center gap-2";
  toast.innerHTML = `<i class="fas fa-circle-info text-sm text-cyan-400"></i> ${msg}`;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}
