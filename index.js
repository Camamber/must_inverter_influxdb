import { InfluxDB, Point } from "@influxdata/influxdb-client"
import { MustPV1800 } from "./ups"

const url = process.env.INFLUXDB_URL || 'http://localhost:8086'
const token = process.env.INFLUXDB_TOKEN || 'a9TqxAipoEd3DO0JFGEnHFYlsmVHkayuE3m8-JLRNISgjqjfXPgioOL7rbK5fGCEtYJOGw7irJxRDTRA788K3g=='
const org = process.env.INFLUXDB_ORG || `camamber`
const bucket = process.env.INFLUXDB_BUCKET || `home`

async function main() {
  const client = new InfluxDB({ url, token })
  let writeClient = client.getWriteApi(org, bucket, 'ns')

  const ups = new MustPV1800()

  await ups.connect()

  const sample = await ups.sample();
  console.log(sample)

  // const point = new Point('logs')
  //   .tag('host', 'PV18-3024VPM')
  //   .tag("state", sample.state)


  // writeClient.writePoint(point)
  // writeClient.flush()
}

main