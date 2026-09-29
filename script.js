const LOCAL_MUSIC_PATH = './nhac.mp3';

const STORAGE_KEY = 'pure_film_media_v3';

const defaultMediaList = [
  {
    id: 'cld_v1',
    type: 'video',
    url: 'https://res.cloudinary.com/nodetely/video/upload/v1790689333/ql9ysj7qikrgsasmbpjp.mp4',
    isPortrait: true
  },
  {
    id: 'cld_v2',
    type: 'video',
    url: 'https://res.cloudinary.com/nodetely/video/upload/v1790688886/lvkjlbufchuqywombw7c.mp4',
    isPortrait: true
  },
  {
    id: 'cld_v3',
    type: 'video',
    url: 'https://res.cloudinary.com/nodetely/video/upload/v1790688795/k992gmurefxm7cqrw5tw.mp4',
    isPortrait: true
  },
  {
    id: 'cld_img1',
    type: 'image',
    url: 'https://res.cloudinary.com/nodetely/image/upload/v1790695019/clkrpdvayoesnp4monjh.jpg',
    isPortrait: true
  },
  {
    id: 'cld_img2',
    type: 'image',
    url: 'https://res.cloudinary.com/nodetely/image/upload/v1790695018/sdbp0qdptkqe9npa9qc7.jpg',
    isPortrait: true
  },
  {
    id: 'cld_img3',
    type: 'image',
    url: 'https://res.cloudinary.com/nodetely/image/upload/v1790695017/qjf76bl9h0miczccyemc.jpg',
    isPortrait: false
  },
  {
    id: 'cld_img4',
    type: 'image',
    url: 'https://res.cloudinary.com/nodetely/image/upload/v1790691185/towfy6welnwxvqfjddbr.jpg',
    isPortrait: true
  },
  {
    id: 'cld_img5',
    type: 'image',
    url: 'https://res.cloudinary.com/nodetely/image/upload/v1790691122/m9mr3dy68adpwxxwhzrj.jpg',
    isPortrait: true
  },
  {
    id: 'cld_img6',
    type: 'image',
    url: 'https://res.cloudinary.com/nodetely/image/upload/v1790691121/qdhvgfvi8t9itjscjowh.jpg',
    isPortrait: true
  },
  {
    id: 'cld_img7',
    type: 'image',
    url: 'https://res.cloudinary.com/nodetely/image/upload/v1790689386/a9wphcnvc61fmxmodqdb.jpg',
    isPortrait: false
  },
  {
    id: 'cld_img8',
    type: 'image',
    url: 'https://res.cloudinary.com/nodetely/image/upload/v1790689384/quanr81f0tw5el3n6atn.jpg',
    isPortrait: false
  },
  {
    id: 'cld_img9',
    type: 'image',
    url: 'https://res.cloudinary.com/nodetely/image/upload/v1790689378/wahi460uhvlou28sp5uj.jpg',
    isPortrait: false
  },
  {
    id: 'cld_img10',
    type: 'image',
    url: 'https://res.cloudinary.com/nodetely/image/upload/v1790689373/xebhfktuog9go7qbxsez.jpg',
    isPortrait: true
  },
  {
    id: 'cld_img11',
    type: 'image',
    url: 'https://res.cloudinary.com/nodetely/image/upload/v1790689368/oer6qnb59tuy9yjn8s2j.jpg',
    isPortrait: true
  },
  {
    id: 'cld_img12',
    type: 'image',
    url: 'https://res.cloudinary.com/nodetely/image/upload/v1790689366/nkdmiofphge9h42kswn3.jpg',
    isPortrait: false
  },
  {
    id: 'cld_img13',
    type: 'image',
    url: 'https://res.cloudinary.com/nodetely/image/upload/v1790689364/uauymezjqdgc25olcbwh.jpg',
    isPortrait: false
  },
  {
    id: 'cld_img14',
    type: 'image',
    url: 'https://res.cloudinary.com/nodetely/image/upload/v1790689360/amewlpelkucidh5rmhyd.jpg',
    isPortrait: true
  },
  {
    id: 'cld_img15',
    type: 'image',
    url: 'https://res.cloudinary.com/nodetely/image/upload/v1790689357/yppq6abblqpulrxnnhj1.jpg',
    isPortrait: false
  },
  {
    id: 'cld_img16',
    type: 'image',
    url: 'https://res.cloudinary.com/nodetely/image/upload/v1790689353/bunwylsjmjzgo8ghz2hu.jpg',
    isPortrait: false
  },
  {
    id: 'cld_img17',
    type: 'image',
    url: 'https://res.cloudinary.com/nodetely/image/upload/v1790689351/wp6b6t1zsmmsmpp7wojo.jpg',
    isPortrait: false
  },
  {
    id: 'cld_img18',
    type: 'image',
    url: 'https://res.cloudinary.com/nodetely/image/upload/v1790689349/jydpq7ttuk40gdzrdfvn.jpg',
    isPortrait: true
  },
  {
    id: 'cld_img19',
    type: 'image',
    url: 'https://res.cloudinary.com/nodetely/image/upload/v1790689346/ua16x1ni2mbwivhs8mfk.jpg',
    isPortrait: true
  },
  {
    id: 'cld_img20',
    type: 'image',
    url: 'https://res.cloudinary.com/nodetely/image/upload/v1790689341/yzrob92ngdwykkw416aa.jpg',
    isPortrait: true
  },
  {
    id: 'cld_img21',
    type: 'image',
    url: 'https://res.cloudinary.com/nodetely/image/upload/v1790689338/lvxqhozkczq7eabqdtnj.jpg',
    isPortrait: true
  }
];

