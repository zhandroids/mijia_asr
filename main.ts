enum vocabularyList {

    //% block="open light"
    VOICE_OPEN_LIGHT = 1,
    //% block="close light"
    VOICE_CLOSE_LIGHT = 2,
    //% block="brighter"
    VOICE_BRIGHTER = 3,
    //% block="dark"
    VOICE_DARK = 4,
    //% block="switch"
    VOICE_SWITCH_COLOR = 5,
    //% block="open"
    VOICE_OPEN = 6,
    //% block="close"
     VOICE_CLOSE = 7,
    //% block="swith mode"
    VOICE_SWITCH_MODE = 8
}


//% color="#02a1a3" weight=100 icon="\f2a2" block="Xiaoyu ASR"
namespace mijia_asr{

    let asrEventId = 3500
    let lastvoc = vocabularyList.VOICE_OPEN

    /**
     * Connects to the Serial voice Recognition.
     */
    //% blockId="makerbit_asr_connect" 
    //% block="connect ASR device with ASR RX attached to %asrRX | and ASR TX to %asrTX"
    //% asrRX.fieldEditor="gridpicker" asrRX.fieldOptions.columns=3
    //% asrTX.fieldEditor="gridpicker" asrTX.fieldOptions.columns=3
    //% weight=100 
    export function connectSerialASR(asrRX: DigitalPin, asrTX: DigitalPin): void {
        serial.redirect(asrRX as number, asrTX as number, BaudRate.BaudRate9600);
    }

    
    //% block="asr_logic %index"
    //% index.fieldEditor="gridpicker" index.fieldOptions.columns=4
    //% blockId = asr_logic
    //% weight=80 
    export function asr_logic(index: vocabularyList): boolean {
        const readData = serial.readBuffer(1).toArray(NumberFormat.UInt8BE);
        if (1 == readData[0]) {
            return index == vocabularyList.VOICE_OPEN_LIGHT;
        } else if (2 == readData[0]) {
            return index == vocabularyList.VOICE_CLOSE_LIGHT;
        } else if (3 == readData[0]) {
            return index == vocabularyList.VOICE_BRIGHTER;
        } else if (4 == readData[0]) {
            return index == vocabularyList.VOICE_DARK;
        } else if (5 == readData[0]) {
            return index == vocabularyList.VOICE_SWITCH_COLOR;
        } else if (6 == readData[0]) {
            return index == vocabularyList.VOICE_OPEN;
        } else if (7 == readData[0]) {
            return index == vocabularyList.VOICE_CLOSE;
        } else if (8 == readData[0]) {
            return index == vocabularyList.VOICE_SWITCH_MODE;
        }
        return false
    }
     

    //% block="ASR sensor IIC port hear %vocabulary"
    //% vocabulary.fieldEditor="gridpicker" vocabulary.fieldOptions.columns=3
    //% weight=60 
    export function ASR(vocabulary: vocabularyList, handler: () => void) {
        control.onEvent(asrEventId, vocabulary, handler)
        control.inBackground(function () {
            while (true) {
                const readData = serial.readBuffer(1).toArray(NumberFormat.UInt8BE);
                if (1 == readData[0]) {
                    lastvoc = vocabularyList.VOICE_OPEN_LIGHT;
                    control.raiseEvent(asrEventId, lastvoc);
                } else if (2 == readData[0]) {
                    lastvoc = vocabularyList.VOICE_CLOSE_LIGHT;
                    control.raiseEvent(asrEventId, lastvoc);
                } else if (3 == readData[0]) {
                    lastvoc = vocabularyList.VOICE_BRIGHTER;
                    control.raiseEvent(asrEventId, lastvoc);
                } else if (4 == readData[0]) {
                    lastvoc = vocabularyList.VOICE_DARK;
                    control.raiseEvent(asrEventId, lastvoc);
                } else if (5 == readData[0]) {
                    lastvoc = vocabularyList.VOICE_SWITCH_COLOR;
                    control.raiseEvent(asrEventId, lastvoc);
                } else if (6 == readData[0]) {
                    lastvoc = vocabularyList.VOICE_OPEN;
                    control.raiseEvent(asrEventId, lastvoc);
                } else if (7 == readData[0]) {
                    lastvoc = vocabularyList.VOICE_CLOSE;
                    control.raiseEvent(asrEventId, lastvoc);
                }  else if (8 == readData[0]) {
                    lastvoc = vocabularyList.VOICE_SWITCH_MODE;
                    control.raiseEvent(asrEventId, lastvoc);
                }
                basic.pause(100);
            }
        })

    }

    //% block = "return a value for asr"
    //% weight = 20
    export function asrReturnNum():number{
        return serial.readBuffer(1).toArray(NumberFormat.UInt8BE).get(0)

    }
}

