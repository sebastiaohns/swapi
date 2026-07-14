import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { renderWithProviders } from "../../tests/render";
import { PeopleDetails } from "../PeopleDetails";

const data = {
  name: "Luke Skywalker",
  birth_year: "19BBY",
  gender: "male",
  eye_color: "blue",
  hair_color: "blond",
  height: "172",
  mass: "77",
  films: ["https://swapi.dev/api/films/1/"],
};

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
  useGetItems: vi.fn(),
}));

import * as swapi from "../../hooks/swapi";

describe("PeopleDetails", () => {
  beforeEach(() => {
    vi.mocked(swapi.useGetItems).mockReturnValue({
      data: [{ title: "A New Hope", url: "https://swapi.dev/api/films/1/" }],
      isFetching: false,
    } as ReturnType<typeof swapi.useGetItems>);
  });

  it("must show all character details", async () => {
    renderWithProviders(<PeopleDetails data={data} />);

    expect(screen.getByText(data.name)).toBeInTheDocument();

    expect(
      screen.getByText("Birth year: " + data.birth_year),
    ).toBeInTheDocument();

    expect(screen.getByText("Gender: " + data.gender)).toBeInTheDocument();

    expect(
      screen.getByText("Eye color: " + data.eye_color),
    ).toBeInTheDocument();

    expect(
      screen.getByText("Hair color: " + data.hair_color),
    ).toBeInTheDocument();

    expect(screen.getByText("Height: " + data.height)).toBeInTheDocument();

    expect(screen.getByText("Mass: " + data.mass)).toBeInTheDocument();

    expect(screen.getByText("A New Hope")).toBeInTheDocument();
  });

  it("must redirect to character details page", async () => {
    renderWithProviders(<PeopleDetails data={data} />);

    await userEvent.click(screen.getByText("A New Hope"));

    expect(mockNavigate).toHaveBeenCalledWith("/details/films/1/");
  });

  it("must redirect to main page", async () => {
    renderWithProviders(<PeopleDetails data={data} />);

    await userEvent.click(screen.getByText("BACK TO SEARCH"));

    expect(mockNavigate).toHaveBeenCalledWith("/");
  });

  it("must show loading message when get items is fetching", async () => {
    vi.mocked(swapi.useGetItems).mockReturnValue({
      data: [{ name: "", url: "" }],
      isFetching: true,
    } as ReturnType<typeof swapi.useGetItems>);

    renderWithProviders(<PeopleDetails data={data} />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });
});
