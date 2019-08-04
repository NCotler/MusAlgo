var Tonal = require("tonal");
var MidiWriter = require('midi-writer-js');
var Utils = require('./Utils');

var noteRange = Tonal.Scale.notes("C major").map(function (note) {
    return note + "5"
});
console.log("melody range: " + noteRange);

function Bar(root, prevNote) {
    var currentNote = Utils.getNearestChordTone(noteRange, root, prevNote, Math.random() >= 0.5 ? "up" : "down");
    return {
        //Todo: get rid of noteEvents: []  just return an object
        noteEvents: [
            new MidiWriter.NoteEvent({
                pitch: currentNote,
                duration: 1,
                channel: 1,
                velocity: 100,
            }),
        ],
    };
}

function getBarsOfPolkaMelody(chordProgression) {
    var bars = [];
    var temp;
    var prevNote = "E5";
    for (var i = 0; i < chordProgression.length; i++) {
        temp = Bar(chordProgression[i], prevNote);
        bars.push(temp.noteEvents);
        prevNote = temp.noteEvents[0].pitch;
    }
    return bars;
}

function divideBarsOfMelody(bars) {
    var currentPitch;
    var currentDuration;
    for (var i = 0; i < bars.length; i++) {
        if (Math.random() >= 0.33 ? false : true) {
            currentPitch = bars[i].pitch;
            currentDuration = bars[i].duration;
            bars.splice(i, 1, [new MidiWriter.NoteEvent({
                pitch: currentPitch,
                duration: currentDuration * 2,
                channel: 1,
                velocity: 100,
            }), new MidiWriter.NoteEvent({
                pitch: (Math.random() >= 0.5 ? Utils.getNextScaleTone(noteRange, currentPitch, "up") : Utils.getNextScaleTone(noteRange, currentPitch, "down")),
                duration: currentDuration * 2,
                channel: 1,
                velocity: 100,
            })]);
        }
    }
    return bars;
}

module.exports = {
    Bar: Bar,
    divideBarsOfMelody: divideBarsOfMelody,
    getBarsOfPolkaMelody: getBarsOfPolkaMelody,
}