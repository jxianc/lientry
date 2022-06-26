import { format, parseISO } from 'date-fns'

const STANDARD_FORMAT = 'MMM dd, yyyy'

const formatDate = (ISO: string) => {
  const date = parseISO(ISO)
  return format(date, STANDARD_FORMAT)
}

export { formatDate }