const CLOUDINARY_CONFIG = {
  cloudName: 'nodetely',
  apiKey: '715541221342479',
  apiSecret: 'THFqeXwQp4m22-Yr3Wq0IRfHsmI'
};

const state = {
  mediaList: JSON.parse(localStorage.getItem(STORAGE_KEY)) || defaultMediaList,
  scrollPos: 0,
  scrollSpeed: 2.0,
  cycleWidth: 0,
  hasDragged: false,
  hasInteracted: false,
  isPlayingAudio: false
};

const reelTrack = document.getElementById('reelTrack');
const reelViewport = document.getElementById('reelViewport');

const bgAudio = document.getElementById('bgAudio');
const btnToggleAudio = document.getElementById('btnToggleAudio');
const audioIcon = document.getElementById('audioIcon');
const soundWaves = document.getElementById('soundWaves');
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

const rotatePromptModal = document.getElementById('rotatePromptModal');
const btnEnterLandscapeFullscreen = document.getElementById('btnEnterLandscapeFullscreen');
const btnDismissRotatePrompt = document.getElementById('btnDismissRotatePrompt');

let videoObserver = null;
let cycleWidthUpdateTimer = null;

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

      if (videoObserver) {
        videoObserver.observe(vid);
      }

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
            localStorage.setItem(STORAGE_KEY, JSON.stringify(state.mediaList));
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
            localStorage.setItem(STORAGE_KEY, JSON.stringify(state.mediaList));
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

  state.cycleWidth = 0;
  scheduleCycleWidthUpdate();
  applyScrollTransform();
  renderMediaManagerList();
}

function updateCycleWidth() {
  if (!reelTrack) return;
  const cards = reelTrack.querySelectorAll('.film-card');
  const n = state.mediaList.length;
  if (cards.length > n && cards[0] && cards[n]) {
    state.cycleWidth = cards[n].offsetLeft - cards[0].offsetLeft;
  }
}

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

  attemptAutoplay();
}

function attemptAutoplay() {
  if (!bgAudio) return;

  const playPromise = bgAudio.play();
  if (playPromise !== undefined) {
    playPromise.then(() => {
      state.isPlayingAudio = true;
      updateAudioUI(true);
    }).catch(() => {
      enableAutoplayFallback();
    });
  }
}

