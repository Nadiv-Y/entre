import { Teams } from "../models/teams"

export const getAllTeams = async () => {
    return await Teams.selectAll()
}