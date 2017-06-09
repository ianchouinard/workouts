import { Injectable } from '@angular/core';
import { StateProvider } from "../providers/state.provider";
import { Storage } from '@ionic/storage';

@Injectable()
export class StorageService {

    constructor(
        private storage: Storage,
        private state: StateProvider
    ) {}

    saveGroups () {
        this.storage.ready().then(() => {
            this.storage.set('_dev2_groups', this.state.Groups);
        });
    }

    getGroups () {
        this.storage.get('_dev2_groups').then(data => {
            if (data) {
                this.state.Groups = data;
            }
        }, error => {
            console.log('err getting groups');
        });
    }

}
