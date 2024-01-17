export class Points {
    negativePoints: number = 0;
    positivePoints: number = 0;
}

export class Employee {
    name: string;
    title: string;
    points: Points = new Points();

    constructor(name: string = '', title: string = '', points: Points = new Points()) {
        this.name = name;
        this.title = title;
        this.points.negativePoints = points.negativePoints;
        this.points.positivePoints = points.positivePoints;
    }
}