const encodeText = (textArray) => {
    let index = 0;
    let encodeArray = [];
    let tempText = '';

    textArray.forEach((text) => {
        const encodedText = encodeURIComponent(text);
        tempText += `" ${encodedText} "%0A`;

        const sizeInBytes = tempText.length;
        const sizeInKilobytes = sizeInBytes / 1024;
        encodeArray[index] = { number: index, text: tempText, translate: [] };

        if (sizeInKilobytes > 13) {
            index++;
            tempText = '';
        }
    })

    return encodeArray;
}

export const readFile = ({ type, subtitle, encode }) => {
    let timeArray = [];
    let textArray = [];
    let subtitlePattern;

    const subRipPattern = /(\d{2}:\d{2}:\d{2},\d{3}) --> (\d{2}:\d{2}:\d{2},\d{3})\s*\n([\s\S]*?)(?=\n\d{2}:\d{2}:\d{2},\d{3} -->|\n*$)/g;
    const webVTTPattern = /(\d{2}:\d{2}:\d{2}.\d{3}) --> (\d{2}:\d{2}:\d{2}.\d{3})\s*\n([\s\S]*?)(?=\n\d{2}:\d{2}:\d{2}.\d{3} -->|\n*$)/g;
    const subViewerPattern = /(\d{2}:\d{2}:\d{2}.\d{2}),(\d{2}:\d{2}:\d{2}.\d{2})\s*\n([\s\S]*?)(?=\n\d{2}:\d{2}:\d{2}.\d{2},|\n*$)/g;

    switch (type) {
        case 'srt':
            subtitlePattern = subRipPattern;
            break;
        case 'vtt':
            subtitlePattern = webVTTPattern;
            break;
        case 'sub':
            subtitlePattern = subViewerPattern;
            break;
    }

    let match;
    while (match = subtitlePattern.exec(subtitle)) {
        const text = match[3].trim();
        timeArray.push({ startTime: match[1], endTime: match[2] });
        textArray.push(text);
    }

    textArray.forEach((text, index) => {
        text = text.replace(/\r/g, '').split(/\n\s*\n/g);
        if ((text[text.length - 1] == index + 2)) {
            text = text.slice(0, text.length - 1);
        }
        text = text.join('=>').replace(/\n/g, '=>');
        textArray[index] = text;
    });

    let encodeArray;
    encode ? encodeArray = encodeText(textArray) : encodeArray = null;

    return { textArray, timeArray, encodeArray };
};