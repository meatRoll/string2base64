define(function() {
    'use strict';
    // 建立查询表
    var rulesObj = (function() {
        var rulesArr = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+', '/'];
        var rulesObj = {};
        var index, len;
        for (var i = 0; i < 64; i++) {
            index = i.toString(2);
            len = index.length;
            if (len != 6) {
                for (var j = len; j < 6; j++) {
                    index = '0' + index;
                }
            }
            rulesObj[index] = rulesArr[i];
        }
        return rulesObj;
    })();

    /**
     * 转换函数
     * @param {*} str 数据字符串（实际是十六进制格式——0xAAAAA）
     * @param {*} mine 文件类型（不重要）
     */
    function changeToBase64(str, mine) {
        var tempStr, tempBin;
        var endStr = '',
            tempArr = [];
        var len1 = str.length,
            len2;
        var restStrNum = (len1 - 2) % 6;
        if (restStrNum) {
            switch (restStrNum) {
                case 2:
                    str += '0000';
                    endStr = '==';
                    break;
                case 4:
                    str += '00';
                    endStr = '=';
                    break;
            }
        }
        for (var i = 2; i < len1; i += 6) {
            tempStr = Number('0x' + str.slice(i, i + 6));
            tempBin = tempStr.toString(2);
            len2 = tempBin.length;
            if (len2 != 24) {
                for (var j = len2; j < 24; j++) {
                    tempBin = '0' + tempBin;
                }
            }
            for (var k = 0; k < 24; k += 6) {
                tempArr.push(rulesObj[tempBin.slice(k, k + 6)]);
            }
        }
        return 'data:' + mine + ';base64,' + tempArr.join('').slice(0, -(6 - restStrNum) / 2) + endStr;
    }

    return changeToBase64;
});