export class ActionLog {
    constructor(
        public userId: string,
        public actionType: string,
        public points: number,
        public pointsType: string,
        public reason: string
    ) { }
}