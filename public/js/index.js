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
              var event = new Tone.Event(((position, theNote) => {
                ins.ins.triggerAttackRelease(theNote, '4n', qu);
              }), note);
              ins.arr.push([Tone.Transport.position, note]);
              console.log(arr);
              event.humanize = true;
              event.start();
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

  function start() {
    Tone.Transport.scheduleRepeat((time) => {
      player.start();
    }, '4n');
    Tone.Transport.loop = true;
    Tone.Transport.loopStart = 0;
    Tone.Transport.loopEnd = 4;
    Tone.Transport.start();
  }

  document.getElementById('bpm').addEventListener('input', (e) => {
    Tone.Transport.bpm.value = +e.target.value;
    $('#tempo').text(Tone.Transport.bpm.value = +e.target.value);
  });

  function stop() {
    Tone.Transport.stop();
  }

  $('#start').on('click', (e) => {
    start();
  });

  $('#stop').on('click', (e) => {
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
    const ins = new Tone.PluckSynth().toMaster();
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
    }).toMaster();
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
    }).toMaster();
    const piano = {
      ins,
      arr: [],
    };
    ins.volume.value = -25;
    onKeyDown(piano);
    onKeyUp(piano);
  });

  $(document).on('click', '#pluck', (e) => {
    const ins = new Tone.Sampler({
      C4: '../sounds/pluck.wav',
    }, {
      release: 1,
    }).toMaster();
    const pluck = {
      ins,
      arr: [],
    };
    ins.volume.value = -10;
    onKeyDown(pluck);
    onKeyUp(pluck);
  });
});
