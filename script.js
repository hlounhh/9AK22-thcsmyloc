// language: JavaScript, file: script.js, target: Web

/* ==========================================================================
 * 1. CẤU HÌNH & TRẠNG THÁI (CONFIG & STATE)
 * ========================================================================== */
const LOCAL_MUSIC_PATH = './nhac.mp3';

const defaultMediaList = [
  {
    id: 'cld_1',
    type: 'video',
    url: 'https://res.cloudinary.com/demo/video/upload/q_auto,vc_h264/dog.mp4'
  },
  {
    id: 'cld_2',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 'cld_3',
    type: 'video',
    url: 'https://res.cloudinary.com/demo/video/upload/q_auto,vc_h264/elephants.mp4'
  },
  {
    id: 'cld_4',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 'cld_5',
    type: 'video',
    url: 'https://res.cloudinary.com/demo/video/upload/q_auto,vc_h264/sea_turtle.mp4'
  }
];

// Cấu hình Cloudinary trực tiếp vào code
const CLOUDINARY_CONFIG = {
  cloudName: 'nodetely',
  apiKey: '715541221342479',
  apiSecret: 'THFqeXwQp4m22-Yr3Wq0IRfHsmI'
};

const state = {
  mediaList: JSON.parse(localStorage.getItem('pure_film_media')) || defaultMediaList,
  scrollPos: 0,
  scrollSpeed: 2.0,
  cycleWidth: 0,
  hasDragged: false,
  hasInteracted: false,
  isPlayingAudio: false
};

/* ==========================================================================
 * 2. DOM ELEMENTS
 * ========================================================================== */
const reelTrack = document.getElementById('reelTrack');
const reelViewport = document.getElementById('reelViewport');

const bgAudio = document.getElementById('bgAudio');
const btnToggleAudio = document.getElementById('btnToggleAudio');
const audioIcon = document.getElementById('audioIcon');
const soundWaves = document.getElementById('soundWaves');
const tapNotice = document.getElementById('tapNotice');
const currentSongLabel = document.getElementById('currentSongLabel');

const fullscreenModal = document.getElementById('fullscreenModal');
const fullscreenContent = document.getElementById('fullscreenContent');
const btnCloseFullscreen = document.getElementById('btnCloseFullscreen');

const settingsModal = document.getElementById('settingsModal');
const btnOpenSettings = document.getElementById('btnOpenSettings');
const btnCloseSettings = document.getElementById('btnCloseSettings');

const tabUploadBtn = document.getElementById('tabUploadBtn');
const tabUrlBtn = document.getElementById('tabUrlBtn');
const sectionUpload = document.getElementById('sectionUpload');
const sectionUrl = document.getElementById('sectionUrl');

const fileMediaUpload = document.getElementById('fileMediaUpload');
const chosenFileName = document.getElementById('chosenFileName');
const uploadProgressWrapper = document.getElementById('uploadProgressWrapper');
const uploadStatusText = document.getElementById('uploadStatusText');
const uploadPercentText = document.getElementById('uploadPercentText');
const uploadProgressFill = document.getElementById('uploadProgressFill');
const btnExecuteUpload = document.getElementById('btnExecuteUpload');

const inputDirectUrl = document.getElementById('inputDirectUrl');
const btnAddDirectUrl = document.getElementById('btnAddDirectUrl');

const mediaManagerList = document.getElementById('mediaManagerList');

/* ==========================================================================
 * 3. QUẢN LÝ DẢI PHIM & CUỘN TỰ ĐỘNG (REEL & AUTO-SCROLL)
 * ========================================================================== */
let videoObserver = null;
let cycleWidthUpdateTimer = null;

/**
 * IntersectionObserver: Chỉ phát video khi xuất hiện trong khung nhìn (Viewport)
 * Tự động tạm dừng video ngoài màn hình để giải phóng 100% kênh giải mã GPU và CPU
 */
function initVideoObserver() {
  if (videoObserver) {
    videoObserver.disconnect();
  }
  videoObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const vid = entry.target;
        if (entry.isIntersecting) {
          if (vid.paused) {
            vid.play().catch(() => {});
          }
        } else {
          if (!vid.paused) {
            vid.pause();
          }
        }
      });
    },
    {
      root: null,
      rootMargin: '100px 50px 100px 50px',
      threshold: 0.05
    }
  );
}

