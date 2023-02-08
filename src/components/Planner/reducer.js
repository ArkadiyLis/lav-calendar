import {createSlice} from "@reduxjs/toolkit";
import {DateTime} from "luxon";

export const planner = createSlice({
    name: 'planner',
    initialState: {
        events: [
            {
                id: 1,
                start: DateTime.now().set({hours: 9, minutes: 0, seconds: 0, millisecond: 0}),
                end: DateTime.now().set({hours: 11, minutes: 0, seconds: 0, millisecond: 0}),
            },
            {
                id: 2,
                start: DateTime.now().set({hours: 9,minutes: 0, seconds: 0, millisecond: 0}),
                end: DateTime.now().set({hours: 14,minutes: 0, seconds: 0, millisecond: 0}),
            },
            {
                id: 3,
                start: DateTime.now().set({hours: 12,minutes: 0, seconds: 0, millisecond: 0}),
                end: DateTime.now().set({hours: 13,minutes: 0, seconds: 0, millisecond: 0}),
            },
            {
                id: 4,
                start: DateTime.now().set({hours: 13,minutes: 0, seconds: 0, millisecond: 0}),
                end: DateTime.now().set({hours: 15,minutes: 0, seconds: 0, millisecond: 0}),
            },
            {
                id: 5,
                start: DateTime.now().set({hours: 8,minutes: 0, seconds: 0, millisecond: 0}),
                end: DateTime.now().set({hours: 17,minutes: 0, seconds: 0, millisecond: 0}),
            },
            {
                id: 6,
                start: DateTime.now().set({hours: 7,minutes: 0, seconds: 0, millisecond: 0}),
                end: DateTime.now().set({hours: 14,minutes: 0, seconds: 0, millisecond: 0}),
            },
            {
                id: 7,
                start: DateTime.now().set({hours: 6,minutes: 0, seconds: 0, millisecond: 0}),
                end: DateTime.now().set({hours: 7,minutes: 0, seconds: 0, millisecond: 0}),
            },
            {
                id: 8,
                start: DateTime.now().set({hours: 17,minutes: 0, seconds: 0, millisecond: 0}),
                end: DateTime.now().set({hours: 18,minutes: 0, seconds: 0, millisecond: 0}),
            }

        ]    },
    reducers: {
        addEvent: (state, action) => {
        },
        updateEvent: (state, action) => {
        },
        removeEvent: (state, action) => {
        },
    }
});

export const {addEvent, updateEvent, removeEvent} = planner.actions;

export default planner.reducer;