import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { renderWithProviders } from "../../tests/render";
import { ListPeople } from "../ListPeople";
import { SAMPLE_PEOPLE } from "../../schemas/people";

const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual =
    await vi.importActual<typeof import("react-router-dom")>(
      "react-router-dom",
    );

  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe("ListPeople", () => {
  it("must show all people", async () => {
    renderWithProviders(<ListPeople data={SAMPLE_PEOPLE} search="" />);

    expect(
      screen.getByText(SAMPLE_PEOPLE[0].properties.name),
    ).toBeInTheDocument();

    expect(screen.getByText("SEE DETAILS")).toBeInTheDocument();
  });

  it("must redirect to people details page", async () => {
    renderWithProviders(<ListPeople data={SAMPLE_PEOPLE} search="" />);

    await userEvent.click(screen.getByText("SEE DETAILS"));

    expect(mockNavigate).toHaveBeenCalledWith("/details/people/1");
  });

  it("must show character by search", async () => {
    renderWithProviders(<ListPeople data={SAMPLE_PEOPLE} search="Luke" />);

    expect(
      screen.getByText(SAMPLE_PEOPLE[0].properties.name),
    ).toBeInTheDocument();

    expect(screen.getByText("SEE DETAILS")).toBeInTheDocument();
  });

  it("must show nothing when search don't match", async () => {
    renderWithProviders(<ListPeople data={SAMPLE_PEOPLE} search="Search" />);

    expect(
      screen.queryByText(SAMPLE_PEOPLE[0].properties.name),
    ).not.toBeInTheDocument();

    expect(screen.queryByText("SEE DETAILS")).not.toBeInTheDocument();
  });
});