/**
 * Tránh Layout Thrashing: Gom các yêu cầu tính toán chu kỳ vào requestAnimationFrame
 */
function scheduleCycleWidthUpdate() {
  if (cycleWidthUpdateTimer) return;
  cycleWidthUpdateTimer = requestAnimationFrame(() => {
    cycleWidthUpdateTimer = null;
    updateCycleWidth();
  });
}

function renderReel() {
  if (!reelTrack) return;
  initVideoObserver();
  reelTrack.innerHTML = '';

  const n = state.mediaList.length;
  if (n === 0) return;

  let repeatCount = 3;
  while (repeatCount * n < 12) {
    repeatCount += 3;
  }

  let renderItems = [];
  for (let r = 0; r < repeatCount; r++) {
    renderItems = renderItems.concat(state.mediaList);
  }

  renderItems.forEach((item, index) => {
    const card = document.createElement('div');
    card.className = `film-card ${item.isPortrait ? 'film-card-portrait' : 'film-card-landscape'}`;
    card.dataset.index = index;
    card.dataset.id = item.id;

    if (item.type === 'video') {
      const vid = document.createElement('video');
      vid.src = item.url;
      vid.loop = true;
      vid.muted = true;
      vid.playsInline = true;
      vid.setAttribute('webkit-playsinline', '');
      vid.preload = 'metadata';
      vid.className = 'w-full h-full object-cover pointer-events-none';

      // Đăng ký IntersectionObserver để chỉ phát video khi ở trên màn hình
      if (videoObserver) {
        videoObserver.observe(vid);
      }

      // Tự động căn chuẩn tỷ lệ theo kích thước thực của video khi load xong metadata
      vid.addEventListener('loadedmetadata', () => {
        if (vid.videoWidth && vid.videoHeight) {
          const isPortrait = vid.videoHeight > vid.videoWidth;
          if (item.isPortrait !== isPortrait) {
            item.isPortrait = isPortrait;
            document.querySelectorAll(`.film-card[data-id="${item.id}"]`).forEach((c) => {
              if (isPortrait) {
                c.classList.remove('film-card-landscape');
                c.classList.add('film-card-portrait');
              } else {
                c.classList.remove('film-card-portrait');
                c.classList.add('film-card-landscape');
              }
            });
            scheduleCycleWidthUpdate();
            localStorage.setItem('pure_film_media', JSON.stringify(state.mediaList));
          }
        }
      });

      card.appendChild(vid);
    } else {
      const img = document.createElement('img');
      img.src = item.url;
      img.loading = 'lazy';
      img.className = 'w-full h-full object-cover pointer-events-none select-none';
      img.onerror = () => { img.src = 'https://placehold.co/800x450/111/444?text=Media'; };

      // Tự động căn chuẩn tỷ lệ theo kích thước thực của ảnh khi tải xong
      img.addEventListener('load', () => {
        if (img.naturalWidth && img.naturalHeight) {
          const isPortrait = img.naturalHeight > img.naturalWidth;
          if (item.isPortrait !== isPortrait) {
            item.isPortrait = isPortrait;
            document.querySelectorAll(`.film-card[data-id="${item.id}"]`).forEach((c) => {
              if (isPortrait) {
                c.classList.remove('film-card-landscape');
                c.classList.add('film-card-portrait');
              } else {
                c.classList.remove('film-card-portrait');
                c.classList.add('film-card-landscape');
              }
            });
            scheduleCycleWidthUpdate();
            localStorage.setItem('pure_film_media', JSON.stringify(state.mediaList));
          }
        }
      });

      card.appendChild(img);
    }

    card.addEventListener('click', () => {
      if (state.hasDragged) return;
      openFullscreenMedia(item);
    });

    reelTrack.appendChild(card);
  });

  // Reset và đo lại chính xác chu kỳ cuộn
  state.cycleWidth = 0;
  scheduleCycleWidthUpdate();
  applyScrollTransform();
  renderMediaManagerList();
}

/**
 * Đo khoảng cách chính xác từng pixel giữa thẻ 0 và thẻ n (1 chu kỳ đầy đủ bao gồm cards + gaps)
 */
