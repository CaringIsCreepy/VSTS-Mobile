export class Iteration {
    id: string;
    name: string;

    populate(iterationJson: any) {
        this.id = iterationJson.id;
        this.name = iterationJson.name;
    }
}