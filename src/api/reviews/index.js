import express from "express";
import ReviewsModel from "./model.js";
import UsersModel from "./../users/model.js";
import createHttpError from "http-errors";

const reviewsRouter = express.Router();

reviewsRouter.post("/", async (req, res, next) => {
  try {
    const { reviewId } = await ReviewsModel.create(req.body);
    res.status(201).send({ id: reviewId });
  } catch (error) {
    next(error);
  }
});

reviewsRouter.get("/", async (req, res, next) => {
  try {
    const reviews = await ReviewsModel.findAll({
      include: [
        {
          model: UsersModel,
        },
      ],
    });
    res.send(blogs);
  } catch (error) {
    next(error);
  }
});

reviewsRouter.delete("/:reviewId", async (req, res, next) => {
  try {
    const numberOfDeletedRows = await ReviewsModel.destroy({
      where: { id: req.params.reviewId },
    });
    if (numberOfDeletedRows === 1) {
      res.status(204).send();
    } else {
      next(
        createHttpError(404, `Review with id ${req.params.reviewId} not found!`)
      );
    }
  } catch (error) {
    next(error);
  }
});

export default reviewsRouter;