function updateCycleWidth() {
  if (!reelTrack) return;
  const cards = reelTrack.querySelectorAll('.film-card');
  const n = state.mediaList.length;
  if (cards.length > n && cards[0] && cards[n]) {
    state.cycleWidth = cards[n].offsetLeft - cards[0].offsetLeft;
  }
}

/**
 * Dịch chuyển dải phim bằng GPU Compositor (translate3d)
 * Không sử dụng scrollLeft để tránh khóa luồng chính (Main Thread)
 */
function applyScrollTransform() {
  if (!reelTrack) return;
  reelTrack.style.transform = `translate3d(${-state.scrollPos}px, 0, 0)`;
}

function startAutoScroll() {
  if (!reelTrack) return;

  let lastTimestamp = 0;

  function loop(timestamp) {
    if (!lastTimestamp) lastTimestamp = timestamp;
    const delta = Math.min((timestamp - lastTimestamp) / 16.667, 1.8);
    lastTimestamp = timestamp;

    if (!state.cycleWidth) {
      updateCycleWidth();
    }

    if (state.cycleWidth > 0 && delta > 0) {
      state.scrollPos += state.scrollSpeed * delta;
      
      // Khi vượt qua 1 chu kỳ chuẩn, chỉ trừ đi đúng 1 chu kỳ
      if (state.scrollPos >= state.cycleWidth) {
        state.scrollPos -= state.cycleWidth;
      } else if (state.scrollPos < 0) {
        state.scrollPos += state.cycleWidth;
      }
      applyScrollTransform();
    }
    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);
}

function initReelEvents() {
  if (!reelViewport) return;

  let isPointerDown = false;
  let startX = 0;

  reelViewport.addEventListener('pointerdown', (e) => {
    isPointerDown = true;
    state.hasDragged = false;
    startX = e.clientX;
  });

  window.addEventListener('pointermove', (e) => {
    if (!isPointerDown) return;
    const deltaX = e.clientX - startX;
    if (Math.abs(deltaX) > 4) {
      state.hasDragged = true;
    }
    state.scrollPos -= deltaX;
    if (state.cycleWidth > 0) {
      if (state.scrollPos >= state.cycleWidth) {
        state.scrollPos -= state.cycleWidth;
      } else if (state.scrollPos < 0) {
        state.scrollPos += state.cycleWidth;
      }
    }
    applyScrollTransform();
    startX = e.clientX;
  });

  window.addEventListener('pointerup', () => {
    isPointerDown = false;
    setTimeout(() => {
      state.hasDragged = false;
    }, 60);
  });

  window.addEventListener('pointercancel', () => {
    isPointerDown = false;
    state.hasDragged = false;
  });

  window.addEventListener('resize', () => {
    scheduleCycleWidthUpdate();
  });
}

/* ==========================================================================
 * 4. QUẢN LÝ ÂM THANH (AUDIO CONTROLS)
 * ========================================================================== */
function initAudio() {
  if (!bgAudio) return;
  bgAudio.src = LOCAL_MUSIC_PATH;

  if (currentSongLabel) {
    const fileName = LOCAL_MUSIC_PATH.split('/').pop();
    currentSongLabel.innerText = fileName;
  }

  if (btnToggleAudio) {
    btnToggleAudio.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleAudio();
    });
  }

  // Tự động phát nhạc ngay lập tức khi mở web
  attemptAutoplay();
}

/**
 * Thử tự động phát nhạc ngay khi nạp trang web
 */
function attemptAutoplay() {
  if (!bgAudio) return;

  const playPromise = bgAudio.play();
  if (playPromise !== undefined) {
    playPromise.then(() => {
      state.isPlayingAudio = true;
      updateAudioUI(true);
      if (tapNotice) {
        tapNotice.style.opacity = '0';
        setTimeout(() => tapNotice.remove(), 300);
      }
    }).catch(() => {
      // Nếu chính sách bảo mật trình duyệt chặn không cho phát âm thanh khi chưa tương tác,
      // tự động kích hoạt ngay khi chạm/click bất kỳ đâu trên màn hình
      enableAutoplayFallback();
    });
  }
}

/**
 * Cơ chế dự phòng: Kích hoạt âm thanh ngay tại thao tác đầu tiên trên màn hình
 */
