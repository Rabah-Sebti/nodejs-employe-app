const express = require("express");
const {
  CustomAPIError,
  BadRequest,
  UnauthenticatedError,
  NotFoundError,
} = require("../errors");
const { StatusCodes } = require("http-status-codes");
const Contrat = require("../models/contrat");
const createContrat = async (req, res) => {
  try {
    req.body.createdBy = req.user.userID;
    // const {
    //   body: { jobName, startDate },
    // } = req;
    // if (startDate === "" || jobName === "") {
    //   throw new BadRequest("name or start date fields cannot be empty");
    // }
    const contrat = await Contrat.create(req.body);
    res.status(StatusCodes.CREATED).json({ contrat });
  } catch (error) {
    console.log("createJob", error);
  }
};
const getAllContrats = async (req, res) => {
  try {
    const contrats = await Contrat.find({ createdBy: req.user.userID })
      .populate({
        path: "jobId",
        select: "jobName", // Add the fields you want to retrieve
      })
      .populate({
        path: "employeeId", // Assuming the field is named "employeeId" in your schema
        select: "firstName lastName", // Add the fields you want to retrieve
      })
      .populate({
        path: "createdBy", // Assuming the field is named "employeeId" in your schema
        select: "firstName lastName email", // Add the fields you want to retrieve
      })
      .sort("createdAt");
    res.status(StatusCodes.OK).json({ contrats });
  } catch (error) {
    console.log("getAllJobs", error);
  }
};
const updateContrat = async (req, res) => {
  try {
    const {
      // body: { JOB_LIB, JOB_CODE, JOB_START_DATE, JOB_END_DATE },
      user: { userID },
      params: { id: contratId },
    } = req;
    const contrat = await Contrat.findOneAndUpdate(
      { _id: contratId, createdBy: userID },
      req.body,
      { new: true, runValidators: true }
    );
    if (!contrat) {
      throw new NotFoundError(`No contrat with id ${contratId}`);
    }
    res.status(StatusCodes.OK).json({ contrat });
  } catch (error) {
    console.log("updateContrat", error);
  }
};
const deleteContrat = async (req, res) => {
  const {
    user: { userID },
    params: { id: contratId },
  } = req;
  try {
    const contrat = await Contrat.findOneAndDelete({
      _id: contratId,
      createdBy: userID,
    });
    if (!contrat) {
      throw new NotFoundError(`No contrat with id ${contratId}`);
    }
    res.status(StatusCodes.OK).json({ contrat });
  } catch (error) {
    console.log("deleteJob", error);
  }
};
const getContrat = async (req, res) => {
  try {
    const {
      user: { userID },
      params: { id: contratId },
    } = req;

    const contrat = await Contrat.findOne({
      _id: contratId,
      createdBy: userID,
    })
      .populate({
        path: "jobId",
        select: "jobName", // Add the fields you want to retrieve
      })
      .populate({
        path: "employeeId", // Assuming the field is named "employeeId" in your schema
        select: "firstName lastName", // Add the fields you want to retrieve
      });
    if (!contrat) {
      throw new NotFoundError(`No contrat with id ${contratId} `);
    }
    res.status(StatusCodes.OK).json({ contrat });
  } catch (error) {
    console.log("getcontrat", error);
  }
};
module.exports = {
  createContrat,
  getAllContrats,
  updateContrat,
  deleteContrat,
  getContrat,
};