function enableAutoplayFallback() {
  const triggerEvents = ['pointerdown', 'touchstart', 'click'];
  const unlockAudio = () => {
    if (!bgAudio) return;
    if (bgAudio.paused) {
      bgAudio.play().then(() => {
        state.isPlayingAudio = true;
        updateAudioUI(true);
        triggerEvents.forEach((evt) => {
          document.removeEventListener(evt, unlockAudio, true);
        });
      }).catch(() => {});
    }
  };

  triggerEvents.forEach((evt) => {
    document.addEventListener(evt, unlockAudio, { capture: true, passive: true });
  });
}

function toggleAudio() {
  if (!bgAudio) return;

  if (bgAudio.paused) {
    bgAudio.play().then(() => {
      state.isPlayingAudio = true;
      updateAudioUI(true);
    }).catch(() => {});
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

function initModals() {
  if (btnCloseFullscreen) {
    btnCloseFullscreen.addEventListener('click', closeFullscreen);
  }

  if (fullscreenModal) {
    fullscreenModal.addEventListener('click', (e) => {
      if (e.target === fullscreenModal) {
        closeFullscreen();
      }
    });
  }

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

    state.mediaList.unshift(...newItems);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.mediaList));
    renderReel();

    setTimeout(() => {
      fileMediaUpload.value = '';
      chosenFileName.classList.add('hidden');
      if (uploadProgressWrapper) uploadProgressWrapper.classList.add('hidden');
      btnExecuteUpload.disabled = false;
      btnExecuteUpload.innerText = 'Bắt đầu Upload';
      settingsModal.classList.add('hidden');
      syncMediaFromCloudinary();
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

  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.mediaList));
  renderReel();
  inputDirectUrl.value = '';
  settingsModal.classList.add('hidden');
}

function renderMediaManagerList() {
  if (!mediaManagerList) return;
  mediaManagerList.innerHTML = '';

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
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state.mediaList));
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

    row.querySelector('.btn-toggle-ratio').addEventListener('click', () => {
      item.isPortrait = !item.isPortrait;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.mediaList));
      renderReel();
    });

    row.querySelector('.btn-delete').addEventListener('click', async (e) => {
      if (state.mediaList.length <= 1) {
        alert('Cần giữ lại ít nhất 1 khung hình trên dải phim.');
        return;
      }
      const confirmDelete = confirm('Bạn có muốn xóa vĩnh viễn tệp này khỏi Cloudinary và dải phim không?');
      if (!confirmDelete) return;

      const deleteBtn = e.currentTarget;
      deleteBtn.disabled = true;
      deleteBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin text-amber-400"></i>';

      await deleteCloudinaryMedia(item);

      const targetIdx = state.mediaList.findIndex((m) => (m.id && m.id === item.id) || m.url === item.url);
      if (targetIdx !== -1) {
        state.mediaList.splice(targetIdx, 1);
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.mediaList));
      renderReel();
    });

    mediaManagerList.appendChild(row);
  });
}

function getCloudinaryPublicId(url) {
  if (!url) return null;
  const match = url.match(/\/upload\/(?:v\d+\/)?([^\.]+)/);
  return match ? match[1] : null;
}

