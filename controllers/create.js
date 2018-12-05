
// var express = require("express");
// var gridstack = require("gridstack");

$(document).ready(() => {
  $('.dropdown-menu').hide();
});

Tone.Transport.bpm.value = 120;
Tone.context.latencyHint = 'fastest';
let octave = 4;
const record = false;
const keys = [];
const arr = [];
let part;
const qu = '@32n';
let prevKey = 0;




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

$(document).on('click', '#drums', (e) => {
  console.log('hello world');
  const ins = new Tone.Sampler({
    C4: '../public/sounds/LL_hihat_remix.wav',
    D4: '../public/sounds/LL_snare_pyrex.wav',
    F4: '../public/sounds/808.wav',
    E4: '../public/sounds/FX_VoxBobby_Wet.wav',
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
    C4: '../public/sounds/piano.wav',
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

$(document).on('click','#pluck' (e) => {
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
