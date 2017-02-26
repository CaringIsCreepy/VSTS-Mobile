export class WorkItem {
    id: number;
    rev: number;
    title: string;
    state: string;
    type: string;
    changedBy: string;
    changedDate: Date;
    assignedTo: string;

    populate(workItemJson: any) {
        this.id = workItemJson.id;
        if (workItemJson.fields !== undefined) {
            this.populateFields(workItemJson.fields);
        }
    }

    private populateFields(fieldsJson: any) {
        this.title = this.getField<string>(fieldsJson, 'System.Title');
        this.state = this.getField<string>(fieldsJson, 'System.State');
        this.type = this.getField<string>(fieldsJson, 'System.WorkItemType');
        this.changedBy = this.getField<string>(fieldsJson, 'System.ChangedBy');
        this.changedDate = new Date(this.getField<string>(fieldsJson, 'System.ChangedDate'));
        this.assignedTo = this.getField<string>(fieldsJson, 'System.AssignedTo');
    }

    private getField<T>(fieldsJson, field) : T {
        if (field in fieldsJson) {
            return fieldsJson[field];
        }

        return null;
    }
}