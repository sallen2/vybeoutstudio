
// var express = require("express");
// var gridstack = require("gridstack");

$(document).ready(() => {
  $('.dropdown-menu').hide();
});

Tone.context.latencyHint = 'fastest';
let octave = 4;
const record = false;
const keys = [];

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
    items.push({
      x: i, y: 0, width: 2, height: 1,
    });
    items.shift();

    $('.grid-stack').append(function addinst() {
      const grid = $(this).data('gridstack');
      _.each(items, (node) => {
        grid.addWidget($(`<div><div class="grid-stack-item-content" />
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


$('button').on('click', '#drums', (e) => {

});
