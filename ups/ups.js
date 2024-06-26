import ModbusRTU from "modbus-serial";

class UPS {
    constructor(devicePath, deviceId, baudRate) {
        this.devicePath = devicePath
        this.deviceId = deviceId
        this.baudRate = baudRate

        this.client = new ModbusRTU();
    }

    async connect() {
        await this.client.connectRTUBuffered(devicePath, { baudRate });
        this.client.setID(deviceId);
        this.client.setTimeout(500);
        return
    }

    sample() {
        return null;
    }


}
export default UPS;