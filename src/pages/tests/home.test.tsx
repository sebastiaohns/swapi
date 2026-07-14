import { screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { renderWithProviders } from "../../tests/render";
import { HomePage } from "../home";

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

vi.mock("../../hooks/swapi", () => ({
  useGetFilms: vi.fn(),
  useGetPeople: vi.fn(),
}));

import * as swapi from "../../hooks/swapi";
import { SAMPLE_FILMS } from "../../schemas/films";
import { SAMPLE_PEOPLE } from "../../schemas/people";
import userEvent from "@testing-library/user-event";

describe("ListFilms", () => {
  beforeEach(() => {
    vi.mocked(swapi.useGetFilms).mockReturnValue({
      data: SAMPLE_FILMS,
      isFetching: false,
    } as ReturnType<typeof swapi.useGetFilms>);

    vi.mocked(swapi.useGetPeople).mockReturnValue({
      data: SAMPLE_PEOPLE,
      isFetching: false,
    } as ReturnType<typeof swapi.useGetPeople>);
  });

  it("must show all films", async () => {
    renderWithProviders(<HomePage />);

    const radio = screen.getByRole("radio", { name: "Movies" });

    await userEvent.click(radio);

    expect(
      screen.getByText(SAMPLE_FILMS[0].properties.title),
    ).toBeInTheDocument();

    expect(screen.getByText("SEE DETAILS")).toBeInTheDocument();
  });

  it("must show all people", async () => {
    renderWithProviders(<HomePage />);

    const radio = screen.getByRole("radio", { name: "People" });

    await userEvent.click(radio);

    expect(
      screen.getByText(SAMPLE_PEOPLE[0].properties.name),
    ).toBeInTheDocument();

    expect(screen.getByText("SEE DETAILS")).toBeInTheDocument();
  });

  it("must redirect to people details page", async () => {
    renderWithProviders(<HomePage />);

    const radio = screen.getByRole("radio", { name: "People" });

    await userEvent.click(radio);

    await userEvent.click(screen.getByText("SEE DETAILS"));

    expect(mockNavigate).toHaveBeenCalledWith("/details/people/1");
  });

  it("must redirect to film details page", async () => {
    renderWithProviders(<HomePage />);

    const radio = screen.getByRole("radio", { name: "Movies" });

    await userEvent.click(radio);

    await userEvent.click(screen.getByText("SEE DETAILS"));

    expect(mockNavigate).toHaveBeenCalledWith("details/films/1");
  });

  it("must show Character by search", async () => {
    renderWithProviders(<HomePage />);

    const radio = screen.getByRole("radio", { name: "People" });

    await userEvent.click(radio);

    const input = screen.getByRole("textbox");

    await userEvent.type(input, "Luke");

    expect(
      screen.getByText(SAMPLE_PEOPLE[0].properties.name),
    ).toBeInTheDocument();

    expect(screen.getByText("SEE DETAILS")).toBeInTheDocument();
  });

  it("must show film by search", async () => {
    renderWithProviders(<HomePage />);

    const radio = screen.getByRole("radio", { name: "Movies" });

    await userEvent.click(radio);

    const input = screen.getByRole("textbox");

    await userEvent.type(input, "A new");

    expect(
      screen.getByText(SAMPLE_FILMS[0].properties.title),
    ).toBeInTheDocument();

    expect(screen.getByText("SEE DETAILS")).toBeInTheDocument();
  });

  it("must show message when theres no data", async () => {
    renderWithProviders(<HomePage />);

    expect(screen.getByText("There are zero matches.")).toBeInTheDocument();
  });

  it("must show seaching button", async () => {
    vi.mocked(swapi.useGetFilms).mockReturnValue({
      data: undefined,
      isFetching: true,
    } as ReturnType<typeof swapi.useGetFilms>);

    vi.mocked(swapi.useGetPeople).mockReturnValue({
      data: undefined,
      isFetching: true,
    } as ReturnType<typeof swapi.useGetPeople>);

    renderWithProviders(<HomePage />);

    const radio = screen.getByRole("radio", { name: "Movies" });

    await userEvent.click(radio);

    expect(screen.getByText("SEARCHING...")).toBeInTheDocument();
  });
});
