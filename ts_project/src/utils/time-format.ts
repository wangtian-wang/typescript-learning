import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)

const DEFAULT_FORMATTER = 'YYYY-MM-DD HH:mm:ss'
export function formatUtcString(utcString: string, format: string = DEFAULT_FORMATTER) {
  return dayjs.utc(utcString).utcOffset(8).format(format)
}
