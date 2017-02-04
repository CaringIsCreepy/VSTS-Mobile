export class Dashboard {
    id: number;
    name: string;
    position: number;

    populate(dashboardJson: any) {
        this.id = dashboardJson.id;
        this.name = dashboardJson.name;
        this.position = dashboardJson.position;
    }
}