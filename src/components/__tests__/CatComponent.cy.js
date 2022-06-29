import CatComponent from "../CatComponent.vue";

const locators = {
  showMeCatButton: (type) =>
    `[data-test-id='button-fetch-${type ?? "random"}-cat']`,
  loadingSpan: "[data-test-id='span-loading']",
  catImage: "[data-test-id='image-cat']",
  tagsList: "[data-test-id='list-tags']",
};

const getUrl = (type) =>
  `https://cataas.com/cat${
    type ? `//says/I%27m%20${type}` : ""
  }?type=small&json=true`;

const catTypes = ["cute", "sleepy", "angry", undefined];

describe("CatComponent", () => {
  it("Elements are present and visible on load", () => {
    cy.mount(CatComponent);
    catTypes.forEach((type) => {
      cy.get(locators.showMeCatButton(type)).should("be.visible");
    });
    cy.get(locators.catImage).should("be.visible");
  });

  it("Request is sent after click on 'Show me * cat' button and response is correct", () => {
    cy.mount(CatComponent);
    catTypes.forEach((type) => {
      cy.intercept(getUrl(type)).as(`${type}CatInterception`);
      cy.get(locators.showMeCatButton(type)).click();
      cy.wait(`@${type}CatInterception`).then((interception) => {
        cy.log(JSON.stringify(interception.response.body));
        expect(interception.response.statusCode).eq(200);
        expect(interception.response.body.id).not.eq(undefined);
        expect(interception.response.body.created_at).not.eq(undefined);
        expect(interception.response.body.tags).not.eq(undefined);
        expect(interception.response.body.url).not.eq(undefined);
      });
    });
  });

  it("Tags are displayed if returned", () => {
    const tags = ["tag_1", "tag_2", "tag_3"];
    cy.mount(CatComponent);
    cy.intercept(getUrl(), {
      id: "xyz",
      created_at: "2022-05-01T22:35:01.037Z",
      tags: tags,
      url: "/cat",
    }).as(`catInterception`);
    cy.get(locators.showMeCatButton()).click();
    cy.get(locators.tagsList)
      .should("be.visible")
      .find("li")
      .should("have.length", tags.length);
    tags.forEach((tag) => {
      cy.get(locators.tagsList + " li").should("contain.text", tag);
    });
  });

  it("Loading is displayed if waiting for response", () => {
    const catType = catTypes[0];
    cy.mount(CatComponent);
    cy.intercept(getUrl(catType), (req) => {
      req.on("response", (res) => {
        // Throttle the response to 1 Mbps to simulate a
        // mobile 3G connection
        res.setThrottle(1000);
      });
    });
    cy.get(locators.showMeCatButton()).click();
    cy.get(locators.loadingSpan).should("be.visible");
    cy.get(locators.catImage).should("be.visible");
  });
});
