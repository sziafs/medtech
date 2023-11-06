import { Appointment } from "../entities/appointment";
import { AppointmentRepository } from "../repositories/appointments-repository";

interface CreateAppointmentRequest {
  customer: string;
  startsAt: Date;
  endsAt: Date;
}

type CreateAppointmentResponse = Appointment;

export class CreateAppointment {
  constructor(private appointmentsRepository: AppointmentRepository) {}

  async execute({
    customer,
    startsAt,
    endsAt,
  }: CreateAppointmentRequest): Promise<CreateAppointmentResponse> {
    const overlapping = await this.appointmentsRepository.findOverlapping(
      startsAt,
      endsAt
    );

    if (overlapping) {
      throw new Error("Appointment overlaps with another appointment");
    }

    const appointment = new Appointment({
      customer,
      startsAt,
      endsAt,
    });

    await this.appointmentsRepository.create(appointment);

    return appointment;
  }
}
