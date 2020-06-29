import { getMinutesAndSecondsFromDurationInSeconds } from "../../lib/time";

describe("getMinutesAndSecondsFromDurationInSeconds", () => {
    describe("for duration less than 1 minute", () => {
        it("works from 30 seconds", () => {
            expect(
                getMinutesAndSecondsFromDurationInSeconds(30)
            ).toEqual([0, 30]);
        });
    })
    
    
    describe("for duration more than 1 minute", () => {
        it("works from 140 seconds", () => {
            expect(
                getMinutesAndSecondsFromDurationInSeconds(140)
            ).toEqual([2, 20]);
        });
    })
})

