import {
  cleanup,
  render,
  fireEvent,
  screen,
  act
} from "@testing-library/react";
import "@testing-library/jest-dom";
import UserInfo from "../components/userInfo";
import * as usersApi from "../api/users";
import App from "../App";

const getUsers = jest.spyOn(usersApi, "getUsers");

describe("Test Entity Component", () => {
  let context = render(<App />);
  it("render without crash", () => {
    expect(getUsers).toBeCalled();
  });
});
