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
  const drums = new Tone.Sampler({
    C4: '../sounds/LL_hihat_remix.wav',
    D4: '../sounds/LL_snare_pyrex.wav',
    F4: '../sounds/808.wav',
    E4: '../sounds/FX_VoxBobby_Wet.wav',
  }, {
    release: 1,
  }).toMaster();

  const pluck = new Tone.Sampler({
    C4: '../sounds/pluck.wav',
  }, {
    release: 1,
  }).toMaster();

  const piano = new Tone.Sampler({
    C4: '../sounds/piano.wav',
  }, {
    release: 1,
  }).toMaster();
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
                ins.triggerAttackRelease(theNote, '4n', qu);
              }), note);
              arr.push([Tone.Transport.position, note]);
              console.log(arr);
              event.humanize = true;
              event.start();
            } else {
              ins.triggerAttack(note);
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
            ins.triggerRelease();
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

  $('#synth').on('click', (e) => {
    const synth = new Tone.PluckSynth().toMaster();
    onKeyDown(synth);
    onKeyUp(synth);
  });

  $('#drums').on('click', (e) => {
    drums.volume.value = -10;
    onKeyDown(drums);
    onKeyUp(drums);
  });

  $('#piano').on('click', (e) => {
    piano.volume.value = -25;
    onKeyDown(piano);
    onKeyUp(piano);
  });

  $('#pluck').on('click', (e) => {
    pluck.volume.value = -10;
    onKeyDown(pluck);
    onKeyUp(pluck);
  });
});
