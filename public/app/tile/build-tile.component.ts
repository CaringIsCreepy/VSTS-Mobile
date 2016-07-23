import {Component, Input} from '@angular/core';
import {Build} from '../business_object/build';

@Component({
    selector: "build-tile",
    templateUrl: "/app/tile/build-tile.html"
})
export class BuildTile {
    @Input()
    build: Build;
}