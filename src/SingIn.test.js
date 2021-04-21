import React from "react";
import SignIn from "./SignIn";
import { fireEvent, render } from "@testing-library/react";
import { act } from "react-dom/test-utils";

describe("SignIn", () => {
  describe("Con inputs validos", () => {
    test("Llamando a la funcion de unSubmit y que este bien", async () => {
      const mockUnSubmit = jest.fn();

      const { getByLabelText, getByRole } = render(
        <SignIn onSubmit={mockUnSubmit}></SignIn>
      );
      await act(async () => {
        fireEvent.change(getByLabelText("Email Address *"), {
          target: { value: "nacholima@gmail.com" },
        });
        fireEvent.change(getByLabelText("Password *"), {
          target: { value: "123456789" },
        });
      });

      await act(async () => {
        fireEvent.click(
          getByRole("button", {
            name: /sign in/i,
          })
        );
      });
      expect(mockUnSubmit).toHaveBeenCalled();
    });
    test("Rendereo de email erroneo", async () => {
      const { getByLabelText, container } = render(<SignIn></SignIn>);

      await act(async () => {
        const email = getByLabelText("Email Address *");
        fireEvent.change(email, {
          target: { value: "Email incorrecto" },
        });
        fireEvent.blur(email);
      });
      expect(container.innerHTML).toMatch(/Enter a valid email/);
    });
    test("Rendereo de password erronea", async () => {
      const { getByLabelText, container } = render(<SignIn></SignIn>);

      await act(async () => {
        const password = getByLabelText("Password *");
        fireEvent.change(password, {
          target: { value: "111" },
        });
        fireEvent.blur(password);
      });
      expect(container.innerHTML).toMatch(/Password should be longer than 6 characters/);
    });
  });
});
