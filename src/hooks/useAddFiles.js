import { readFile } from "../utils/readSubtitle";
import { v4 as uuidv4 } from 'uuid';

export default function useAddFiles(encode) {
    const addFiles = async (event) => {
        const files = event.target.files;
        return await addSubtitle(files);
    };

    const addSubtitle = async (files) => {
        const selectedFiles = Array.from(files);
        const subtitles = await Promise.all(selectedFiles.map(async (file) => {
            let type = '';
            if (file.name.endsWith('.srt')) {
                type = 'srt';
            } else if (file.name.endsWith('.vtt')) {
                type = 'vtt';
            } else if (file.name.endsWith('.sub')) {
                type = 'sub';
            } else {
                return { isShow: true, text: 'Unsupported subtitle type', status: false };
            }

            const content = await readFileAsText(file);
            const { textArray, timeArray, encodeArray } = readFile({ type, subtitle: content, encode });

            return {
                id: uuidv4(),
                name: file.name,
                text: textArray,
                time: timeArray,
                encode: encodeArray,
                type,
            };
        }));

        return { subtitles };
    };

    const readFileAsText = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (event) => resolve(event.target.result);
            reader.onerror = (error) => reject(error);
            reader.readAsText(file);
        });
    };

    return addFiles;
}
