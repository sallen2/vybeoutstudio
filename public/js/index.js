$(document).ready(() => {
  $(window).unload(function () {
    localStorage.clear();
  });

  Tone.Transport.bpm.value = localStorage.getItem('Tempo') || 120;

  $('#tempo').text(`${Tone.Transport.bpm.value}`);
  Tone.context.latencyHint = 'fastest';
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
          <button id="drums" class="instbtn">drums</button>
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
          <button id="piano" class="instbtn">piano</button>
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
          <button id="pluck" class="instbtn">pluck</button>
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
          <button id="synth" class="instbtn">synth</button>
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
          <button id="flute" class="instbtn">flute</button>
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
          <button id="sax" class="instbtn">sax</button>
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
          <button id="trumpet" class="instbtn">trumpet</button>
          </div>
              </div>`),
          node.x, node.y, node.width, node.height);
        }, this);
      });
      $('.dropdown-menu').hide();
    });

    $('#userSelect1').on('click', () => {
      items.push({
        x: i, y: 0, width: 2, height: 1,
      });
      items.shift();

      $('.grid-stack').append(function addinst() {
        const grid = $(this).data('gridstack');
        _.each(items, (node) => {
          grid.addWidget($(`<div>
          <div class="grid-stack-item-content">
          <button id="userSound1" class="instbtn">User Sound 1</button>
          </div>
              </div>`),
          node.x, node.y, node.width, node.height);
        }, this);
      });
      $('.dropdown-menu').hide();
    });

    $('#userSelect2').on('click', () => {
      items.push({
        x: i, y: 0, width: 2, height: 1,
      });
      items.shift();

      $('.grid-stack').append(function addinst() {
        const grid = $(this).data('gridstack');
        _.each(items, (node) => {
          grid.addWidget($(`<div>
          <div class="grid-stack-item-content">
          <button id="userSound1" class="instbtn">User Sound 2</button>
          </div>
              </div>`),
          node.x, node.y, node.width, node.height);
        }, this);
      });
      $('.dropdown-menu').hide();
    });

    $('#userSelect3').on('click', () => {
      items.push({
        x: i, y: 0, width: 2, height: 1,
      });
      items.shift();

      $('.grid-stack').append(function addinst() {
        const grid = $(this).data('gridstack');
        _.each(items, (node) => {
          grid.addWidget($(`<div>
          <div class="grid-stack-item-content">
          <button id="userSound1" class="instbtn">User Sound 3</button>
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
    Tone.Transport.loop = bool;
    Tone.Transport.setLoopPoints(0, '2m');
    if (localStorage.getItem('Beat') === null) {
      Tone.Transport.scheduleRepeat((time) => {
        player.start();
      }, '4n');
      Tone.Transport.start('+0.1', '1:2:4.999');
    } else {
      const player2 = new Tone.Player(`/audio/${localStorage.getItem('Beat')}`, (() => {
        Tone.Transport.start();
      })).sync().toMaster();
      player2.connect(dest);
      player2.start();
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

  $(document).on('click', '#contribute', (e) => {
    const beat = $('#contribute').attr('beat');
    console.log('click');
  });

  $('#shareStop').on('click', (e) => {
    record = false;
    Tone.Transport.stop();
  });

  $('.share').on('click', (e) => {
    Tone.Transport.start('+0.1', '1:2:4.999');
    recorder.ondataavailable = evt => chunks.push(evt.data);
    recorder.start();
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
      G4: '../sounds/applause_y.wav',
      A4: '../sounds/boing2.wav',
      B4: '../sounds/38[kb]avenger-horn.wav.mp3',
      C5: '../sounds/38[kb]avenger-horn.wav.mp3',
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


  $('.userButton').on('click', function (e) {
    e.preventDefault();
    console.log($('.userButton').val());
  });
  $('#modal1').modal();
  $('select').formSelect();
});
