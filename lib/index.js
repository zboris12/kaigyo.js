"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.breakLine = exports.calcWidth = void 0;
var SYB_OUT = "[{(+-@" + "［｛（＋－＠【「『“《・";
var SYB_IN = "]}).,;:/?! " + "］｝）．，；：／？！　】」』”》、";
function getCharWidth(cd) {
    if (cd >= 0x0 && cd <= 0x7f) {
        return 0.5;
    }
    else {
        return 1;
    }
}
function splitWords(str) {
    var words = [];
    var st = 0;
    var addWord = function (a_ed) {
        if (a_ed > st) {
            words.push(str.substring(st, a_ed));
            st = a_ed;
        }
    };
    for (var i = 0; i < str.length; i++) {
        var c = str.charAt(i);
        if (SYB_OUT.indexOf(c) >= 0) {
            addWord(i);
        }
        else if (SYB_IN.indexOf(c) >= 0) {
            addWord(i + 1);
        }
    }
    addWord(str.length);
    return words;
}
function calcWidth(str) {
    var cnt = 0;
    for (var i = 0; i < str.length; i++) {
        cnt += getCharWidth(str.charCodeAt(i));
    }
    return cnt;
}
exports.calcWidth = calcWidth;
function cutString(str, cnt) {
    var remain = cnt;
    var i = 0;
    for (i = 0; i < str.length; i++) {
        var w = getCharWidth(str.charCodeAt(i));
        if (remain - w < 0) {
            break;
        }
        else {
            remain -= w;
        }
    }
    return {
        width: cnt - remain,
        index: i,
    };
}
// cpl: count per line.
// lc: lines count.
// lf: the symbol of line break
function breakLine(str, cpl, lc, lf) {
    if (lf === void 0) { lf = "\n"; }
    var words = splitWords(str);
    var arr = [];
    var remain = calcWidth(str);
    var ln = "";
    var lncnt = 0;
    if (cpl <= 0) {
        return str;
    }
    var reduce = function (a_str, a_wid) {
        ln += a_str;
        lncnt += a_wid;
        while (lncnt >= cpl) {
            var a_infs = cutString(ln, cpl);
            arr.push(ln.substring(0, a_infs.index));
            remain -= cpl;
            ln = ln.substring(a_infs.index);
            lncnt -= a_infs.width;
        }
    };
    words.forEach(function (a_wd) {
        var a_wdcnt = calcWidth(a_wd);
        if (!a_wd) {
            return;
        }
        if (lncnt + a_wdcnt > cpl && remain - lncnt <= (cpl * (lc - arr.length - 1))) {
            arr.push(ln);
            remain -= lncnt;
            ln = "";
            lncnt = 0;
        }
        reduce(a_wd, a_wdcnt);
    });
    if (ln) {
        arr.push(ln);
    }
    return arr.slice(0, lc).join(lf);
}
exports.breakLine = breakLine;
//# sourceMappingURL=index.js.map