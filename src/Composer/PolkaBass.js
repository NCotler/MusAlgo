var Tonal = require("tonal");
var MidiWriter = require('midi-writer-js');
var Utils = require('./Utils');

var noteRange = Tonal.Scale.notes("C major").map( function (note) {return note + "2"} );
console.log("bass range: " + noteRange);

module.exports = {
    Bar: function(root) {
        return [
            new MidiWriter.NoteEvent({pitch: Utils.getRootAndFifth(noteRange, root), duration: '2', channel: 3,}),
        ];
    }
}