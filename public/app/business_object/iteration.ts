export class Iteration {
    id: string;
    name: string;
    startDate: Date;
    finishDate: Date;
    path: string;

    populate(iterationJson: any) {
        this.id = iterationJson.id;
        this.name = iterationJson.name;
        this.startDate = new Date(iterationJson.attributes.startDate);
        this.finishDate = new Date(iterationJson.attributes.finishDate);
        this.path = iterationJson.path;
    }
}