import RegistrationForm from "../RegistrationForm.vue";

const locators = {
  email: {
    input: "[data-test-id='email-input']",
    invalid: "[data-test-id='email-invalid']",
  },
  password: {
    input: "[data-test-id='password-input']",
    invalidLength: "[data-test-id='password-invalid-length']",
    invalidUppercase: "[data-test-id='password-invalid-uppercase']",
    invalidLowercase: "[data-test-id='password-invalid-lowercase']",
    invalidNumber: "[data-test-id='password-invalid-number']",
  },
  passwordConfirm: {
    input: "[data-test-id='password-confirm-input']",
    invalid: "[data-test-id='password-confirm-invalid']",
  },
  submitButton: "[data-test-id='submit-button']",
};

const data = {
  emailValid: "user@email.cz",
  passwordValid: "Password123",
  emailInvalids: ["user@emailcz", "useremail.cz", "useremailcz"],
  passwordInvalidLength: "Xyz2",
  passwordInvalidUppercase: "xyz564654sdf",
  passwordInvalidLowercase: "ASFLKLKJS5646",
  passwordInvalidNumber: "ASFsfsdfLKLKJsaS",
};

describe("Registration Form", () => {
  beforeEach(() => {
    cy.mount(RegistrationForm);
  });

  it("Elements exits and are visible", () => {
    cy.get(locators.email.input).should("be.visible");
    cy.get(locators.password.input).should("be.visible");
    cy.get(locators.passwordConfirm.input).should("be.visible");
    cy.get(locators.submitButton).should("be.visible");
  });

  it("Fill form - happy path", () => {
    cy.get(locators.email.input).type(data.emailValid);
    cy.get(locators.password.input).type(data.passwordValid);
    cy.get(locators.passwordConfirm.input).type(data.passwordValid);
    cy.get(locators.submitButton).should("not.be.disabled");

    cy.get(locators.email.invalid).should("not.exist");
    cy.get(locators.password.invalidLength).should("not.exist");
    cy.get(locators.password.invalidUppercase).should("not.exist");
    cy.get(locators.password.invalidLowercase).should("not.exist");
    cy.get(locators.password.invalidNumber).should("not.exist");
    cy.get(locators.passwordConfirm.invalid).should("not.exist");
  });

  it("Fill form - email validations", () => {
    data.emailInvalids.forEach((email) => {
      cy.get(locators.email.input).clear().type(email).blur();
      cy.get(locators.email.invalid).should("be.visible");
    });
  });

  it("Fill form - password validations - length", () => {
    cy.get(locators.password.input).type(data.passwordInvalidLength).blur();
    cy.get(locators.password.invalidLength).should("be.visible");
  });

  it("Fill form - password validations - uppercase", () => {
    cy.get(locators.password.input).type(data.passwordInvalidUppercase).blur();
    cy.get(locators.password.invalidUppercase).should("be.visible");
  });

  it("Fill form - password validations - lowercase", () => {
    cy.get(locators.password.input).type(data.passwordInvalidLowercase).blur();
    cy.get(locators.password.invalidLowercase).should("be.visible");
  });

  it("Fill form - password validations - number", () => {
    cy.get(locators.password.input).type(data.passwordInvalidNumber).blur();
    cy.get(locators.password.invalidNumber).should("be.visible");
  });

  it("Fill form - password confirm validations", () => {
    cy.get(locators.password.input).type(data.passwordValid).blur();
    cy.get(locators.passwordConfirm.input)
      .type(data.passwordInvalidNumber)
      .blur();
    cy.get(locators.passwordConfirm.invalid).should("be.visible");
  });
});
