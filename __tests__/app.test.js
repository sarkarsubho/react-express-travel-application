const request = require("supertest");
const app = require("../server");
const fs = require("fs");

global.score = 1;

// beforeEach(async () => {});
let initialData = {
  tours: [
    {
      id: 1,
      name: "Ravi Kumar",
      email: "ravi@mail.com",
      tourLocation: "India",
      noOfTraveller: 3,
      budgetPerHead: 250,
    },
    {
      id: 2,
      name: "Fatima Mohammed",
      email: "fatima@mail.com",
      tourLocation: "Africa",
      noOfTraveller: 2,
      budgetPerHead: 300,
    },
    {
      id: 3,
      name: "Giovanni Rossi",
      email: "giovanni@mail.com",
      tourLocation: "Europe",
      noOfTraveller: 4,
      budgetPerHead: 200,
    },
    {
      id: 4,
      name: "Neha Patel",
      email: "neha@mail.com",
      tourLocation: "India",
      noOfTraveller: 1,
      budgetPerHead: 500,
    },
    {
      id: 5,
      name: "Amara Diallo",
      email: "amara@mail.com",
      tourLocation: "Africa",
      noOfTraveller: 5,
      budgetPerHead: 150,
    },
  ],
};

beforeAll(() => {
  fs.writeFileSync("db.json", JSON.stringify(initialData));
});

describe("Full-stack express travel app", () => {
  //default
  it("Should able to setup the server", async () => {
    const res = await request(app).get("/");
    expect(res.text).toBe(
      `<h2 style="color:green;font-size:26px;margin:20px auto;">Welcome to travel backend API</h2>`
    );

    global.score += 1;
  });

  // get
  it("Should able to get all data from server", async () => {
    const res = await request(app).get("/tours");

    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(5);
    expect(res.body).toEqual(initialData.tours);

    global.score += 2;
  });

  it("Should able to make post request and add new tour", (done) => {
    let newTour = {
      name: "pablo pandit",
      email: "pablo@mail.com",
      tourLocation: "kashmir",
      noOfTraveller: 3,
      budgetPerHead: 350,
    };
    request(app)
      .post("/tours")
      .send(newTour)
      .set("Accept", "application/json")
      .expect(201)
      .then((response) => {
        expect(response.body.id).toEqual(6);
        expect(response.body.name).toBe("pablo pandit");
        expect(response.body.email).toBe("pablo@mail.com");
        expect(response.body.tourLocation).toBe("kashmir");
        expect(response.body.noOfTraveller).toEqual(3);
        expect(response.body.budgetPerHead).toEqual(350);

        let db = fs.readFileSync("db.json");
        db = JSON.parse(db);

        expect(db.tours).toHaveLength(6);

        expect(db.tours[db.tours.length - 1].id).toBe(6);
        expect(db.tours[db.tours.length - 1].name).toBe("pablo pandit");
        expect(db.tours[db.tours.length - 1].email).toBe("pablo@mail.com");
        expect(db.tours[db.tours.length - 1].tourLocation).toBe("kashmir");
        expect(db.tours[db.tours.length - 1].noOfTraveller).toBe(3);
        expect(db.tours[db.tours.length - 1].budgetPerHead).toBe(350);

        done();
        global.score += 2;
      });
  });

  it("Should be able to prevent duplicate email users from making a post request and add new tour", (done) => {
    let newTour = {
      name: "pablo pandit",
      email: "pablo@mail.com",
      tourLocation: "kashmir",
      noOfTraveller: 3,
      budgetPerHead: 350,
    };
    request(app)
      .post("/tours")
      .send(newTour)
      .set("Accept", "application/json")
      .expect(403)
      .then((response) => {
        expect(response.body.message).toBe("Email Already exist.");

        let db = fs.readFileSync("db.json");
        db = JSON.parse(db);

        expect(db.tours).toHaveLength(6);

        done();
        global.score += 2;
      });
  });
  it("Should be able to prevent duplicate email users from making a post request and add new tour (lowercase and uppercase letter treat as same)", (done) => {
    let newTour = {
      name: "pablo pandit",
      email: "Pablo@Mail.Com",
      tourLocation: "kashmir",
      noOfTraveller: 3,
      budgetPerHead: 350,
    };
    request(app)
      .post("/tours")
      .send(newTour)
      .set("Accept", "application/json")
      .expect(403)
      .then((response) => {
        expect(response.body.message).toBe("Email Already exist.");

        let db = fs.readFileSync("db.json");
        db = JSON.parse(db);

        expect(db.tours).toHaveLength(6);

        done();
        global.score += 2;
      });
  });
});

afterAll((done) => {
  done();
  console.log("Final Score is", global.score);
});
