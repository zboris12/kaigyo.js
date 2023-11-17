const SYB_OUT = "[{(+-@" + "［｛（＋－＠【「『“《・";
const SYB_IN = "]}).,;:/?! " + "］｝）．，；：／？！　】」』”》、";

function getCharWidth(cd: number): number {
  if (cd >= 0x0 && cd <= 0x7f) {
    return 0.5;
  } else {
    return 1;
  }
}
function splitWords(str: string) {
  const words: string[] = [];
  let st = 0;
  const addWord = (a_ed: number) => {
    if (a_ed > st) {
      words.push(str.substring(st, a_ed));
      st = a_ed;
    }
  };

  for (let i = 0; i < str.length; i++) {
    let c = str.charAt(i);
    if (SYB_OUT.indexOf(c) >= 0) {
      addWord(i);
    } else if (SYB_IN.indexOf(c) >= 0) {
      addWord(i + 1);
    }
  }
  addWord(str.length);

  return words;
}

export function calcWidth(str: string) {
  let cnt = 0;
  for (let i = 0; i < str.length; i++) {
    cnt += getCharWidth(str.charCodeAt(i));
  }
  return cnt;
}

function cutString(str: string, cnt: number) {
  let remain = cnt;
  let i = 0;
  for (i = 0; i < str.length; i++) {
    let w = getCharWidth(str.charCodeAt(i));
    if (remain - w < 0) {
      break;
    } else {
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
export function breakLine(str: string, cpl: number, lc: number, lf: string = "\n"): string {
  const words = splitWords(str);
  const arr = [];
  let remain = calcWidth(str);
  let ln = "";
  let lncnt = 0;

  if (cpl <= 0) {
    return str;
  }

  const reduce = (a_str: string, a_wid: number) => {
    ln += a_str;
    lncnt += a_wid;
    while (lncnt >= cpl) {
      let a_infs = cutString(ln, cpl);
      arr.push(ln.substring(0, a_infs.index));
      remain -= cpl;
      ln = ln.substring(a_infs.index);
      lncnt -= a_infs.width;
    }
  };

  words.forEach((a_wd) => {
    let a_wdcnt = calcWidth(a_wd);
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
