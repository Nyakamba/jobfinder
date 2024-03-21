import Users from "../models/userModel.js";

export const register = async (req, res, next) => {
  const { firstName, lastName, email, password, accountType } = req.body;

  //validate
  if (!firstName) {
    next("Firstname is required");
  }
  if (!lastName) {
    next("Lastname is required");
  }
  if (!email) {
    next("Email is required");
  }
  if (!password) {
    next("Password is required");
  }

  try {
    const userExists = await Users.findOne({ email });

    if (userExists) {
      next("Email already exists");
      return;
    }

    //create user
    const user = await Users.create({
      email,
      password,
      firstName,
      lastName,
    });

    const token = user.createJWT();

    res.status(201).send({
      success: true,
      message: "Account created successfully",
      user: {
        _id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        accountType: user.accountType,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

export const signIn = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    //validation
    if (!email || !password) {
      next("Please provide user credentials");
    }
    //find user by email
    const user = await Users.findOne({ email }).select("+password");

    if (!user) {
      next("Invalid login credentials");
    }

    //compare password
    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      next("Invalid login credentials");
    }

    user.password = undefined;

    const token = user.createJWT();

    res.status(201).json({
      success: true,
      message: "Login successfully",
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};
