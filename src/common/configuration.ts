import { join } from 'path'
import * as yaml from 'js-yaml'
import { readFileSync } from 'fs'

const YAML_CONFIG_FILENAME = 'config.yml'
const filePath = join(process.cwd(), './config', YAML_CONFIG_FILENAME)

export default () => {
  return yaml.load(readFileSync(filePath, 'utf8'))
}
