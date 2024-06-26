import UPS from "./ups";

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

        let { soc } = await this.client.readHoldingRegisters(25200, 75)
       
        return {
            batVolts: soc[5] / 10.0,
            inputVolts: soc[7], // 10
            batAmps: soc[74] > 32768 ? batAmps - 65536 : batAmps,
            batCharge: 0,
            discharge: soc[54],
            loadPercent: soc[16],
            outputVA: soc[19],
            outputW: soc[15],
            tempInt: soc[33],
            state: states[soc[1]],
        }
    }
}

export default MustPV1800
