import { Component, OnInit } from '@angular/core';
import { ElectronService } from 'ngx-electron';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    constructor(
        private electronService: ElectronService
    ) { }

    ngOnInit(): void {
    }

    public closeApp() {
        this.electronService.remote.getCurrentWindow().close();
    }

    public isFullScreen(): boolean {
        return this.electronService.remote.getCurrentWindow().isMaximized();
    }

    public maximizeApp() {
        this.electronService.remote.getCurrentWindow().maximize();
    }

    public unMaximizeApp() {
        this.electronService.remote.getCurrentWindow().unmaximize();
    }

    public reduceApp() {
        this.electronService.remote.getCurrentWindow().minimize();
    }

}
