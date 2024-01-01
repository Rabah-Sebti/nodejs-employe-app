const express = require("express");
const {
  CustomAPIError,
  BadRequest,
  UnauthenticatedError,
  NotFoundError,
} = require("../errors");
const { StatusCodes } = require("http-status-codes");
const Job = require("../models/job");
const createJob = async (req, res) => {
  try {
    req.body.createdBy = req.user.userID;
    const {
      body: { jobName, startDate },
    } = req;
    if (startDate === "" || jobName === "") {
      throw new BadRequest("name or start date fields cannot be empty");
    }
    const job = await Job.create(req.body);
    res.status(StatusCodes.CREATED).json({ job });
  } catch (error) {
    console.log("createJob", error);
  }
};
const getAllJobs = async (req, res) => {
  try {
    console.log("req.user.userID", req.user.userID);
    const jobs = await Job.find({ createdBy: req.user.userID }).sort(
      "createdAt"
    );
    res.status(StatusCodes.OK).json({ jobs });
  } catch (error) {
    console.log("getAllJobs", error);
  }
};
const updateJob = async (req, res) => {
  try {
    const {
      // body: { JOB_LIB, JOB_CODE, JOB_START_DATE, JOB_END_DATE },
      user: { userID },
      params: { id: jobId },
    } = req;
    const job = await Job.findOneAndUpdate(
      { _id: jobId, createdBy: userID },
      req.body,
      { new: true, runValidators: true }
    );
    if (!job) {
      throw new NotFoundError(`No job with id ${jobId}`);
    }
    res.status(StatusCodes.OK).json({ job });
  } catch (error) {
    console.log("updateJob", error);
  }
};
const deleteJob = async (req, res) => {
  const {
    user: { userID },
    params: { id: jobId },
  } = req;
  try {
    const job = await Job.findOneAndDelete({
      _id: jobId,
      createdBy: userID,
    });
    if (!job) {
      throw new NotFoundError(`No job with id ${jobId}`);
    }
    res.status(StatusCodes.OK).json({ job });
  } catch (error) {
    console.log("deleteJob", error);
  }
};
const getJob = async (req, res) => {
  try {
    const {
      user: { userID },
      params: { id: jobId },
    } = req;

    const job = await Job.findOne({
      _id: jobId,
      createdBy: userID,
    });
    if (!job) {
      throw new NotFoundError(`No job with id ${userID} `);
    }
    res.status(StatusCodes.OK).json({ job });
  } catch (error) {
    console.log("getJob", error);
  }
};
module.exports = { createJob, getAllJobs, updateJob, deleteJob, getJob };
