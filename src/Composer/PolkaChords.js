var Tonal = require("tonal");
var MidiWriter = require('midi-writer-js');
var Utils = require('./Utils');

var noteRange = Tonal.Scale.notes("C major").map( function (note) {return note + "4"} );
console.log("chords range: " + noteRange);

module.exports = {
    Bar: function(root) {
        return [
            new MidiWriter.NoteEvent({pitch: Utils.getChordTones(noteRange, root), duration: 'd4', channel: 2,}),
            new MidiWriter.NoteEvent({pitch: Utils.getChordTones(noteRange, root), duration: 'd4', channel: 2,}),
            new MidiWriter.NoteEvent({pitch: Utils.getChordTones(noteRange, root), duration: '4', channel: 2,})
        ];
    }
}