function enableAutoplayFallback() {
  const triggerEvents = ['pointerdown', 'touchstart', 'click', 'keydown', 'wheel'];
  const unlockAudio = () => {
    if (bgAudio && bgAudio.paused) {
      bgAudio.play().then(() => {
        state.isPlayingAudio = true;
        updateAudioUI(true);
        if (tapNotice) {
          tapNotice.style.opacity = '0';
          setTimeout(() => tapNotice.remove(), 300);
        }
      }).catch(() => {});
    }
    triggerEvents.forEach((evt) => window.removeEventListener(evt, unlockAudio));
  };

  triggerEvents.forEach((evt) => {
    window.addEventListener(evt, unlockAudio, { once: true, passive: true });
  });
}

function toggleAudio() {
  if (!bgAudio) return;

  if (bgAudio.paused) {
    bgAudio.play().then(() => {
      state.isPlayingAudio = true;
      updateAudioUI(true);
    }).catch((err) => {
      console.warn(`Không thể phát nhạc. Kiểm tra file ${LOCAL_MUSIC_PATH} trong thư mục!`, err);
    });
  } else {
    bgAudio.pause();
    state.isPlayingAudio = false;
    updateAudioUI(false);
  }
}

function updateAudioUI(isPlaying) {
  if (!audioIcon || !soundWaves) return;

  if (isPlaying) {
    audioIcon.className = 'fa-solid fa-pause ml-0';
    soundWaves.classList.remove('opacity-40');
    if (soundWaves.children[0]) soundWaves.children[0].className = 'w-1 bg-white rounded-full wave-bar-1';
    if (soundWaves.children[1]) soundWaves.children[1].className = 'w-1 bg-white rounded-full wave-bar-2';
    if (soundWaves.children[2]) soundWaves.children[2].className = 'w-1 bg-white rounded-full wave-bar-3';
  } else {
    audioIcon.className = 'fa-solid fa-play ml-0.5';
    soundWaves.classList.add('opacity-40');
    if (soundWaves.children[0]) soundWaves.children[0].className = 'w-1 bg-white rounded-full h-2';
    if (soundWaves.children[1]) soundWaves.children[1].className = 'w-1 bg-white rounded-full h-3';
    if (soundWaves.children[2]) soundWaves.children[2].className = 'w-1 bg-white rounded-full h-1';
  }
}

/* ==========================================================================
 * 5. MODAL: FULLSCREEN LIGHTBOX
 * ========================================================================== */
function openFullscreenMedia(item) {
  if (!fullscreenContent || !fullscreenModal) return;
  fullscreenContent.innerHTML = '';

  const wrapper = document.createElement('div');
  wrapper.className = 'relative max-w-4xl max-h-[85vh] flex items-center justify-center overflow-hidden rounded-[24px]';

  if (item.type === 'video') {
    const vid = document.createElement('video');
    vid.src = item.url;
    vid.controls = true;
    vid.autoplay = true;
    vid.playsInline = true;
    vid.className = 'w-full h-full max-h-[80vh] rounded-[24px] object-contain';
    wrapper.appendChild(vid);
  } else {
    const img = document.createElement('img');
    img.src = item.url;
    img.className = 'w-full h-full max-h-[80vh] rounded-[24px] object-contain select-none';
    wrapper.appendChild(img);
  }

  fullscreenContent.appendChild(wrapper);

  fullscreenModal.classList.remove('hidden');
  setTimeout(() => {
    fullscreenModal.classList.remove('opacity-0');
    fullscreenModal.classList.add('opacity-100');
  }, 10);
}

function closeFullscreen() {
  if (!fullscreenModal || !fullscreenContent) return;
  fullscreenModal.classList.add('opacity-0');

  // Tạm dừng video và giải phóng pipeline giải mã trước để tránh khựng luồng render
  const vid = fullscreenContent.querySelector('video');
  if (vid) {
    try {
      vid.pause();
      vid.removeAttribute('src');
      vid.load();
    } catch (_) {}
  }

  setTimeout(() => {
    fullscreenModal.classList.add('hidden');
    fullscreenContent.innerHTML = '';
  }, 200);
}

/* ==========================================================================
 * 6. MODAL: CÀI ĐẶT & CLOUDINARY & QUẢN LÝ
 * ========================================================================== */
