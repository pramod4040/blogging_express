const User = require("../models/user")
const { registerUser } = require("../controllers/auth")
const { hashPassword, comaprePassword } = require("../core/security")

jest.mock("../models/user")
jest.mock("../core/security")

const req = {
    body: {
        username: 'userrandom',
        email: 'test@gmail.com',
        password: "test@password"
    }
}

const res = {
    status: jest.fn((x) => x),
    json: jest.fn((x) => x)
}

test("should send 400 when username exists", async () => {
    User.findOne.mockImplementationOnce(() => ({
        id: 1,
        username: 'userrandom',
        email: 'test@gmail.com',
        password: 'password'
    }));

    await registerUser(req, res)
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({"message": "Username Already Exists!"});
    expect(res.json).toHaveBeenCalledTimes(1);
});

/*
*  Test Two
*/

const req1 = {
    body: {
        email: "test5@gmail.com",
        username: "random",
        password: "testing"
    }
}
test("should send 400 when email already exists", async () => {
    User.findOne.mockImplementationOnce(() => ({
        id: 1,
        username: "userrandom",
        email: "test5@gmail.com",
        password: "password"
    }));

    await registerUser(req1, res)
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({"message": "Email Already Exists!"});
    expect(res.json).toHaveBeenCalledTimes(2);
});


/*
*  Test Three
*/

const req2 = {
    body: {
        email: "unique@gmail.com",
        username: "unique",
        password: "testing"
    }
}
test("should send 201 when email and username are unique", async () => {
    User.findOne.mockImplementationOnce(() => undefined);

    hashPassword.mockImplementationOnce((pass) => 'hashpassword')

    User.prototype.save.mockResolvedValueOnce({id: 1, email: "email", password: "randomhashpass"});

    await registerUser(req1, res)
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({"message": "User Created Successfully!"});
    expect(res.json).toHaveBeenCalledTimes(3);
});


