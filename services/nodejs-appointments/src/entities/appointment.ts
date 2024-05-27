interface AppointmentProps {
  customer: string
  startsAt: Date
  endsAt: Date
}

export class Appointment {
  readonly props: AppointmentProps

  constructor (props: AppointmentProps) {
    const { startsAt, endsAt } = props

    if (endsAt <= startsAt) {
      throw new Error('Start date must be before end date')
    }

    if (startsAt <= new Date()) {
      throw new Error('Start date must be in the future')
    }

    this.props = props
  }

  get customer (): string {
    return this.props.customer
  }

  get startsAt (): Date {
    return this.props.startsAt
  }

  get endsAt (): Date {
    return this.props.endsAt
  }
}
