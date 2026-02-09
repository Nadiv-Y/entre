"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.add = exports.getByTeamId = void 0;
const meeting_1 = require("../models/meeting");
const getByTeamId = (teamId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield meeting_1.Meeting.selectByTeamId(teamId);
});
exports.getByTeamId = getByTeamId;
const add = (teamId, startTime, endTime, description, room) => __awaiter(void 0, void 0, void 0, function* () {
    // Basic Validation
    if (!teamId || !startTime || !endTime || !description || !room) {
        throw new Error('Missing required fields');
    }
    const start = new Date(startTime);
    const end = new Date(endTime);
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
        throw new Error('Invalid date format');
    }
    if (end <= start) {
        throw new Error('endTime must be after startTime');
    }
    const newMeeting = new meeting_1.Meeting(teamId, start, end, description, room);
    const savedMeeting = yield newMeeting.insert();
    return savedMeeting;
});
exports.add = add;
