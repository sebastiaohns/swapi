import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { renderWithProviders } from "../../tests/render";
import { ListFilms } from "../ListFilms";
import { SAMPLE_FILMS } from "../../schemas/films";

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

describe("ListFilms", () => {
  it("must show all films", async () => {
    renderWithProviders(<ListFilms data={SAMPLE_FILMS} search="" />);

    expect(
      screen.getByText(SAMPLE_FILMS[0].properties.title),
    ).toBeInTheDocument();

    expect(screen.getByText("SEE DETAILS")).toBeInTheDocument();
  });

  it("must redirect to film details page", async () => {
    renderWithProviders(<ListFilms data={SAMPLE_FILMS} search="" />);

    await userEvent.click(screen.getByText("SEE DETAILS"));

    expect(mockNavigate).toHaveBeenCalledWith("details/films/1");
  });

  it("must show film by search", async () => {
    renderWithProviders(<ListFilms data={SAMPLE_FILMS} search="A new" />);

    expect(
      screen.getByText(SAMPLE_FILMS[0].properties.title),
    ).toBeInTheDocument();

    expect(screen.getByText("SEE DETAILS")).toBeInTheDocument();
  });

  it("must show nothing when search don't match", async () => {
    renderWithProviders(<ListFilms data={SAMPLE_FILMS} search="Search" />);

    expect(
      screen.queryByText(SAMPLE_FILMS[0].properties.title),
    ).not.toBeInTheDocument();

    expect(screen.queryByText("SEE DETAILS")).not.toBeInTheDocument();
  });
});
