export const downloadFile = ({ subtitle, outputLanguage = false }) => {
    const blob = new Blob([subtitle.text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${subtitle.name}${outputLanguage ? '-' + outputLanguage : ''}.${subtitle.type}`;
    a.click();
    URL.revokeObjectURL(url);
}