import UPS from "./ups.js";

class MustPV1800 extends UPS {
    constructor(devicePath) {
        super(devicePath, 4, 19200)
    }

    async sample() {
        let states = {
            0: "PowerOn",
            1: "SelfTest",
            2: "OffGrid",
            3: "GridTie",
            4: "ByPass",
            5: "Stop",
            6: "GridCharging"
        }

        let { data: soc } = await this.client.readHoldingRegisters(25200, 75)

        return {
            workState: states[soc[1]],
            batteryVoltage: soc[5] * 0.1,
            inverterVoltage: soc[6] * 0.1,
            gridVoltage: soc[7] * 0.1,
            busVoltage: soc[8] * 0.1,
            controlCurrent: soc[9] * 0.1,
            inverterCurrent: soc[10] * 0.1,
            gridCurrent: soc[11] * 0.1,
            loadCurrent: soc[12] * 0.1,
            inverterPower: soc[13],
            gridPower: soc[14],
            loadPower: soc[15],
            loadPercent: soc[16],
            inverterComplexPower: soc[17],
            gridComplexPower: soc[18],
            loadComplexPower: soc[19],
            inverterReactivePower: soc[21],
            gridReactivePower: soc[22],
            loadReactivePower: soc[23],
            inverterFrequency: soc[25] * 0.01,
            gridFrequency: soc[26] * 0.01,
            acRadiatorTemperature: soc[33],
            transformerTemperature: soc[34],
            dcRadiatorTemperature: soc[35],
            accumulatedChargerPower: soc[45] * 1000 + soc[46] * 0.1,
            accumulatedDischargerPower: soc[47] * 1000 + soc[48] * 0.1,
            accumulatedBuyPower: soc[49] * 1000 + soc[50] * 0.1,
            accumulatedSellPower: soc[51] * 1000 + soc[52] * 0.1,
            accumulatedLoadPower: soc[53] * 1000 + soc[54] * 0.1,
            accumulatedSelfUsePower: soc[55] * 1000 + soc[56] * 0.1,
            accumulatedPvSellPower: soc[57] * 1000 + soc[58] * 0.1,
            accumulatedGridChargerPower: soc[59] * 1000 + soc[60] * 0.1,
            batteryPower: soc[73],
            batteryCurrent: soc[74],
        }
    }
}

export default MustPV1800
