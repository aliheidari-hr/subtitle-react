let flagError = { error: false, text: '' };

const fetchTranslation = async (item, inputLanguage, outputLanguage) => {
    try {
        const URL = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${inputLanguage}&tl=${outputLanguage}&dt=t&q=${item.text}`;
        const response = await fetch(URL);
        const data = await response.json();

        data[0].forEach((text) => {
            if (text[0]) {
                item.translate.push(text[0]);
            }
        })
    } catch (error) {
        flagError = { error: true, text: error.message };
    }
}

const translateParts = async (encode, inputLanguage, outputLanguage) => {
    const promises = encode.map(text => fetchTranslation(text, inputLanguage, outputLanguage));
    await Promise.all(promises);
}

const removeQuotes = (str) => {
    const doubleQuotes = [
        '"',
        '“', '”',
        '«', '»',
        '„', '‟',
        '「', '」',
        '『', '』',
        '【', '】',
        '〈', '〉',
        '《', '》',
        '〝', '〞',
        '〚', '〛'
    ];

    doubleQuotes.forEach(quote => {
        if (str.startsWith(quote)) {
            str = str.slice(quote.length);
        }
    });

    doubleQuotes.forEach(quote => {
        if (str.endsWith(quote)) {
            str = str.slice(0, -quote.length);
        }
    });

    return str;
}

export const translator = async ({ fileArray, inputLanguage, outputLanguage }) => {
    //deep copy on array
    let cloneFileArray = JSON.parse(JSON.stringify(fileArray));

    //translation of encode parts
    for (const file of cloneFileArray) {
        if (flagError.error) {
            flagError = { error: false, text: flagError.text };
            return { status: false, translateFiles: [], error: flagError.text };
        };

        await translateParts(file.encode, inputLanguage, outputLanguage);
    }

    let translateFiles = [];
    cloneFileArray.forEach((item) => {
        let subTitle = {
            type: item.type,
            id: item.id,
            name: item.name,
            time: item.time,
            text: [],
            translate: [],
        }

        let sortByNumber = item.encode.slice(0);
        sortByNumber.sort(function (a, b) {
            return a.number - b.number;
        });

        sortByNumber.forEach((sub) => {
            sub.translate.forEach((text) => {
                text = text.replace(/\n/g, '');
                text = removeQuotes(text);
                text = text.split('=>').map(item => item.trim()).join('\n');

                subTitle.translate.push(text);
            })
        })

        item.text.forEach((txt) => {
            txt = txt.split('=>').map(item => item.trim()).join('\n');
            subTitle.text.push(txt);
        })

        translateFiles.push(subTitle);
    });

    return { status: true, translateFiles, error: null };
}
