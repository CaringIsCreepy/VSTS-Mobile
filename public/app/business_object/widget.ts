export class Widget {
    id: number;
    name: string;
    row: number;
    column: number;
    rowSpan: number;
    columnSpan: number;
    settings: string;

    populate(widgetJson: any) {
        this.id = widgetJson.id;
        this.name = widgetJson.name;
        this.row = widgetJson.position.row;
        this.column = widgetJson.position.column;
        this.rowSpan = widgetJson.size.rowSpan;
        this.columnSpan = widgetJson.size.columnSpan;
    }
}