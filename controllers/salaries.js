const express = require("express");
const Salarie = require("../models/salarie");
const getCountryIso3 = require("country-iso-2-to-3");

const {
  CustomAPIError,
  BadRequest,
  UnauthenticatedError,
  NotFoundError,
} = require("../errors");
const { StatusCodes } = require("http-status-codes");
const createSalarie = async (req, res) => {
  try {
    req.body.createdBy = req.user.userID;
    // const {
    //   body: { SAL_NOM, SAL_PRENOM, SAL_START_DATE, SAL_JOB },
    // } = req;
    // if (
    //   SAL_NOM === "" ||
    //   SAL_PRENOM === "" ||
    //   SAL_START_DATE === "" ||
    //   SAL_JOB === ""
    // ) {
    //   throw new BadRequest(
    //     "first name or last name or start date or job fields cannot be empty"
    //   );
    // }
    const salarie = await Salarie.create(req.body);
    res.status(StatusCodes.CREATED).json({ salarie });
  } catch (error) {
    console.log("createSalarie", error);
  }
};
const getAllSalaries = async (req, res) => {
  try {
    const salaries = await Salarie.find({ createdBy: req.user.userID })
      .populate({
        path: "jobId",
        select: "jobName", // Add the fields you want to retrieve
      })
      .sort("createdAt");
    res.status(StatusCodes.OK).json({ salaries });
  } catch (error) {
    console.log("getAllSalaries", error);
  }
};
const updateSalarie = async (req, res) => {
  try {
    const {
      user: { userID },
      params: { id: salId },
    } = req;

    const salarie = await Salarie.findOneAndUpdate(
      { _id: salId, createdBy: userID },
      req.body,
      { new: true, runValidators: true }
    );
    if (!salarie) {
      throw new NotFoundError(`No salarie with id ${salId}`);
    }
    res.status(StatusCodes.OK).json({ salarie });
  } catch (error) {
    console.log("updateSalarie", error);
  }
};
const deleteSalarie = async (req, res) => {
  console.log(req.params);
  const {
    user: { userID },
    params: { id: salId },
  } = req;

  try {
    const salarie = await Salarie.findOneAndDelete({
      _id: salId,
      createdBy: userID,
    });
    if (!salarie) {
      throw new NotFoundError(`No salarie with id ${salId}`);
    }
    res.status(StatusCodes.OK).json({ msg: "Deleted successfully" });
  } catch (error) {
    console.log("deleteSalarie", error);
  }
};
const getSalarie = async (req, res) => {
  try {
    const {
      user: { userID },
      params: { id: salId },
    } = req;

    const salarie = await Salarie.findOne({
      _id: salId,
      createdBy: userID,
    }).populate({
      path: "jobId",
      select: "jobName", // Add the fields you want to retrieve
    });
    if (!salarie) {
      throw new NotFoundError(`No salarie with id ${salId}`);
    }
    res.status(StatusCodes.OK).json({ salarie });
  } catch (error) {
    console.log(error);
  }
};
const getSalariesGeo = async (req, res) => {
  try {
    const salaries = await Salarie.find({ createdBy: req.user.userID }).sort(
      "createdAt"
    );
    const mappedLocations = salaries.reduce((acc, { country }) => {
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
    console.log("getAllSalaries", error);
  }
};
module.exports = {
  createSalarie,
  getAllSalaries,
  updateSalarie,
  deleteSalarie,
  getSalarie,
  getSalariesGeo,
};
