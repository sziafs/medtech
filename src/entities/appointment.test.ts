import { expect, test } from "vitest";
import { Appointment } from "./appointment";
import { getValidDate } from "../tests/utils/get-valid-date";

test("should create an appointment", () => {
  const startsAt = getValidDate("2021-01-10");
  const endsAt = getValidDate("2021-01-11");

  startsAt.setDate(startsAt.getDate() + 1);
  endsAt.setDate(startsAt.getDate() + 2);

  const appointment = new Appointment({
    customer: "John Doe",
    startsAt,
    endsAt,
  });

  expect(appointment).toBeInstanceOf(Appointment);
  expect(appointment.customer).toBe("John Doe");
});

test("should not create an appointment with start date before end date", () => {
  const startsAt = getValidDate("2021-01-10");
  const endsAt = getValidDate("2021-01-09");

  expect(
    () =>
      new Appointment({
        customer: "John Doe",
        startsAt,
        endsAt,
      })
  ).toThrow("Start date must be before end date");
});

test("should not create an appointment with start date in the past", () => {
  const startsAt = new Date();
  startsAt.setDate(startsAt.getDate() - 1);
  const endsAt = new Date();
  endsAt.setDate(startsAt.getDate() + 1);

  expect(
    () =>
      new Appointment({
        customer: "John Doe",
        startsAt,
        endsAt,
      })
  ).toThrow("Start date must be in the future");
});
