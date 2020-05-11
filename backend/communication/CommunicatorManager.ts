import { ipcMain } from 'electron';

export class CommunicatorMannager {

    constructor() {
        this.initializeChannels();
    }

    private initializeChannels(): void {
        ipcMain.on('launchGenerator', (event, message) => {
            console.log("COMPRIS")
            console.log(message);
        });
    }

}