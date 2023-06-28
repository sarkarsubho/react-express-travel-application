//import data from "../../submissionData.json"; // do not create/change  this file

import mock from "../fixtures/db.json";

const data = [
  {
    submission_link: "http://localhost:3000",
    id: "ukr-local",
    json_server_link: "http://localhost:8080",
  },
];
// use this ^  to check on local

data.forEach(({ submission_link: url, id, json_server_link: server_url }) => {
  describe("Travel application", function () {
    let acc_score = 1;
    beforeEach(() => {
      Cypress.on("uncaught:exception", (err, runnable) => {
        return false;
      });

      cy.writeFile("db.json", mock, (err) => {
        if (err) {
          console.error(err);
        }
      });

      cy.wait(1000);
    });
    it("Shows the correct initial structure", () => {
      cy.visit(url);
      cy.get("#toggle").should("have.text", "To Dashboard");
      cy.then(() => {
        acc_score += 1;
      });
    });//1
    it("Toggle should work as expected", () => {
      cy.intercept("GET", "**/tours").as("getTours");
      cy.visit(url);
      cy.get("#toggle").click();
      cy.wait("@getTours");
      cy.get("#toggle").should("have.text", "To Book Travel");
      cy.then(() => {
        acc_score += 2;
      });
    });//2
    it("Form should have title in h1 tag", () => {
      cy.visit(url);
      cy.get("#formTitle").should("have.text", "Travel Booking Form");
      cy.then(() => {
        acc_score += 1;
      });
    });//1
    it("Form should work as expected", () => {
      cy.intercept("POST", "**/tours").as("addTour");
      cy.visit(url);
      cy.get("#error").should('not.be.visible')
      cy.get("#success").should('not.be.visible')
      cy.get("#name").clear().type("Sarah Johnson");
      cy.get("#email").clear().type("sarah@mail.com");
      cy.get("#tourLocation").select("India");
      cy.get("#noOfTraveller").clear().type(3);
      cy.get("#budgetPerHead").clear().type(400);
      cy.get("form").submit();
      cy.wait("@addTour");  
      cy.wait(500)
      cy.get("#error").should('not.be.visible')
      cy.get("#success").should('be.visible').contains("Successfully Submitted")
      cy.then(() => {
        acc_score += 3;
      });
    });//3
    it("Same email id user should throw error message",()=>{
      cy.visit(url);
      cy.get("#error").should('not.be.visible')
      cy.get("#email").clear().type("neha@mail.com")
      cy.get("#submit").click();
      cy.wait(500)
      cy.get("#error").should('be.visible').contains("Email Already exist")
      cy.then(() => {
        acc_score += 1;
      });
    })//1
    it("Should display successfully message after submiting form correctly",()=>{
      cy.intercept("POST", "**/tours").as("addTour");
      cy.visit(url);
      cy.get("#name").clear().type("Sarah Johnson");
      cy.get("#email").clear().type("sarah@mail.com");
      cy.get("#tourLocation").select("India");
      cy.get("#noOfTraveller").clear().type(3);
      cy.get("#budgetPerHead").clear().type(400);
      cy.get("form").submit();
      cy.wait("@addTour");
      cy.then(() => {
        acc_score += 1;
      });
    })//1
    it("Dashboard must fetch correct data", () => {
      cy.intercept("GET", "**/tours").as("getTours");
      cy.visit(url);
      cy.get("#toggle").click();
      cy.wait("@getTours");
      cy.get("tbody").children().should("have.length", mock.tours.length);

      cy.get("tbody tr").each((row, index) => {
        expect(row.text()).to.include(mock.tours[index].id);
        expect(row.text()).to.include(mock.tours[index].name);
        expect(row.text()).to.include(mock.tours[index].email);
        expect(row.text()).to.include(mock.tours[index].tourLocation);
        expect(row.text()).to.include(mock.tours[index].noOfTraveller);
        expect(row.text()).to.include(mock.tours[index].budgetPerHead);
      });
      cy.then(() => {
        acc_score += 3;
      });
    });//3
    it("Form data must update the DOM", () => {
      cy.intercept("GET", "**/tours").as("getTours");
      cy.intercept("POST", "**/tours").as("addTour");
      cy.visit(url);
      cy.get("#name").clear().type("masai");
      cy.get("#email").clear().type("masai@mail.com");
      cy.get("#tourLocation").select("India");
      cy.get("#noOfTraveller").clear().type(7);
      cy.get("#budgetPerHead").clear().type(250);
      cy.get("form").submit();
      cy.wait("@addTour");

      cy.get("#toggle").click();
      cy.wait(500);
      cy.wait("@getTours");
      cy.get("tbody").children().should("have.length", 8);

      cy.get("tbody").children().last().contains("masai");
      cy.get("tbody").children().last().contains("masai@mail.com");
      cy.get("tbody").children().last().contains("India");
      cy.get("tbody").children().last().contains("7");
      cy.get("tbody").children().last().contains("250");
      cy.then(() => {
        acc_score += 2;
      });
    });//2
    after(`generate score`, () => {
      console.log("final score:", acc_score);
      ////////////// this should not be changed
      let result = {
        id,
        marks: Math.ceil(acc_score),
      };
      result = JSON.stringify(result);
      cy.writeFile("results.json", `\n${result},`, { flag: "a+" }, (err) => {
        if (err) {
          console.error(err);
        }
      });
      //////////////////
    });
  });
});
