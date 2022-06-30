import RegistrationForm from "../RegistrationForm.vue";

describe("Registration Form", () => {
  it("Controls exits", () => {
    cy.mount(RegistrationForm);
    cy.get('input[type="email"]').should("be.visible");
    cy.get('input[type="password"]').should("be.visible");
    cy.get('button[type="submit"]').should("be.visible");
  });

  it("Controls are controllable", () => {
    cy.mount(RegistrationForm);
    cy.get('input[type="email"]').type("user@email.cz");
    cy.get('input[type="password"]').type("password");
    cy.get('button[type="submit"]').click();
  });
});
