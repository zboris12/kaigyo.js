# kaigyo.js
A little javascript module to make sentence of CJK characters more human-friendly by breaking line at appropriate position.

## How to use

  1. ### Install
```
npm install kaigyo.js
```
  2. ### Import
```js
// CommonJS module mode
const { breakLine } = require("kaigyo.js");
```
OR
```js
//  ES module mode
import { breakLine } from "kaigyo.js";
```

## Function Definitions

### calcWidth
:fondue::fondue::fondue:  
calcWidth(str) :arrow_right: number  
Calculate the width of a string.  
(1 for CJK characters, 0.5 for others)

Name | Type | Attributes | Description
--- | --- | --- | ---
str | string | required | The target string

### breakLine
:fondue::fondue::fondue:  
breakLine(str, cpl, lc, lf) :arrow_right: string  
Insert break line to a string.  

Name | Type | Attributes | Description
--- | --- | --- | ---
str | string | required | The target string
cpl | number | required | Width per line
lc  | number | required | The count of lines
lf  | string | optional | The symbol of line break<br /> Default is "\n"

## License

This module is available under the
[MIT license](https://opensource.org/licenses/MIT).

