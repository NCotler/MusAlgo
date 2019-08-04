var Tonal = require("tonal");

function getNextScaleTone(range, currentNote, direction) {
    //todo: get rid of having to use currentNote[0] just use currentNote
    if(direction === "up") {
        if((range.indexOf(currentNote[0]) + 1) >= range.length) {
            return currentNote;
        }
        return range[mod(range.indexOf(currentNote[0]) + 1, range.length)];
    }
    if(direction === "down") {
        if((range.indexOf(currentNote[0]) - 1) <= 0) {
            return currentNote;
        }
        return range[mod(range.indexOf(currentNote[0]) - 1, range.length)];
    }
    else {
        console.log("up or down not found");
    }
}

function getChordTones(range, root) {
    return [range[root - 1], range[(root + 1) % range.length], range[(root + 3) % range.length]];
}

function getRootAndFifth(range, root) {
    return [range[root - 1], range[(root + 3) % range.length]];
}

//TODO: generic function for returning tertial chord tones.

function mod (x, n) {
    return (x % n + n) % n;
}

//dead code?
function randomFromArray (arr) {
    return arr[Math.floor((Math.random()*arr.length))];
}

function getNearestChordTone(range, root, prevNote, direction) {
    var chordToneIndices = getChordTones(range, root).map(function (chordTone) {return range.indexOf(chordTone)});
    var prevNoteIndex = range.indexOf(prevNote);
    if (chordToneIndices.includes(prevNoteIndex)) {
        return prevNote;
    } else {
        if(direction === "up") {
            return getNearestChordTone(range, root, range[(prevNoteIndex + 1) % range.length], direction);
        }
        if(direction === "down") {
            return getNearestChordTone(range, root, range[mod(prevNoteIndex - 1, range.length)], direction);
        }
    }
}

module.exports = {
    getChordTones: getChordTones,
    getRootAndFifth: getRootAndFifth,
    getNearestChordTone: getNearestChordTone,
    getNextScaleTone: getNextScaleTone,
}