async function deleteCloudinaryMedia(item) {
  const publicId = item.public_id || getCloudinaryPublicId(item.url);
  if (!publicId) return;

  const resourceType = item.type === 'video' ? 'video' : 'image';
  const timestamp = Math.round(Date.now() / 1000);
  const signature = await generateCloudinarySignature({ public_id: publicId, timestamp }, CLOUDINARY_CONFIG.apiSecret);

  const formData = new FormData();
  formData.append('public_id', publicId);
  formData.append('timestamp', timestamp);
  formData.append('api_key', CLOUDINARY_CONFIG.apiKey);
  formData.append('signature', signature);

  try {
    await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CONFIG.cloudName}/${resourceType}/destroy`, {
      method: 'POST',
      body: formData
    });
  } catch (_) {}

  try {
    await fetch('/api/media', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ public_id: publicId, resource_type: resourceType })
    });
  } catch (_) {}
}

async function syncMediaFromCloudinary() {
  try {
    const res = await fetch('/api/media?t=' + Date.now(), { cache: 'no-store' });
    if (!res.ok) return;
    const data = await res.json();
    if (data && data.success && Array.isArray(data.media) && data.media.length > 0) {
      const currentSignature = state.mediaList.map((m) => m.url).join('|');
      const newSignature = data.media.map((m) => m.url).join('|');
      if (currentSignature !== newSignature) {
        state.mediaList = data.media;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state.mediaList));
        renderReel();
      }
    }
  } catch (_) {}
}

function startRealtimeSync() {
  syncMediaFromCloudinary();
  setInterval(() => {
    if (!document.hidden) {
      syncMediaFromCloudinary();
    }
  }, 15000);
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) {
      syncMediaFromCloudinary();
    }
  });
}

function isMobileDevice() {
  return /Android|iPhone|iPad|iPod|webOS|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || (window.innerWidth <= 850 && 'ontouchstart' in window);
}

function checkRotatePrompt() {
  if (!rotatePromptModal) return;
  if (sessionStorage.getItem('dismiss_rotate_prompt') === 'true') {
    hideRotatePrompt();
    return;
  }
  const isLandscape = window.innerWidth > window.innerHeight;
  if (isMobileDevice() && !isLandscape) {
    showRotatePrompt();
  } else {
    hideRotatePrompt();
  }
}

function showRotatePrompt() {
  if (!rotatePromptModal) return;
  rotatePromptModal.classList.remove('opacity-0', 'pointer-events-none');
  rotatePromptModal.classList.add('opacity-100');
}

function hideRotatePrompt() {
  if (!rotatePromptModal) return;
  rotatePromptModal.classList.add('opacity-0', 'pointer-events-none');
  rotatePromptModal.classList.remove('opacity-100');
}

function initRotatePrompt() {
  if (!rotatePromptModal) return;

  checkRotatePrompt();

  const handleViewportChange = () => {
    checkRotatePrompt();
    scheduleCycleWidthUpdate();
    setTimeout(() => {
      scheduleCycleWidthUpdate();
      applyScrollTransform();
    }, 200);
  };

  window.addEventListener('resize', handleViewportChange);
  document.addEventListener('fullscreenchange', handleViewportChange);
  if (screen.orientation) {
    screen.orientation.addEventListener('change', handleViewportChange);
  }

  if (btnEnterLandscapeFullscreen) {
    btnEnterLandscapeFullscreen.addEventListener('click', async () => {
      if (bgAudio && bgAudio.paused) {
        bgAudio.play().then(() => {
          state.isPlayingAudio = true;
          updateAudioUI(true);
        }).catch(() => {});
      }

      try {
        const el = document.documentElement;
        if (el.requestFullscreen) {
          await el.requestFullscreen();
        } else if (el.webkitRequestFullscreen) {
          await el.webkitRequestFullscreen();
        }
      } catch (_) {}

      try {
        if (screen.orientation && screen.orientation.lock) {
          await screen.orientation.lock('landscape');
        }
      } catch (_) {}

      sessionStorage.setItem('dismiss_rotate_prompt', 'true');
      hideRotatePrompt();
    });
  }

  if (btnDismissRotatePrompt) {
    btnDismissRotatePrompt.addEventListener('click', () => {
      sessionStorage.setItem('dismiss_rotate_prompt', 'true');
      hideRotatePrompt();
    });
  }
}

window.addEventListener('DOMContentLoaded', () => {
  initAudio();
  initModals();
  renderReel();
  initReelEvents();
  startAutoScroll();
  startRealtimeSync();
  initRotatePrompt();
});
