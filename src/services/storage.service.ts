import { Injectable } from '@angular/core';
import { StateProvider } from "../providers/state.provider";

@Injectable()
export class StorageService {

    constructor(
        private storage: Storage,
        private state: StateProvider
    ) {}

    saveGroups () {
        this.storage.ready().then(() => {
            this.storage.set('_dev_groups', this.state.Groups);
        });
    }

    getGroups () {
        this.storage.get('_dev_groups').then(data => {
            this.state.Groups = data;
        }, error => {
            console.log('err getting groups');
        });;
    }

}
