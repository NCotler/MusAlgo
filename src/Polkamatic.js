var MidiWriter = require('midi-writer-js');
var PolkaMelody = require('./Composer/PolkaMelody');
var PolkaChords = require('./Composer/PolkaChords');
var PolkaBass = require('./Composer/PolkaBass');

var melody = new MidiWriter.Track();
var chords = new MidiWriter.Track();
var bass = new MidiWriter.Track();

var chordProgression = [4, 5, 1, 1, 4, 5, 1, 1, 6, 4, 4, 5, 4, 5, 1, 1];

function getBarsOfPolkaChords(chordProgression) {
    var bars = [];
    for (var i = 0; i < chordProgression.length; i++) {
        bars.push(PolkaChords.Bar(chordProgression[i]));
    }
    return bars;
}

function getBarsOfPolkaBass(chordProgression) {
    var bars = [];
    for (var i = 0; i < chordProgression.length; i++) {
        bars.push(PolkaBass.Bar(chordProgression[i]));
    }
    return bars;
}

//Todo: getBars functions could probably one func instead of three

melody.addEvent(
    flatten(PolkaMelody.divideBarsOfMelody(
        flatten(PolkaMelody.divideBarsOfMelody(
            flatten(PolkaMelody.divideBarsOfMelody(
                flatten(PolkaMelody.divideBarsOfMelody(
                    flatten(PolkaMelody.getBarsOfPolkaMelody(chordProgression))
                )))))))
    ), function (event, index) {
        return {sequential: true};
    }
);

chords.addEvent(flatten([
        getBarsOfPolkaChords(chordProgression)
    ]), function (event, index) {
        return;
    }
);


bass.addEvent(flatten([
        getBarsOfPolkaBass(chordProgression)
    ]), function (event, index) {
        return {sequential: true};
    }
);

var write = new MidiWriter.Writer([melody, chords, bass]);
write.saveMIDI("test.mid");

function flatten(arr) {
    return arr.reduce(function (flat, toFlatten) {
        return flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten);
    }, []);
}