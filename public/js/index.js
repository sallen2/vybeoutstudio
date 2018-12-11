$(document).ready(() => {
  let i = 0;
  Tone.Transport.bpm.value = localStorage.getItem('Tempo') || 120;

  $('#tempo').text(`${Tone.Transport.bpm.value}`);
  Tone.context.latencyHint = 0.0;
  Tone.context.updateInterval = 0.0;

  const freeverb = new Tone.Freeverb().toMaster();
  freeverb.dampening.value = 1000;
  const pingPong = new Tone.PingPongDelay().toMaster();
  let octave = 4;
  let record = false;
  const keys = [];
  const arr = [];
  let part;
  let qu = '@32n';
  let prevKey = 0;
  const save = false;
  let theEvent;
  const actx = Tone.context;
  const dest = actx.createMediaStreamDestination();
  pingPong.connect(dest);
  freeverb.connect(dest);
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
      if ($('#plusbtn').hasClass('talib')) {
        $('.dropdown-menu').hide();
        $('#plusbtn').removeClass('talib');
      } else {
        i++;
        i++;
        if (i === 10) {
          i = 0;
        }

        $('.dropdown-menu').show();
        $('#plusbtn').addClass('talib');
      }
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
          <div class="grid-stack-item-content gridstackdrum">
          <button id="drums" class="waves-light btn instrumentColor">drums</button>
          <input id='drumKitVol' id="vol" type="range" min="-50" max="0" step="1" value="-6">
          <button id="drumsR" class="waves-light btn instrumentColor">Reverb</button>
          <button id="drumsD" class="waves-light btn instrumentColor">Delay</button>
          </div>
              </div>`),
          node.x, node.y, node.width, node.height);
        }, this);
      });
      $('.dropdown-menu').hide();
    });

    $('#drumKit2').on('click', () => {
      items.push({
        x: i, y: 0, width: 2, height: 1,
      });
      items.shift();

      $('.grid-stack').append(function addinst() {
        const grid = $(this).data('gridstack');
        _.each(items, (node) => {
          grid.addWidget($(`<div>
          <div class="grid-stack-item-content gridstackdrum">
          <button id="drums2" class="waves-light btn instrumentColor">Drum Kit 2</button>
          <input id='drumKit2Vol' id="vol" type="range" min="-50" max="0" step="1" value="-6">
          <button id="drums2R" class="waves-light btn instrumentColor">Reverb</button>
          <button id="drums2D" class="waves-light btn instrumentColor">Delay</button>
          </div>
              </div>`),
          node.x, node.y, node.width, node.height);
        }, this);
      });
      $('.dropdown-menu').hide();
    });

    $('#guitar1').on('click', () => {
      items.push({
        x: i, y: 0, width: 2, height: 1,
      });
      items.shift();

      $('.grid-stack').append(function addinst() {
        const grid = $(this).data('gridstack');
        _.each(items, (node) => {
          grid.addWidget($(`<div>
          <div class="grid-stack-item-content gridstackdrum">
          <button id="guitar1" class="waves-light btn instrumentColor">Guitar 1</button>
          <input id='guitar1Vol' id="vol" type="range" min="-50" max="0" step="1" value="-6">
          <button id="guitar1R" class="waves-light btn instrumentColor">Reverb</button>
          <button id="guitar1D" class="waves-light btn instrumentColor">Delay</button>
          </div>
              </div>`),
          node.x, node.y, node.width, node.height);
        }, this);
      });
      $('.dropdown-menu').hide();
    });

    $('#pad').on('click', () => {
      items.push({
        x: i, y: 0, width: 2, height: 1,
      });
      items.shift();

      $('.grid-stack').append(function addinst() {
        const grid = $(this).data('gridstack');
        _.each(items, (node) => {
          grid.addWidget($(`<div>
          <div class="grid-stack-item-content gridstackdrum">
          <button id="pad" class="waves-light btn instrumentColor">Pad</button>
          <input id='padVol' id="vol" type="range" min="-50" max="0" step="1" value="-6">
          <button id="padR" class="waves-light btn instrumentColor">Reverb</button>
          <button id="padD" class="waves-light btn instrumentColor">Delay</button>
          </div>
              </div>`),
          node.x, node.y, node.width, node.height);
        }, this);
      });
      $('.dropdown-menu').hide();
    });

    $('#steelPluck').on('click', () => {
      items.push({
        x: i, y: 0, width: 2, height: 1,
      });
      items.shift();

      $('.grid-stack').append(function addinst() {
        const grid = $(this).data('gridstack');
        _.each(items, (node) => {
          grid.addWidget($(`<div>
          <div class="grid-stack-item-content gridstackdrum">
          <button id="steelPluck" class="waves-light btn instrumentColor">Steel Pluck</button>
          <input id='steelPluckVol' id="vol" type="range" min="-50" max="0" step="1" value="-6">
          <button id="steelPluckR" class="waves-light btn instrumentColor">Reverb</button>
          <button id="steelPluckD" class="waves-light btn instrumentColor">Delay</button>
          </div>
              </div>`),
          node.x, node.y, node.width, node.height);
        }, this);
      });
      $('.dropdown-menu').hide();
    });

    $('#synthPluck').on('click', () => {
      items.push({
        x: i, y: 0, width: 2, height: 1,
      });
      items.shift();

      $('.grid-stack').append(function addinst() {
        const grid = $(this).data('gridstack');
        _.each(items, (node) => {
          grid.addWidget($(`<div>
          <div class="grid-stack-item-content gridstackdrum">
          <button id="synthPluck" class="waves-light btn instrumentColor">Synth Pluck</button>
          <input id='synthPluckVol' id="vol" type="range" min="-50" max="0" step="1" value="-6">
          <button id="synthPluckR" class="waves-light btn instrumentColor">Reverb</button>
          <button id="synthPluckD" class="waves-light btn instrumentColor">Delay</button>
          </div>
              </div>`),
          node.x, node.y, node.width, node.height);
        }, this);
      });
      $('.dropdown-menu').hide();
    });

    $('#choir1').on('click', () => {
      items.push({
        x: i, y: 0, width: 2, height: 1,
      });
      items.shift();

      $('.grid-stack').append(function addinst() {
        const grid = $(this).data('gridstack');
        _.each(items, (node) => {
          grid.addWidget($(`<div>
          <div class="grid-stack-item-content gridstackdrum">
          <button id="choir1" class="waves-light btn instrumentColor">Choir 1</button>
          <input id='choir1Vol' id="vol" type="range" min="-50" max="0" step="1" value="-6">
          <button id="choir1R" class="waves-light btn instrumentColor">Reverb</button>
          <button id="choir1D" class="waves-light btn instrumentColor">Delay</button>
          </div>
              </div>`),
          node.x, node.y, node.width, node.height);
        }, this);
      });
      $('.dropdown-menu').hide();
    });

    $('#choir2').on('click', () => {
      items.push({
        x: i, y: 0, width: 2, height: 1,
      });
      items.shift();

      $('.grid-stack').append(function addinst() {
        const grid = $(this).data('gridstack');
        _.each(items, (node) => {
          grid.addWidget($(`<div>
          <div class="grid-stack-item-content gridstackdrum">
          <button id="choir2" class="waves-light btn instrumentColor">Choir 2</button>
          <input id='choir2Vol' id="vol" type="range" min="-50" max="0" step="1" value="-6">
          <button id="choir2R" class="waves-light btn instrumentColor">Reverb</button>
          <button id="choir2D" class="waves-light btn instrumentColor">Delay</button>
          </div>
              </div>`),
          node.x, node.y, node.width, node.height);
        }, this);
      });
      $('.dropdown-menu').hide();
    });

    $('#guitar2').on('click', () => {
      items.push({
        x: i, y: 0, width: 2, height: 1,
      });
      items.shift();

      $('.grid-stack').append(function addinst() {
        const grid = $(this).data('gridstack');
        _.each(items, (node) => {
          grid.addWidget($(`<div>
          <div class="grid-stack-item-content gridstackdrum">
          <button id="guitar2" class="waves-light btn instrumentColor">Guitar 2</button>
          <input id='guitar2Vol' id="vol" type="range" min="-50" max="0" step="1" value="-6">
          <button id="guitar2R" class="waves-light btn instrumentColor">Reverb</button>
          <button id="guitar2D" class="waves-light btn instrumentColor">Delay</button>
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
          <div class="grid-stack-item-content gridstackpiano">
          <button id="piano" class="waves-light btn instrumentColor">piano</button>
          <input id='pianoVol' id="vol" type="range" min="-50" max="0" step="1" value="-6">
          <button id="pianoR" class="waves-light btn instrumentColor">Reverb</button>
          <button id="pianoD" class="waves-light btn instrumentColor">Delay</button>
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
          <div class="grid-stack-item-content gridpluck">
          <button id="pluck" class="waves-light btn instrumentColor">pluck</button>
          <input id='pluckVol' id="vol" type="range" min="-50" max="0" step="1" value="-6">
          <button id="pluckR" class="waves-light btn instrumentColor">Reverb</button>
          <button id="pluckD" class="waves-light btn instrumentColor">Delay</button>
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
          <div class="grid-stack-item-content gridsynth">
          <button id="synth" class="waves-light btn instrumentColor">synth</button>
          <input id='synthVol' id="vol" type="range" min="-50" max="0" step="1" value="-6">
          <button id="synthR" class="waves-light btn instrumentColor">Reverb</button>
          <button id="synthD" class="waves-light btn instrumentColor">Delay</button>
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
          <div class="grid-stack-item-content gridflute">
          <button id="flute" class="waves-light btn instrumentColor">flute</button>
          <input id='fluteVol' id="vol" type="range" min="-50" max="0" step="1" value="-6">
          <button id="fluteR" class="waves-light btn instrumentColor">Reverb</button>
          <button id="fluteD" class="waves-light btn instrumentColor">Delay</button>
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
          <div class="grid-stack-item-content gridsax">
          <button id="sax" class="waves-light btn instrumentColor">sax</button>
          <input id='saxVol' id="vol" type="range" min="-50" max="0" step="1" value="-6">
          <button id="saxR" class="waves-light btn instrumentColor">Reverb</button>
          <button id="saxD" class="waves-light btn instrumentColor">Delay</button>
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
          <div class="grid-stack-item-content gridtrumpet">
          <button id="trumpet" class="waves-light btn instrumentColor">trumpet</button>
          <input id='trumpetVol' id="vol" type="range" min="-50" max="0" step="1" value="-6">
          <button id="trumpetR" class="waves-light btn instrumentColor">Reverb</button>
          <button id="trumpetD" class="waves-light btn instrumentColor">Delay</button>
          </div>
              </div>`),
          node.x, node.y, node.width, node.height);
        }, this);
      });
      $('.dropdown-menu').hide();
    });

    $('#pluck2').on('click', () => {
      items.push({
        x: i, y: 0, width: 2, height: 1,
      });
      items.shift();

      $('.grid-stack').append(function addinst() {
        const grid = $(this).data('gridstack');
        _.each(items, (node) => {
          grid.addWidget($(`<div>
          <div class="grid-stack-item-content gridtrumpet">
          <button id="pluck2" class="waves-light btn instrumentColor">pluck 2</button>
          <input id='pluck2Vol' id="vol" type="range" min="-50" max="0" step="1" value="-6">
          <button id="pluck2R" class="waves-light btn instrumentColor">Reverb</button>
          <button id="pluck2D" class="waves-light btn instrumentColor">Delay</button>
          </div>
              </div>`),
          node.x, node.y, node.width, node.height);
        }, this);
      });
      $('.dropdown-menu').hide();
    });

    $('#pluck3').on('click', () => {
      items.push({
        x: i, y: 0, width: 2, height: 1,
      });
      items.shift();

      $('.grid-stack').append(function addinst() {
        const grid = $(this).data('gridstack');
        _.each(items, (node) => {
          grid.addWidget($(`<div>
          <div class="grid-stack-item-content gridtrumpet">
          <button id="pluck3" class="waves-light btn instrumentColor">pluck 3</button>
          <input id='pluck3Vol' id="vol" type="range" min="-50" max="0" step="1" value="-6">
          <button id="pluck3R" class="waves-light btn instrumentColor">Reverb</button>
          <button id="pluck3D" class="waves-light btn instrumentColor">Delay</button>
          </div>
              </div>`),
          node.x, node.y, node.width, node.height);
        }, this);
      });
      $('.dropdown-menu').hide();
    });

    $('#8081').on('click', () => {
      items.push({
        x: i, y: 0, width: 2, height: 1,
      });
      items.shift();

      $('.grid-stack').append(function addinst() {
        const grid = $(this).data('gridstack');
        _.each(items, (node) => {
          grid.addWidget($(`<div>
          <div class="grid-stack-item-content gridtrumpet">
          <button id="8081" class="waves-light btn instrumentColor">808 1</button>
          <input id='8081Vol' id="vol" type="range" min="-50" max="0" step="1" value="-6">
          <button id="8081R" class="waves-light btn instrumentColor">Reverb</button>
          <button id="8081D" class="waves-light btn instrumentColor">Delay</button>
          </div>
              </div>`),
          node.x, node.y, node.width, node.height);
        }, this);
      });
      $('.dropdown-menu').hide();
    });

    $('#8082').on('click', () => {
      items.push({
        x: i, y: 0, width: 2, height: 1,
      });
      items.shift();

      $('.grid-stack').append(function addinst() {
        const grid = $(this).data('gridstack');
        _.each(items, (node) => {
          grid.addWidget($(`<div>
          <div class="grid-stack-item-content gridtrumpet">
          <button id="8082" class="waves-light btn instrumentColor">808 2</button>
          <input id='8082Vol' id="vol" type="range" min="-50" max="0" step="1" value="-6">
          <button id="8082R" class="waves-light btn instrumentColor">Reverb</button>
          <button id="8082D" class="waves-light btn instrumentColor">Delay</button>
          </div>
              </div>`),
          node.x, node.y, node.width, node.height);
        }, this);
      });
      $('.dropdown-menu').hide();
    });

    $('#8083').on('click', () => {
      items.push({
        x: i, y: 0, width: 2, height: 1,
      });
      items.shift();

      $('.grid-stack').append(function addinst() {
        const grid = $(this).data('gridstack');
        _.each(items, (node) => {
          grid.addWidget($(`<div>
          <div class="grid-stack-item-content gridtrumpet">
          <button id="8083" class="waves-light btn instrumentColor">808 3</button>
          <input id='8083Vol' id="vol" type="range" min="-50" max="0" step="1" value="-6">
          <button id="8083R" class="waves-light btn instrumentColor">Reverb</button>
          <button id="8083D" class="waves-light btn instrumentColor">Delay</button>
          </div>
              </div>`),
          node.x, node.y, node.width, node.height);
        }, this);
      });
      $('.dropdown-menu').hide();
    });

    $('#8084').on('click', () => {
      items.push({
        x: i, y: 0, width: 2, height: 1,
      });
      items.shift();

      $('.grid-stack').append(function addinst() {
        const grid = $(this).data('gridstack');
        _.each(items, (node) => {
          grid.addWidget($(`<div>
          <div class="grid-stack-item-content gridtrumpet">
          <button id="8084" class="waves-light btn instrumentColor">808 4</button>
          <input id='8084Vol' id="vol" type="range" min="-50" max="0" step="1" value="-6">
          <button id="8084R" class="waves-light btn instrumentColor">Reverb</button>
          <button id="8084D" class="waves-light btn instrumentColor">Delay</button>
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
              theEvent = new Tone.Event((position, theNote) => {
                ins.ins.triggerAttackRelease(theNote, ins.noteLength, qu);
              }, note);
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

    return (ins) => {
      // Clean-up.
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
    Tone.Transport.loop = bool;
    Tone.Transport.setLoopPoints(0, '2m');
    if (localStorage.getItem('Beat') === null) {
      Tone.Transport.scheduleRepeat((time) => {
        player.start();
      }, '4n');
      Tone.Transport.start();
    } else {
      // Tone.Transport.setLoopPoints('2m', '4m');
      const player2 = new Tone.Player(`/audio/${localStorage.getItem('Beat')}`, () => {
        Tone.Transport.start();
      }).toMaster();
      player2.connect(dest);
      player2.sync().start();
      Tone.Transport.scheduleRepeat((time) => {
        player.start();
      }, '4n');
    }
  }

  document.getElementById('bpm').addEventListener('input', (e) => {
    Tone.Transport.bpm.value = +e.target.value;
    $('#tempo').text(Tone.Transport.bpm.value = +e.target.value);
  });

  function stop() {
    Tone.Transport.stop();
  }

  $('#shareStop').on('click', (e) => {
    record = false;
    Tone.Transport.stop();
  });

  $('.share').on('click', (e) => {
    i = 0;
    Tone.Transport.scheduleRepeat((time) => {
      i++;
      if (i === 5) {
        console.log('start');
        recorder.start();
        recorder.ondataavailable = evt => chunks.push(evt.data);
        setTimeout(() => {
          recorder.stop();
          Tone.Transport.stop();
          recorder.onstop = (evt) => {
            const blob = new Blob(chunks, { type: 'audio/ogg; codecs=opus' });
            const fd = new FormData();
            fd.append('audio', blob, 'blobby.ogg');
            fd.append('producerName', $('#producer').val());
            fd.append('beatName', $('#beatName').val());
            fd.append('contribute', $('#contrib').val());
            fd.append('tempo', $('#tempo').text());
            $.ajax({
              method: 'POST',
              url: '/create',
              data: fd,
              processData: false,
              contentType: false,
            }).done(location.reload());
          };
        }, 10000);
      }
    }, '2n');
    Tone.Transport.start();
  });

  $('#start').on('click', (e) => {
    start(true);
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
  });

  $(document).on('click', '#synth', (e) => {
    const ins = new Tone.PluckSynth();
    ins.connect(dest);
    ins.toMaster();
    const plucked = {
      ins,
      noteLength: '4n',
    };
    onKeyDown(plucked);
    onKeyUp(plucked);
    $(document).on('change', '#synthVol', function (e) {
      ins.volume.value = $(this).val();
    });
    let reverb = false;
    let delay = false;
    $(document).on('click', '#synthR', function (e) {
      reverb = !reverb;
      if (reverb) {
        ins.connect(freeverb);
      } else {
        ins.disconnect(freeverb);
      }
    });
    $(document).on('click', '#synthD', function (e) {
      delay = !delay;
      if (delay) {
        ins.connect(pingPong);
      } else {
        ins.disconnect(pingPong);
      }
    });
  });

  $(document).on('click', '#drums', (e) => {
    const ins = new Tone.Sampler({
      C4: '../sounds/LL_hihat_remix.wav',
      D4: '../sounds/LL_snare_pyrex.wav',
      F4: '../sounds/38[kb]avenger-horn.wav.mp3',
      E4: '../sounds/FX_VoxBobby_Wet.wav',
      G4: '../sounds/13[kb]classichouse.aif.mp3',
      A4: '../sounds/123[kb]f-major-punch.aif.mp3',
      B4: '../sounds/applause_y.wav',
      C5: '../sounds/146[kb]sax-gliss-down.aif.mp3',
      D5: '../sounds/184[kb]sting-me.aif.mp3',
      E5: '../sounds/808.wav',
    }, {
      release: 1,
    });
    ins.connect(dest);
    ins.toMaster();
    const drums = {
      ins,
      noteLength: '8n',
      reverb: false,
      delay: false,
    };
    ins.volume.value = -10;
    onKeyDown(drums);
    onKeyUp(drums);
    $(document).on('change', '#drumKitVol', function (e) {
      ins.volume.value = $(this).val();
    });
    let reverb = false;
    let delay = false;
    $(document).on('click', '#drumsR', function (e) {
      reverb = !reverb;
      if (reverb) {
        ins.connect(freeverb);
      } else {
        ins.disconnect(freeverb);
      }
    });
    $(document).on('click', '#drumsD', function (e) {
      delay = !delay;
      if (delay) {
        ins.connect(pingPong);
      } else {
        ins.disconnect(pingPong);
      }
    });
  });

  $(document).on('click', '#drums2', (e) => {
    const ins = new Tone.Sampler({
      C4: '../sounds/SONNY_D_kick_12.wav',
      D4: '../sounds/SONNY_D_kick_12.wav',
      F4: '../sounds/SONNY_D_kick_12.wav',
      E4: '../sounds/SONNY_D_kick_12.wav',
      G4: '../sounds/boxing_bell.wav',
      A4: '../sounds/bloop_x.wav',
      B4: '../sounds/564[kb]brass-a7th-hit.aif.mp3',
      C5: '../sounds/SONNY_D_kick_12.wav',
      D5: '../sounds/SONNY_D_kick_12.wav',
      E5: '../sounds/SONNY_D_808_02_C.wav',
    }, {
      release: 1,
    });
    ins.connect(dest);
    ins.toMaster();
    const drums2 = {
      ins,
      noteLength: '4n',
      reverb: false,
      delay: false,
    };
    ins.volume.value = -10;
    onKeyDown(drums2);
    onKeyUp(drums2);
    $(document).on('change', '#drumKit2Vol', function (e) {
      ins.volume.value = $(this).val();
    });
    let reverb = false;
    let delay = false;
    $(document).on('click', '#drums2R', function (e) {
      reverb = !reverb;
      if (reverb) {
        ins.connect(freeverb);
      } else {
        ins.disconnect(freeverb);
      }
    });
    $(document).on('click', '#drums2D', function (e) {
      delay = !delay;
      if (delay) {
        ins.connect(pingPong);
      } else {
        ins.disconnect(pingPong);
      }
    });
  });

  $(document).on('click', '#guitar1', (e) => {
    const ins = new Tone.Sampler({
      C4: '../sounds/guitar1.wav',
    }, {
      release: 1,
    });
    ins.connect(dest);
    ins.toMaster();
    const guitar1 = {
      ins,
      noteLength: '4n',
      reverb: false,
      delay: false,
    };
    ins.volume.value = -25;
    onKeyDown(guitar1);
    onKeyUp(guitar1);
    $(document).on('change', '#guitar1Vol', function (e) {
      ins.volume.value = $(this).val();
    });
    let reverb = false;
    let delay = false;
    $(document).on('click', '#guitar1R', function (e) {
      reverb = !reverb;
      if (reverb) {
        ins.connect(freeverb);
      } else {
        ins.disconnect(freeverb);
      }
    });
    $(document).on('click', '#guitar1D', function (e) {
      delay = !delay;
      if (delay) {
        ins.connect(pingPong);
      } else {
        ins.disconnect(pingPong);
      }
    });
  });

  $(document).on('click', '#pad', (e) => {
    const ins = new Tone.Sampler({
      C4: '../sounds/pad.wav',
    }, {
      release: 1,
    });
    ins.connect(dest);
    ins.toMaster();
    const pad = {
      ins,
      noteLength: '4n',
      reverb: false,
      delay: false,
    };
    ins.volume.value = -25;
    onKeyDown(pad);
    onKeyUp(pad);
    $(document).on('change', '#padVol', function (e) {
      ins.volume.value = $(this).val();
    });
    let reverb = false;
    let delay = false;
    $(document).on('click', '#padR', function (e) {
      reverb = !reverb;
      if (reverb) {
        ins.connect(freeverb);
      } else {
        ins.disconnect(freeverb);
      }
    });
    $(document).on('click', '#padD', function (e) {
      delay = !delay;
      if (delay) {
        ins.connect(pingPong);
      } else {
        ins.disconnect(pingPong);
      }
    });
  });

  $(document).on('click', '#choir1', (e) => {
    const ins = new Tone.Sampler({
      C4: '../sounds/choir1.wav',
    }, {
      release: 1,
    });
    ins.connect(dest);
    ins.toMaster();
    const choir1 = {
      ins,
      noteLength: '4n',
      reverb: false,
      delay: false,
    };
    ins.volume.value = -25;
    onKeyDown(choir1);
    onKeyUp(choir1);
    $(document).on('change', '#choir1Vol', function (e) {
      ins.volume.value = $(this).val();
    });
    let reverb = false;
    let delay = false;
    $(document).on('click', '#choir1R', function (e) {
      reverb = !reverb;
      if (reverb) {
        ins.connect(freeverb);
      } else {
        ins.disconnect(freeverb);
      }
    });
    $(document).on('click', '#choir1D', function (e) {
      delay = !delay;
      if (delay) {
        ins.connect(pingPong);
      } else {
        ins.disconnect(pingPong);
      }
    });
  });

  $(document).on('click', '#choir2', (e) => {
    const ins = new Tone.Sampler({
      C4: '../sounds/choir2.wav',
    }, {
      release: 1,
    });
    ins.connect(dest);
    ins.toMaster();
    const choir2 = {
      ins,
      noteLength: '4n',
      reverb: false,
      delay: false,
    };
    ins.volume.value = -25;
    onKeyDown(choir2);
    onKeyUp(choir2);
    $(document).on('change', '#choir2Vol', function (e) {
      ins.volume.value = $(this).val();
    });
    let reverb = false;
    let delay = false;
    $(document).on('click', '#choir2R', function (e) {
      reverb = !reverb;
      if (reverb) {
        ins.connect(freeverb);
      } else {
        ins.disconnect(freeverb);
      }
    });
    $(document).on('click', '#choir2D', function (e) {
      delay = !delay;
      if (delay) {
        ins.connect(pingPong);
      } else {
        ins.disconnect(pingPong);
      }
    });
  });

  $(document).on('click', '#guitar2', (e) => {
    const ins = new Tone.Sampler({
      C4: '../sounds/guitar2.wav',
    }, {
      release: 1,
    });
    ins.connect(dest);
    ins.toMaster();
    const guitar2 = {
      ins,
      noteLength: '4n',
      reverb: false,
      delay: false,
    };
    ins.volume.value = -25;
    onKeyDown(guitar2);
    onKeyUp(guitar2);
    $(document).on('change', '#guitar2Vol', function (e) {
      ins.volume.value = $(this).val();
    });
    let reverb = false;
    let delay = false;
    $(document).on('click', '#guitar2R', function (e) {
      reverb = !reverb;
      if (reverb) {
        ins.connect(freeverb);
      } else {
        ins.disconnect(freeverb);
      }
    });
    $(document).on('click', '#guitar2D', function (e) {
      delay = !delay;
      if (delay) {
        ins.connect(pingPong);
      } else {
        ins.disconnect(pingPong);
      }
    });
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
      noteLength: '4n',
      reverb: false,
      delay: false,
    };
    ins.volume.value = -25;
    onKeyDown(piano);
    onKeyUp(piano);
    $(document).on('change', '#pianoVol', function (e) {
      ins.volume.value = $(this).val();
    });
    let reverb = false;
    let delay = false;
    $(document).on('click', '#pianoR', function (e) {
      console.log('click');
      reverb = !reverb;
      if (reverb) {
        ins.connect(freeverb);
      } else {
        ins.disconnect(freeverb);
      }
    });
    $(document).on('click', '#pianoD', function (e) {
      console.log('click');
      delay = !delay;
      if (delay) {
        ins.connect(pingPong);
      } else {
        ins.disconnect(pingPong);
      }
    });
  });

  $(document).on('click', '#8081', (e) => {
    const ins = new Tone.Sampler({
      C4: '../sounds/8081.wav',
    }, {
      release: 0.5,
    });
    ins.connect(dest);
    ins.toMaster();
    const bass1 = {
      ins,
      noteLength: '4n',
      reverb: false,
      delay: false,
    };
    ins.volume.value = -25;
    onKeyDown(bass1);
    onKeyUp(bass1);
    $(document).on('change', '#8081Vol', function (e) {
      ins.volume.value = $(this).val();
    });
    let reverb = false;
    let delay = false;
    $(document).on('click', '#8081R', function (e) {
      reverb = !reverb;
      if (reverb) {
        ins.connect(freeverb);
      } else {
        ins.disconnect(freeverb);
      }
    });
    $(document).on('click', '#8081D', function (e) {
      delay = !delay;
      if (delay) {
        ins.connect(pingPong);
      } else {
        ins.disconnect(pingPong);
      }
    });
  });

  $(document).on('click', '#8082', (e) => {
    const ins = new Tone.Sampler({
      C4: '../sounds/8082.wav',
    }, {
      release: 0.5,
    });
    ins.connect(dest);
    ins.toMaster();
    const bass2 = {
      ins,
      noteLength: '4n',
      reverb: false,
      delay: false,
    };
    ins.volume.value = -25;
    onKeyDown(bass2);
    onKeyUp(bass2);
    $(document).on('change', '#8082Vol', function (e) {
      ins.volume.value = $(this).val();
    });
    let reverb = false;
    let delay = false;
    $(document).on('click', '#8082R', function (e) {
      reverb = !reverb;
      if (reverb) {
        ins.connect(freeverb);
      } else {
        ins.disconnect(freeverb);
      }
    });
    $(document).on('click', '#8082D', function (e) {
      delay = !delay;
      if (delay) {
        ins.connect(pingPong);
      } else {
        ins.disconnect(pingPong);
      }
    });
  });

  $(document).on('click', '#8083', (e) => {
    const ins = new Tone.Sampler({
      C4: '../sounds/8083.wav',
    }, {
      release: 0.5,
    });
    ins.connect(dest);
    ins.toMaster();
    const bass3 = {
      ins,
      noteLength: '4n',
      reverb: false,
      delay: false,
    };
    ins.volume.value = -25;
    onKeyDown(bass3);
    onKeyUp(bass3);
    $(document).on('change', '#8083Vol', function (e) {
      ins.volume.value = $(this).val();
    });
    let reverb = false;
    let delay = false;
    $(document).on('click', '#8083R', function (e) {
      reverb = !reverb;
      if (reverb) {
        ins.connect(freeverb);
      } else {
        ins.disconnect(freeverb);
      }
    });
    $(document).on('click', '#8083D', function (e) {
      delay = !delay;
      if (delay) {
        ins.connect(pingPong);
      } else {
        ins.disconnect(pingPong);
      }
    });
  });

  $(document).on('click', '#8084', (e) => {
    const ins = new Tone.Sampler({
      C4: '../sounds/8084.wav',
    }, {
      release: 0.5,
    });
    ins.connect(dest);
    ins.toMaster();
    const bass4 = {
      ins,
      noteLength: '4n',
      reverb: false,
      delay: false,
    };
    ins.volume.value = -25;
    onKeyDown(bass4);
    onKeyUp(bass4);
    $(document).on('change', '#8084Vol', function (e) {
      ins.volume.value = $(this).val();
    });
    let reverb = false;
    let delay = false;
    $(document).on('click', '#8084R', function (e) {
      reverb = !reverb;
      if (reverb) {
        ins.connect(freeverb);
      } else {
        ins.disconnect(freeverb);
      }
    });
    $(document).on('click', '#8084D', function (e) {
      delay = !delay;
      if (delay) {
        ins.connect(pingPong);
      } else {
        ins.disconnect(pingPong);
      }
    });
  });

  $(document).on('click', '#pluck2', (e) => {
    const ins = new Tone.Sampler({
      C4: '../sounds/pluck2.wav',
    }, {
      release: 1,
    });
    ins.connect(dest);
    ins.toMaster();
    const pluck2 = {
      ins,
      noteLength: '8n',
      reverb: false,
      delay: false,
    };
    ins.volume.value = -25;
    onKeyDown(pluck2);
    onKeyUp(pluck2);
    $(document).on('change', '#pluck2Vol', function (e) {
      ins.volume.value = $(this).val();
    });
    let reverb = false;
    let delay = false;
    $(document).on('click', '#pluck2R', function (e) {
      reverb = !reverb;
      if (reverb) {
        ins.connect(freeverb);
      } else {
        ins.disconnect(freeverb);
      }
    });
    $(document).on('click', '#pluck2D', function (e) {
      delay = !delay;
      if (delay) {
        ins.connect(pingPong);
      } else {
        ins.disconnect(pingPong);
      }
    });
  });

  $(document).on('click', '#pluck3', (e) => {
    const ins = new Tone.Sampler({
      C4: '../sounds/pluck3.wav',
    }, {
      release: 1,
    });
    ins.connect(dest);
    ins.toMaster();
    const pluck3 = {
      ins,
      noteLength: '8n',
      reverb: false,
      delay: false,
    };
    ins.volume.value = -25;
    onKeyDown(pluck3);
    onKeyUp(pluck3);
    $(document).on('change', '#pluck3Vol', function (e) {
      ins.volume.value = $(this).val();
    });
    let reverb = false;
    let delay = false;
    $(document).on('click', '#pluck3R', function (e) {
      reverb = !reverb;
      if (reverb) {
        ins.connect(freeverb);
      } else {
        ins.disconnect(freeverb);
      }
    });
    $(document).on('click', '#pluck3D', function (e) {
      delay = !delay;
      if (delay) {
        ins.connect(pingPong);
      } else {
        ins.disconnect(pingPong);
      }
    });
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
      noteLength: '4n',
      reverb: false,
      delay: false,
    };
    ins.volume.value = -15;
    onKeyDown(flute);
    onKeyUp(flute);
    $(document).on('change', '#fluteVol', function (e) {
      ins.volume.value = $(this).val();
    });
    let reverb = false;
    let delay = false;
    $(document).on('click', '#fluteR', function (e) {
      reverb = !reverb;
      if (reverb) {
        ins.connect(freeverb);
      } else {
        ins.disconnect(freeverb);
      }
    });
    $(document).on('click', '#fluteD', function (e) {
      delay = !delay;
      if (delay) {
        ins.connect(pingPong);
      } else {
        ins.disconnect(pingPong);
      }
    });
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
      noteLength: '8n',
      reverb: false,
      delay: false,
    };
    ins.volume.value = -15;
    onKeyDown(sax);
    onKeyUp(sax);
    $(document).on('change', '#saxVol', function (e) {
      ins.volume.value = $(this).val();
    });
    let reverb = false;
    let delay = false;
    $(document).on('click', '#saxR', function (e) {
      reverb = !reverb;
      if (reverb) {
        ins.connect(freeverb);
      } else {
        ins.disconnect(freeverb);
      }
    });
    $(document).on('click', '#saxD', function (e) {
      delay = !delay;
      if (delay) {
        ins.connect(pingPong);
      } else {
        ins.disconnect(pingPong);
      }
    });
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
      noteLength: '8n',
      reverb: false,
      delay: false,
    };
    ins.volume.value = -15;
    onKeyDown(trumpet);
    onKeyUp(trumpet);
    $(document).on('change', '#trumpetVol', function (e) {
      ins.volume.value = $(this).val();
    });
    let reverb = false;
    let delay = false;
    $(document).on('click', '#trumpetR', function (e) {
      reverb = !reverb;
      if (reverb) {
        ins.connect(freeverb);
      } else {
        ins.disconnect(freeverb);
      }
    });
    $(document).on('click', '#trumpetD', function (e) {
      delay = !delay;
      if (delay) {
        ins.connect(pingPong);
      } else {
        ins.disconnect(pingPong);
      }
    });
  });

  $(document).on('click', '#steelPluck', (e) => {
    const ins = new Tone.Sampler({
      C4: '../sounds/steelPluck.wav',
    }, {
      release: 1,
    });
    ins.connect(dest);
    ins.toMaster();
    const steelPluck = {
      ins,
      noteLength: '4n',
      reverb: false,
      delay: false,
    };
    ins.volume.value = -15;
    onKeyDown(steelPluck);
    onKeyUp(steelPluck);
    $(document).on('change', '#steelPluckVol', function (e) {
      ins.volume.value = $(this).val();
    });
    let reverb = false;
    let delay = false;
    $(document).on('click', '#steelPluckR', function (e) {
      reverb = !reverb;
      if (reverb) {
        ins.connect(freeverb);
      } else {
        ins.disconnect(freeverb);
      }
    });
    $(document).on('click', '#steelPluckD', function (e) {
      delay = !delay;
      if (delay) {
        ins.connect(pingPong);
      } else {
        ins.disconnect(pingPong);
      }
    });
  });

  $(document).on('click', '#synthPluck', (e) => {
    const ins = new Tone.Sampler({
      C4: '../sounds/synthPluck.wav',
    }, {
      release: 1,
    });
    ins.connect(dest);
    ins.toMaster();
    const synthPluck = {
      ins,
      noteLength: '8n',
      reverb: false,
      delay: false,
    };
    ins.volume.value = -15;
    onKeyDown(synthPluck);
    onKeyUp(synthPluck);
    $(document).on('change', '#synthPluckVol', function (e) {
      ins.volume.value = $(this).val();
    });
    let reverb = false;
    let delay = false;
    $(document).on('click', '#synthPluckR', function (e) {
      reverb = !reverb;
      if (reverb) {
        ins.connect(freeverb);
      } else {
        ins.disconnect(freeverb);
      }
    });
    $(document).on('click', '#synthPluckD', function (e) {
      delay = !delay;
      if (delay) {
        ins.connect(pingPong);
      } else {
        ins.disconnect(pingPong);
      }
    });
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
      noteLength: '4n',
      reverb: false,
      delay: false,
    };
    ins.volume.value = -10;
    onKeyDown(pluck);
    onKeyUp(pluck);
    $(document).on('change', '#pluckVol', function (e) {
      ins.volume.value = $(this).val();
    });
    let reverb = false;
    let delay = false;
    $(document).on('click', '#pluckR', function (e) {
      reverb = !reverb;
      if (reverb) {
        ins.connect(freeverb);
      } else {
        ins.disconnect(freeverb);
      }
    });
    $(document).on('click', '#pluckD', function (e) {
      delay = !delay;
      if (delay) {
        ins.connect(pingPong);
      } else {
        ins.disconnect(pingPong);
      }
    });
  });

  $(window).unload(function () {
    localStorage.clear();
  });

  $('.userButton').on('click', function (e) {
    e.preventDefault();
    console.log($('.userButton').val());
  });
  $('#modal1').modal();
  $('select').formSelect();
  $('.tooltipped').tooltip();
});