function initModals() {
  if (btnCloseFullscreen) {
    btnCloseFullscreen.addEventListener('click', closeFullscreen);
  }

  // Bấm vào nền tối bên ngoài ảnh/video cũng tự động đóng modal
  if (fullscreenModal) {
    fullscreenModal.addEventListener('click', (e) => {
      if (e.target === fullscreenModal) {
        closeFullscreen();
      }
    });
  }

  // Nhấn phím Escape (ESC) trên bàn phím để thoát ngay ảnh/video đang xem
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' || e.key === 'Esc') {
      if (fullscreenModal && !fullscreenModal.classList.contains('hidden')) {
        closeFullscreen();
      } else if (settingsModal && !settingsModal.classList.contains('hidden')) {
        settingsModal.classList.add('hidden');
      }
    }
  });

  if (btnOpenSettings) {
    btnOpenSettings.addEventListener('click', () => {
      if (settingsModal) settingsModal.classList.remove('hidden');
    });
  }

  if (btnCloseSettings) {
    btnCloseSettings.addEventListener('click', () => {
      if (settingsModal) settingsModal.classList.add('hidden');
    });
  }

  if (tabUploadBtn && tabUrlBtn) {
    tabUploadBtn.addEventListener('click', () => switchTab(tabUploadBtn, sectionUpload));
    tabUrlBtn.addEventListener('click', () => switchTab(tabUrlBtn, sectionUrl));
  }

  if (fileMediaUpload && chosenFileName) {
    fileMediaUpload.addEventListener('change', (e) => {
      const files = Array.from(e.target.files || []);
      if (files.length > 0) {
        chosenFileName.classList.remove('hidden');
        if (files.length === 1) {
          chosenFileName.innerText = files[0].name;
        } else {
          chosenFileName.innerText = `Đã chọn ${files.length} tệp (Tối đa 20): ${files.slice(0, 3).map(f => f.name).join(', ')}${files.length > 3 ? '...' : ''}`;
        }
      } else {
        chosenFileName.classList.add('hidden');
      }
    });
  }

  if (btnExecuteUpload) {
    btnExecuteUpload.addEventListener('click', handleCloudinaryUpload);
  }

  if (btnAddDirectUrl) {
    btnAddDirectUrl.addEventListener('click', handleAddDirectUrl);
  }
}

function switchTab(activeTab, activeSection) {
  [tabUploadBtn, tabUrlBtn].forEach((b) => {
    if (b) b.className = 'flex-1 py-2 text-neutral-500 hover:text-neutral-300';
  });
  [sectionUpload, sectionUrl].forEach((s) => {
    if (s) s.classList.add('hidden');
  });

  if (activeTab) activeTab.className = 'flex-1 py-2 border-b-2 border-white text-white font-medium';
  if (activeSection) activeSection.classList.remove('hidden');
}

/**
 * Tự động phát hiện video hoặc ảnh là khung dọc (portrait) hay ngang (landscape)
 */
function detectIfPortrait(file) {
  return new Promise((resolve) => {
    if (file.type.startsWith('video')) {
      const vid = document.createElement('video');
      vid.preload = 'metadata';
      const objUrl = URL.createObjectURL(file);
      vid.src = objUrl;
      vid.onloadedmetadata = () => {
        URL.revokeObjectURL(objUrl);
        resolve(vid.videoHeight > vid.videoWidth);
      };
      vid.onerror = () => {
        URL.revokeObjectURL(objUrl);
        resolve(false);
      };
    } else {
      const img = new Image();
      const objUrl = URL.createObjectURL(file);
      img.src = objUrl;
      img.onload = () => {
        URL.revokeObjectURL(objUrl);
        resolve(img.naturalHeight > img.naturalWidth);
      };
      img.onerror = () => {
        URL.revokeObjectURL(objUrl);
        resolve(false);
      };
    }
  });
}

/**
 * Sinh chữ ký SHA-1 cho Cloudinary Signed Upload
 */
