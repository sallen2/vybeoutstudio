$(document).ready(() => {
  Tone.Transport.bpm.value = 120;
  Tone.context.latencyHint = 'fastest';
  let octave = 4;
  let record = false;
  const keys = [];
  const arr = [];
  let part;
  let qu = '@32n';
  let prevKey = 0;
  let save = false;
  let theEvent;
  const actx = Tone.context;
  const dest = actx.createMediaStreamDestination();
  const recorder = new MediaRecorder(dest.stream);
  const chunks = [];

  $(() => {
    const options = {
      float: true,
      width: 12,
      height: 4,
      animate: true,
      alwaysShowResizeHandle: true,
      cellHeight: 110,
      verticalMargin: 5,
      horizontalMargin: 5,
      placeholderClass: 'grid-stack-placeholder',
      acceptWidgets: '.grid-stack-item',
    };


    $('.grid-stack').gridstack(_.defaults(options));

    const items = [{

    }];
    let i = 0;


    $('#plusbtn').on('click', () => {
      i++;
      i++;
      if (i === 10) {
        i = 0;
      }

      $('.dropdown-menu').show();
    });


    $('#drumKit').on('click', () => {
      items.push({
        x: i, y: 0, width: 2, height: 1,
      });
      items.shift();

      $('.grid-stack').append(function addinst() {
        const grid = $(this).data('gridstack');
        _.each(items, (node) => {
          grid.addWidget($(`<div>
          <div class="grid-stack-item-content">
          <button id="drums">drums</button>
          </div>
              </div>`),
          node.x, node.y, node.width, node.height);
        }, this);
      });
      $('.dropdown-menu').hide();
    });

    $('#piano').on('click', () => {
      items.push({
        x: i, y: 0, width: 2, height: 1,
      });
      items.shift();

      $('.grid-stack').append(function addinst() {
        const grid = $(this).data('gridstack');
        _.each(items, (node) => {
          grid.addWidget($(`<div>
          <div class="grid-stack-item-content">
          <button id="piano">piano</button>
          </div>
              </div>`),
          node.x, node.y, node.width, node.height);
        }, this);
      });
      $('.dropdown-menu').hide();
    });

    $('#pluck').on('click', () => {
      items.push({
        x: i, y: 0, width: 2, height: 1,
      });
      items.shift();

      $('.grid-stack').append(function addinst() {
        const grid = $(this).data('gridstack');
        _.each(items, (node) => {
          grid.addWidget($(`<div>
          <div class="grid-stack-item-content">
          <button id="pluck">pluck</button>
          </div>
              </div>`),
          node.x, node.y, node.width, node.height);
        }, this);
      });
      $('.dropdown-menu').hide();
    });

    $('#synth').on('click', () => {
      items.push({
        x: i, y: 0, width: 2, height: 1,
      });
      items.shift();

      $('.grid-stack').append(function addinst() {
        const grid = $(this).data('gridstack');
        _.each(items, (node) => {
          grid.addWidget($(`<div>
          <div class="grid-stack-item-content">
          <button id="synth">synth</button>
          </div>
              </div>`),
          node.x, node.y, node.width, node.height);
        }, this);
      });
      $('.dropdown-menu').hide();
    });

    $('#flute').on('click', () => {
      items.push({
        x: i, y: 0, width: 2, height: 1,
      });
      items.shift();

      $('.grid-stack').append(function addinst() {
        const grid = $(this).data('gridstack');
        _.each(items, (node) => {
          grid.addWidget($(`<div>
          <div class="grid-stack-item-content">
          <button id="flute">flute</button>
          </div>
              </div>`),
          node.x, node.y, node.width, node.height);
        }, this);
      });
      $('.dropdown-menu').hide();
    });

    $('#sax').on('click', () => {
      items.push({
        x: i, y: 0, width: 2, height: 1,
      });
      items.shift();

      $('.grid-stack').append(function addinst() {
        const grid = $(this).data('gridstack');
        _.each(items, (node) => {
          grid.addWidget($(`<div>
          <div class="grid-stack-item-content">
          <button id="sax">sax</button>
          </div>
              </div>`),
          node.x, node.y, node.width, node.height);
        }, this);
      });
      $('.dropdown-menu').hide();
    });

    $('#trumpets').on('click', () => {
      items.push({
        x: i, y: 0, width: 2, height: 1,
      });
      items.shift();

      $('.grid-stack').append(function addinst() {
        const grid = $(this).data('gridstack');
        _.each(items, (node) => {
          grid.addWidget($(`<div>
          <div class="grid-stack-item-content">
          <button id="trumpet">trumpet</button>
          </div>
              </div>`),
          node.x, node.y, node.width, node.height);
        }, this);
      });
      $('.dropdown-menu').hide();
    });
  });

  const Instruments = {
    // https://github.com/stuartmemo/qwerty-hancock
    keyboard: {
      // Lower octave.
      a: 'Cl',
      w: 'C#l',
      s: 'Dl',
      e: 'D#l',
      d: 'El',
      f: 'Fl',
      t: 'F#l',
      g: 'Gl',
      y: 'G#l',
      h: 'Al',
      u: 'A#l',
      j: 'Bl',
      // Upper octave.
      k: 'Cu',
      o: 'C#u',
      l: 'Du',
      p: 'D#u',
      ';': 'Eu',
      "'": 'Fu',
      ']': 'F#u',
      '\\': 'Gu',
    },
  };

  const instrument = Instruments.keyboard;

  const keyToNote = (key) => {
    const note = instrument[key];
    if (!note) {
      return;
    }

    return Tone.Frequency(
      note
        .replace('l', octave)
        .replace('u', octave + 1),
    ).toNote();
  };

  const onKeyDown = (() => {
    let listener;
    return (ins) => {
      document.removeEventListener('keydown', listener);
      const arr = [];
      listener = (event) => {
        const { key } = event;
        // Only trigger once per keydown event.
        if (!keys[key]) {
          keys[key] = true;

          const note = keyToNote(key);
          if (note) {
            prevKey = key;
            if (record) {
              theEvent = new Tone.Event(((position, theNote) => {
                ins.ins.triggerAttackRelease(theNote, '4n', qu);
              }), note);
              theEvent.humanize = true;
              theEvent.start();
            } else {
              ins.ins.triggerAttack(note);
            }
          }
        }
      };

      document.addEventListener('keydown', listener);
    };
  })();

  const onKeyUp = (() => {
    let listener;
    let prev;

    return (ins) => {
      // Clean-up.
      if (prev) {
        prev.triggerRelease();
      }

      document.removeEventListener('keyup', listener);

      prev = ins;
      listener = (event) => {
        const { key } = event;
        if (keys[key]) {
          keys[key] = false;

          const note = keyToNote(key);
          if (note && key === prevKey) {
            // Trigger release if this is the previous note played.
            ins.ins.triggerRelease();
          }
        }
      };

      document.addEventListener('keyup', listener);
    };
  })();

  // Octave controls.
  document.addEventListener('keydown', (event) => {
    // Decrease octave range (min: 0).
    if (event.key === 'z') { octave = Math.max(octave - 1, 0); }
    // Increase octave range (max: 10).
    if (event.key === 'x') { octave = Math.min(octave + 1, 9); }
  });

  // Metronome
  const player = new Tone.Player('../sounds/metro_beat.wav').toMaster();

  function start(bool) {
    Tone.Transport.scheduleRepeat((time) => {
      player.start();
    }, '4n');
    Tone.Transport.loop = bool;
    Tone.Transport.setLoopPoints(0, '2m');
    Tone.Transport.start('+0.1', '1:2:4.999');
  }

  document.getElementById('bpm').addEventListener('input', (e) => {
    Tone.Transport.bpm.value = +e.target.value;
    $('#tempo').text(Tone.Transport.bpm.value = +e.target.value);
  });


  function stop() {
    console.log(Tone.TransportTime().toBarsBeatsSixteenths());
    Tone.Transport.stop();
  }

  $('#save').on('click', (e) => {
    start(true);
    recorder.ondataavailable = evt => chunks.push(evt.data);
    recorder.start();
  });

  $('#stopSave').on('click', (e) => {
    recorder.stop();
    Tone.Transport.stop();
    recorder.onstop = (evt) => {
      const blob = new Blob(chunks, { type: 'audio/ogg; codecs=opus' });
      const fd = new FormData();
      fd.append('audio', blob, 'blobby.ogg');
      console.log(blob);
      $.ajax({
        method: 'POST',
        url: '/create',
        data: fd,
        processData: false,
        contentType: false,
      }).done(location.reload());
    };
  });

  $('#start').on('click', (e) => {
    start(true);
  });

  $('#stop').on('click', (e) => {
    save = false;
    stop();
  });

  $('#confirm').on('click', (e) => {
    e.preventDefault();
    qu = $('#grid').val();
  });

  $('#record').on('click', (e) => {
    record = !record;
    $('#record').toggleClass('recordOn');
  });

  $(document).on('click', '#synth', (e) => {
    const ins = new Tone.PluckSynth();
    ins.connect(dest);
    ins.toMaster();
    const plucked = {
      ins,
      arr: [],
    };
    onKeyDown(plucked);
    onKeyUp(plucked);
  });

  $(document).on('click', '#drums', (e) => {
    const ins = new Tone.Sampler({
      C4: '../sounds/LL_hihat_remix.wav',
      D4: '../sounds/LL_snare_pyrex.wav',
      F4: '../sounds/808.wav',
      E4: '../sounds/FX_VoxBobby_Wet.wav',
    }, {
      release: 1,
    });
    ins.connect(dest);
    ins.toMaster();
    const drums = {
      ins,
      arr: [],
    };
    ins.volume.value = -10;
    onKeyDown(drums);
    onKeyUp(drums);
  });

  $(document).on('click', '#piano', (e) => {
    const ins = new Tone.Sampler({
      C4: '../sounds/piano.wav',
    }, {
      release: 1,
    });
    ins.connect(dest);
    ins.toMaster();
    const piano = {
      ins,
      arr: [],
    };
    ins.volume.value = -25;
    onKeyDown(piano);
    onKeyUp(piano);
  });

  $(document).on('click', '#flute', (e) => {
    const ins = new Tone.Sampler({
      C4: '../sounds/flute_1.wav',
    }, {
      release: 1,
    });
    ins.connect(dest);
    ins.toMaster();
    const flute = {
      ins,
      arr: [],
    };
    ins.volume.value = -15;
    onKeyDown(flute);
    onKeyUp(flute);
  });

  $(document).on('click', '#sax', (e) => {
    const ins = new Tone.Sampler({
      C4: '../sounds/sax_1.wav',
    }, {
      release: 1,
    });
    ins.connect(dest);
    ins.toMaster();
    const sax = {
      ins,
      arr: [],
    };
    ins.volume.value = -15;
    onKeyDown(sax);
    onKeyUp(sax);
  });

  $(document).on('click', '#trumpet', (e) => {
    const ins = new Tone.Sampler({
      C4: '../sounds/trumpet_1.wav',
    }, {
      release: 1,
    });
    ins.connect(dest);
    ins.toMaster();
    const trumpet = {
      ins,
      arr: [],
    };
    ins.volume.value = -15;
    onKeyDown(trumpet);
    onKeyUp(trumpet);
  });

  $(document).on('click', '#pluck', (e) => {
    const ins = new Tone.Sampler({
      C4: '../sounds/pluck.wav',
    }, {
      release: 1,
    });
    ins.connect(dest);
    ins.toMaster();
    const pluck = {
      ins,
      arr: [],
    };
    ins.volume.value = -10;
    onKeyDown(pluck);
    onKeyUp(pluck);
  });
});
