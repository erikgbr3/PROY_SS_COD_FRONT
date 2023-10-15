import Match from "./match";

class MatchResult {
    matches: Match[];

    constructor (
        matches: Match[],
    ) {
        this.matches = matches;
    }
}

export default MatchResult;