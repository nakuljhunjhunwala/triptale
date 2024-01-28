import mongoose from "mongoose";
import { pointsCategory } from "../constants/points";

const pointsSchema = new mongoose.Schema(
    {
        tripId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Trip",
            required: true,
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        coordinates: {
            type: {
                type: String,
                enum: ["Point"],
                required: true,
            },
            coordinates: {
                type: [Number],
                required: true,
            },
        },
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
        },
        photos: {
            type: [String],
        },
        isPrivate: {
            type: Boolean,
            required: true,
            default: false,
        },
        category: {
            type: String,
            enum: pointsCategory,
        },
        tags: {
            type: [String],
        },
    },
    {
        timestamps: true,
    }
);

pointsSchema.index({ coordinates: "2dsphere" });

export const PointModal = mongoose.model<IPoints>("Point", pointsSchema);

export interface IPoints extends mongoose.Document {
    tripId: string;
    createdBy: string;
    coordinates: {
        type: string;
        coordinates: [number];
    };
    name: string;
    description?: string;
    photos?: [string];
    isPrivate: boolean;
    category?: string;
    tags?: [string];
    createdAt?: Date;
    updatedAt?: Date;
}
