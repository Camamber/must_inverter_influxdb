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

        const map = {
            1: ["WorkState", 1, "map",],
            5: ["BatteryVoltage", 0.1, "V"],
            6: ["InverterVoltage", 0.1, "V"],
            7: ["GridVoltage", 0.1, "V"],
            8: ["BUSVoltage", 0.1, "V"],
            9: ["ControlCurrent", 0.1, "A"],
            10: ["InverterCurrent", 0.1, "A"],
            11: ["GridCurrent", 0.1, "A"],
            12: ["LoadCurrent", 0.1, "A"],
            13: ["InverterPower(P)", 1, "W"],
            14: ["GridPower(P)", 1, "W"],
            15: ["LoadPower(P)", 1, "W"],
            16: ["LoadPercent", 1, "%"],
            17: ["InverterComplexPower(S)", 1, "VA"],
            18: ["GridComplexPower(S)", 1, "VA"],
            19: ["LoadComplexPower(S)", 1, "VA"],
            21: ["InverterReactivePower(Q)", 1, "var"],
            22: ["GridReactivePower(Q)", 1, "var"],
            23: ["LoadReactivePower(Q)", 1, "var"],
            25: ["InverterFrequency", 0.01, "Hz"],
            26: ["GridFrequency", 0.01, "Hz"],
            33: ["ACRadiatorTemperature", 1, "C"],
            34: ["TransformerTemperature", 1, "C"],
            35: ["DCRadiatorTemperature", 1, "C"],
            73: ["BatteryPower", 1, "W"],
            74: ["BatteryCurrent", 1, "A"],
        }


        return {
            workState: soc[1],
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
            batteryPower: soc[73],
            batteryCurrent: soc[74],
        }
    }
}

export default MustPV1800
