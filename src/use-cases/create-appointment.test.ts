import { describe, expect, it } from "vitest";
import { CreateAppointment } from "./create-appointment";
import { Appointment } from "../entities/appointment";
import { getValidDate } from "../tests/utils/get-valid-date";
import { InMemoryAppointmentsRepository } from "../repositories/in-memory/in-memory-appointments-repository";

describe("Create appointment", () => {
  it("should be able to create an appointment", () => {
    const appointmentsReposity = new InMemoryAppointmentsRepository();
    const createAppointment = new CreateAppointment(appointmentsReposity);

    const startsAt = getValidDate("2021-01-10");
    const endsAt = getValidDate("2021-01-11");

    expect(
      createAppointment.execute({
        customer: "John Doe",
        startsAt,
        endsAt,
      })
    ).resolves.toBeInstanceOf(Appointment);
  });

  it("should should not be able to create an appointment with overlapping date", async () => {
    const appointmentsRepository = new InMemoryAppointmentsRepository();
    const createAppointment = new CreateAppointment(appointmentsRepository);

    const startsAt = getValidDate("2021-01-10");
    const endsAt = getValidDate("2021-01-15");

    await createAppointment.execute({
      customer: "John Doe",
      startsAt,
      endsAt,
    });

    expect(
      createAppointment.execute({
        customer: "John Doe",
        startsAt: getValidDate("2021-01-14"),
        endsAt: getValidDate("2021-01-16"),
      })
    ).rejects.toBeInstanceOf(Error);

    expect(
      createAppointment.execute({
        customer: "John Doe",
        startsAt: getValidDate("2021-01-09"),
        endsAt: getValidDate("2021-01-16"),
      })
    ).rejects.toBeInstanceOf(Error);

    expect(
      createAppointment.execute({
        customer: "John Doe",
        startsAt: getValidDate("2021-01-11"),
        endsAt: getValidDate("2021-01-14"),
      })
    ).rejects.toBeInstanceOf(Error);

    expect(
      createAppointment.execute({
        customer: "John Doe",
        startsAt: getValidDate("2021-01-09"),
        endsAt: getValidDate("2021-01-16"),
      })
    ).rejects.toBeInstanceOf(Error);
  });
});
