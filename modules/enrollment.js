const mongoose = require("mongoose");
const Joi = require("joi");

const enrollmentSchema = new mongoose.Schema({
    customer: {
        type: new mongoose.Schema({
            name: {
                type: String,
                required: true,
                minlength: 3,
                maxlength: 255
            }
        }),
        required: true
    },
    course: {
        type: new mongoose.Schema({
            title: {
                type: String,
                required: true,
                trim: true,
                minlength: 3,
                maxlength: 255
            }
        }),
        required: true
    },
    courseFee: {
        type: Number,
        required: true,
        min: 0
    },
    dateStart: {
        type: Date,
        default: Date.now(),
        required: true
    }

});

const Enrollment =  mongoose.model("Enrollment", enrollmentSchema);

function validateEnrollment(enrollment) {
    const schema = {
        customerId: Joi.string().required(),
        courseId: Joi.string().required(),
    }

    return Joi.validate(enrollment, schema);
}

exports.validate = validateEnrollment;
exports.Enrollment = Enrollment;