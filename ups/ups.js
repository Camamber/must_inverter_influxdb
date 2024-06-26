import ModbusRTU from "modbus-serial";

class UPS {
    constructor(devicePath, deviceId, baudRate) {
        this.devicePath = devicePath
        this.deviceId = deviceId
        this.baudRate = baudRate

        this.client = new ModbusRTU();
    }

    async connect() {
        await this.client.connectRTUBuffered(this.devicePath, { baudRate: this.baudRate });
        this.client.setID(this.deviceId);
        this.client.setTimeout(500);
        return
    }

    async disconnect() {
        this.client.close(() => { });
        this.client.destroy(() => { })
        return
    }


    sample() {
        return null;
    }


}
export default UPS;