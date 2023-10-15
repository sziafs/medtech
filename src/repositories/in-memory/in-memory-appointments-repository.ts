import { areIntervalsOverlapping } from "date-fns";

import { Appointment } from "../../entities/appointment";
import { AppointmentRepository } from "../appointments-repository";

export class InMemoryAppointmentsRepository implements AppointmentRepository {
  public appointments: Appointment[] = [];

  async create(appointment: Appointment): Promise<void> {
    this.appointments.push(appointment);
  }

  async findOverlapping(
    startsAt: Date,
    endsAt: Date
  ): Promise<Appointment | null> {
    const overlappingppointment = this.appointments.find((appointment) => {
      return areIntervalsOverlapping(
        { start: startsAt, end: endsAt },
        { start: appointment.startsAt, end: appointment.endsAt },
        { inclusive: true }
      );
    });

    if (!overlappingppointment) {
      return null;
    }

    return overlappingppointment;
  }
}
