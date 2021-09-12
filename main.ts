namespace mijia_asr{
 
    //% block="asr_logic %index"
    //% index.fieldEditor="gridpicker" index.fieldOptions.columns=4
    //% blockId = asr_logic
    //% weight=80 
    export function asr_logic(index: vocabularyList): boolean {
        const readData = serial.readBuffer(1).toArray(NumberFormat.UInt8BE);
        if (1 == readData[0]) {
            return index == vocabularyList.VOICE_OPEN;
        } else if (2 == readData[0]) {
            return index == vocabularyList.VOICE_CLOSE;
        } else if (3 == readData[0]) {
            return index == vocabularyList.VOICE_OPEN_LIGHT;
        } else if (4 == readData[0]) {
            return index == vocabularyList.VOICE_CLOSE_LIGHT;
        } else if (5 == readData[0]) {
            return index == vocabularyList.VOICE_BRIGHTER;
        } else if (6 == readData[0]) {
            return index == vocabularyList.VOICE_DARK;
        } else if (7 == readData[0]) {
            return index == vocabularyList.VOICE_SWITCH_COLOR;
        } else if (8 == readData[0]) {
            return index == vocabularyList.VOICE_START;
        } else if (9 == readData[0]) {
            return index == vocabularyList.VOICE_STOP;
        } else if (10 == readData[0]) {
            return index == vocabularyList.VOICE_SWITCH_MODE;
        }
        return false
    }
}

enum vocabularyList {
    VOICE_OPEN = 1,
    VOICE_CLOSE = 2,
    VOICE_OPEN_LIGHT = 3,
    VOICE_CLOSE_LIGHT = 4,
    VOICE_BRIGHTER = 5,
    VOICE_DARK = 6,
    VOICE_SWITCH_COLOR = 7,
    VOICE_START = 8,
    VOICE_STOP = 9,
    VOICE_SWITCH_MODE = 10
}
