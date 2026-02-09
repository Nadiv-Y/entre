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
const express_1 = require("express");
const meetings_1 = require("../controllers/meetings");
const router = (0, express_1.Router)();
// GET all meetings for a team
router.get('/:teamId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const teamId = Number(req.params.teamId);
        if (isNaN(teamId)) {
            res.status(400).send('Invalid team ID');
            return;
        }
        const meetings = yield (0, meetings_1.getByTeamId)(teamId);
        res.status(200).json(meetings);
    }
    catch (error) {
        res.status(500).send('Error fetching meetings');
    }
}));
// POST add new meeting
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { teamId, startTime, endTime, description, room } = req.body;
        const newMeeting = yield (0, meetings_1.add)(teamId, startTime, endTime, description, room);
        res.status(201).json(newMeeting);
    }
    catch (error) {
        if (error.message === 'Missing required fields' || error.message === 'endTime must be after startTime' || error.message === 'Invalid date format') {
            res.status(400).send(error.message);
        }
        else {
            console.error(error);
            res.status(500).send('Error adding meeting');
        }
    }
}));
exports.default = router;
