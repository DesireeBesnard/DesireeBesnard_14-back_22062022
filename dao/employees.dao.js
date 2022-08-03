import Employee from '../models/Employee.js'
import mongoose from 'mongoose'
let ObjectId = mongoose.Types.ObjectId

//DAO defines the standard operations to be performed on a model object.


export class EmployeesDAO {

    static instance 

    //singleton
    static getInstance() {
        if( !EmployeesDAO.instance ) {
            EmployeesDAO.instance = new EmployeesDAO()
        }
        return EmployeesDAO.instance
    }

    async list() {
        const employees = await Employee.find()
        return employees 
    }

    async create(employee) {
        const newEmployee = new Employee(employee)
        const savedEmployee = await newEmployee.save()
        return savedEmployee
    }

    async update(employee, id) {
        try {
            const updatedEmployee = await Employee.findByIdAndUpdate(
                id,
                employee
            )
            return updatedEmployee
        } catch (error) {
            console.log(error)
        }
    }

    async updateAdminStatus(id, targetStatus) {
        try {
            const updatedEmployee = await Employee.findByIdAndUpdate(
                id,
                { isAdmin: !targetStatus},
                {returnDocument: 'after'}
            )
            return updatedEmployee
        } catch(error) {
            console.log(error)
        }
    }

    async follow(followId, userId) {
        try {
            const followers = await Employee.findByIdAndUpdate(
                followId,
                {$addToSet: {followers: userId}},
                {new: true}
            )

            const followings = await Employee.findByIdAndUpdate(
                userId,
                {$addToSet: {followings: followId}},
                {new: true}
            )
            return followers
        } catch (error) {
            return error
        }
    }

    async unfollow(followId, userId) {
        try {
            const unfollow = await Employee.findByIdAndUpdate(
                followId,
                {$pull: {followers: userId}},
                {new: true}
            )

            const removeFollowing = await Employee.findByIdAndUpdate(
                userId,
                {$pull: {followings: followId}},
                {new: true}
            )

            return unfollow
        } catch (error) {
            return error
        }
    }


    async delete(id) {
        try {
            const deletedEmployee = await Employee.findByIdAndDelete(id)
            return deletedEmployee
        } catch (error) {
            throw "Je n'ai pas delete"
        }
    }
}