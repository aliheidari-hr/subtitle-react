const timeFormat = (time, format) => {
    let tempTime = time.split(':');
    tempTime[2] = tempTime[2].replace(/[.,]/, '');

    if (format == 'srt') {
        tempTime[2] = tempTime[2].padEnd(5, '0');
        tempTime[2] = tempTime[2].slice(0, 2) + ',' + tempTime[2].slice(2);

    } else if (format == 'vtt') {
        tempTime[2] = tempTime[2].padEnd(5, '0');
        tempTime[2] = tempTime[2].slice(0, 2) + '.' + tempTime[2].slice(2);

    } else if (format == 'sub') {
        tempTime[2] = tempTime[2].slice(0, 4);
        tempTime[2] = tempTime[2].slice(0, 2) + '.' + tempTime[2].slice(2);
    }
    tempTime = tempTime.join(':');

    return tempTime;
}

export const writeSubtitle = ({ subtitles, bilingual, translate, type }) => {
    let text = '';
    let newFiles = [];

    subtitles.forEach((subtitle) => {
        if (type == 'srt' || (type == 'default' && subtitle.type == 'srt')) {
            for (let i = 0; i < subtitle.time.length; i++) {
                text += `${i + 1}\n`;
                text += `${timeFormat(subtitle.time[i].startTime, 'srt')} --> ${timeFormat(subtitle.time[i].endTime, 'srt')}\n`
                if (bilingual) {
                    text += `${subtitle.text[i]}\n`;
                }
                if (translate) {
                    text += `${subtitle.translate[i]}\n\n`;
                } else {
                    text += `${subtitle.text[i]}\n\n`;
                }
            }
        } else if (type == 'vtt' || (type == 'default' && subtitle.type == 'vtt')) {
            text += 'WEBVTT\n\n';

            for (let i = 0; i < subtitle.time.length; i++) {
                text += `${timeFormat(subtitle.time[i].startTime, 'vtt')} --> ${timeFormat(subtitle.time[i].endTime, 'vtt')}\n`
                if (bilingual) {
                    text += `${subtitle.text[i]}\n`;
                }
                if (translate) {
                    text += `${subtitle.translate[i]}\n\n`;
                } else {
                    text += `${subtitle.text[i]}\n\n`;
                }

            }
        } else if (type == 'sub' || (type == 'default' && subtitle.type == 'sub')) {
            for (let i = 0; i < subtitle.time.length; i++) {
                text += `${timeFormat(subtitle.time[i].startTime, 'sub')},${timeFormat(subtitle.time[i].endTime, 'sub')}\n`
                if (bilingual) {
                    text += `${subtitle.text[i]}\n`;
                }
                if (translate) {
                    text += `${subtitle.translate[i]}\n\n`;
                } else {
                    text += `${subtitle.text[i]}\n\n`;
                }
            }
        }

        let name = subtitle.name.lastIndexOf(".");
        name = subtitle.name.substring(0, name);

        newFiles.push({
            name: name,
            id: subtitle.id,
            type: type == 'default' ? subtitle.type : type,
            text
        })
        text = '';
    });

    return newFiles;
}