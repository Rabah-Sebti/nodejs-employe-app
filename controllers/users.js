const User = require("../models/user");
const getCountryIso3 = require("country-iso-2-to-3");

const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json({ users });
  } catch (error) {
    console.log("error on getUsers", error);
  }
};
const getUsersGeo = async (req, res) => {
  try {
    const users = await User.find();
    const mappedLocations = users.reduce((acc, { country }) => {
      const countryISO3 = getCountryIso3(country);
      if (!acc[countryISO3]) acc[countryISO3] = 0;
      acc[countryISO3]++;
      return acc;
    }, {});
    const formattedLocations = Object.entries(mappedLocations).map(
      ([country, count]) => {
        return { id: country, value: count };
      }
    );
    res.json(formattedLocations);
  } catch (error) {
    console.log("error on getUsers", error);
  }
};
const myAccount = async (req, res) => {
  try {
    const {
      user: { userID },
    } = req;
    // const job = await Job.findOneAndUpdate(
    const user = await User.findOne({ _id: userID });
    res.json({ user });
  } catch (error) {
    console.log("error on getUsers", error);
  }
};

module.exports = { getUsers, getUsersGeo, myAccount };
