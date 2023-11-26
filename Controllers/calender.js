import { calender } from "../models/calender.js";
import { User } from "../models/User.js";

export const createReminder = async (req, res) => {
    try {
        const { date, description, time, user } = req.body

        const calenderEvent = new calender({
            date,
            description,
            time,
            user
        });

        await calenderEvent.save();
        return res.status(201).json({
            message: "Reminder created successfully",
            reminder: {
                date: calenderEvent.date,
                description: calenderEvent.description,
                time: calenderEvent.time,
                reminderID: calenderEvent._id
            }
        });
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
}

export const getAllReminders = async (req, res) => {
    try {
        const userId = req.params.userID

        const user = await User.findById(userId)
        if (!user) {
            return res.status(404).json({
                message: "User doesn't exist"
            })
        }

        const allcalenderEvent = await calender.find({ user: userId }).populate('user')
        if (!allcalenderEvent) {
            return res.status(201).json({
                message: "No reminder created by the user"
            })
        }

        return res.status(201).json({
            status: "Success",
            reminders: allcalenderEvent
        })
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            message: "Internal server error"
        });
    }
}

export const updateReminder = async (req, res) => {
    try {
        const { date, description, time, reminderID } = req.body

        const existedcalenderEvent = await calender.findById(reminderID)
        if (!existedcalenderEvent) {
            return res.status(404).json({
                message: "No reminder with given ID existed"
            });
        } else {
            existedcalenderEvent.date = date || existedcalenderEvent.date
            existedcalenderEvent.description = description || existedcalenderEvent.description
            existedcalenderEvent.time = time || existedcalenderEvent.time

            const newcalenderEvent = await existedcalenderEvent.save()

            return res.status(202).json({
                message: "Reminer updated successfully",
                reminder: newcalenderEvent
            });
        }
    } catch (err) {
        return res.status(500).json({
            message: "Internal server error"
        });
    }
}

export const deleteReminder = async (req, res) => {
    try {
        const { reminderID } = req.body

        const calenderEvent = await calender.findById(reminderID)
        if (!calenderEvent) {
            return res.status(404).json({
                message: "Reminder with provided ID doesn't exist"
            })
        } else {
            await calender.findByIdAndDelete(reminderID)
            return res.status(202).json({
                status: "Success",
                message: "Reminder deleted successfully"
            });
        }
    } catch (err) {
        return res.status(500).json({
            message: "Internal server error"
        });
    }
}