async function generateCloudinarySignature(params, apiSecret) {
  const sortedKeys = Object.keys(params).sort();
  const serialized = sortedKeys.map((k) => `${k}=${params[k]}`).join('&') + apiSecret;
  const msgUint8 = new TextEncoder().encode(serialized);
  const hashBuffer = await crypto.subtle.digest('SHA-1', msgUint8);
  return Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

async function handleCloudinaryUpload() {
  const files = Array.from(fileMediaUpload.files || []);
  if (files.length === 0) {
    alert('Vui lòng chọn ít nhất 1 file video hoặc ảnh!');
    return;
  }

  if (files.length > 20) {
    alert(`Bạn đã chọn ${files.length} file. Vui lòng chọn tối đa 20 file mỗi lần upload!`);
    return;
  }

  btnExecuteUpload.disabled = true;
  if (uploadProgressWrapper) uploadProgressWrapper.classList.remove('hidden');
  if (uploadProgressFill) uploadProgressFill.style.width = '0%';

  const total = files.length;
  const newItems = [];

  try {
    for (let i = 0; i < total; i++) {
      const file = files[i];
      const percent = Math.round((i / total) * 100);

      if (uploadStatusText) uploadStatusText.innerText = `Đang tải ${i + 1}/${total}: ${file.name.slice(0, 16)}...`;
      if (uploadPercentText) uploadPercentText.innerText = `${percent}%`;
      if (uploadProgressFill) uploadProgressFill.style.width = `${percent}%`;
      btnExecuteUpload.innerText = `Đang tải (${i + 1}/${total})...`;

      // Tự động nhận diện khung dọc 9:16 hay ngang 16:9
      const isPortrait = await detectIfPortrait(file);
      const isVideo = file.type.startsWith('video');
      const resourceType = isVideo ? 'video' : 'image';
      const cldUrl = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CONFIG.cloudName}/${resourceType}/upload`;

      const timestamp = Math.round(Date.now() / 1000);
      const signature = await generateCloudinarySignature({ timestamp }, CLOUDINARY_CONFIG.apiSecret);

      const formData = new FormData();
      formData.append('file', file);
      formData.append('api_key', CLOUDINARY_CONFIG.apiKey);
      formData.append('timestamp', timestamp);
      formData.append('signature', signature);

      const res = await fetch(cldUrl, { method: 'POST', body: formData });
      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(`Lỗi tải file "${file.name}": ${errData.error?.message || res.statusText}`);
      }

      const data = await res.json();

      newItems.push({
        id: 'cld_' + Date.now() + '_' + i,
        type: resourceType,
        url: data.secure_url,
        isPortrait: isPortrait
      });
    }

    if (uploadStatusText) uploadStatusText.innerText = `Đã tải xong ${total} file!`;
    if (uploadPercentText) uploadPercentText.innerText = '100%';
    if (uploadProgressFill) uploadProgressFill.style.width = '100%';

    // Thêm toàn bộ media mới vào đầu dải phim
    state.mediaList.unshift(...newItems);
    localStorage.setItem('pure_film_media', JSON.stringify(state.mediaList));
    renderReel();

    setTimeout(() => {
      fileMediaUpload.value = '';
      chosenFileName.classList.add('hidden');
      if (uploadProgressWrapper) uploadProgressWrapper.classList.add('hidden');
      btnExecuteUpload.disabled = false;
      btnExecuteUpload.innerText = 'Bắt đầu Upload';
      settingsModal.classList.add('hidden');
    }, 500);
  } catch (err) {
    alert(err.message || 'Lỗi khi upload.');
    btnExecuteUpload.disabled = false;
    btnExecuteUpload.innerText = 'Bắt đầu Upload';
    if (uploadProgressWrapper) uploadProgressWrapper.classList.add('hidden');
  }
}

function handleAddDirectUrl() {
  const url = inputDirectUrl.value.trim();
  const typeInput = document.querySelector('input[name="mediaType"]:checked');
  const orientationInput = document.querySelector('input[name="mediaOrientation"]:checked');
  const type = typeInput ? typeInput.value : 'image';
  const isPortrait = orientationInput ? orientationInput.value === 'portrait' : false;

  if (!url) {
    alert('Vui lòng nhập đường link URL');
    return;
  }

  state.mediaList.unshift({
    id: 'direct_' + Date.now(),
    type: type,
    url: url,
    isPortrait: isPortrait
  });

  localStorage.setItem('pure_film_media', JSON.stringify(state.mediaList));
  renderReel();
  inputDirectUrl.value = '';
  settingsModal.classList.add('hidden');
}

function renderMediaManagerList() {
  if (!mediaManagerList) return;
  mediaManagerList.innerHTML = '';

  // Đếm tần suất xuất hiện của URL để phát hiện mục bị tải lên 2 lần
  const urlCount = {};
  state.mediaList.forEach((m) => {
    urlCount[m.url] = (urlCount[m.url] || 0) + 1;
  });
  const hasDuplicates = Object.values(urlCount).some((c) => c > 1);

  const btnCleanDuplicates = document.getElementById('btnCleanDuplicates');
  if (btnCleanDuplicates) {
    if (hasDuplicates) {
      btnCleanDuplicates.classList.remove('hidden');
      btnCleanDuplicates.onclick = () => {
        const seen = new Set();
        state.mediaList = state.mediaList.filter((item) => {
          if (seen.has(item.url)) return false;
          seen.add(item.url);
          return true;
        });
        localStorage.setItem('pure_film_media', JSON.stringify(state.mediaList));
        renderReel();
      };
    } else {
      btnCleanDuplicates.classList.add('hidden');
    }
  }

  state.mediaList.forEach((item, idx) => {
    const isDup = urlCount[item.url] > 1;
    const row = document.createElement('div');
    row.className = `flex items-center justify-between p-2 rounded-xl text-neutral-300 text-[11px] ${
      isDup ? 'bg-amber-950/25 border border-amber-800/40' : 'bg-black/60 border border-neutral-800/50'
    }`;

    const fileName = item.url.split('/').pop().split('?')[0] || item.url;

    row.innerHTML = `
      <div class="flex items-center space-x-2.5 truncate pr-2">
        ${
          item.type === 'video'
            ? `<video src="${item.url}" class="w-9 h-9 rounded-md object-cover bg-neutral-800 shrink-0 pointer-events-none" muted></video>`
            : `<img src="${item.url}" class="w-9 h-9 rounded-md object-cover bg-neutral-800 shrink-0 pointer-events-none" />`
        }
        <div class="flex flex-col truncate">
          <span class="truncate font-mono text-[10px] text-neutral-300">${fileName}</span>
          <span class="text-[9px] text-neutral-500 uppercase tracking-wider">${item.type} ${
      isDup ? '• <span class="text-amber-400 font-semibold">Trùng lặp</span>' : ''
    }</span>
        </div>
      </div>
      <div class="flex items-center space-x-1.5 shrink-0">
        <button class="btn-toggle-ratio px-2 py-0.5 rounded text-[10px] font-medium transition active:scale-95 ${
          item.isPortrait
            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30 hover:bg-amber-500/30'
            : 'bg-blue-500/20 text-blue-300 border border-blue-500/30 hover:bg-blue-500/30'
        }" title="Nhấn để đổi dạng Ngang / Dọc">
          ${item.isPortrait ? 'Dọc 9:16' : 'Ngang 16:9'}
        </button>
        <button class="btn-delete text-neutral-500 hover:text-rose-400 p-1.5 active:scale-90" title="Xóa">
          <i class="fa-regular fa-trash-can"></i>
        </button>
      </div>
    `;

    // Nhấn nút tỉ lệ để đổi qua lại Ngang / Dọc theo ý muốn
    row.querySelector('.btn-toggle-ratio').addEventListener('click', () => {
      item.isPortrait = !item.isPortrait;
      localStorage.setItem('pure_film_media', JSON.stringify(state.mediaList));
      renderReel();
    });

    // Nhấn nút xóa
    row.querySelector('.btn-delete').addEventListener('click', () => {
      if (state.mediaList.length <= 1) {
        alert('Cần giữ lại ít nhất 1 khung hình trên dải phim.');
        return;
      }
      state.mediaList.splice(idx, 1);
      localStorage.setItem('pure_film_media', JSON.stringify(state.mediaList));
      renderReel();
    });

    mediaManagerList.appendChild(row);
  });
}

/* ==========================================================================
 * 7. KHỞI CHẠY (BOOTSTRAP)
 * ========================================================================== */
window.addEventListener('DOMContentLoaded', () => {
  initAudio();
  initModals();
  renderReel();
  initReelEvents();
  startAutoScroll();
});
